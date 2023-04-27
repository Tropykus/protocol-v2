import BigNumber from 'bignumber.js';
import {
  oneEther,
  oneRay,
  RAY,
  ZERO_ADDRESS,
  MOCK_CHAINLINK_AGGREGATORS_PRICES,
  oneUsd,
} from '../../helpers/constants';
import { ICommonConfiguration, eZKevmNetwork } from '../../helpers/types';

// ----------------
// PROTOCOL GLOBAL PARAMS
// ----------------

export const CommonsConfig: ICommonConfiguration = {
  MarketId: 'Commons',
  ATokenNamePrefix: 'Aave zk EVM Market',
  StableDebtTokenNamePrefix: 'Aave zk EVM Market stable debt',
  VariableDebtTokenNamePrefix: 'Aave zk EVM Market variable debt',
  SymbolPrefix: 'v',
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
      ...MOCK_CHAINLINK_AGGREGATORS_PRICES,
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
    [eZKevmNetwork.zkmainnet]: undefined,
    [eZKevmNetwork.zktestnet]: '',
  },
  PoolAdminIndex: 0,
  EmergencyAdminIndex: 0,
  EmergencyAdmin: {
    [eZKevmNetwork.zkmainnet]: undefined,
    [eZKevmNetwork.zktestnet]: '0x05c94874d77a53298aC169Ca83078862e414D384',
  },
  ProviderRegistry: {
    [eZKevmNetwork.zkmainnet]: '',
    [eZKevmNetwork.zktestnet]: '0x982901fb59C20671f41eA9e97E8a072d0b369253',
  },
  ProviderRegistryOwner: {
    [eZKevmNetwork.zkmainnet]: '',
    [eZKevmNetwork.zktestnet]: '0x05c94874d77a53298aC169Ca83078862e414D384',
  },
  LendingRateOracle: {
    [eZKevmNetwork.zkmainnet]: '',
    [eZKevmNetwork.zktestnet]: '',
  },
  LendingPoolCollateralManager: {
    [eZKevmNetwork.zkmainnet]: '',
    [eZKevmNetwork.zktestnet]: '',
  },
  LendingPoolConfigurator: {
    [eZKevmNetwork.zkmainnet]: '',
    [eZKevmNetwork.zktestnet]: '',
  },
  LendingPool: {
    [eZKevmNetwork.zkmainnet]: '',
    [eZKevmNetwork.zktestnet]: '',
  },
  WethGateway: {
    [eZKevmNetwork.zkmainnet]: '',
    [eZKevmNetwork.zktestnet]: '',
  },
  TokenDistributor: {
    [eZKevmNetwork.zkmainnet]: '',
    [eZKevmNetwork.zktestnet]: '',
  },
  AaveOracle: {
    [eZKevmNetwork.zkmainnet]: '',
    [eZKevmNetwork.zktestnet]: '',
  },
  FallbackOracle: {
    [eZKevmNetwork.zkmainnet]: ZERO_ADDRESS,
    [eZKevmNetwork.zktestnet]: ZERO_ADDRESS,
  },
  ChainlinkAggregator: {
    [eZKevmNetwork.zkmainnet]: {
      WETH: '0x976B3D034E162d8bD72D6b9C989d545b839003b0',
      USDC: '0xF096872672F44d6EBA71458D74fe67F9a77a23B9',
      WBTC: '0x2779D32d5166BAaa2B2b658333bA7e6Ec0C65743',
    },
    [eZKevmNetwork.zktestnet]: {
      WETH: '0xf4e77E5Da47AC3125140c470c71cBca77B5c638c',
      USDC: '0xf784709d2317D872237C4bC22f867d1BAe2913AB',
      WBTC: '0x3619DbE27d7c1e7E91aA738697Ae7Bc5FC3eACA5',
      USD: '0x86d67c3D38D2bCeE722E601025C25a575021c6EA',
    },
  },
  ReserveAssets: {
    [eZKevmNetwork.zkmainnet]: {},
    [eZKevmNetwork.zktestnet]: {},
  },
  ReservesConfig: {},
  ATokenDomainSeparator: {
    [eZKevmNetwork.zkmainnet]: '',
    [eZKevmNetwork.zktestnet]: '',
  },
  WETH: {
    [eZKevmNetwork.zkmainnet]: '',
    [eZKevmNetwork.zktestnet]: '0xe3d4bc4DB2C69110639C21e1F47ED19e05Bc90CB',
  },
  WrappedNativeToken: {
    [eZKevmNetwork.zkmainnet]: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', // Official WETH
    [eZKevmNetwork.zktestnet]: '0xe3d4bc4DB2C69110639C21e1F47ED19e05Bc90CB', // Official WETH
  },
  ReserveFactorTreasuryAddress: {
    [eZKevmNetwork.zkmainnet]: ZERO_ADDRESS,
    [eZKevmNetwork.zktestnet]: '0xDbADD95d1Bd034ad4FCd5C98BFd38669e8e75185', // Self-controlled EOA for testing
  },
  IncentivesController: {
    [eZKevmNetwork.zkmainnet]: ZERO_ADDRESS,
    [eZKevmNetwork.zktestnet]: ZERO_ADDRESS,
  },
};
