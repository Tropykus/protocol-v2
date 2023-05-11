import { task } from 'hardhat/config';
import { deployWETHMockedAsWETH } from '../../helpers/contracts-deployments';
import { ConfigNames, loadPoolConfig } from '../../helpers/configuration';

// Deploy zkEVM tokens
task('local-dev:deploy-weth-token', 'Deploy mock tokens for dev enviroment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .setAction(async ({ verify }, DRE) => {
    await DRE.run('set-DRE');
    await deployWETHMockedAsWETH(verify);
  });
