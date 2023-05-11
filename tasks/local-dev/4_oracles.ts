import { task } from 'hardhat/config';
import { deployAaveOracle, deployLendingRateOracle } from '../../helpers/contracts-deployments';
import {
  setInitialAssetPricesInOracle,
  deployAllMockAggregators,
  setInitialMarketRatesInRatesOracleByHelper,
} from '../../helpers/oracles-helpers';
import { ICommonConfiguration, iAssetBase, TokenContractId } from '../../helpers/types';
import { waitForTx } from '../../helpers/misc-utils';
import { getAllTokenAddresses } from '../../helpers/mock-helpers';
import { ConfigNames, loadPoolConfig, getQuoteCurrency } from '../../helpers/configuration';
import {
  getMockedTokens,
  getLendingPoolAddressesProvider,
  getPairsTokenAggregator,
  getPriceOracle,
} from '../../helpers/contracts-getters';

task('local-dev:deploy-oracles', 'Deploy oracles for dev environment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .setAction(async ({ verify, pool }, DRE) => {
    await DRE.run('set-DRE');
    const poolConfig = loadPoolConfig(pool);
    const {
      Mocks: { AllAssetsInitialPrices },
      ProtocolGlobalParams: { UsdAddress, MockUsdPriceInWei },
      LendingRateOracleRatesCommon,
      OracleQuoteCurrency,
      OracleQuoteUnit,
    } = poolConfig as ICommonConfiguration;

    const defaultTokenList: { [key: string]: string } = {
      ...Object.fromEntries(Object.keys(TokenContractId).map((symbol) => [symbol, ''])),
      USD: UsdAddress,
    };
    const mockTokens = await getMockedTokens(poolConfig);
    const mockTokensAddress = Object.keys(mockTokens).reduce<{ [key: string]: string }>(
      (prev, curr) => {
        prev[curr] = mockTokens[curr].address;
        return prev;
      },
      defaultTokenList
    );
    const filteredMockTokensAddress = Object.fromEntries(
      Object.entries(mockTokensAddress).filter(([key, value]) => value !== '')
    );
    const filteredInitialPrices = Object.fromEntries(
      Object.entries(AllAssetsInitialPrices).filter(([key]) =>
        filteredMockTokensAddress.hasOwnProperty(key)
      )
    );
    const addressesProvider = await getLendingPoolAddressesProvider();
    const admin = await addressesProvider.getPoolAdmin();
    console.log('🚀 ~ file: 4_oracles.ts:57 ~ .setAction ~ admin:', admin);

    const fallbackOracle = await getPriceOracle('0x0F9d5ED72f6691E47abe2f79B890C3C33e924092');
    await waitForTx(await fallbackOracle.setEthUsdPrice(MockUsdPriceInWei));
    await setInitialAssetPricesInOracle(
      filteredInitialPrices,
      filteredMockTokensAddress,
      fallbackOracle
    );

    const mockAggregators = await deployAllMockAggregators(filteredInitialPrices, verify);
    console.log('🚀 ~ file: 4_oracles.ts:65 ~ .setAction ~ mockAggregators:', mockAggregators);

    const allTokenAddresses = getAllTokenAddresses(mockTokens);

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
    console.log(
      '🚀 ~ file: 4_oracles.ts:93 ~ .setAction ~ allReservesAddresses:',
      allReservesAddresses
    );

    // Register the proxy price provider on the addressesProvider
    await waitForTx(await addressesProvider.setPriceOracle(aaveOracle.address));
    await waitForTx(await addressesProvider.setLendingRateOracle(lendingRateOracle.address));
    console.log('Oracles Done!');
  });
