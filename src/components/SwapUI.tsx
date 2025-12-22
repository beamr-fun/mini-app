import { useState } from 'react';
import classes from '../styles/swap.module.css';
import { useDebouncedValue, useInputState } from '@mantine/hooks';
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  useMantineTheme,
} from '@mantine/core';
import { ArrowDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { formatUnitBalance } from '../utils/common';
import { formatUnits, parseUnits } from 'viem';
import { getQuote } from '../utils/api';
import { base } from 'viem/chains';
import { useAccount } from 'wagmi';

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
}: {
  token1: SwapToken;
  token2: SwapToken;
  canSwap?: boolean;
  defaultSell: string;
}) => {
  const [switched, setSwitched] = useState(false);
  const [token1Val, setToken1Val] = useState<string>(defaultSell.toString());
  const [debouncedVal] = useDebouncedValue<string>(token1Val, 500);
  // const [token2Val, setToken2Val] = useState<string>('0');
  const [token1Err, setToken1Err] = useState('');
  const [token2Err, setToken2Err] = useState('');

  const [formError, setFormError] = useState('');
  const { colors } = useMantineTheme();
  const { address } = useAccount();

  const { data: buyAmount, isLoading } = useQuery({
    queryKey: ['user-quote', { sellAmount: debouncedVal }],
    enabled: !!debouncedVal,

    queryFn: async () => {
      if (!debouncedVal) return debouncedVal;

      if (Number(debouncedVal) === 0) return '0';

      const sellTokenInUnits = parseUnits(debouncedVal, 18);

      console.log('sellTokenInUnits', sellTokenInUnits);

      const quote = await getQuote({
        chainId: base.id.toString(),
        sellToken: token1.address,
        buyToken: token2.address,
        sellAmount: parseUnits(debouncedVal, 18).toString(),
        taker: address as `0x${string}`,
      });

      return formatUnits(quote.data.buyAmount, 18) as string;
    },
  });

  const handleSwap = () => {
    // IF SWITCHED && CAN SWAP, SWAP TOKEN2 TO TOKEN1
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
          error={token1Err}
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
          error={token2Err}
          viewOnly={canSwap === false}
        />
      </Flex>
      {formError && <p className={classes.error}>{formError}</p>}
      <Group justify="center">
        <Button size="lg" onClick={handleSwap} loading={isLoading}>
          Buy {switched ? token1.symbol : token2.symbol}
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
