import { Address, createWalletClient, http, WalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { appChain } from './connect';
import { RPC } from './setup';
import { BeamRABI } from '../abi/BeamR';
import { ADDR } from '../const/addresses';
import {
  ONCHAIN_EVENT,
  PoolMetadata,
  poolMetadataSchema,
  PoolType,
} from '../validation/poolMetadata';

const testPk = import.meta.env.VITE_TEST_PK;
const testPubK = import.meta.env.VITE_TEST_PUBK;

const testWallet = () => {
  if (!testPk) {
    throw new Error('Test private key is not set in environment variables');
  }

  const account = privateKeyToAccount(testPk);

  const walletClient = createWalletClient({
    account,
    chain: appChain,
    transport: http(RPC),
  });

  return walletClient;
};

export const createPool = async (creator: Address, fid: number) => {
  if (!testPubK) {
    throw new Error('Test public key is not set in environment variables');
  }

  const wallet = testWallet();

  // function createPool(
  //     ISuperToken _poolSuperToken,
  //     PoolConfig memory _poolConfig,
  //     PoolERC20Metadata memory _erc20Metadata,
  //     Member[] memory _members,
  //     address _creator,
  //     Metadata memory _metadata
  // )

  const metadata: PoolMetadata = {
    creatorFID: fid,
    poolType: PoolType.Tip,
    name: 'Test Pool',
  };

  const valid = poolMetadataSchema.safeParse(metadata);

  if (!valid.success) {
    throw new Error(`Invalid pool metadata: ${valid.error.message}`);
  }

  wallet.writeContract({
    abi: BeamRABI,
    address: ADDR.BEAMR,
    functionName: 'createPool',
    args: [
      ADDR.SUPER_TOKEN,
      { transferabilityForUnitsOwner: false, distributionFromAnyAddress: true },
      { name: 'Test Pool', symbol: 'TP', decimals: 18 },
      [
        { account: testPubK, units: 6n },
        { account: creator, units: 1000n },
      ],
      creator,
      {
        protocol: ONCHAIN_EVENT,
        pointer: JSON.stringify(valid.data),
      },
    ],
  });
};

export const distributeFlow = async () => {};

export const updateMemberUnits = async () => {};

export const updateMetadata = async () => {};

export const grantRole = async () => {};

export const revokeRole = async () => {};

export const connectToPool = async () => {};
