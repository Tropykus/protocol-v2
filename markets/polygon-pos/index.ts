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
      COPM: '0x12050c705152931cFEe3DD56c52Fb09Dea816C23', // WETH OFFICIAL
      USDC: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', // 
      // BRZ: '0xEA034fb02eB1808C2cc3adbC15f447B93CbE08e1',
      WUSDM: '0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812'
    },
    [ePolygonPosNetwork.testnet]: {
      COPM: '0x7F895B936534D7827FE6883f70B7A5eBb237529c', // MintableERC20 token
      USDC: '0x71752e79114F6891e79d2acAB4B2C408E07Ca933', // MintableERC20 token
      BRZ: '0x49e9285be033836951199DA2C48d5E8C00B6FA74', // MintableERC20 token
      WUSDM: '0x2ADe1b316b646229D9D841452e22a7F17FECE798'
    },
  },
};

export default PolygonPosConfig;
 