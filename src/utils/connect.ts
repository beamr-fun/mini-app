import { http, createConfig } from 'wagmi';
import { base, baseSepolia, optimismSepolia } from 'wagmi/chains';
import { createPublicClient } from 'viem';
import { isDev, network, keys } from './setup';
import miniAppConnector from '@farcaster/miniapp-wagmi-connector';

export const appChain = isDev ? baseSepolia : base;

export const config = createConfig({
  chains: [appChain],
  transports: {
    [baseSepolia.id]: http(keys.rpc),
    [base.id]: http(),
  },
  connectors: [miniAppConnector()],
});

export const publicClient = createPublicClient({
  chain: network,
  transport: http(keys.rpc),
});
