import {
  Box,
  Card,
  Modal,
  NumberInput,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import classes from '../styles/swap.module.css';

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
          <Stack gap="sm">
            <SwapInputCard />
            <SwapInputCard />
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

const SwapInputCard = ({
  orientation,
  balance,
  value,
}: {
  value: string;
  onChange: (value: string) => void;
  orientation: 'From' | 'To';
  balance?: string;
}) => {
  return (
    <div className={classes.wrapper}>
      <label className={classes.label}>Swap {orientation}</label>
      <div className={classes.inner}>
        <input
          className={classes.input}
          defaultValue={'0'}
          type="number"
          min="0"
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            if (Number(target.value) < 0) {
              target.value = '0';
            }
          }}
        />
        <p className={classes.unit}>ETH</p>
      </div>
      <p className={classes.balance}>Balance:{}</p>
    </div>
  );
};
