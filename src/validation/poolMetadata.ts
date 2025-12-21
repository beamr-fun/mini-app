import { Address, isAddress } from 'viem';
import z from 'zod';

export const ONCHAIN_EVENT = 6969420n;

export enum PoolType {
  Unknown,
  Tip,
  Earn,
}

export const poolMetadataSchema = z.object({
  creatorFID: z.number().int(),
  poolType: z.enum(PoolType),
  displayName: z
    .string()
    .min(1, 'Display name must be at least 1 character long'),
  name: z.string().min(1, 'Pool name must be at least 1 character long'),
  description: z
    .string()
    .min(1, 'Pool description must be at least 1 character long')
    .optional(),
  castHash: z.string().optional(),
  instructions: z.string().optional(),
});

export type PoolMetadata = z.infer<typeof poolMetadataSchema>;

export const quoteSchema = z.object({
  chainId: z.string().regex(/^\d+$/, {
    message: 'chainId must be a valid number string',
  }),
  sellToken: z
    .string()
    .refine(isAddress, { message: 'Invalid sell token address' })
    .transform((val) => val as Address),
  buyToken: z
    .string()
    .refine(isAddress, { message: 'Invalid buy token address' })
    .transform((val) => val as Address),
  sellAmount: z
    .string()
    .regex(/^\d+$/, {
      message: 'Sell amount must be a valid number string in wei',
    })
    .optional(),
  buyAmount: z
    .string()
    .regex(/^\d+$/, {
      message: 'Buy amount must be a valid number string in wei',
    })
    .optional(),
  taker: z
    .string()
    .refine(isAddress, { message: 'Invalid taker address' })
    .transform((val) => val as Address),
});
