import { Address, Hex, isAddress } from 'viem';
import z from 'zod';

export const quoteRequestSchema = z.object({
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
  sellAmount: z.string().regex(/^\d+$/, {
    message: 'Sell amount must be a valid number string in wei',
  }),
  taker: z
    .string()
    .refine(isAddress, { message: 'Invalid taker address' })
    .transform((val) => val as Address),
});

export type QuoteRequestParams = z.infer<typeof quoteRequestSchema>;

export const quoteResponseSchema = z.object({
  sellAmount: z.string(),
  buyAmount: z.string(),
  transaction: z.object({
    to: z
      .string()
      .refine(isAddress, { message: 'Invalid address' })
      .transform((val) => val as Address),
    data: z
      .string()
      .regex(/^0x[0-9a-fA-F]*$/, { message: 'Invalid hex data' })
      .transform((val) => val as Hex),
    value: z.string(),
    gas: z.string(),
    gasPrice: z.string(),
  }),
});

export type QuoteResponse = z.infer<typeof quoteResponseSchema>;
