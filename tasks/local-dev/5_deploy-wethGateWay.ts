import { task } from 'hardhat/config';
import {
  loadPoolConfig,
  ConfigNames,
  getWrappedNativeTokenAddress,
} from '../../helpers/configuration';
import { TokenContractId } from '../../helpers/types';
import { getMockedTokens } from '../../helpers/contracts-getters';

import { deployWETHGateway } from '../../helpers/contracts-deployments';

const CONTRACT_NAME = 'WETHGateway';

task(`local-dev-deploy-weth-gateway`, `Deploys the ${CONTRACT_NAME} contract`)
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .addFlag('verify', `Verify ${CONTRACT_NAME} contract via Etherscan API.`)
  .setAction(async ({ verify, pool }, localBRE) => {
    await localBRE.run('set-DRE');
    const poolConfig = loadPoolConfig(pool);
    // const Weth = await getWrappedNativeTokenAddress(poolConfig);

    const defaultTokenList: { [key: string]: string } = {
      ...Object.fromEntries(Object.keys(TokenContractId).map((symbol) => [symbol, ''])),
      USD: '',
    };
    const mockTokens = await getMockedTokens(poolConfig);
    const mockTokensAddress = Object.keys(mockTokens).reduce<{ [key: string]: string }>(
      (prev, curr) => {
        prev[curr] = mockTokens[curr].address;
        return prev;
      },
      defaultTokenList
    );
    const filteredMockTokensAddress = Object.fromEntries(
      Object.entries(mockTokensAddress).filter(([key, value]) => key === 'WETH')
    );
    const Weth = filteredMockTokensAddress.WETH;

    if (!localBRE.network.config.chainId) {
      throw new Error('INVALID_CHAIN_ID');
    }
    const wethGateWay = await deployWETHGateway([Weth], verify);
    console.log(`${CONTRACT_NAME}.address`, wethGateWay.address);
    console.log(`\tFinished ${CONTRACT_NAME} deployment`);
  });
