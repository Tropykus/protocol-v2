import { ePolygonPosNetwork, IPolygonPosConfiguration } from '../../helpers/types';

import { CommonsConfig } from './commons';
import {
  strategyCOPM,
  strategyUSDC,
  strategyBRZ,
  strategyWUSDM
} from './reservesConfigs';

// ----------------
// POOL--SPECIFIC PARAMS
// ----------------

export const PolygonPosConfig: IPolygonPosConfiguration = {
  ...CommonsConfig,
  MarketId: 'Polygon market',
  ProviderId: 4,
  ReservesConfig: {
    USDC: strategyUSDC,
    COPM: strategyCOPM,
    BRZ: strategyBRZ,
    WUSDM: strategyWUSDM,
  },
  ReserveAssets: {
    [ePolygonPosNetwork.mainnet]: {
      COPM: '0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9', // WETH OFFICIAL
      USDC: '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035', // 
      BRZ: '0xEA034fb02eB1808C2cc3adbC15f447B93CbE08e1',
      WUSDM: ''
    },
    [ePolygonPosNetwork.testnet]: {
      COPM: '0x9e399D1229A33D8cDD38D668fFd8688906d2D9cd', // MintableERC20 token
      USDC: '0xF649d59A350D96bEEEe61588742896C89d693854', // MintableERC20 token
      BRZ: '0x8Ac76188Bd0cd940448C2b201434d611ffdf24eE', // MintableERC20 token
      WUSDM: '0xD4A65bA374BB9e0ffde3DA703101a92bE2e7031F'
    },
  },
};

export default PolygonPosConfig;
 