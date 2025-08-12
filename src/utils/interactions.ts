import { Address, createWalletClient, Hash, http, WalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { appChain, publicClient } from './connect';
import { RPC } from './setup';
import { BeamRABI } from '../abi/BeamR';
import { ADDR } from '../const/addresses';
import {
  ONCHAIN_EVENT,
  PoolMetadata,
  poolMetadataSchema,
  PoolType,
} from '../validation/poolMetadata';
import { GDAForwarderAbi } from '../abi/GDAFowarder';

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

  const hash = await wallet.writeContract({
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

  console.log('Transaction hash:', hash);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log('receipt', receipt);
};

export const distributeFlow = async (
  poolAddress: Address,
  user: Address,
  monthlyFlowRate: bigint
) => {
  const wallet = testWallet();

  const flowRate = monthlyFlowRate / BigInt(30 * 24 * 60 * 60); // Convert monthly flow rate to per second

  // function distributeFlow(
  //     ISuperfluidToken token,
  //     address from,
  //     ISuperfluidPool pool,
  //     int96 requestedFlowRate,
  //     bytes memory userData
  // ) external returns (bool)

  const hash = await wallet.writeContract({
    abi: GDAForwarderAbi,
    address: ADDR.GDA_FORWARDER,
    functionName: 'distributeFlow',
    args: [ADDR.SUPER_TOKEN, user, poolAddress, flowRate, '0x'],
  });

  console.log('Transaction hash:', hash);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log('Transaction receipt:', receipt);
};

export const updateMemberUnits = async (
  members: { account: Address; units: bigint }[],
  poolAddresses: Address[]
) => {
  const wallet = testWallet();

  // function updateMemberUnits(
  // Member[] memory _members,
  // address[] memory poolAddresses
  // )

  const hash = await wallet.writeContract({
    abi: BeamRABI,
    address: ADDR.BEAMR,
    functionName: 'updateMemberUnits',
    args: [members, poolAddresses],
  });

  console.log('Transaction hash:', hash);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log('Transaction receipt:', receipt);
};

export const updateMetadata = async (
  poolAddress: Address,
  metadata: PoolMetadata
) => {
  const wallet = testWallet();

  const valid = poolMetadataSchema.safeParse(metadata);

  if (!valid.success) {
    throw new Error(`Invalid pool metadata: ${valid.error.message}`);
  }

  const hash = await wallet.writeContract({
    abi: BeamRABI,
    address: ADDR.BEAMR,
    functionName: 'updateMetadata',
    args: [
      poolAddress,
      { protocol: ONCHAIN_EVENT, pointer: JSON.stringify(valid.data) },
    ],
  });

  console.log('Transaction hash:', hash);
};

export const grantRole = async (roleId: Hash, address: Address) => {
  const wallet = testWallet();

  // function grantRole(bytes32 role, address account)

  const hash = await wallet.writeContract({
    abi: BeamRABI,
    address: ADDR.BEAMR,
    functionName: 'grantRole',
    args: [roleId, address],
  });

  console.log('Transaction hash:', hash);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log('Transaction receipt:', receipt);
};

export const revokeRole = async (roleId: Hash, address: Address) => {
  const wallet = testWallet();

  // function revokeRole(bytes32 role, address account)

  const hash = await wallet.writeContract({
    abi: BeamRABI,
    address: ADDR.BEAMR,
    functionName: 'revokeRole',
    args: [roleId, address],
  });

  console.log('Transaction hash:', hash);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log('Transaction receipt:', receipt);
};

export const connectToPool = async (poolAddress: Address) => {
  const wallet = testWallet();

  // connectPool(ISuperfluidPool pool, bytes memory userData)

  const hash = await wallet.writeContract({
    abi: GDAForwarderAbi,
    address: ADDR.GDA_FORWARDER,
    functionName: 'connectPool',
    args: [poolAddress, '0x'],
  });

  console.log('Transaction hash:', hash);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log('Transaction receipt:', receipt);
};
