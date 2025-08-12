import { http, createConfig } from 'wagmi';
import { base, baseSepolia, optimismSepolia } from 'wagmi/chains';
import { createPublicClient } from 'viem';
import { isDev, network, RPC } from './setup';
import miniAppConnector from '@farcaster/miniapp-wagmi-connector';

export const appChain = isDev ? baseSepolia : base;

export const config = createConfig({
  chains: [appChain],
  transports: {
    [baseSepolia.id]: http(RPC),
    [base.id]: http(),
  },
  connectors: [miniAppConnector()],
});

export const publicClient = createPublicClient({
  chain: network,
  transport: http(RPC),
});
