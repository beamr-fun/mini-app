import { Button, Stack } from '@mantine/core';
import {
  gdaForwarderAbi,
  gdaForwarderAddress,
  superTokenAbi,
} from '@sfpro/sdk/abi';
import GDAAbi from '../abi/GDA.json';
import SuperfluidAbi from '../abi/Superfluid.json';
import {} from '@sfpro/sdk/config';
import { calculateFlowratePerSecond } from '@sfpro/sdk/util';
import {
  prepareOperation,
  OPERATION_TYPE,
  TimeUnit,
  TIME_UNIT,
} from '@sfpro/sdk/constant';
import { ADDR, ADDR_DEV } from '../const/addresses';
import { optimismSepolia } from 'viem/chains';
import { useAccount, useWalletClient } from 'wagmi';
import { publicClient } from '../utils/connect';
import { Abi, decodeEventLog, encodeFunctionData, erc20Abi } from 'viem';
import { useToken } from '../hooks/useToken';
import { network } from '../utils/setup';

export const Home = () => {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const { data: baseToken } = useToken({
    tokenAddress: ADDR.BASE_TOKEN,
    userAddress: address,
    spender: ADDR.SUPER_TOKEN,
    calls: {
      balanceOf: true,
      totalSupply: true,
      name: true,
      symbol: true,
      decimals: true,
      allowance: true,
    },
  });

  const {} = useToken({
    tokenAddress: ADDR.SUPER_TOKEN,
    userAddress: address,
    calls: {
      balanceOf: true,
      totalSupply: true,
      name: true,
      symbol: true,
      decimals: true,
    },
    abi: superTokenAbi,
  });

  console.log('baseToken', baseToken);

  // console.log('walletClient', walletClient);
  // Are you logged in?

  // If yes, check to see if you have a pool

  // if yes, display pools (still display button to create more pools)
  // if no, prompt to create a pool

  // If yes, check to see if anyone is streaming to you

  // if yes, display streams (still display link to leaderboard)
  // if no, prompt to see leaderboard

  // if no user pool,

  const test = async () => {
    if (!walletClient) {
      console.error('Wallet client is not available');
      return;
    }

    if (!address) {
      console.error('No address found in account');
      return;
    }

    const { results } = await publicClient.simulateCalls({
      account: walletClient.account.address,
      calls: [
        {
          to: gdaForwarderAddress[optimismSepolia.id],
          abi: gdaForwarderAbi,
          functionName: 'createPool',
          args: [
            ADDR_DEV.SUPER_TOKEN, // Super Token address
            ADDR_DEV.ADMIN, // Admin address
            {
              distributionFromAnyAddress: true,
              transferabilityForUnitsOwner: false,
            }, // Pool ID
          ],
        },
      ],
    });

    const newAddress = results[0]?.result?.[1];

    if (!newAddress) {
      console.error('No new address returned from simulateCalls');
      return;
    }

    // const decodedLogs = results[0]?.logs?.map((log) => {
    //   try {
    //     return decodeEventLog({
    //       abi: gdaForwarderAbi,
    //       data: log.data,
    //       topics: log.topics,
    //     });
    //   } catch (error) {
    //     // Log might be from a different contract or unknown event
    //     return { ...log, decoded: false };
    //   }
    // });

    // console.log('decodedLogs', decodedLogs);

    // const
    // const hash = await walletClient.writeContract({
    //   address: ADDR.GDA,
    //   abi: gdaForwarderAbi,
    //   functionName: 'createPool',
    //   args: [
    //     ADDR_DEV.SUPER_TOKEN, // Super Token address
    //     ADDR_DEV.ADMIN, // Admin address
    //     {
    //       distributionFromAnyAddress: true,
    //       transferabilityForUnitsOwner: false,
    //     }, // Pool ID
    //   ],
    // });

    // const approve = await walletClient.writeContract({
    //   abi: erc20Abi,
    //   address: ADDR.BASE_TOKEN,
    //   functionName: 'approve',
    //   args: [ADDR.SUPER_TOKEN, BigInt(10e18)],
    // });

    console.log('ADDR.GDA_FORWARDER', ADDR.GDA_FORWARDER);
    console.log('ADDR.ADMIN', ADDR.ADMIN);

    const operations = [
      prepareOperation({
        operationType: OPERATION_TYPE.SIMPLE_FORWARD_CALL,
        target: ADDR.GDA,
        data: encodeFunctionData({
          abi: gdaForwarderAbi,
          functionName: 'createPool',
          args: [
            ADDR.SUPER_TOKEN,
            ADDR.ADMIN,
            {
              distributionFromAnyAddress: true,
              transferabilityForUnitsOwner: false,
            },
          ],
        }),
      }),
      prepareOperation({
        operationType: OPERATION_TYPE.SUPERTOKEN_UPGRADE,
        target: ADDR.SUPER_TOKEN,
        data: encodeFunctionData({
          abi: superTokenAbi,
          functionName: 'upgrade',
          args: [BigInt(1e18)],
        }),
      }),
      prepareOperation({
        operationType: OPERATION_TYPE.SUPERFLUID_CALL_AGREEMENT,
        target: ADDR.GDA,
        data: encodeFunctionData({
          abi: gdaForwarderAbi,
          functionName: 'distributeFlow',
          args: [
            ADDR.SUPER_TOKEN,
            address,
            newAddress,
            calculateFlowratePerSecond({
              amountWei: BigInt(1e18),
              timeUnit: TIME_UNIT.month,
            }),
            '0x',
          ],
        }),
      }),
    ];

    const hash = await walletClient.writeContract({
      abi: SuperfluidAbi,
      address: ADDR.SUPER_FLUID,
      functionName: 'batchCall',
      args: [operations],
    });

    // const hash2 = await walletClient.writeContract({
    //   abi: GDAAbi,
    //   functionName: 'distributeFlow',
    //   address: ADDR.GDA_FORWARDER,

    //   args: [
    //     ADDR.SUPER_TOKEN,
    //     address,
    //     '0xD6E2320592bf96f0FC273dE1750A6b2c77ecEd6E',
    //     calculateFlowratePerSecond({
    //       amountWei: BigInt(1e18),
    //       timeUnit: TIME_UNIT.month,
    //     }),
    //     '0x',
    //   ],
    // });

    // // const hash = await walletClient.writeContract({

    // // });
  };

  // const hash = await walletClient.writeContract({
  //   address: gdaForwarderAddress[mainnet.id],
  //   abi: gdaForwarderAbi,
  //   functionName: 'createPool',
  //   args: [
  //     '0x...', // Super Token address
  //     account.address, // Admin address
  //     keccak256(toHex('pool1')), // Pool ID
  //   ],
  // });

  return (
    <Stack gap="52">
      <Stack>Campaigns</Stack>
      <Button onClick={test}>Test</Button>
    </Stack>
  );
};
