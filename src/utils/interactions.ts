import { Address, Hash } from 'viem';
import { publicClient } from './connect';

import { BeamRABI } from '../abi/BeamR';
import { ADDR } from '../const/addresses';
import {
  ONCHAIN_EVENT,
  PoolMetadata,
  poolMetadataSchema,
} from '../validation/poolMetadata';
import { GDAForwarderAbi } from '../abi/GDAFowarder';

export const distributeFlow = async (
  poolAddress: Address,
  user: Address,
  monthlyFlowRate: bigint,
  walletClient: any
) => {
  const flowRate = monthlyFlowRate / BigInt(30 * 24 * 60 * 60); // Convert monthly flow rate to per second

  const hash = await walletClient.writeContract({
    abi: GDAForwarderAbi,
    address: ADDR.GDA_FORWARDER,
    functionName: 'distributeFlow',
    args: [ADDR.SUPER_TOKEN, user, poolAddress, flowRate, '0x'],
  });

  console.log('Transaction hash:', hash);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log('Transaction receipt:', receipt);
};

export const updateMetadata = async (
  poolAddress: Address,
  metadata: PoolMetadata,
  wallet: any
) => {
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

export const grantRole = async (
  roleId: Hash,
  address: Address,
  wallet: any
) => {
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

export const revokeRole = async (
  roleId: Hash,
  address: Address,
  wallet: any
) => {
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

export const connectToPool = async (poolAddress: Address, wallet: any) => {
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
