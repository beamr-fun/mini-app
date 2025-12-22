import { Box, Modal, Text, useMantineTheme } from '@mantine/core';
import { SwapUI } from '../SwapUI';
import { ADDR_PROD, NATIVE_TOKEN } from '../../const/addresses';

export const SwapModal = ({
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
        <Modal.Header>
          <Modal.Title></Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Box mb={24}>
            <Text fz={'xl'} fw={500} mb={4} c={colors.gray[0]}>
              Swap Tokens
            </Text>
            <Text>Add Beamr to your account to unlock full access</Text>
          </Box>
          <SwapUI
            defaultSell={'0.05'}
            token1={{
              balance: 100000000000000n,
              symbol: 'ETH',
              address: NATIVE_TOKEN,
            }}
            token2={{
              balance: 10000000000000000000n,
              symbol: 'BEAMR',
              address: ADDR_PROD.SUPER_TOKEN,
            }}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
