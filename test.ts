import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { baseSepolia } from 'viem/chains';
import { ADDR } from './src/const/addresses';
import { GDAForwarderAbi } from './src/abi/GDAFowarder';

import 'dotenv/config';

if (!process.env.PK) {
  throw new Error('Missing environment variable: PK');
}

if (!process.env.VITE_RPC) {
  throw new Error('Missing environment variable: VITE_RPC');
}

const account = privateKeyToAccount(process.env.PK as `0x${string}`);

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.VITE_RPC!),
});

const walletClient = createWalletClient({
  chain: baseSepolia,
  transport: http(process.env.VITE_RPC!),
  account,
});

const POOL_ADDRESS = '0x';

const main = async () => {
  const hash = await publicClient.simulateContract({
    address: ADDR.GDA,
    abi: GDAForwarderAbi,
    functionName: 'connectPool',
    args: [ADDR.SUPER_TOKEN, POOL_ADDRESS],
  });

  console.log('Transaction hash:', hash);
};

main();
