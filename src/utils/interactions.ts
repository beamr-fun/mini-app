// import { Address, Hash } from 'viem';
// import { publicClient } from './connect';

import { Address } from 'viem';
import { GDAForwarderAbi } from '../abi/GDAFowarder';
import { ADDR } from '../const/addresses';

// import { BeamRABI } from '../abi/BeamR';
// import { ADDR } from '../const/addresses';
// import {
//   ONCHAIN_EVENT,
//   PoolMetadata,
//   poolMetadataSchema,
// } from '../validation/poolMetadata';
// import { GDAForwarderAbi } from '../abi/GDAFowarder';

export const distributeFlow = async ({
  args: { poolAddress, user, flowRate },
  walletClient,
  publicClient,
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (errMsg: string) => void;
  args: {
    poolAddress: Address;
    user: Address;
    flowRate: bigint;
  };
  walletClient: any;
  publicClient: any;
}) => {
  try {
    if (!walletClient || typeof walletClient.writeContract !== 'function') {
      throw new Error('Wallet client is not available');
    }

    const hash = await walletClient.writeContract({
      abi: GDAForwarderAbi,
      address: ADDR.GDA_FORWARDER,
      functionName: 'distributeFlow',
      args: [ADDR.SUPER_TOKEN, user, poolAddress, flowRate, '0x'],
    });

    if (!hash) {
      throw new Error('Failed to get transaction hash');
    }

    if (
      !publicClient ||
      typeof publicClient.waitForTransactionReceipt !== 'function'
    ) {
      throw new Error('Public client is not available');
    }

    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    if (receipt.status !== 'success') {
      console.error('Distribute flow transaction failed', receipt);
      return;
    }
    console.log('Distribution transaction successful', receipt);

    onSuccess();
    return true;
  } catch (error) {
    console.error('Error in distributeFlow:', error);
    onError((error as Error).message);
  }
};

// export const updateMetadata = async (
//   poolAddress: Address,
//   metadata: PoolMetadata,
//   wallet: any
// ) => {
//   const valid = poolMetadataSchema.safeParse(metadata);

//   if (!valid.success) {
//     throw new Error(`Invalid pool metadata: ${valid.error.message}`);
//   }

//   const hash = await wallet.writeContract({
//     abi: BeamRABI,
//     address: ADDR.BEAMR,
//     functionName: 'updateMetadata',
//     args: [
//       poolAddress,
//       { protocol: ONCHAIN_EVENT, pointer: JSON.stringify(valid.data) },
//     ],
//   });

//   console.log('Transaction hash:', hash);
// };

// export const grantRole = async (
//   roleId: Hash,
//   address: Address,
//   wallet: any
// ) => {
//   const hash = await wallet.writeContract({
//     abi: BeamRABI,
//     address: ADDR.BEAMR,
//     functionName: 'grantRole',
//     args: [roleId, address],
//   });

//   console.log('Transaction hash:', hash);

//   const receipt = await publicClient.waitForTransactionReceipt({ hash });

//   console.log('Transaction receipt:', receipt);
// };

// export const revokeRole = async (
//   roleId: Hash,
//   address: Address,
//   wallet: any
// ) => {
//   const hash = await wallet.writeContract({
//     abi: BeamRABI,
//     address: ADDR.BEAMR,
//     functionName: 'revokeRole',
//     args: [roleId, address],
//   });

//   console.log('Transaction hash:', hash);

//   const receipt = await publicClient.waitForTransactionReceipt({ hash });

//   console.log('Transaction receipt:', receipt);
// };

// export const connectToPool = async (poolAddress: Address, wallet: any) => {
//   const hash = await wallet.writeContract({
//     abi: GDAForwarderAbi,
//     address: ADDR.GDA_FORWARDER,
//     functionName: 'connectPool',
//     args: [poolAddress, '0x'],
//   });

//   console.log('Transaction hash:', hash);

//   const receipt = await publicClient.waitForTransactionReceipt({ hash });

//   console.log('Transaction receipt:', receipt);
// };
