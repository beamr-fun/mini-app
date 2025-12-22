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
