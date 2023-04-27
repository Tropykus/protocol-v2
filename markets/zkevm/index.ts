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
      WETH: '0xe3d4bc4DB2C69110639C21e1F47ED19e05Bc90CB', // MintableERC20 token
      USDC: '0x0d6B0349c51821CD576CbCd15DeF630292fA6864', // MintableERC20 token
      WBTC: '0x55C6299604Da519788CFe1A191313fb3dDec0b48', // MintableERC20 token
    },
  },
};

export default ZKevmConfig;
 