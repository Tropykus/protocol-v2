import BigNumber from 'bignumber.js';
import {
  oneEther,
  oneRay,
  RAY,
  ZERO_ADDRESS,
  MOCK_CHAINLINK_AGGREGATORS_PRICES_USD,
  oneUsd,
} from '../../helpers/constants';
import { ICommonConfiguration, eGanacheNetwork } from '../../helpers/types';

// ----------------
// PROTOCOL GLOBAL PARAMS
// ----------------

export const CommonsConfig: ICommonConfiguration = {
  MarketId: 'Commons',
  ATokenNamePrefix: 'Tropykus zk EVM Market',
  StableDebtTokenNamePrefix: 'Tropykus zk EVM Market stable debt',
  VariableDebtTokenNamePrefix: 'Tropykus zk EVM Market variable debt',
  SymbolPrefix: 'k',
  ProviderId: 0, // Overriden in index.ts
  OracleQuoteCurrency: 'USD',
  OracleQuoteUnit: oneUsd.toString(),
  ProtocolGlobalParams: {
    TokenDistributorPercentageBase: '10000',
    MockUsdPriceInWei: '5848466240000000',
    UsdAddress: '0x10F7Fc1F91Ba351f9C629c5947AD69bD03C05b96', // TODO: what is this?
    NilAddress: '0x0000000000000000000000000000000000000000',
    OneAddress: '0x0000000000000000000000000000000000000001',
    AaveReferral: '0',
  },

  // ----------------
  // COMMON PROTOCOL PARAMS ACROSS POOLS AND NETWORKS
  // ----------------

  Mocks: {
    AllAssetsInitialPrices: {
      ...MOCK_CHAINLINK_AGGREGATORS_PRICES_USD,
    },
  },
  // TODO: reorg alphabetically, checking the reason of tests failing
  LendingRateOracleRatesCommon: {
    WETH: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    USDC: {
      borrowRate: oneRay.multipliedBy(0.039).toFixed(),
    },
    WBTC: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
  },
  // ----------------
  // COMMON PROTOCOL ADDRESSES ACROSS POOLS
  // ----------------

  // If PoolAdmin/emergencyAdmin is set, will take priority over PoolAdminIndex/emergencyAdminIndex
  PoolAdmin: {
    [eGanacheNetwork.ganache]: '',
  },
  PoolAdminIndex: 0,
  EmergencyAdminIndex: 0,
  EmergencyAdmin: {
    [eGanacheNetwork.ganache]: '',
  },
  ProviderRegistry: {
    [eGanacheNetwork.ganache]: '',
  },
  ProviderRegistryOwner: {
    [eGanacheNetwork.ganache]: '',
  },
  LendingRateOracle: {
    [eGanacheNetwork.ganache]: '',
  },
  LendingPoolCollateralManager: {
    [eGanacheNetwork.ganache]: '',
  },
  LendingPoolConfigurator: {
    [eGanacheNetwork.ganache]: '',
  },
  LendingPool: {
    [eGanacheNetwork.ganache]: '',
  },
  WethGateway: {
    [eGanacheNetwork.ganache]: '',
  },
  TokenDistributor: {
    [eGanacheNetwork.ganache]: '',
  },
  AaveOracle: {
    [eGanacheNetwork.ganache]: '',
  },
  FallbackOracle: {
    [eGanacheNetwork.ganache]: ZERO_ADDRESS,
  },
  ChainlinkAggregator: {
    [eGanacheNetwork.ganache]: {
      WETH: '',
      USDC: '',
      WBTC: '',
    },
  },
  ReserveAssets: {
    [eGanacheNetwork.ganache]: {},
  },
  ReservesConfig: {},
  ATokenDomainSeparator: {
    [eGanacheNetwork.ganache]: '',
  },
  WETH: {
    [eGanacheNetwork.ganache]: '',
  },
  WrappedNativeToken: {
    [eGanacheNetwork.ganache]: '', // Official WETH
  },
  ReserveFactorTreasuryAddress: {
    [eGanacheNetwork.ganache]: '0x25C31f3b362dA5f2129a824c99186b683A2e8453', // Self-controlled EOA for testing
  },
  IncentivesController: {
    [eGanacheNetwork.ganache]: ZERO_ADDRESS,
  },
};
