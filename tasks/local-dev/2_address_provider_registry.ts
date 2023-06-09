import { task } from 'hardhat/config';
import {
  deployLendingPoolAddressesProvider,
  deployLendingPoolAddressesProviderRegistry,
} from '../../helpers/contracts-deployments';
import { getEthersSigners } from '../../helpers/contracts-helpers';
import { waitForTx } from '../../helpers/misc-utils';
import { ZKevmConfig } from '../../markets/zkevm';

task(
  'local-dev:deploy-address-provider',
  'Deploy address provider, registry and fee provider for dev enviroment'
)
  .addFlag('verify', 'Verify contracts at Etherscan')
  .setAction(async ({ verify }, DRE) => {
    await DRE.run('set-DRE');

    const admin = await (await getEthersSigners())[0].getAddress();

    const addressesProvider = await deployLendingPoolAddressesProvider(
      ZKevmConfig.MarketId,
      verify
    );
    await waitForTx(await addressesProvider.setPoolAdmin(admin));
    await waitForTx(await addressesProvider.setEmergencyAdmin(admin));

    const addressesProviderRegistry = await deployLendingPoolAddressesProviderRegistry(verify);
    await waitForTx(
      await addressesProviderRegistry.registerAddressesProvider(addressesProvider.address, 1)
    );
  });
