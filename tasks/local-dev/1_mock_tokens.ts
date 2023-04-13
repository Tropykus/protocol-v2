import { task } from 'hardhat/config';
import { deployAllMockTokens } from '../../helpers/contracts-deployments';

task('local-dev:deploy-mock-tokens', 'Deploy mock tokens for dev enviroment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .setAction(async ({ verify }, DRE) => {
    await DRE.run('set-DRE');
    await deployAllMockTokens(verify);
  });
