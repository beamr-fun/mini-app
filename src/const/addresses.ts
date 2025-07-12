import { gdaForwarderAddress } from '@sfpro/sdk/abi';
import { Address } from 'viem';
import { base, optimismSepolia } from 'viem/chains';

export const ADDR_DEV: Record<string, Address> = {
  BASE_TOKEN: '0x4247bA6C3658Fa5C0F523BAcea8D0b97aF1a175e',
  SUPER_TOKEN: '0xD6FAF98BeFA647403cc56bDB598690660D5257d2',
  ADMIN: '0x03Cea6242395f11c563b231dC32cEE06CFc93525',
  GDA_FORWARDER: gdaForwarderAddress[optimismSepolia.id],
  GDA: '0xd453d38A001B47271488886532f1CCeAbf0c7eF3',
  SUPER_FLUID: '0xd399e2Fb5f4cf3722a11F65b88FAB6B2B8621005',
} as const;

export const ADDR_PROD: Record<string, Address> = {
  BASE_TOKEN: '0x',
  SUPER_TOKEN: '0x',
  ADMIN: '0x',
  GDA_FORWARDER: gdaForwarderAddress[base.id],
} as const;

export const ADDR = import.meta.env.VITE_ENV === 'dev' ? ADDR_DEV : ADDR_PROD;
