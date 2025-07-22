import { useAccount } from 'wagmi';
import { Address } from 'viem';
import { API_URL } from '../utils/setup';
import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import { Box, Button, Stack, Text, Title } from '@mantine/core';

export const Home = () => {
  const { address } = useAccount();
  const {
    socket,
    pool,
    incomingBeams,
    outgoingBeams,
    isPoolLoading,
    poolLoadErrors,
    isSocketConnected,
    hasPool,
  } = useUser();
  const [initData, setInitData] = useState<{
    status: string;
    poolAddress: Address | undefined;
    error: string | null;
  } | null>(null);

  const testInitPool = async () => {
    if (!address) {
      console.error('No address found in account');
      return;
    }

    const url = `${API_URL}/pool/init/${address}`;

    try {
      const res = await fetch(url, { method: 'POST' });

      const json = await res.json();
    } catch (error) {
      console.error('Error initializing pool:', error);
    }
  };

  // const runTest = async () => {
  //   if (!walletClient) {
  //     console.error('Wallet client is not available');
  //     return;
  //   }

  //   if (!address) {
  //     console.error('No address found in account');
  //     return;
  //   }

  //   // Pull private key from .env
  //   // THIS IS ONLY FOR TEST
  //   const admin = privateKeyToAccount(
  //     import.meta.env.VITE_PK_DELETE_BEFORE_PROD
  //   );

  //   // Run simulate to get the new pool address
  //   const { results } = await publicClient.simulateCalls({
  //     account: admin.address,
  //     calls: [
  //       {
  //         to: ADDR.GDA_FORWARDER,
  //         abi: gdaForwarderAbi,
  //         functionName: 'createPool',
  //         args: [
  //           ADDR_DEV.SUPER_TOKEN, // Super Token address
  //           ADDR_DEV.ADMIN, // Admin address
  //           {
  //             distributionFromAnyAddress: true,
  //             transferabilityForUnitsOwner: false,
  //           },
  //         ],
  //       },
  //     ],
  //   });

  //   // extract the new pool address from the results
  //   const newAddress = results[0]?.result?.[1];

  //   if (!newAddress) {
  //     console.error('No new address returned from simulateCalls');
  //     return;
  //   }
  //   console.log('newAddress', newAddress);

  //   console.log('*********** ADMIN FUNCTIONS ***********');

  //   const adminClient = createWalletClient({
  //     chain: optimismSepolia,
  //     transport: http(optimismSepolia.rpcUrls.default.http[0]),
  //     account: admin,
  //   });

  //   console.log('CREATE POOL');

  //   // Create the pool using the admin client
  //   const hash = await adminClient.writeContract({
  //     address: ADDR.GDA_FORWARDER,
  //     abi: gdaForwarderAbi,
  //     functionName: 'createPool',
  //     args: [
  //       ADDR.SUPER_TOKEN,
  //       adminClient.account.address,
  //       {
  //         distributionFromAnyAddress: true,
  //         transferabilityForUnitsOwner: false,
  //       },
  //     ],
  //   });

  //   console.log('hash', hash);
  //   console.log('newAddress', newAddress);

  //   const receipt = await publicClient.waitForTransactionReceipt({ hash });

  //   console.log('receipt', receipt);

  //   console.log('UPDATE POOL');

  //   const hash2 = await adminClient.writeContract({
  //     abi: gdaPoolAbi,
  //     functionName: 'updateMemberUnits',
  //     address: newAddress,
  //     args: ['0x756ee8B8E898D497043c2320d9909f1DD5a7077F', 5n],
  //   });

  //   console.log('hash2', hash2);

  //   const receipt2 = await publicClient.waitForTransactionReceipt({
  //     hash: hash2,
  //   });

  //   console.log('************ USER FUNCTION ************');

  //   console.log('receipt2', receipt2);

  //   const hasAllowance =
  //     baseToken?.allowance && baseToken.allowance > BigInt(1e18);

  //   if (!hasAllowance) {
  //     console.error('Insufficient allowance for the super token upgrade');
  //     return;
  //   }

  //   console.log('hasAllowance', hasAllowance);
  //   console.log('allowance', baseToken?.allowance);

  //   const flowratePerSecond = calculateFlowratePerSecond({
  //     amountWei: BigInt(1e18),
  //     timeUnit: TIME_UNIT.month,
  //   });

  //   console.log('flowRate', flowratePerSecond);

  //   const operations = [
  //     prepareOperation({
  //       operationType: OPERATION_TYPE.SUPERTOKEN_UPGRADE,
  //       target: ADDR.SUPER_TOKEN,
  //       data: encodeFunctionData({
  //         abi: superTokenAbi,
  //         functionName: 'upgrade',
  //         args: [BigInt(1e18)],
  //       }),
  //     }),
  //     prepareOperation({
  //       operationType: OPERATION_TYPE.SUPERFLUID_CALL_AGREEMENT,
  //       target: ADDR.GDA,
  //       data: encodeFunctionData({
  //         abi: GDAAbi,
  //         functionName: 'distributeFlow',
  //         args: [
  //           ADDR.SUPER_TOKEN,
  //           address,
  //           newAddress,
  //           flowratePerSecond,
  //           '0x',
  //         ],
  //       }),
  //     }),
  //   ];

  //   const simulation = await publicClient.simulateContract({
  //     abi: SuperfluidAbi,
  //     account: address,
  //     address: ADDR.SUPER_FLUID,
  //     functionName: 'batchCall',

  //     args: [operations],
  //   });

  //   console.log('simulation', simulation);

  //   const gas = await publicClient.estimateContractGas({
  //     abi: SuperfluidAbi,
  //     address: ADDR.SUPER_FLUID,
  //     functionName: 'batchCall',
  //     args: [operations],
  //     account: address,
  //   });

  //   const gasWithBuffer = BigInt(Math.floor(Number(gas) * 1.2)); // Add a buffer of 20% to the estimated gas

  //   const hash3 = await walletClient.writeContract({
  //     abi: SuperfluidAbi,
  //     address: ADDR.SUPER_FLUID,
  //     functionName: 'batchCall',
  //     gas: gasWithBuffer,
  //     args: [operations],
  //   });

  //   console.log('hash3', hash3);

  //   const receipt3 = await publicClient.waitForTransactionReceipt({
  //     hash: hash3,
  //   });

  //   console.log('receipt3', receipt3);
  // };

  if (!isPoolLoading && address && pool) {
    return (
      <Stack w="100%" h="100%" justify="space-between">
        <Box>
          <Stack>
            <Title order={1} ta={'center'} fz="18" c="dark.3" fw="700">
              Your Pool
            </Title>

            <OutgoingBeams />
          </Stack>
        </Box>
        <Box>
          <Text fz="sm" fw="600" c="dark.2" mb="4">
            Incoming Beams
          </Text>
          <Box h="225px" bg="dark.6"></Box>
        </Box>
      </Stack>
    );
  }

  if (!isPoolLoading && (!address || !pool)) {
    if (incomingBeams && incomingBeams?.length > 0) {
      return (
        <Stack w="100%" h="100%" justify="space-between">
          <Box>
            <Stack>
              <GlobalFeed />
              <IncomingBeams />
            </Stack>
          </Box>
          {!address && (
            <Button mt="lg" size="lg" w="100%" variant="default">
              Connect Wallet
            </Button>
          )}
          {!pool && (
            <Button mt="lg" size="lg" w="100%" variant="default">
              Start Beaming
            </Button>
          )}
        </Stack>
      );
    }

    return (
      <Stack w="100%" h="100%" justify="space-between">
        <Box>
          <Stack>
            <GlobalFeed extended />
          </Stack>
          {!address && (
            <Button mt="lg" size="lg" w="100%" variant="default">
              Connect Wallet
            </Button>
          )}
        </Box>
        {!pool && (
          <Button mt="lg" size="lg" w="100%" variant="default">
            Start Beaming
          </Button>
        )}
      </Stack>
    );
  }

  // IF the user is connected, we'll show their pool,
};

const GlobalFeed = ({ extended = false }: { extended?: boolean }) => {
  return (
    <Box>
      <Text fz="sm" fw="600" c="dark.2" mb="4">
        Who's beaming who?
      </Text>
      <Box h={extended ? '400px' : '225px'} bg="dark.6"></Box>
    </Box>
  );
};

const IncomingBeams = () => {
  return (
    <Box>
      <Text fz="sm" fw="600" c="dark.2" mb="4">
        Incoming Beams
      </Text>
      <Box h="225px" bg="dark.6"></Box>
    </Box>
  );
};

const OutgoingBeams = () => {
  return (
    <Box>
      <Text fz="sm" fw="600" c="dark.2" mb="4">
        Outgoing Beams
      </Text>
      <Box h="225px" bg="dark.6"></Box>
    </Box>
  );
};
