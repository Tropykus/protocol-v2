import BigNumber from 'bignumber.js';
import {
  oneEther,
  oneRay,
  RAY,
  ZERO_ADDRESS,
  MOCK_CHAINLINK_AGGREGATORS_PRICES,
  oneUsd,
} from '../../helpers/constants';
import { ICommonConfiguration, ePolygonPosNetwork } from '../../helpers/types';

// ----------------
// PROTOCOL GLOBAL PARAMS
// ----------------

export const CommonsConfig: ICommonConfiguration = {
  MarketId: 'Commons',
  ATokenNamePrefix: 'Tropykus Polygon Market',
  StableDebtTokenNamePrefix: 'Tropykus Polygon Market stable debt',
  VariableDebtTokenNamePrefix: 'Tropykus Polygon Market variable debt',
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
      ...MOCK_CHAINLINK_AGGREGATORS_PRICES,
    },
  },
  // TODO: reorg alphabetically, checking the reason of tests failing
  LendingRateOracleRatesCommon: {
    USDC: {
      borrowRate: oneRay.multipliedBy(0.039).toFixed(),
    },
    COPM: {
      borrowRate: oneRay.multipliedBy(0.039).toFixed(),
    },
    BRZ: {
      borrowRate: oneRay.multipliedBy(0.039).toFixed(),
    },
    WUSDM: {
      borrowRate: oneRay.multipliedBy(0.039).toFixed(),
    },
  },
  // ----------------
  // COMMON PROTOCOL ADDRESSES ACROSS POOLS
  // ----------------

  // If PoolAdmin/emergencyAdmin is set, will take priority over PoolAdminIndex/emergencyAdminIndex
  PoolAdmin: {
    [ePolygonPosNetwork.mainnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F',
    [ePolygonPosNetwork.testnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F',
  },
  PoolAdminIndex: 0,
  EmergencyAdminIndex: 0,
  EmergencyAdmin: {
    [ePolygonPosNetwork.mainnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F',
    [ePolygonPosNetwork.testnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F',
  },
  ProviderRegistry: {
    [ePolygonPosNetwork.mainnet]: '',
    [ePolygonPosNetwork.testnet]: '0x5Fd6D8ad43f0744039Ea1DA2324D6eE743611d6F',
  },
  ProviderRegistryOwner: {
    [ePolygonPosNetwork.mainnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F',
    [ePolygonPosNetwork.testnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F',
  },
  LendingRateOracle: {
    [ePolygonPosNetwork.mainnet]: '',
    [ePolygonPosNetwork.testnet]: '0x19EdC3fC1672F49E31232af969a0C1257137aA1d',
  },
  LendingPoolCollateralManager: {
    [ePolygonPosNetwork.mainnet]: '',
    [ePolygonPosNetwork.testnet]: '',
  },
  LendingPoolConfigurator: {
    [ePolygonPosNetwork.mainnet]: '',
    [ePolygonPosNetwork.testnet]: '0xe2feEB53521287F95f0d923F321f46878992b2b1',
  },
  LendingPool: {
    [ePolygonPosNetwork.mainnet]: '',
    [ePolygonPosNetwork.testnet]: '0x1777c7c15c1A91CaF9f2d0b39Ebe97EA2BDC5973',
  },
  WethGateway: {
    [ePolygonPosNetwork.mainnet]: '',
    [ePolygonPosNetwork.testnet]: '',
  },
  TokenDistributor: {
    [ePolygonPosNetwork.mainnet]: '',
    [ePolygonPosNetwork.testnet]: '',
  },
  AaveOracle: {
    [ePolygonPosNetwork.mainnet]: '',
    [ePolygonPosNetwork.testnet]: '0x25716D8a987A6C1FAc511323b8D6Dae2ccE16e59',
  },
  FallbackOracle: {
    [ePolygonPosNetwork.mainnet]: ZERO_ADDRESS,
    [ePolygonPosNetwork.testnet]: ZERO_ADDRESS,
  },
  ChainlinkAggregator: {
    [ePolygonPosNetwork.mainnet]: {
      WETH: '0x9660310567bfE9c7555E5FBdbB8DD30518983C08',
      USDC: '0xBB08684ad198410A19Cfa8f80B90F0Ae99323A76',
      WBTC: '0xEc36899D4Cd6f72ba610aF6AC3B60ed1e954124a',
    },
    //Already on testnet
    [ePolygonPosNetwork.testnet]: {
      COPM: '0x63B397fb7aBD9B583849e52A71658d1F81E2B5f5',
      USDC: '0x40457Ee788F1562966ce7482d8534DFA1a919f38',
      BRZ: '0x2445C42bD8B321205A3CE4d8f45106103757c571',
      USD: '0x40457Ee788F1562966ce7482d8534DFA1a919f38',
      //TODO: Update WUSDM
      WUSDM: '0x40457Ee788F1562966ce7482d8534DFA1a919f38',
    },
  },
  ReserveAssets: {
    [ePolygonPosNetwork.mainnet]: {},
    [ePolygonPosNetwork.testnet]: {},
  },
  ReservesConfig: {},
  ATokenDomainSeparator: {
    [ePolygonPosNetwork.mainnet]: '',
    [ePolygonPosNetwork.testnet]: '',
  },
  WETH: {
    [ePolygonPosNetwork.mainnet]: '',
    [ePolygonPosNetwork.testnet]: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
  },
  WrappedNativeToken: {
    [ePolygonPosNetwork.mainnet]: '0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9', // Official WETH
    [ePolygonPosNetwork.testnet]: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889', // Official WETH
  },
  ReserveFactorTreasuryAddress: {
    [ePolygonPosNetwork.mainnet]: '0x74d11c17f8F2F24CFF151E8601b1d9e7b1CD238F', // Multisig
    [ePolygonPosNetwork.testnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F', // Self-controlled EOA for testing
  },
  IncentivesController: {
    [ePolygonPosNetwork.mainnet]: ZERO_ADDRESS,
    [ePolygonPosNetwork.testnet]: ZERO_ADDRESS,
  },
};
