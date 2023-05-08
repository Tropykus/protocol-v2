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
      WETH: '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab',
      USDC: '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
      WBTC: '0x50b7545627a5162f82a992c33b87adc75187b218',
    },
    [eZKevmNetwork.zktestnet]: {
      WETH: '0x9660310567bfE9c7555E5FBdbB8DD30518983C08', // MintableERC20 token
      USDC: '0xEc36899D4Cd6f72ba610aF6AC3B60ed1e954124a', // MintableERC20 token
      WBTC: '0xCCEF0Dd1f507A6bA5FD98841C835B582DE2D3084', // MintableERC20 token
    },
  },
};

export default ZKevmConfig;
 