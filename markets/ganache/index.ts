import { eGanacheNetwork, IGanacheConfiguration } from '../../helpers/types';

import { CommonsConfig } from './commons';
import {
  strategyWETH,
  strategyUSDC,
  strategyWBTC,
} from './reservesConfigs';

// ----------------
// POOL--SPECIFIC PARAMS
// ----------------

export const GanacheConfig: IGanacheConfiguration = {
  ...CommonsConfig,
  MarketId: 'zk EVM market',
  ProviderId: 4,
  ReservesConfig: {
    WETH: strategyWETH,
    USDC: strategyUSDC,
    WBTC: strategyWBTC,
  },
  ReserveAssets: {
    [eGanacheNetwork.ganache]: {
      WETH: '0x15B102f854529845F56A97E84C3457155144F7a9',
      USDC: '0xa28ac5DcCE6A998D0118885A1820C6279B074dD4',
      WBTC: '0xb360DCe732BAF17d75040d298346444832a627D6',
    },
  },
};

export default GanacheConfig;
 