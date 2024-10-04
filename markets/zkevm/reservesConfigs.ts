import { eContractid, IReserveParams } from '../../helpers/types';

import { rateStrategyStableOne, rateStrategyVolatileOne } from './rateStrategies';

export const strategyWETH: IReserveParams = {
  strategy: rateStrategyVolatileOne,
  baseLTVAsCollateral: '8000',
  liquidationThreshold: '8250',
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: '18',
  aTokenImpl: eContractid.AToken,
  reserveFactor: '1000',
};

export const strategyWBTC: IReserveParams = {
  strategy: rateStrategyVolatileOne,
  baseLTVAsCollateral: '6000',
  liquidationThreshold: '7500',
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: '8',
  aTokenImpl: eContractid.AToken,
  reserveFactor: '1000',
};

export const strategyUSDC: IReserveParams = {
  strategy: rateStrategyStableOne,
  baseLTVAsCollateral: '8000',
  liquidationThreshold: '9000',
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowRateEnabled: true,
  reserveDecimals: '6',
  aTokenImpl: eContractid.AToken,
  reserveFactor: '1400',
};
