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
      WETH: '',
      USDC: '',
      WBTC: '',
    },
  },
};

export default GanacheConfig;
 