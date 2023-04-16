import { task } from 'hardhat/config';
import { getParamPerNetwork } from '../../helpers/contracts-helpers';
import {
  deployLendingPoolCollateralManager,
  deployWalletBalancerProvider,
  authorizeWETHGateway,
  deployUiPoolDataProviderV2,
} from '../../helpers/contracts-deployments';
import { loadPoolConfig, ConfigNames, getTreasuryAddress } from '../../helpers/configuration';
import { getWETHGateway } from '../../helpers/contracts-getters';
import { eNetwork, ICommonConfiguration } from '../../helpers/types';
import { notFalsyOrZeroAddress, waitForTx } from '../../helpers/misc-utils';
import { initReservesByHelper, configureReservesByHelper } from '../../helpers/init-helpers';
import { exit } from 'process';
import {
  getAaveProtocolDataProvider,
  getLendingPoolAddressesProvider,
} from '../../helpers/contracts-getters';
import { chainlinkAggregatorProxy, chainlinkEthUsdAggregatorProxy } from '../../helpers/constants';
import { Console } from 'console';

task('full:initialize-lending-pool', 'Initialize lending pool configuration.')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .setAction(async ({ verify, pool }, localBRE) => {
    try {
      await localBRE.run('set-DRE');
      const network = <eNetwork>localBRE.network.name;
      const poolConfig = loadPoolConfig(pool);
      const {
        ATokenNamePrefix,
        StableDebtTokenNamePrefix,
        VariableDebtTokenNamePrefix,
        SymbolPrefix,
        ReserveAssets,
        ReservesConfig,
        LendingPoolCollateralManager,
        WethGateway,
        IncentivesController,
      } = poolConfig as ICommonConfiguration;

      const reserveAssets = await getParamPerNetwork(ReserveAssets, network);
      console.log('🚀 ~ file: 6-initialize.ts:43 ~ .setAction ~ reserveAssets:', reserveAssets);
      //TODO: deploy incentive controller
      const incentivesController = await getParamPerNetwork(IncentivesController, network);
      const addressesProvider = await getLendingPoolAddressesProvider();

      const testHelpers = await getAaveProtocolDataProvider();

      const admin = await addressesProvider.getPoolAdmin();
      const oracle = await addressesProvider.getPriceOracle();
      console.log('🚀 ~ file: 6-initialize.ts:50 ~ .setAction ~ oracle:', oracle);

      if (!reserveAssets) {
        throw 'Reserve assets is undefined. Check ReserveAssets configuration at config directory';
      }

      const treasuryAddress = await getTreasuryAddress(poolConfig);
      console.log('🚀 ~ file: 6-initialize.ts:56 ~ .setAction ~ treasuryAddress:', treasuryAddress);

      await initReservesByHelper(
        ReservesConfig,
        reserveAssets,
        ATokenNamePrefix,
        StableDebtTokenNamePrefix,
        VariableDebtTokenNamePrefix,
        SymbolPrefix,
        admin,
        treasuryAddress,
        incentivesController,
        pool,
        verify
      );
      await configureReservesByHelper(ReservesConfig, reserveAssets, testHelpers, admin);

      console.log('Reserves configured');

      let collateralManagerAddress = await getParamPerNetwork(
        LendingPoolCollateralManager,
        network
      );
      if (!notFalsyOrZeroAddress(collateralManagerAddress)) {
        const collateralManager = await deployLendingPoolCollateralManager(verify);
        collateralManagerAddress = collateralManager.address;
      }
      // Seems unnecessary to register the collateral manager in the JSON db

      console.log(
        '\tSetting lending pool collateral manager implementation with address',
        collateralManagerAddress
      );
      await waitForTx(
        await addressesProvider.setLendingPoolCollateralManager(collateralManagerAddress)
      );

      console.log(
        '\tSetting AaveProtocolDataProvider at AddressesProvider at id: 0x01',
        collateralManagerAddress
      );
      const aaveProtocolDataProvider = await getAaveProtocolDataProvider();
      await waitForTx(
        await addressesProvider.setAddress(
          '0x0100000000000000000000000000000000000000000000000000000000000000',
          aaveProtocolDataProvider.address
        )
      );

      console.log('Data provider configuration done! Deploying walletbalance provider');

      await deployWalletBalancerProvider(verify);

      console.log('Wallet provider deployed');

      const lendingPoolAddress = await addressesProvider.getLendingPool();
      console.log(
        '🚀 ~ file: 6-initialize.ts:114 ~ .setAction ~ lendingPoolAddress:',
        lendingPoolAddress
      );

      let gateWay = getParamPerNetwork(WethGateway, network);
      console.log('🚀 ~ file: 6-initialize.ts:117 ~ .setAction ~ gateWay:', gateWay);
      if (!notFalsyOrZeroAddress(gateWay)) {
        gateWay = (await getWETHGateway()).address;
        console.log('🚀 ~ file: 6-initialize.ts:121 ~ .setAction ~ gateWay:', gateWay);
      }
      await authorizeWETHGateway(gateWay, lendingPoolAddress);
    } catch (err) {
      console.error(err);
      exit(1);
    }
    console.log(
      '🚀 ~ file: 6-initialize.ts:117 ~ .setAction ~ configureReservesByHelper:',
      configureReservesByHelper
    );
  });
