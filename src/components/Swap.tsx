import {
  ActionIcon,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Modal,
  NumberInput,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import classes from '../styles/swap.module.css';
import { useInputState, useToggle } from '@mantine/hooks';
import { Arrow } from './Arrow';
import { ArrowDown } from 'lucide-react';
import { useState } from 'react';

export const Swap = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const { colors } = useMantineTheme();
  return (
    <Modal.Root opened={opened} onClose={onClose} fullScreen bg="black">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header mb={14}>
          <Modal.Title></Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Box mb={32}>
            <Text fz={'xl'} fw={500} mb={4} c={colors.gray[0]}>
              Get Beamr Tokens
            </Text>
            <Text>Add Beamr to your account to unlock full access</Text>
          </Box>

          <SwapUI
            token1={{
              balance: '1000',
              onChange: (e) => {},
              unit: 'ETH',
            }}
            token2={{
              balance: '0',
              onChange: (e) => {},
              unit: 'BEAMR',
            }}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

type SwapToken = {
  balance: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit: string;
};

type SwapCardProps = {
  orientation: 'From' | 'To';
  balance?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  unit: string;
};

const SwapUI = ({
  token1,
  token2,
  canSwap = true,
}: {
  token1: SwapToken;
  token2: SwapToken;
  canSwap?: boolean;
}) => {
  const [switched, setSwitched] = useState(false);
  const [token1Val, setToken1Val] = useInputState('0');
  const [token2Val, setToken2Val] = useInputState('0');
  const { colors } = useMantineTheme();

  const handleSwap = () => {
    // IF SWITCHED && CAN SWAP, SWAP TOKEN2 TO TOKEN1
  };

  return (
    <Box>
      <Flex
        gap="sm"
        direction={switched ? 'column-reverse' : 'column'}
        pos="relative"
        mb="md"
      >
        <SwapInputCard
          orientation={switched ? 'To' : 'From'}
          balance={token1.balance}
          onChange={setToken1Val}
          value={token1Val}
          unit={token1.unit}
        />
        <SwapInputCard
          orientation={switched ? 'From' : 'To'}
          balance={token2.balance}
          onChange={setToken2Val}
          value={token2Val}
          unit={token2.unit}
        />
        {canSwap && (
          <ActionIcon
            pos="absolute"
            top={'42%'}
            left={'42%'}
            bg={colors.gray[9]}
            onClick={() => setSwitched(!switched)}
          >
            <ArrowDown />
          </ActionIcon>
        )}
      </Flex>
      <Group justify="center">
        <Button size="lg" onClick={handleSwap}>
          Swap {switched ? token2.unit : token1.unit} to{' '}
          {switched ? token1.unit : token2.unit}
        </Button>
      </Group>
    </Box>
  );
};

const SwapInputCard = ({
  orientation,
  balance,
  onChange,
  value,
  unit,
}: SwapCardProps) => {
  return (
    <div className={classes.wrapper}>
      <label className={classes.label}>Swap {orientation}</label>
      <div className={classes.inner}>
        <input
          className={classes.input}
          type="number"
          min="0"
          value={value}
          onChange={onChange}
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
      <p className={classes.balance}>Balance: {balance}</p>
    </div>
  );
};
