import { Box, Group, Modal, Text, useMantineTheme } from '@mantine/core';
import { SwapUI } from '../SwapUI';
import { ADDR_PROD, NATIVE_TOKEN } from '../../const/addresses';
import { useUser } from '../../hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { getEthBalance } from '../../utils/reads';
import { Address } from 'viem';
import sdk from '@farcaster/miniapp-sdk';
import { truncateAddress } from '../../utils/common';
import { ExternalLink } from 'lucide-react';

export const SwapModal = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const { colors } = useMantineTheme();
  const { userBalance, address, refetchUserTokenData } = useUser();

  const { data: ethBalance, refetch: refetchEthBalance } = useQuery({
    queryKey: ['ethBalance', address],
    queryFn: async () => {
      return getEthBalance(address as Address);
    },
    enabled: !!address,
  });

  const seeContractAddress = () => {
    sdk.actions.openUrl(
      'https://basescan.org/address/0x22f1cd353441351911691ee4049c7b773abb1ecf'
    );
  };

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
            <Text fz={'xl'} fw={500} mb={6} c={colors.gray[0]}>
              Buy $BEAMR
            </Text>
            <Group
              gap={4}
              td="underline"
              style={{ cursor: 'pointer' }}
              onClick={seeContractAddress}
            >
              <Text>{truncateAddress(ADDR_PROD.SUPER_TOKEN)}</Text>
              <ExternalLink size={16} />
            </Group>
          </Box>
          <SwapUI
            defaultSell={'0.01'}
            onSuccess={() => {
              refetchEthBalance();
              refetchUserTokenData?.();
              close();
            }}
            canSwap={false}
            token1={{
              balance: ethBalance || 0n,
              symbol: 'ETH',
              address: NATIVE_TOKEN,
            }}
            token2={{
              balance: userBalance || 0n,
              symbol: 'BEAMR',
              address: ADDR_PROD.SUPER_TOKEN,
            }}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
