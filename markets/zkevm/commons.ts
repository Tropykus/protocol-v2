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
    [eZKevmNetwork.zkmainnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F',
    [eZKevmNetwork.zktestnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F',
  },
  PoolAdminIndex: 0,
  EmergencyAdminIndex: 0,
  EmergencyAdmin: {
    [eZKevmNetwork.zkmainnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F',
    [eZKevmNetwork.zktestnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F',
  },
  ProviderRegistry: {
    [eZKevmNetwork.zkmainnet]: '0x4Dac514F520D051551372d277d1b2Fa3cF2AfdFF',
    [eZKevmNetwork.zktestnet]: '0xff1084bA85B218564748f32868Cb2366a823772E',
  },
  ProviderRegistryOwner: {
    [eZKevmNetwork.zkmainnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F',
    [eZKevmNetwork.zktestnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F',
  },
  LendingRateOracle: {
    [eZKevmNetwork.zkmainnet]: '0xfc09e61904E2B042FE59b889FB55E2E2CAAF7799',
    [eZKevmNetwork.zktestnet]: '0x009928E543c8B7736BAfDD819fd682e2D2920c1a',
  },
  LendingPoolCollateralManager: {
    [eZKevmNetwork.zkmainnet]: '0x6c7957F5bE827F25A52C0666BF55c5a6328D6E68',
    [eZKevmNetwork.zktestnet]: '0x6d08364738Ea9f8349520d95E9928f0917bB7CaB',
  },
  LendingPoolConfigurator: {
    [eZKevmNetwork.zkmainnet]: '0xc43c4EE4243aC6682dA33588655FcB1B16BF6b1e',
    [eZKevmNetwork.zktestnet]: '0x5545490E42eb7cf14CF04129A1c7213fb00dEAaB',
  },
  LendingPool: {
    [eZKevmNetwork.zkmainnet]: '0xB57B04F4ab792215D7CF77ED51330951143E69a8',
    [eZKevmNetwork.zktestnet]: '0x052a450FDd174830B0f2aaa51358e3a82D73B854',
  },
  WethGateway: {
    [eZKevmNetwork.zkmainnet]: '0xcEBfF8F32607eEC13b5976B14356d13Ba330aC9a',
    [eZKevmNetwork.zktestnet]: '0x98e7a98DfD326EBd13c78789768EaDe3f2251C56',
  },
  TokenDistributor: {
    [eZKevmNetwork.zkmainnet]: '',
    [eZKevmNetwork.zktestnet]: '',
  },
  AaveOracle: {
    [eZKevmNetwork.zkmainnet]: '0xB75fB011D06651bFa1690cc458002E7B3064D12C',
    [eZKevmNetwork.zktestnet]: '0xE10A347cf55f934Df185a628fd6Ff4F6C7B7081B',
  },
  FallbackOracle: {
    [eZKevmNetwork.zkmainnet]: ZERO_ADDRESS,
    [eZKevmNetwork.zktestnet]: ZERO_ADDRESS,
  },
  ChainlinkAggregator: {
    [eZKevmNetwork.zkmainnet]: {
      WETH: '0x9660310567bfE9c7555E5FBdbB8DD30518983C08',
      USDC: '0xBB08684ad198410A19Cfa8f80B90F0Ae99323A76',
      WBTC: '0xEc36899D4Cd6f72ba610aF6AC3B60ed1e954124a',
    },
    [eZKevmNetwork.zktestnet]: {
      WETH: '0x4409c21ff44f76b699da489901b1e462ae8e54c6',
      USDC: '0x66D1eeE318A948f0b61f51BF08E80686E0D1348f',
      WBTC: '0x41a8b0429e1440997be0dba75cde9dbd0d10be1b',
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
    [eZKevmNetwork.zkmainnet]: '0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9',
    [eZKevmNetwork.zktestnet]: '0x8e7E10956eBfb7C8F41cb4E96A02574b4DC7f1Cb',
  },
  WrappedNativeToken: {
    [eZKevmNetwork.zkmainnet]: '0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9', // Official WETH
    [eZKevmNetwork.zktestnet]: '0x8e7E10956eBfb7C8F41cb4E96A02574b4DC7f1Cb', // Official WETH
  },
  ReserveFactorTreasuryAddress: {
    [eZKevmNetwork.zkmainnet]: '0x74d11c17f8F2F24CFF151E8601b1d9e7b1CD238F', // Multisig
    [eZKevmNetwork.zktestnet]: '0xF66a0eC93511f870329843a91B0a9Ff3D46aa9ba', // Self-controlled EOA for testing
  },
  IncentivesController: {
    [eZKevmNetwork.zkmainnet]: ZERO_ADDRESS,
    [eZKevmNetwork.zktestnet]: ZERO_ADDRESS,
  },
};
