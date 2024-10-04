import { formatEther } from 'ethers/lib/utils';
import { task } from 'hardhat/config';
import { ConfigNames, loadPoolConfig } from '../../helpers/configuration';
import {
  deployLendingPoolAddressesProviderRegistry,
  deployLendingPoolAddressesProvider,
} from '../../helpers/contracts-deployments';
import { getFirstSigner } from '../../helpers/contracts-getters';
import { getParamPerNetwork } from '../../helpers/contracts-helpers';
import { notFalsyOrZeroAddress } from '../../helpers/misc-utils';
import { eNetwork } from '../../helpers/types';
import { waitForTx } from '../../helpers/misc-utils';

task('full:deploy-address-provider-registry', 'Deploy address provider registry')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .setAction(async ({ verify, pool }, DRE) => {
    console.log('prior dre');
    await DRE.run('set-DRE');
    const poolConfig = loadPoolConfig(pool);
    const network = <eNetwork>DRE.network.name;
    console.log('🚀 ~ file: 0_address_provider_registry.ts:20 ~ .setAction ~ network:', network);

    const signer = await getFirstSigner();
    console.log('Deployer:', await signer.getAddress(), formatEther(await signer.getBalance()));

    const admin = await signer.getAddress();
    const { MarketId } = poolConfig;

    const addressesProvider = await deployLendingPoolAddressesProvider(MarketId, verify);
    await waitForTx(await addressesProvider.setPoolAdmin(admin));
    await waitForTx(await addressesProvider.setEmergencyAdmin(admin));

    const providerRegistryAddress = getParamPerNetwork(poolConfig.ProviderRegistry, network);
    console.log(
      '🚀 ~ file: 0_address_provider_registry.ts:32 ~ .setAction ~ providerRegistryAddress:',
      providerRegistryAddress
    );

    console.log('Signer', await signer.getAddress());
    console.log('Balance', formatEther(await signer.getBalance()));

    if (notFalsyOrZeroAddress(providerRegistryAddress)) {
      console.log('Already deployed Provider Registry Address at', providerRegistryAddress);
    } else {
      const contract = await deployLendingPoolAddressesProviderRegistry(verify);
      console.log('Deployed Registry Address:', contract.address);
    }
  });
