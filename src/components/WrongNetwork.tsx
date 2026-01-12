import { PageLayout } from '../layouts/PageLayout';
import { BeamrHeadline } from './BeamrHeadline';
import { Button, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import { ZapOff } from 'lucide-react';
import { useSwitchChain } from 'wagmi';
import { network } from '../utils/setup';
import { notifications } from '@mantine/notifications';

export const WrongNetwork = () => {
  const { colors } = useMantineTheme();
  const { switchChainAsync } = useSwitchChain();

  const handleSwitchNetwork = async () => {
    try {
      await switchChainAsync({ chainId: network.id });
    } catch (error) {
      notifications.show({
        title: 'Network Switch Failed',
        message: 'Try refreshing the network manually.',
        color: 'red',
      });
      console.error('Error switching network:', error);
    }
  };

  return (
    <PageLayout>
      <BeamrHeadline />
      <Paper>
        <Stack align="center" gap="sm">
          <ZapOff size={60} strokeWidth={1.5} />
          <Text fz={'lg'} mt="md" fw={500}>
            Wrong Chain Connected
          </Text>
          <Text c={colors.gray[3]} ta="center" mb="lg">
            Beamr is built on Base. Please switch your wallet to get started.
          </Text>
          <Button onClick={handleSwitchNetwork}>Switch To Base</Button>
        </Stack>
      </Paper>
    </PageLayout>
  );
};
