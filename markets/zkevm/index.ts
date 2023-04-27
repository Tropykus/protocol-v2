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
      // WBTC: '0x50b7545627a5162f82a992c33b87adc75187b218',
    },
    [eZKevmNetwork.zktestnet]: {
      WETH: '0xe3d4bc4DB2C69110639C21e1F47ED19e05Bc90CB', // MintableERC20 token
      USDC: '0x0d6B0349c51821CD576CbCd15DeF630292fA6864', // MintableERC20 token
      WBTC: '0x55C6299604Da519788CFe1A191313fb3dDec0b48', // MintableERC20 token
    },
  },
};

export default ZKevmConfig;
 