import { Box, Button, Stack, Text } from '@mantine/core';
import { gdaForwarderAbi, gdaPoolAbi, superTokenAbi } from '@sfpro/sdk/abi';
import GDAAbi from '../abi/GDA.json';
import SuperfluidAbi from '../abi/Superfluid.json';
import { calculateFlowratePerSecond } from '@sfpro/sdk/util';
import {
  prepareOperation,
  OPERATION_TYPE,
  TIME_UNIT,
} from '@sfpro/sdk/constant';
import { ADDR, ADDR_DEV } from '../const/addresses';
import { optimismSepolia } from 'viem/chains';
import { useAccount, useWalletClient } from 'wagmi';
import { publicClient } from '../utils/connect';
import {
  Address,
  createWalletClient,
  encodeFunctionData,
  formatUnits,
  http,
} from 'viem';
import { useToken } from '../hooks/useToken';
import { privateKeyToAccount } from 'viem/accounts';
import { API_URL } from '../utils/setup';
import { useSSE } from '../hooks/useSSE';

export const Home = () => {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const { connect, data } = useSSE<{
    status: string;
    poolAddress: Address | undefined;
  }>({
    url: `${API_URL}/pool/init/${address}`,
    auto: false,
  });
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

  const { data: wrappedToken } = useToken({
    tokenAddress: ADDR.SUPER_TOKEN,
    userAddress: address,
    // spender: ADDR.SUPER_TOKEN,
    calls: {
      balanceOf: true,
      totalSupply: true,
      name: true,
      symbol: true,
      decimals: true,
      // allowance: true,
    },
  });

  console.log('data', data);

  const runTest = async () => {
    if (!walletClient) {
      console.error('Wallet client is not available');
      return;
    }

    if (!address) {
      console.error('No address found in account');
      return;
    }

    // Pull private key from .env
    // THIS IS ONLY FOR TEST
    const admin = privateKeyToAccount(
      import.meta.env.VITE_PK_DELETE_BEFORE_PROD
    );

    // Run simulate to get the new pool address
    const { results } = await publicClient.simulateCalls({
      account: admin.address,
      calls: [
        {
          to: ADDR.GDA_FORWARDER,
          abi: gdaForwarderAbi,
          functionName: 'createPool',
          args: [
            ADDR_DEV.SUPER_TOKEN, // Super Token address
            ADDR_DEV.ADMIN, // Admin address
            {
              distributionFromAnyAddress: true,
              transferabilityForUnitsOwner: false,
            },
          ],
        },
      ],
    });

    // extract the new pool address from the results
    const newAddress = results[0]?.result?.[1];

    if (!newAddress) {
      console.error('No new address returned from simulateCalls');
      return;
    }
    console.log('newAddress', newAddress);

    console.log('*********** ADMIN FUNCTIONS ***********');

    const adminClient = createWalletClient({
      chain: optimismSepolia,
      transport: http(optimismSepolia.rpcUrls.default.http[0]),
      account: admin,
    });

    console.log('CREATE POOL');

    // Create the pool using the admin client
    const hash = await adminClient.writeContract({
      address: ADDR.GDA_FORWARDER,
      abi: gdaForwarderAbi,
      functionName: 'createPool',
      args: [
        ADDR.SUPER_TOKEN,
        adminClient.account.address,
        {
          distributionFromAnyAddress: true,
          transferabilityForUnitsOwner: false,
        },
      ],
    });

    console.log('hash', hash);
    console.log('newAddress', newAddress);

    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    console.log('receipt', receipt);

    console.log('UPDATE POOL');

    const hash2 = await adminClient.writeContract({
      abi: gdaPoolAbi,
      functionName: 'updateMemberUnits',
      address: newAddress,
      args: ['0x756ee8B8E898D497043c2320d9909f1DD5a7077F', 5n],
    });

    console.log('hash2', hash2);

    const receipt2 = await publicClient.waitForTransactionReceipt({
      hash: hash2,
    });

    console.log('************ USER FUNCTION ************');

    console.log('receipt2', receipt2);

    const hasAllowance =
      baseToken?.allowance && baseToken.allowance > BigInt(1e18);

    if (!hasAllowance) {
      console.error('Insufficient allowance for the super token upgrade');
      return;
    }

    console.log('hasAllowance', hasAllowance);
    console.log('allowance', baseToken?.allowance);

    const flowratePerSecond = calculateFlowratePerSecond({
      amountWei: BigInt(1e18),
      timeUnit: TIME_UNIT.month,
    });

    console.log('flowRate', flowratePerSecond);

    const operations = [
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
          abi: GDAAbi,
          functionName: 'distributeFlow',
          args: [
            ADDR.SUPER_TOKEN,
            address,
            newAddress,
            flowratePerSecond,
            '0x',
          ],
        }),
      }),
    ];

    const simulation = await publicClient.simulateContract({
      abi: SuperfluidAbi,
      account: address,
      address: ADDR.SUPER_FLUID,
      functionName: 'batchCall',

      args: [operations],
    });

    console.log('simulation', simulation);

    const gas = await publicClient.estimateContractGas({
      abi: SuperfluidAbi,
      address: ADDR.SUPER_FLUID,
      functionName: 'batchCall',
      args: [operations],
      account: address,
    });

    const gasWithBuffer = BigInt(Math.floor(Number(gas) * 1.2)); // Add a buffer of 20% to the estimated gas

    const hash3 = await walletClient.writeContract({
      abi: SuperfluidAbi,
      address: ADDR.SUPER_FLUID,
      functionName: 'batchCall',
      gas: gasWithBuffer,
      args: [operations],
    });

    console.log('hash3', hash3);

    const receipt3 = await publicClient.waitForTransactionReceipt({
      hash: hash3,
    });

    console.log('receipt3', receipt3);
  };

  const approve = async () => {
    if (!walletClient) {
      console.error('Wallet client is not available');
      return;
    }

    if (!address) {
      console.error('No address found in account');
      return;
    }

    const hash = await walletClient.writeContract({
      address: ADDR.BASE_TOKEN,
      abi: superTokenAbi,
      functionName: 'approve',

      args: [ADDR.SUPER_TOKEN, BigInt(10e18)],
    });

    console.log('Approval hash:', hash);
  };

  const testSSE = async () => {
    if (!walletClient) {
      console.error('Wallet client is not available');
      return;
    }

    if (!address) {
      console.error('No address found in account');
      return;
    }

    connect();
  };

  return (
    <Stack>
      <Box mb="40">
        <Button onClick={testSSE}>Run Test</Button>
        {data?.status && <Text fz="sm">{data?.status}</Text>}
      </Box>

      <Box>
        <Text>Underlying Token: {baseToken?.symbol || ''}</Text>
        <Text>
          Balance:{' '}
          {baseToken?.balanceOf && baseToken?.decimals
            ? formatUnits(baseToken?.balanceOf, baseToken?.decimals)
            : '0'}
        </Text>
        <Text mb="lg">
          Amt Approved:{' '}
          {baseToken?.allowance && baseToken?.decimals
            ? formatUnits(baseToken?.allowance, baseToken?.decimals)
            : '0'}{' '}
        </Text>
        <Text>Wrapped Token: {wrappedToken?.symbol || ''}</Text>
        <Text>
          Balance:{' '}
          {wrappedToken?.balanceOf && wrappedToken?.decimals
            ? formatUnits(wrappedToken?.balanceOf, wrappedToken?.decimals)
            : '0'}
        </Text>
      </Box>
      <Button onClick={approve}>Approve 10</Button>
    </Stack>
  );
};
