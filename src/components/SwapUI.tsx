import { useEffect, useState } from 'react';
import classes from '../styles/swap.module.css';
import { useDebouncedValue } from '@mantine/hooks';
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  useMantineTheme,
} from '@mantine/core';
import { ArrowDown, InfoIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { charLimit, formatUnitBalance } from '../utils/common';
import { formatUnits, parseUnits } from 'viem';
import { getQuote } from '../utils/api';
import { base } from 'viem/chains';
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { BEAM_MIN } from '../const/params';
import { QuoteResponse } from '../validation/swap';
import { notifications } from '@mantine/notifications';
import { useOnboard } from '../hooks/useOnboard';

type SwapToken = {
  balance: bigint;
  symbol: string;
  address: `0x${string}`;
};

export const SwapUI = ({
  token1,
  token2,
  canSwap = true,
  defaultSell,
  onSuccess,
}: {
  token1: SwapToken;
  token2: SwapToken;
  canSwap?: boolean;
  defaultSell: string;
  onSuccess?: () => void;
}) => {
  const [switched, setSwitched] = useState(false);
  const [token1Val, setToken1Val] = useState<string>(defaultSell.toString());
  const [debouncedVal] = useDebouncedValue<string>(token1Val, 500);

  const { colors } = useMantineTheme();
  const { address } = useAccount();

  const { data: zeroXRes, isLoading } = useQuery({
    queryKey: ['user-quote', { sellAmount: debouncedVal }],
    enabled: !!debouncedVal,
    queryFn: async (): Promise<{
      quote: QuoteResponse | null;
      buyAmount: string | null;
    }> => {
      if (!debouncedVal)
        return {
          quote: null,
          buyAmount: debouncedVal,
        };

      if (Number(debouncedVal) === 0) return { buyAmount: '0', quote: null };

      const quote = await getQuote({
        chainId: base.id.toString(),
        sellToken: token1.address,
        buyToken: token2.address,
        sellAmount: parseUnits(debouncedVal, 18).toString(),
        taker: address as `0x${string}`,
      });

      const buyAmount = Number(
        formatUnits(BigInt(quote.buyAmount), 18)
      ).toFixed(2);
      return {
        quote,
        buyAmount,
      };
    },
  });

  const { buyAmount, quote } = zeroXRes || {};

  const {
    sendTransaction,
    data: txHash,
    isPending: isSending,
    error: sendError,
  } = useSendTransaction();

  const {
    isLoading: isConfirming,
    isSuccess,
    isError,
    error,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (isSuccess) {
      notifications.show({
        title: 'Transaction Successful',
        message: 'Your swap has been completed successfully.',
        color: 'green',
      });
      onSuccess?.();
    }

    if (isError && error) {
      console.error('Transaction Error:', error);
      notifications.show({
        title: 'Transaction Error',
        message: charLimit(
          error?.message || 'An error occurred during the transaction.',
          56
        ),
        color: 'red',
      });
    }

    if (error) {
      console.error('Send Transaction Error:', error);
      notifications.show({
        title: 'Transaction Error',
        message: charLimit(
          error?.message || 'An error occurred while sending the transaction.',
          56
        ),
        color: 'red',
      });
    }
  }, [isSuccess, isError, error, sendError]);

  const handleSwap = () => {
    try {
      if (!quote || !address || !quote.transaction) {
        throw new Error('Invalid quote or user address.');
      }

      sendTransaction({
        to: quote.transaction.to,
        data: quote.transaction.data,
        value: quote.transaction.value
          ? BigInt(quote.transaction.value)
          : BigInt(0),
        ...(quote.transaction.gas
          ? { gas: BigInt(quote.transaction.gas) }
          : {}),
      });
    } catch (error: any) {
      console.error('Swap Error:', error);
      notifications.show({
        title: 'Swap Error',
        message: charLimit(
          error?.message || 'An error occurred while processing the swap.',
          56
        ),
        color: 'red',
      });
    }
  };

  const amountExceedsBalance =
    token1Val && BigInt(parseUnits(token1Val || '0', 18)) > token1.balance
      ? true
      : false;

  const amountUnderMonthFlow =
    buyAmount &&
    parseUnits(buyAmount || '0', 18) < parseUnits(BEAM_MIN.toString(), 18);

  const noBuyAmount = !buyAmount || buyAmount === '0';

  const getButtonText = () => {
    if (isSending) {
      return 'Confirming...';
    }

    if (isConfirming) {
      return 'Processing...';
    }

    if (amountExceedsBalance) {
      return 'Insufficient Balance';
    }

    return 'Buy BEAMR';
  };

  return (
    <Box>
      <Flex
        gap="4"
        direction={switched ? 'column-reverse' : 'column'}
        pos="relative"
        mb="md"
      >
        <SwapInputCard
          orientation={switched ? 'To' : 'From'}
          balance={token1.balance}
          onChange={setToken1Val}
          value={token1Val ? token1Val : '0'}
          unit={token1.symbol}
          // error={}
        />
        <Box pos="relative">
          {canSwap && (
            <ActionIcon
              pos="absolute"
              top={-20}
              style={{ zIndex: 1 }}
              left={'42%'}
              bg={colors.gray[9]}
              onClick={() => setSwitched(!switched)}
            >
              <ArrowDown />
            </ActionIcon>
          )}
        </Box>
        <SwapInputCard
          orientation={switched ? 'From' : 'To'}
          balance={token2.balance}
          onChange={() => {}}
          value={buyAmount || '0'}
          unit={token2.symbol}
          // error={token2Err}
          viewOnly={canSwap === false}
        />
      </Flex>
      {amountExceedsBalance && (
        <Group gap={2} m="sm">
          <InfoIcon size={16} color={colors.red[7]} />
          <p className={classes.error}>
            {token1.symbol} amount exceeds balance
          </p>
        </Group>
      )}
      {amountUnderMonthFlow && (
        <Group gap={2} m="sm">
          <InfoIcon size={16} color={colors.yellow[7]} />
          <p className={classes.warn}>
            The minimum pool stream is 6M $BEAMR/mo
          </p>
        </Group>
      )}
      <Group justify="center" mt="xl">
        <Button
          size="lg"
          onClick={handleSwap}
          loading={isLoading}
          disabled={
            amountExceedsBalance ||
            noBuyAmount ||
            isLoading ||
            isSending ||
            isConfirming
          }
        >
          {getButtonText()}
        </Button>
      </Group>
    </Box>
  );
};

type SwapCardProps = {
  orientation: 'From' | 'To';
  balance?: bigint;
  onChange: (e: string) => void;
  value: string;
  unit: string;
  error?: string | null;
  viewOnly?: boolean;
};

const SwapInputCard = ({
  orientation,
  balance,
  onChange,
  value,
  unit,
  error,
  viewOnly = false,
}: SwapCardProps) => {
  return (
    <div className={classes.wrapper} data-error={error ? 'true' : 'false'}>
      <label className={classes.label}>
        {orientation === 'From' ? 'Sell' : 'Buy'}{' '}
      </label>
      <div className={classes.inner}>
        <input
          className={classes.input}
          type="number"
          min="0"
          value={value}
          onChange={(e) => {
            onChange(e.target.value as string);
          }}
          style={{
            pointerEvents: viewOnly ? 'none' : 'auto',
            cursor: viewOnly ? 'not-allowed' : 'auto',
          }}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;

            if (isNaN(Number(target.value))) {
              target.value = '0';
            }
            if (Number(target.value) < 0) {
              target.value = '0';
            }
          }}
        />
        <p className={classes.unit}>{unit}</p>
      </div>
      <p className={classes.balance}>
        Balance: {balance ? formatUnitBalance(balance, 18, 6) : '0'}
      </p>
      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
};
