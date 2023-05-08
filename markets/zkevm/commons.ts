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
    [eZKevmNetwork.zktestnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F',
  },
  PoolAdminIndex: 0,
  EmergencyAdminIndex: 0,
  EmergencyAdmin: {
    [eZKevmNetwork.zkmainnet]: undefined,
    [eZKevmNetwork.zktestnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F',
  },
  ProviderRegistry: {
    [eZKevmNetwork.zkmainnet]: '',
    [eZKevmNetwork.zktestnet]: '0x7fc233B7CbE639eb121D84FEBfA2b2D55868E465',
  },
  ProviderRegistryOwner: {
    [eZKevmNetwork.zkmainnet]: '',
    [eZKevmNetwork.zktestnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F',
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
      WETH: '',
      USDC: '',
      WBTC: '',
      USD: ZERO_ADDRESS,
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
    [eZKevmNetwork.zktestnet]: '0x9660310567bfE9c7555E5FBdbB8DD30518983C08', // Official WETH
  },
  ReserveFactorTreasuryAddress: {
    [eZKevmNetwork.zkmainnet]: ZERO_ADDRESS,
    [eZKevmNetwork.zktestnet]: '0x30Cd379534cE6C15eC08f00FF156166A2C7D1541', // Self-controlled EOA for testing
  },
  IncentivesController: {
    [eZKevmNetwork.zkmainnet]: ZERO_ADDRESS,
    [eZKevmNetwork.zktestnet]: ZERO_ADDRESS,
  },
};
