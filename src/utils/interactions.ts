import { Address, encodeFunctionData, erc20Abi } from 'viem';
import { OPERATION_TYPE, prepareOperation } from '@sfpro/sdk/constant';
import { gdaAbi, gdaAddress } from '@sfpro/sdk/abi/core';
import { ADDR } from '../const/addresses';
import { SuperfluidAbi } from '../abi/Superfluid';
import { baseSepolia } from 'viem/chains';
import { publicClient } from './connect';

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

    const userFlowRate = (flowRate * 95n) / 100n; // 95% to user
    console.log('userFlowRate', userFlowRate);
    const feeFlowRate = flowRate - userFlowRate; // 5% fee
    console.log('flowRate', flowRate);

    const operations = [
      prepareOperation({
        operationType: OPERATION_TYPE.SUPERFLUID_CALL_AGREEMENT,
        target: gdaAddress[baseSepolia.id],
        data: encodeFunctionData({
          abi: gdaAbi,
          functionName: 'distributeFlow',
          args: [ADDR.SUPER_TOKEN, user, poolAddress, userFlowRate, '0x'],
        }),
        userData: '0x',
      }),
      prepareOperation({
        operationType: OPERATION_TYPE.SUPERFLUID_CALL_AGREEMENT,
        target: gdaAddress[baseSepolia.id],
        data: encodeFunctionData({
          abi: gdaAbi,
          functionName: 'distributeFlow',
          args: [
            ADDR.SUPER_TOKEN,
            user,
            ADDR.COLLECTOR_POOL,
            feeFlowRate,
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

const calcFlowRateAndFee = (
  totalFlowRate: bigint
): { userFlow: bigint; feeFlow: bigint } => {
  const SCALE = BigInt(10000);
  const HALF_SCALE = SCALE / BigInt(2);
  const USER_BASIS_POINTS = BigInt(9500); // 95% to user

  const numerator = totalFlowRate * USER_BASIS_POINTS;

  const userPoolFlowRateRounded = (numerator + HALF_SCALE) / SCALE;

  const feeFlowRate = totalFlowRate - userPoolFlowRateRounded;

  return {
    userFlow: userPoolFlowRateRounded,
    feeFlow: feeFlowRate,
  };
};

export const tryDoubleConnect = async () =>
  // walletClient: any,
  // address?: Address
  {
    console.log('fred');
    const USER_ADDRESS = '0xA55905B9053BB0710432ae15Ed863F97B109393B';
    // if (!walletClient || !address) {
    //   console.log('Wallet client or address not available');
    //   return;
    // }

    try {
      // flow rate, 30 token per month

      const POOL_ADDRESS_1 = '0xC3521d2beC7A254495B2A5ed541efc69f6464Fb1';
      const POOL_ADDRESS_2 = '0x07C6aCc49EA7395f1917A6b60B87593B579398e3';

      const operations = [
        prepareOperation({
          operationType: OPERATION_TYPE.SUPERFLUID_CALL_AGREEMENT,
          target: gdaAddress[baseSepolia.id],
          data: encodeFunctionData({
            abi: gdaAbi,
            functionName: 'connectPool',
            args: [POOL_ADDRESS_1, '0x'],
          }),
          userData: '0x',
        }),
        prepareOperation({
          operationType: OPERATION_TYPE.SUPERFLUID_CALL_AGREEMENT,
          target: gdaAddress[baseSepolia.id],
          data: encodeFunctionData({
            abi: gdaAbi,
            functionName: 'connectPool',
            args: [POOL_ADDRESS_2, '0x'],
          }),
          userData: '0x',
        }),
      ];

      const hash = await publicClient.simulateContract({
        abi: SuperfluidAbi,
        functionName: 'batchCall',
        address: ADDR.SUPER_FLUID,
        account: USER_ADDRESS,
        args: [operations],
      });
    } catch (error) {
      console.error('Error in tryDoubleDistribute:', error);
    }
  };
