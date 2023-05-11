import { task } from 'hardhat/config';
import { checkVerification } from '../../helpers/etherscan-verification';
import { ConfigNames } from '../../helpers/configuration';
import { printContracts } from '../../helpers/misc-utils';

task('local:dev', 'Deploy development enviroment')
  .addParam('pool', `Market pool configuration, one of ${Object.keys(ConfigNames)}`)
  .addFlag('verify', 'Verify contracts at Etherscan')
  .setAction(async ({ verify, pool }, DRE) => {
    // const POOL_NAME = ConfigNames.ZKevm;
    const POOL_NAME = pool;
    console.log('🚀 ~ file: local.dev.ts:12 ~ .setAction ~ POOL_NAME:', POOL_NAME);

    await DRE.run('set-DRE');

    // Prevent loss of gas verifying all the needed ENVs for Etherscan verification
    if (verify) {
      checkVerification();
    }

    console.log('Migration started\n');

    console.log('0. Deploy mock weth');
    await DRE.run('local-dev:deploy-weth-token', { verify, pool: POOL_NAME });

    console.log('1. Deploy mock tokens');
    await DRE.run('local-dev:deploy-mock-tokens', { verify, pool: POOL_NAME });

    console.log('2. Deploy address provider');
    await DRE.run('local-dev:deploy-address-provider', { verify });

    console.log('3. Deploy lending pool');
    await DRE.run('local-dev:deploy-lending-pool', { verify, pool: POOL_NAME });

    console.log('4. Deploy oracles');
    await DRE.run('local-dev:deploy-oracles', { verify, pool: POOL_NAME });

    console.log('5. Deploy WETH Gateway');
    await DRE.run('local-dev-deploy-weth-gateway', { verify, pool: POOL_NAME });

    console.log('6. Initialize lending pool');
    await DRE.run('local-dev:initialize-lending-pool', { verify, pool: POOL_NAME });

    console.log('\nFinished migration');
    printContracts();
  });
