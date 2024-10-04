import { task } from 'hardhat/config';
import { deployWalletBalancerProvider } from '../../helpers/contracts-deployments';

import { getLendingPoolAddressesProvider } from '../../helpers/contracts-getters';

task('local-dev:wallet-balance-provider', 'Initialize lending pool configuration.')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .setAction(async ({ verify }, DRE) => {
    await DRE.run('set-DRE');

    await deployWalletBalancerProvider(verify);
  });
