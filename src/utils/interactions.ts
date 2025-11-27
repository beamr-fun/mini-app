import { Address, erc20Abi } from 'viem';
import { GDAForwarderAbi } from '../abi/GDAFowarder';
import { ADDR } from '../const/addresses';

export const distributeFlow = async ({
  args: { poolAddress, user, flowRate },
  walletClient,
  publicClient,
  onSuccess,
  onError,
}: {
  onSuccess: (txHash: string) => void;
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
    if (
      !publicClient ||
      typeof publicClient.waitForTransactionReceipt !== 'function'
    ) {
      throw new Error('Public client is not available');
    }

    // const simulation = await publicClient.simulateContract({
    //   abi: GDAForwarderAbi,
    //   address: ADDR.GDA_FORWARDER,
    //   functionName: 'distributeFlow',
    //   from: user,
    //   args: [ADDR.SUPER_TOKEN, user, poolAddress, flowRate, '0x'],
    // });

    // console.log('simulation', simulation);

    const hash = await walletClient.writeContract({
      abi: GDAForwarderAbi,
      address: ADDR.GDA_FORWARDER,
      functionName: 'distributeFlow',
      args: [ADDR.SUPER_TOKEN, user, poolAddress, flowRate, '0x'],
    });

    if (!hash) {
      throw new Error('Failed to get transaction hash');
    }

    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    if (receipt.status !== 'success') {
      console.error('Distribute flow transaction failed', receipt);
      return;
    }
    console.log('Distribution transaction successful', receipt);

    onSuccess(hash);
    return true;
  } catch (error) {
    console.error('Error in distributeFlow:', error);
    onError((error as Error).message);
  }
};

export const transfer = async ({
  amount,
  to,
  walletClient,
}: {
  amount: bigint;
  to: Address;
  walletClient: any;
}) => {
  const hash = await walletClient.writeContract({
    abi: erc20Abi,
    address: ADDR.BEAMR,
    functionName: 'transfer',
    args: [amount, to],
  });

  if (!hash) {
    throw new Error('Failed to get transaction hash');
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
