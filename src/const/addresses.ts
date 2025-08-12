import { gdaForwarderAddress } from '@sfpro/sdk/abi';
import { Address } from 'viem';
import { base } from 'viem/chains';

export const ADDR_DEV: Record<string, Address> = {
  SUPER_TOKEN: '0x19A30530209342cB2D94aD2693983A5cF7B77b79',
  ADMIN: '0x03Cea6242395f11c563b231dC32cEE06CFc93525',
  GDA_FORWARDER: '0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08',
  GDA: '0x53F4f44C813Dc380182d0b2b67fe5832A12B97f8',
  SUPER_FLUID: '0x109412E3C84f0539b43d39dB691B08c90f58dC7c',
} as const;

export const ADDR_PROD: Record<string, Address> = {
  BASE_TOKEN: '0x',
  SUPER_TOKEN: '0x',
  ADMIN: '0x',
  GDA_FORWARDER: gdaForwarderAddress[base.id],
} as const;

export const ADDR = import.meta.env.VITE_ENV === 'dev' ? ADDR_DEV : ADDR_PROD;
