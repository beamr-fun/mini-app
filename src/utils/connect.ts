import { http, createConfig } from 'wagmi';
import { base, optimismSepolia } from 'wagmi/chains';
import { createPublicClient } from 'viem';
import { isDev, network, RPC } from './setup';
import miniAppConnector from '@farcaster/miniapp-wagmi-connector';

export const config = createConfig({
  chains: isDev ? [optimismSepolia] : [base],
  transports: {
    [optimismSepolia.id]: http(RPC),
    [base.id]: http(),
  },
  connectors: [miniAppConnector()],
});

export const publicClient = createPublicClient({
  chain: network,
  transport: http(RPC),
});
