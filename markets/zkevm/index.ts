import { eZKevmNetwork, IZKevmConfiguration } from '../../helpers/types';

import { CommonsConfig } from './commons';
import {
  strategyWETH,
  strategyUSDC,
  strategyWBTC,
} from './reservesConfigs';

// ----------------
// POOL--SPECIFIC PARAMS
// ----------------

export const ZKevmConfig: IZKevmConfiguration = {
  ...CommonsConfig,
  MarketId: 'zk EVM market',
  ProviderId: 4,
  ReservesConfig: {
    WETH: strategyWETH,
    USDC: strategyUSDC,
    WBTC: strategyWBTC,
  },
  ReserveAssets: {
    [eZKevmNetwork.zkmainnet]: {
      WETH: '0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9', // WETH OFFICIAL
      USDC: '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035', // 
      WBTC: '0xEA034fb02eB1808C2cc3adbC15f447B93CbE08e1',
    },
    [eZKevmNetwork.zktestnet]: {
      WETH: '0x8e7E10956eBfb7C8F41cb4E96A02574b4DC7f1Cb', // MintableERC20 token
      USDC: '0xEc36899D4Cd6f72ba610aF6AC3B60ed1e954124a', // MintableERC20 token
      WBTC: '0xCCEF0Dd1f507A6bA5FD98841C835B582DE2D3084', // MintableERC20 token
    },
  },
};

export default ZKevmConfig;
 