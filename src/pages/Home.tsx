import { Button, Stack } from '@mantine/core';
import {
  gdaForwarderAbi,
  gdaForwarderAddress,
  superTokenAbi,
} from '@sfpro/sdk/abi';
import { ADDR, ADDR_DEV } from '../const/addresses';
import { optimismSepolia } from 'viem/chains';
import { useWalletClient } from 'wagmi';
import { publicClient } from '../utils/connect';
import { decodeEventLog } from 'viem';
import { useToken } from '../hooks/useToken';

export const Home = () => {
  const { data: walletClient } = useWalletClient();
  const { data: baseToken } = useToken({ address: ADDR.BASE_TOKEN });

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
              distributionFromAnyAddress: false,
              transferabilityForUnitsOwner: false,
            }, // Pool ID
          ],
        },
      ],
    });

    const decodedLogs = results[0]?.logs?.map((log) => {
      try {
        return decodeEventLog({
          abi: gdaForwarderAbi,
          data: log.data,
          topics: log.topics,
        });
      } catch (error) {
        // Log might be from a different contract or unknown event
        return { ...log, decoded: false };
      }
    });

    console.log('decodedLogs', decodedLogs);

    // const
    const hash = await walletClient.writeContract({
      address: gdaForwarderAddress[optimismSepolia.id],
      abi: gdaForwarderAbi,
      functionName: 'createPool',
      args: [
        ADDR_DEV.SUPER_TOKEN, // Super Token address
        ADDR_DEV.ADMIN, // Admin address
        {
          distributionFromAnyAddress: false,
          transferabilityForUnitsOwner: false,
        }, // Pool ID
      ],
    });
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
