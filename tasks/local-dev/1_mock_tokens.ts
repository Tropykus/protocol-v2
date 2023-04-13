import { task } from 'hardhat/config';
import { deployMockTokens } from '../../helpers/contracts-deployments';
import { ConfigNames, loadPoolConfig } from '../../helpers/configuration';

// Deploy zkEVM tokens
task('local-dev:deploy-mock-tokens', 'Deploy mock tokens for dev enviroment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .setAction(async ({ verify }, DRE) => {
    await DRE.run('set-DRE');
    console.log('Deploying mock tokens');
    await deployMockTokens(loadPoolConfig(ConfigNames.ZKevm), verify);
  });
