import { task } from 'hardhat/config';
import {
  deployLendingPoolCollateralManager,
  deployMockFlashLoanReceiver,
  deployWalletBalancerProvider,
  deployAaveProtocolDataProvider,
  authorizeWETHGateway,
} from '../../helpers/contracts-deployments';
import { getParamPerNetwork } from '../../helpers/contracts-helpers';
import { eNetwork } from '../../helpers/types';
import {
  ConfigNames,
  getReservesConfigByPool,
  getTreasuryAddress,
  loadPoolConfig,
} from '../../helpers/configuration';

import { tEthereumAddress, AavePools, eContractid } from '../../helpers/types';
import { waitForTx, filterMapBy, notFalsyOrZeroAddress } from '../../helpers/misc-utils';
import { configureReservesByHelper, initReservesByHelper } from '../../helpers/init-helpers';
import { getAllTokenAddresses } from '../../helpers/mock-helpers';
import { ZERO_ADDRESS } from '../../helpers/constants';
import {
  getAllMockedTokens,
  getLendingPoolAddressesProvider,
  getLendingPoolConfiguratorProxy,
  getMockedTokens,
  getWETHGateway,
} from '../../helpers/contracts-getters';
import { insertContractAddressInDb } from '../../helpers/contracts-helpers';

task('local-dev:initialize-lending-pool', 'Initialize lending pool configuration.')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .setAction(async ({ verify, pool }, DRE) => {
    await DRE.run('set-DRE');
    const network = <eNetwork>DRE.network.name;
    const poolConfig = loadPoolConfig(pool);
    const {
      ATokenNamePrefix,
      StableDebtTokenNamePrefix,
      VariableDebtTokenNamePrefix,
      SymbolPrefix,
      WethGateway,
      ReservesConfig,
    } = poolConfig;
    console.log('🚀 ~ file: 5_initialize.ts:46 ~ .setAction ~ poolConfig:', poolConfig);
    const mockTokens = await getMockedTokens(poolConfig);
    const allTokenAddresses = getAllTokenAddresses(mockTokens);

    const addressesProvider = await getLendingPoolAddressesProvider();

    const protoPoolReservesAddresses = <{ [symbol: string]: tEthereumAddress }>(
      filterMapBy(allTokenAddresses, (key: string) => !key.includes('UNI_'))
    );

    const testHelpers = await deployAaveProtocolDataProvider(addressesProvider.address, verify);
    await insertContractAddressInDb(eContractid.AaveProtocolDataProvider, testHelpers.address);

    const admin = await addressesProvider.getPoolAdmin();

    const treasuryAddress = await getTreasuryAddress(poolConfig);

    await initReservesByHelper(
      ReservesConfig,
      protoPoolReservesAddresses,
      ATokenNamePrefix,
      StableDebtTokenNamePrefix,
      VariableDebtTokenNamePrefix,
      SymbolPrefix,
      admin,
      treasuryAddress,
      ZERO_ADDRESS,
      pool,
      verify
    );
    await configureReservesByHelper(ReservesConfig, protoPoolReservesAddresses, testHelpers, admin);

    const collateralManager = await deployLendingPoolCollateralManager(verify);
    await waitForTx(
      await addressesProvider.setLendingPoolCollateralManager(collateralManager.address)
    );

    const mockFlashLoanReceiver = await deployMockFlashLoanReceiver(
      addressesProvider.address,
      verify
    );
    await insertContractAddressInDb(
      eContractid.MockFlashLoanReceiver,
      mockFlashLoanReceiver.address
    );

    await deployWalletBalancerProvider(verify);

    const lendingPoolAddress = await addressesProvider.getLendingPool();

    let gateway = getParamPerNetwork(WethGateway, network);
    if (!notFalsyOrZeroAddress(gateway)) {
      gateway = (await getWETHGateway()).address;
    }
    await authorizeWETHGateway(gateway, lendingPoolAddress);

    const poolConfigurator = await getLendingPoolConfiguratorProxy();
    await waitForTx(await poolConfigurator.setPoolPause(false));
  });
