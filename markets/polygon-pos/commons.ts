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
    [ePolygonPosNetwork.mainnet]: '0xeF461D251aBC72FbD024d0AC5a7aDd5859583a31',
    [ePolygonPosNetwork.testnet]: '0x44A26242cD1dB06992c9Bcc9b70d11d68E804787',
  },
  ProviderRegistryOwner: {
    [ePolygonPosNetwork.mainnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F',
    [ePolygonPosNetwork.testnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F',
  },
  LendingRateOracle: {
    [ePolygonPosNetwork.mainnet]: '',
    [ePolygonPosNetwork.testnet]: '',
  },
  LendingPoolCollateralManager: {
    [ePolygonPosNetwork.mainnet]: '',
    [ePolygonPosNetwork.testnet]: '',
  },
  LendingPoolConfigurator: {
    [ePolygonPosNetwork.mainnet]: '0x52d61A9663754bb6584a84C7c98d899628515727',
    [ePolygonPosNetwork.testnet]: '',
  },
  LendingPool: {
    [ePolygonPosNetwork.mainnet]: '0xda828519Ef888db5818cf544D453890f19E78254',
    [ePolygonPosNetwork.testnet]: '',
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
    [ePolygonPosNetwork.testnet]: '',
  },
  FallbackOracle: {
    [ePolygonPosNetwork.mainnet]: ZERO_ADDRESS,
    [ePolygonPosNetwork.testnet]: ZERO_ADDRESS,
  },
  ChainlinkAggregator: {
    [ePolygonPosNetwork.mainnet]: {
      COPM: '0xfAA9147190c2C2cc5B8387B4f49016bDB3380572',
      USDC: '0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7',
      BRZ: '0xB90DA3ff54C3ED09115abf6FbA0Ff4645586af2c',
      USD: '0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7',
      //TODO: Update WUSDM
      WUSDM: '0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7',
    },
    //Already on testnet
    [ePolygonPosNetwork.testnet]: {
      COPM: '0xF7c0a301A5B5b390f5D123e037873C09b4Ae7A8a',
      USDC: '0xcb5964e566c1F54324466E7B2E2A13012D1dc224',
      BRZ: '0x70A041b331Ce5150951a2732f7E90a5Bb76ae133',
      USD: '0xcb5964e566c1F54324466E7B2E2A13012D1dc224',
      WUSDM: '0xcb5964e566c1F54324466E7B2E2A13012D1dc224',
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
    [ePolygonPosNetwork.testnet]: '0x778F1B662a461695633791D03A77D992c24B588A',
  },
  WrappedNativeToken: {
    [ePolygonPosNetwork.mainnet]: '0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9', // Official WETH
    [ePolygonPosNetwork.testnet]: '0x778F1B662a461695633791D03A77D992c24B588A', // Official WETH
  },
  ReserveFactorTreasuryAddress: {
    [ePolygonPosNetwork.mainnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F', // Multisig
    [ePolygonPosNetwork.testnet]: '0x53Ec0aF115619c536480C95Dec4a065e27E6419F', // Self-controlled EOA for testing
  },
  IncentivesController: {
    [ePolygonPosNetwork.mainnet]: ZERO_ADDRESS,
    [ePolygonPosNetwork.testnet]: "0x0db5F7274cfE927d67417C6E87cC39E8aF696109",
  },
};
