import { task } from 'hardhat/config';
import { getParamPerNetwork } from '../../helpers/contracts-helpers';
import { deployAaveOracle, deployLendingRateOracle } from '../../helpers/contracts-deployments';
import { setInitialMarketRatesInRatesOracleByHelper } from '../../helpers/oracles-helpers';
import { ICommonConfiguration, eNetwork, SymbolMap } from '../../helpers/types';
import { waitForTx, notFalsyOrZeroAddress } from '../../helpers/misc-utils';
import {
  ConfigNames,
  loadPoolConfig,
  getGenesisPoolAdmin,
  getLendingRateOracles,
  getQuoteCurrency,
} from '../../helpers/configuration';
import {
  getAaveOracle,
  getLendingPoolAddressesProvider,
  getLendingRateOracle,
  getPairsTokenAggregator,
} from '../../helpers/contracts-getters';
import { AaveOracle, LendingRateOracle } from '../../types';

task('full:deploy-oracles', 'Deploy oracles for dev enviroment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .setAction(async ({ verify, pool }, DRE) => {
    console.log('🚀 ~ file: 3_oracles.ts:26 ~ .setAction ~ pool:', pool);
    try {
      await DRE.run('set-DRE');
      const network = <eNetwork>DRE.network.name;
      const poolConfig = loadPoolConfig(pool);
      console.log('🚀 ~ file: 3_oracles.ts:30 ~ .setAction ~ poolConfig:', poolConfig);
      const {
        ProtocolGlobalParams: { UsdAddress },
        ReserveAssets,
        FallbackOracle,
        ChainlinkAggregator,
      } = poolConfig as ICommonConfiguration;
      const lendingRateOracles = getLendingRateOracles(poolConfig);
      console.log(
        '🚀 ~ file: 3_oracles.ts:37 ~ .setAction ~ lendingRateOracles:',
        lendingRateOracles
      );
      const addressesProvider = await getLendingPoolAddressesProvider();
      const admin = await getGenesisPoolAdmin(poolConfig);
      console.log('🚀 ~ file: 3_oracles.ts:41 ~ .setAction ~ admin:', admin);
      const aaveOracleAddress = getParamPerNetwork(poolConfig.AaveOracle, network);
      console.log(
        '🚀 ~ file: 3_oracles.ts:43 ~ .setAction ~ aaveOracleAddress:',
        aaveOracleAddress
      );
      const lendingRateOracleAddress = getParamPerNetwork(poolConfig.LendingRateOracle, network);
      console.log(
        '🚀 ~ file: 3_oracles.ts:45 ~ .setAction ~ lendingRateOracleAddress:',
        lendingRateOracleAddress
      );
      const fallbackOracleAddress = await getParamPerNetwork(FallbackOracle, network);
      console.log(
        '🚀 ~ file: 3_oracles.ts:47 ~ .setAction ~ fallbackOracleAddress:',
        fallbackOracleAddress
      );
      const reserveAssets = await getParamPerNetwork(ReserveAssets, network);
      console.log('🚀 ~ file: 3_oracles.ts:49 ~ .setAction ~ reserveAssets:', reserveAssets);
      const chainlinkAggregators = await getParamPerNetwork(ChainlinkAggregator, network);
      console.log(
        '🚀 ~ file: 3_oracles.ts:44 ~ .setAction ~ chainlinkAggregators:',
        chainlinkAggregators
      );

      const tokensToWatch: SymbolMap<string> = {
        ...reserveAssets,
        USD: UsdAddress,
      };
      console.log('🚀 ~ file: 3_oracles.ts:46 ~ .setAction ~ tokensToWatch:', tokensToWatch);
      console.log(
        '🚀 ~ file: 3_oracles.ts:46 ~ .setAction ~ poolConfig.OracleQuoteCurrency',
        poolConfig.OracleQuoteCurrency
      );

      const [tokens, aggregators] = getPairsTokenAggregator(
        tokensToWatch,
        chainlinkAggregators,
        poolConfig.OracleQuoteCurrency
      );

      let aaveOracle: AaveOracle;
      let lendingRateOracle: LendingRateOracle;

      if (notFalsyOrZeroAddress(aaveOracleAddress)) {
        aaveOracle = await await getAaveOracle(aaveOracleAddress);
        await waitForTx(await aaveOracle.setAssetSources(tokens, aggregators));
      } else {
        aaveOracle = await deployAaveOracle(
          [
            tokens,
            aggregators,
            fallbackOracleAddress,
            await getQuoteCurrency(poolConfig),
            poolConfig.OracleQuoteUnit,
          ],
          verify
        );
        await waitForTx(await aaveOracle.setAssetSources(tokens, aggregators));
      }

      if (notFalsyOrZeroAddress(lendingRateOracleAddress)) {
        lendingRateOracle = await getLendingRateOracle(lendingRateOracleAddress);
      } else {
        lendingRateOracle = await deployLendingRateOracle(verify);
        const { USD, ...tokensAddressesWithoutUsd } = tokensToWatch;
        await setInitialMarketRatesInRatesOracleByHelper(
          lendingRateOracles,
          tokensAddressesWithoutUsd,
          lendingRateOracle,
          admin
        );
      }

      console.log('Aave Oracle: %s', aaveOracle.address);
      console.log('Lending Rate Oracle: %s', lendingRateOracle.address);

      // Register the proxy price provider on the addressesProvider
      await waitForTx(await addressesProvider.setPriceOracle(aaveOracle.address));
      await waitForTx(await addressesProvider.setLendingRateOracle(lendingRateOracle.address));
    } catch (error) {
      if (DRE.network.name.includes('tenderly')) {
        const transactionLink = `https://dashboard.tenderly.co/${DRE.config.tenderly.username}/${
          DRE.config.tenderly.project
        }/fork/${DRE.tenderly.network().getFork()}/simulation/${DRE.tenderly.network().getHead()}`;
        console.error('Check tx error:', transactionLink);
      }
      throw error;
    }
  });
