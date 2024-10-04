import { task } from 'hardhat/config';
import { deployLendingPoolAddressesProvider } from '../../helpers/contracts-deployments';
import { notFalsyOrZeroAddress, waitForTx } from '../../helpers/misc-utils';
import {
  ConfigNames,
  loadPoolConfig,
  getGenesisPoolAdmin,
  getEmergencyAdmin,
} from '../../helpers/configuration';
import { getParamPerNetwork } from '../../helpers/contracts-helpers';
import { eNetwork } from '../../helpers/types';

task(
  'full:deploy-address-provider',
  'Deploy address provider, registry and fee provider for dev enviroment'
)
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .addFlag('skipRegistry')
  .setAction(async ({ verify, pool, skipRegistry }, DRE) => {
    await DRE.run('set-DRE');
    const poolConfig = loadPoolConfig(pool);
    const { MarketId } = poolConfig;
    console.log('🚀 ~ file: 1_address_provider.ts:24 ~ .setAction ~ MarketId:', MarketId);

    // 1. Deploy address provider and set genesis manager
    const addressesProvider = await deployLendingPoolAddressesProvider(MarketId, verify);

    // 2. Add to registry or setup a new one
    if (!skipRegistry) {
      console.log('Skipping registry');
      const providerRegistryAddress = getParamPerNetwork(
        poolConfig.ProviderRegistry,
        <eNetwork>DRE.network.name
      );

      console.log('Adding market registry');

      await DRE.run('add-market-to-registry', {
        pool,
        addressesProvider: addressesProvider.address,
        deployRegistry: !notFalsyOrZeroAddress(providerRegistryAddress),
      });
    }
    // 3. Set pool admins
    console.log('Setting pool admin');
    console.log(
      '🚀 ~ file: 1_address_provider.ts:55 ~ .setAction ~ DRE.network.name:',
      DRE.network.name
    );

    await waitForTx(await addressesProvider.setPoolAdmin(await getGenesisPoolAdmin(poolConfig)));
    await waitForTx(await addressesProvider.setEmergencyAdmin(await getEmergencyAdmin(poolConfig)));

    console.log('Pool Admin', await addressesProvider.getPoolAdmin());
    console.log('Emergency Admin', await addressesProvider.getEmergencyAdmin());
  });
