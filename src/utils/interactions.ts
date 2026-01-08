import { Address, encodeFunctionData } from 'viem';
import { OPERATION_TYPE, prepareOperation } from '@sfpro/sdk/constant';
import { gdaAbi } from '@sfpro/sdk/abi/core';
import { ADDR } from '../const/addresses';
import { SuperfluidAbi } from '../abi/Superfluid';

export const distributeFlow = async ({
  args: { poolAddress, user, flowRate, otherPoolFlowRates },
  walletClient,
  publicClient,
  onSuccess,
  onError,
  enableZeroFlowRate = false,
}: {
  onSuccess: (txHash: string) => void;
  onError: (errMsg: string) => void;
  args: {
    poolAddress: Address;
    user: Address;
    flowRate: bigint;
    otherPoolFlowRates: bigint[];
  };
  walletClient: any;
  publicClient: any;
  enableZeroFlowRate?: boolean;
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

    if (flowRate === 0n && !enableZeroFlowRate) {
      throw new Error(
        'Flow rate cannot be zero, unless enableZeroFlowRate is true'
      );
    }

    const poolTargetRate = (flowRate * 95n) / 100n;

    // 2. Calculate the Total Gross across ALL pools
    // Assuming otherPoolFlowRates are also the 'Gross' (100%) values
    const totalGrossRate = [flowRate, ...otherPoolFlowRates].reduce(
      (acc, rate) => acc + rate,
      0n
    );

    // 3. Calculate the Global Fee (5% of the Total Gross)
    // Because distributeFlow is an 'overwrite' operation, this syncs
    // the collector pool to 5% of the user's entire footprint.
    const globalFeeFlowRate = (totalGrossRate * 5n) / 100n;

    const operations = [
      // Update the specific target pool to 95%
      prepareOperation({
        operationType: OPERATION_TYPE.SUPERFLUID_CALL_AGREEMENT,
        target: ADDR.GDA,
        data: encodeFunctionData({
          abi: gdaAbi,
          functionName: 'distributeFlow',
          args: [ADDR.SUPER_TOKEN, user, poolAddress, poolTargetRate, '0x'],
        }),
        userData: '0x',
      }),
      // Update the collector pool to 5% of the total aggregate
      prepareOperation({
        operationType: OPERATION_TYPE.SUPERFLUID_CALL_AGREEMENT,
        target: ADDR.GDA,
        data: encodeFunctionData({
          abi: gdaAbi,
          functionName: 'distributeFlow',
          args: [
            ADDR.SUPER_TOKEN,
            user,
            ADDR.COLLECTOR_POOL,
            globalFeeFlowRate,
            '0x',
          ],
        }),
        userData: '0x',
      }),
    ];

    const hash = await walletClient.writeContract({
      abi: SuperfluidAbi,
      functionName: 'batchCall',
      address: ADDR.SUPER_FLUID,
      args: [operations],
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

export const multiConnect = async ({
  poolIds,
  walletClient,
  userAddress,
  onLoading,
  onError,
  onSuccess,
}: {
  poolIds: Address[];
  walletClient: any;
  userAddress: Address;
  onLoading: () => void;
  onSuccess: (txHash: string) => void;
  onError: (errMsg: string) => void;
}) => {
  onLoading();

  try {
    const operations = poolIds.map((poolAddress) =>
      prepareOperation({
        operationType: OPERATION_TYPE.SUPERFLUID_CALL_AGREEMENT,
        target: ADDR.GDA,
        data: encodeFunctionData({
          abi: gdaAbi,
          functionName: 'connectPool',
          args: [poolAddress, '0x'],
        }),
        userData: '0x',
      })
    );

    const hash = await walletClient.writeContract({
      abi: SuperfluidAbi,
      functionName: 'batchCall',
      address: ADDR.SUPER_FLUID,
      args: [operations],
    });

    if (!hash) {
      onError('Failed to get transaction hash');
      throw new Error('Failed to get transaction hash');
    }

    onSuccess(hash);
  } catch (error) {
    console.error('Error in multiConnect:', error);
    onError((error as Error).message);
  }
};
