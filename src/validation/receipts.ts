import { User } from '@neynar/nodejs-sdk/build/api';
import { Address, isAddress } from 'viem';
import z from 'zod';

export enum ReceiptStatus {
  Pending = 'PENDING',
  Failed = 'FAILED',
  Submitted = 'SUBMITTED', // deprecated
  Posted = 'POSTED',
  Completed = 'COMPLETED',
  OnchainFail = 'ONCHAIN_FAIL',
}

const params = z.object({
  recipientAddress: z
    .string()
    .refine(isAddress, {
      message: 'Invalid recipient address format',
    })
    .transform((val) => val as Address),
  poolAddress: z
    .string()
    .refine(isAddress, {
      message: 'Invalid pool address format',
    })
    .transform((val) => val as Address),
  amount: z.string().regex(/^\d+$/, {
    message: 'Amount must be a valid number in wei',
  }),
  senderFid: z.number().int().positive(),
  recipientFid: z.number().int().positive(),
  receiptKey: z.string(),
});

const senderProfile = z.object({
  fid: z.number(),
  username: z.string(),
  display_nane: z.string().nullable(),
});

const beamReceiptSchema = z.object({
  id: z.string(),
  senderFid: z.number(),
  recipientFid: z.number(),
  poolAddress: z.string(),
  txHash: z.string().nullable(),
  params: params.nullable(),
  status: z.enum(ReceiptStatus),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const beamReceiptsSchema = z.array(beamReceiptSchema);

export type RawReceipt = z.infer<typeof beamReceiptSchema>;
export type BeamReceipt = RawReceipt & {
  senderProfile: User;
  recipientProfile: User;
};
