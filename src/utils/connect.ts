import { http, createConfig } from 'wagmi';
import { base, optimismSepolia } from 'wagmi/chains';
import { createPublicClient } from 'viem';
import { isDev, network, RPC } from './setup';

export const config = createConfig({
  chains: isDev ? [optimismSepolia] : [base],
  transports: {
    [optimismSepolia.id]: http(),
    [base.id]: http(),
  },
  // connectors: [miniAppConnector()],
});

export const publicClient = createPublicClient({
  chain: network,
  transport: http(RPC),
});
