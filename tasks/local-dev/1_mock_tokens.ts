import { task } from 'hardhat/config';
import { deployMockTokens, deployWETHMocked } from '../../helpers/contracts-deployments';
import { ConfigNames, loadPoolConfig } from '../../helpers/configuration';

// Deploy zkEVM tokens
task('local-dev:deploy-mock-tokens', 'Deploy mock tokens for dev enviroment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .setAction(async ({ verify, pool }, DRE) => {
    await DRE.run('set-DRE');
    const poolConfig = loadPoolConfig(pool);
    console.log('Deploying mock tokens');
    await deployMockTokens(poolConfig, verify);
    // await deployWETHMocked(verify);
  });
