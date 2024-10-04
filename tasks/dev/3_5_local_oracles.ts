import { task } from 'hardhat/config';
import {
  deployAaveOracle,
  deployLendingRateOracle,
  deployPriceOracle,
} from '../../helpers/contracts-deployments';
import {
  setInitialAssetPricesInOracle,
  deployAllMockAggregators,
  setInitialMarketRatesInRatesOracleByHelper,
} from '../../helpers/oracles-helpers';
import { ICommonConfiguration, iAssetBase, TokenContractId, eNetwork } from '../../helpers/types';
import { waitForTx } from '../../helpers/misc-utils';
import { getAllAggregatorsAddresses, getAllTokenAddresses } from '../../helpers/mock-helpers';
import { ConfigNames, loadPoolConfig, getQuoteCurrency } from '../../helpers/configuration';
import {
  getAllMockedTokens,
  getLendingPoolAddressesProvider,
  getPairsTokenAggregator,
  getPriceOracle,
  getMockedTokens,
} from '../../helpers/contracts-getters';

task('dev:deploy-local-oracles', 'Deploy oracles for dev environment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .setAction(async ({ verify, pool }, DRE) => {
    await DRE.run('set-DRE');
    const poolConfig = loadPoolConfig(pool);
    const network = <eNetwork>DRE.network.name;
    console.log('🚀 ~ file: 3_5_local_oracles.ts:26 ~ .setAction ~ network:', network);
    const {
      Mocks: { AllAssetsInitialPrices },
      ProtocolGlobalParams: { UsdAddress, MockUsdPriceInWei },
      LendingRateOracleRatesCommon,
      OracleQuoteCurrency,
      OracleQuoteUnit,
    } = poolConfig as ICommonConfiguration;

    const currentNetwork = process.env.FORK ? process.env.FORK : network;
    const reserveAssetsKeys = Object.keys(poolConfig.ReserveAssets[currentNetwork]);
    console.log(
      '🚀 ~ file: 3_5_local_oracles.ts:38 ~ .setAction ~ reserveAssetsKeys:',
      poolConfig.ReserveAssets[currentNetwork]
    );
    const allTokenAddresses = poolConfig.ReserveAssets[currentNetwork];

    for (let key in poolConfig.Mocks.AllAssetsInitialPrices) {
      if (!reserveAssetsKeys.includes(key)) {
        delete poolConfig.Mocks.AllAssetsInitialPrices[key];
      }
    }

    for (let key in poolConfig.Mocks) {
      if (Object.keys(poolConfig.Mocks[key]).length === 0) {
        delete poolConfig[key];
      }
    }

    const defaultTokenList: { [key: string]: string } = {
      ...allTokenAddresses,
      USD: UsdAddress,
    };
    const addressesProvider = await getLendingPoolAddressesProvider();
    const admin = await addressesProvider.getPoolAdmin();
    // Deploy fallback Oracle
    const mockOracle = await deployPriceOracle();
    const fallbackOracle = await getPriceOracle(mockOracle.address);
    await waitForTx(await fallbackOracle.setEthUsdPrice(MockUsdPriceInWei));
    await setInitialAssetPricesInOracle(AllAssetsInitialPrices, defaultTokenList, fallbackOracle);

    const mockAggregators = await deployAllMockAggregators(AllAssetsInitialPrices, verify);

    const [tokens, aggregators] = getPairsTokenAggregator(
      allTokenAddresses,
      mockAggregators,
      OracleQuoteCurrency
    );

    const aaveOracle = await deployAaveOracle(
      [
        tokens,
        aggregators,
        fallbackOracle.address,
        await getQuoteCurrency(poolConfig),
        OracleQuoteUnit,
      ],
      verify
    );
    await waitForTx(await addressesProvider.setPriceOracle(fallbackOracle.address));

    const lendingRateOracle = await deployLendingRateOracle(verify);
    await waitForTx(await addressesProvider.setLendingRateOracle(lendingRateOracle.address));

    const { USD, ...tokensAddressesWithoutUsd } = allTokenAddresses;
    const allReservesAddresses = {
      ...tokensAddressesWithoutUsd,
    };
    await setInitialMarketRatesInRatesOracleByHelper(
      LendingRateOracleRatesCommon,
      allReservesAddresses,
      lendingRateOracle,
      admin
    );
    // Register the proxy price provider on the addressesProvider
    await waitForTx(await addressesProvider.setPriceOracle(aaveOracle.address));
    await waitForTx(await addressesProvider.setLendingRateOracle(lendingRateOracle.address));
    console.log('Local oracles deployed!!');
  });
