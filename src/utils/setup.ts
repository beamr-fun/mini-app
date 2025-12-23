import { base, baseSepolia } from 'viem/chains';

export const isDev = import.meta.env.VITE_ENV === 'dev';
export const isStaging = import.meta.env.VITE_ENV === 'staging';
export const isProd = import.meta.env.VITE_ENV === 'prod';
export const isTestnet = isDev;

export const network = isTestnet ? baseSepolia : base;

const envKeys = {
  rpc: import.meta.env.VITE_RPC,
  apiUrl: import.meta.env.VITE_API,
  indexerUrl: import.meta.env.VITE_INDEXER_URL,
};

Object.entries(envKeys).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

export const keys = envKeys as Record<keyof typeof envKeys, string>;
