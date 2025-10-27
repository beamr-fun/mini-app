import { base, baseSepolia } from 'viem/chains';

export const isDev = import.meta.env.VITE_ENV === 'dev';
export const isAPIDev = import.meta.env.VITE_API_ENV === 'dev';

export const network = isDev ? baseSepolia : base;

const rpc = isDev
  ? import.meta.env.VITE_RPC_DEV
  : import.meta.env.VITE_RPC_PROD;

const apiUrl = isAPIDev
  ? import.meta.env.VITE_API_DEV
  : import.meta.env.VITE_API_PROD;

const indexerUrl = import.meta.env.VITE_INDEXER_URL;

const envKeys = {
  rpc,
  apiUrl,
  indexerUrl,
};

Object.entries(envKeys).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

export const keys = envKeys as Record<keyof typeof envKeys, string>;
