import { Button, Stack } from '@mantine/core';
import { OPERATION_TYPE } from '@sfpro/sdk/constant';
import { gdaForwarderAbi, gdaForwarderAddress } from '@sfpro/sdk/abi';
import { ADDR_DEV } from '../const/addresses';
import { optimismSepolia } from 'viem/chains';
import { useWalletClient } from 'wagmi';

export const Home = () => {
  const { data: walletClient } = useWalletClient();

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
    // const
    const hash = await walletClient.writeContract({
      address: gdaForwarderAddress[optimismSepolia.id],
      abi: gdaForwarderAbi,
      functionName: 'createPool',
      args: [
        ADDR_DEV.SUPER_TOKEN, // Super Token address
        ADDR_DEV.ADMIN, // Admin address
        {
          distributionFromAnyAddress: true,
          transferabilityForUnitsOwner: true,
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
      <Button onClick={test}>Create a Campaign</Button>
    </Stack>
  );
};
