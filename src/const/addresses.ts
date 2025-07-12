import { Address } from 'viem';

export const ADDR_DEV: Record<string, Address> = {
  BASE_TOKEN: '0x4247bA6C3658Fa5C0F523BAcea8D0b97aF1a175e',
  SUPER_TOKEN: '0xD6FAF98BeFA647403cc56bDB598690660D5257d2',
  ADMIN: '0x03Cea6242395f11c563b231dC32cEE06CFc93525',
} as const;

export const ADDR_PROD: Record<string, Address> = {
  BASE_TOKEN: '0x',
  SUPER_TOKEN: '0x',
  ADMIN: '0x',
} as const;

export const ADDR = import.meta.env.VITE_ENV === 'dev' ? ADDR_DEV : ADDR_PROD;
