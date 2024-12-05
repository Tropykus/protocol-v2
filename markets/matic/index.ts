import { IMaticConfiguration, ePolygonNetwork } from '../../helpers/types';

import { CommonsConfig } from './commons';
import {
  strategyCOPM,
  strategyUSDC,
  strategyBRZ,
  strategyWETH,
  strategyMATIC,
} from './reservesConfigs';

// ----------------
// POOL--SPECIFIC PARAMS
// ----------------

export const MaticConfig: IMaticConfiguration = {
  ...CommonsConfig,
  MarketId: 'Matic Market',
  ProviderId: 1,
  ReservesConfig: {
    COPM: strategyCOPM,
    USDC: strategyUSDC,
    BRZ: strategyBRZ,
    WETH: strategyWETH,
    WMATIC: strategyMATIC,
  },
  ReserveAssets: {
    [ePolygonNetwork.matic]: {
      COPM: '0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F',
      USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      BRZ: '0xBD21A10F619BE90d6066c941b04e340841F1F989',
      WETH: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      WMATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    },
    [ePolygonNetwork.mumbai]: {
      // Mock tokens with a simple "mint" external function, except wmatic
      COPM: '0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F',
      USDC: '0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e',
      BRZ: '0xBD21A10F619BE90d6066c941b04e340841F1F989',
      WETH: '0x3C68CE8504087f89c640D02d133646d98e64ddd9',
      WMATIC: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    },
  },
};

export default MaticConfig;
