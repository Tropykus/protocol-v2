import { task } from 'hardhat/config';
import { eEthereumNetwork } from '../../helpers/types';
import { getTreasuryAddress } from '../../helpers/configuration';
import * as marketConfigs from '../../markets/zkevm';
import * as reserveConfigs from '../../markets/zkevm/reservesConfigs';
import { getLendingPoolAddressesProvider } from '../../helpers/contracts-getters';
import {
  chooseATokenDeployment,
  deployDefaultReserveInterestRateStrategy,
  deployStableDebtToken,
  deployVariableDebtToken,
} from '../../helpers/contracts-deployments';
import { setDRE } from '../../helpers/misc-utils';
import { ZERO_ADDRESS } from '../../helpers/constants';

const isSymbolValid = (symbol: string, network: eEthereumNetwork) =>
  Object.keys(reserveConfigs).includes('strategy' + symbol) &&
  marketConfigs.TropykusConfig.ReserveAssets[network][symbol] &&
  marketConfigs.TropykusConfig.ReservesConfig[symbol] === reserveConfigs['strategy' + symbol];

task('external:deploy-new-asset-test', 'Deploy A token, Debt Tokens, Risk Parameters')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addParam('symbol', `Token Symbol`)
  .setAction(async ({ verify, symbol }, localBRE) => {
    const network = localBRE.network.name;
    console.log('🚀 ~ file: deploy-new-asset-test.ts ~ line 26 ~ .setAction ~ network', network);
    console.log(`The symbol is ${symbol}`);
    //TODO: Validate Symbol
    //     if (!isSymbolValid(symbol, network as eEthereumNetwork)) {
    //       throw new Error(
    //         `
    // WRONG RESERVE ASSET SETUP:
    //         The symbol ${symbol} has no reserve Config and/or reserve Asset setup.
    //         update /markets/aave/index.ts and add the asset address for ${network} network
    //         update /markets/aave/reservesConfigs.ts and add parameters for ${symbol}
    //         `
    //       );
    //     }
    setDRE(localBRE);
    const strategyParams = reserveConfigs['strategy' + symbol];
    const reserveAssetAddress = '0x53369fd4680FfE3DfF39Fc6DDa9CfbfD43daeA2E';
    // const reserveAssetAddress =
    //   marketConfigs.TropykusConfig.ReserveAssets[localBRE.network.name][symbol];
    console.log(
      '🚀 ~ file: deploy-new-asset-test.ts ~ line 42 ~ .setAction ~ reserveAssetAddress',
      reserveAssetAddress
    );

    const deployCustomAToken = chooseATokenDeployment(strategyParams.aTokenImpl);
    const addressProvider = await getLendingPoolAddressesProvider();
    console.log(
      '🚀 ~ file: deploy-new-asset-test.ts ~ line 43 ~ .setAction ~ addressProvider',
      addressProvider.address
    );

    const poolAddress = await addressProvider.getLendingPool();
    console.log(
      '🚀 ~ file: deploy-new-asset-test.ts ~ line 48 ~ .setAction ~ poolAddress',
      poolAddress
    );
    const aToken = await deployCustomAToken(verify);
    console.log('🚀 ~ file: deploy-new-asset-test.ts ~ line 50 ~ .setAction ~ aToken', aToken);
    console.log(
      '🚀 ~ file: deploy-new-asset-test.ts ~ line 50 ~ .setAction ~ ZERO_ADDRESS',
      ZERO_ADDRESS
    );

    console.log('🚀 Deploying Stable Debt Token');
    const stableDebt = await deployStableDebtToken(
      [
        poolAddress,
        reserveAssetAddress,
        ZERO_ADDRESS, // Incentives Controller
        `Aave stable debt bearing ${symbol}`,
        `stableDebt${symbol}`,
      ],
      verify
    );
    console.log('🚀 Deploying Variable Debt Token');

    const variableDebt = await deployVariableDebtToken(
      [
        poolAddress,
        reserveAssetAddress,
        ZERO_ADDRESS, // Incentives Controller
        `Aave variable debt bearing ${symbol}`,
        `variableDebt${symbol}`,
      ],
      verify
    );
    const rates = await deployDefaultReserveInterestRateStrategy(
      [
        addressProvider.address,
        strategyParams.strategy.optimalUtilizationRate,
        strategyParams.strategy.baseVariableBorrowRate,
        strategyParams.strategy.variableRateSlope1,
        strategyParams.strategy.variableRateSlope2,
        strategyParams.strategy.stableRateSlope1,
        strategyParams.strategy.stableRateSlope2,
      ],
      verify
    );
    console.log(`
    New interest bearing asset deployed on ${network}:
    Interest bearing a${symbol} address: ${aToken.address}
    Variable Debt variableDebt${symbol} address: ${variableDebt.address}
    Stable Debt stableDebt${symbol} address: ${stableDebt.address}
    Strategy Implementation for ${symbol} address: ${rates.address}
    `);
  });
