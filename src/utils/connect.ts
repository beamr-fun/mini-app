import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { createPublicClient } from 'viem';
import { network, keys } from './setup';
import miniAppConnector from '@farcaster/miniapp-wagmi-connector';

export const config = createConfig({
  chains: [network],
  transports: {
    [baseSepolia.id]: http(keys.rpc),
    [base.id]: http(keys.rpc),
  },
  connectors: [miniAppConnector()],
});

export const publicClient = createPublicClient({
  chain: network,
  transport: http(keys.rpc),
});
