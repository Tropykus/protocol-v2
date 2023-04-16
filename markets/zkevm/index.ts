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
      WETH: '0xef38BD737fe12a3bC51fa82CC9c7B1B1001aD590', // MintableERC20 token
      USDC: '0xD69c1C86ed862Fc5545C4787F2Aa3486f7Ec6955', // MintableERC20 token
      WBTC: '0xC14d648730e6e9AF926cfc68ad4807Eae126Fd12', // MintableERC20 token
    },
  },
};

export default ZKevmConfig;
 