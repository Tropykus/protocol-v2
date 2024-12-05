import { eContractid, IReserveParams } from '../../helpers/types';

import { rateStrategyStableOne, rateStrategyCOPM } from './rateStrategies';

export const strategyUSDC: IReserveParams = {
  strategy: rateStrategyStableOne,
  baseLTVAsCollateral: '8000',
  liquidationThreshold: '9000',
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: '6',
  aTokenImpl: eContractid.AToken,
  reserveFactor: '1400',
};

export const strategyWUSDM: IReserveParams = {
  strategy: rateStrategyStableOne,
  baseLTVAsCollateral: '8000',
  liquidationThreshold: '9000',
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: '18',
  aTokenImpl: eContractid.AToken,
  reserveFactor: '1400',
};

export const strategyCOPM: IReserveParams = {
  strategy: rateStrategyCOPM,
  baseLTVAsCollateral: '0000',
  liquidationThreshold: '9000',
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: '18',
  aTokenImpl: eContractid.AToken,
  reserveFactor: '1400',
};

export const strategyBRZ: IReserveParams = {
  strategy: rateStrategyStableOne,
  baseLTVAsCollateral: '8000',
  liquidationThreshold: '9000',
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: '18',
  aTokenImpl: eContractid.AToken,
  reserveFactor: '1400',
};
