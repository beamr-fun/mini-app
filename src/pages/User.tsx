import {
  Card,
  Group,
  Paper,
  SegmentedControl,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { PageLayout } from '../layouts/PageLayout';
import { useRef, useState } from 'react';

import { useDisclosure } from '@mantine/hooks';
import { useCTA } from '../hooks/useCTA';
import { Address, isAddress } from 'viem';
import { multiConnect } from '../utils/interactions';
import { useAccount, useWalletClient } from 'wagmi';
import { notifications } from '@mantine/notifications';
import { Sending } from '../components/User/Sending';
import { Receiving } from '../components/User/Receiving';
import { SwapModal } from '../components/User/SwapModal';
import { BalanceDisplay } from '../components/User/BalanceDisplay';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { charLimit, formatUnitBalance, truncateAddress } from '../utils/common';
import { BeamrHeadline } from '../components/BeamrHeadline';
import { usePoolAccount } from '../hooks/usePoolAccount';
import { UserX } from 'lucide-react';
import { BeamrNav } from '../components/svg/BeamrNav';

export const User = () => {
  const [tab, setTab] = useState('Sending');
  const [opened, { open, close }] = useDisclosure(false);
  const { data: walletClient } = useWalletClient();

  const { address } = useAccount();
  const [isLoadingConnect, setIsLoadingConnect] = useState(false);

  const [poolsToConnect, setPoolsToConnect] = useState<Address[]>([]);

  const hasToggledConnect = useRef(false);

  const { incomingOnly, userBalance } = useUser();
  const { notConnectedToPoolAddress, userPoolAddress } = usePoolAccount();

  const navigate = useNavigate();

  const { setCTA, cta } = useCTA();
  const { colors } = useMantineTheme();

  useCTA(
    cta && hasToggledConnect.current
      ? cta
      : {
          label:
            incomingOnly && !poolsToConnect.length
              ? 'Start Beaming'
              : undefined,
          onClick:
            incomingOnly && !poolsToConnect.length
              ? () => navigate('/create-pool/1')
              : undefined,
          extraDeps: [incomingOnly, poolsToConnect.length],
        }
  );

  const handleConnectStage = (poolId: string) => {
    if (!address || !walletClient) return;

    let newPools = [...poolsToConnect];

    if (poolId === undefined) return;

    if (!isAddress(poolId)) return;

    if (poolsToConnect.includes(poolId)) {
      newPools = newPools.filter((id) => id !== poolId);
    } else {
      newPools.push(poolId);
    }

    const EMPTY = {
      label: '',
      onClick: undefined,
      disabled: true,
      extraDeps: [incomingOnly, poolsToConnect.length],
    };

    if (newPools.length === 0) {
      setCTA(EMPTY);
    } else {
      setCTA({
        label: `Connect to ${newPools.length} Pool${newPools.length + 1 > 1 ? 's' : ''}`,
        onClick: () => {
          setIsLoadingConnect(true);
          multiConnect({
            poolIds: newPools,
            walletClient,
            userAddress: address,
            onLoading: () => {
              setCTA({
                label: 'Connecting...',
                onClick: () => {},
                disabled: true,
                extraDeps: [incomingOnly, poolsToConnect.length],
              });
            },
            onSuccess: () => {
              setIsLoadingConnect(false);
              setCTA(EMPTY);
              setPoolsToConnect([]);
            },
            onError: (errMsg: string) => {
              setIsLoadingConnect(false);
              setCTA(EMPTY);
              setPoolsToConnect([]);
              notifications.show({
                title: 'Error',
                message: charLimit(errMsg, 56) || 'Failed to connect to pools.',
                color: 'red',
              });
            },
          });
        },
        extraDeps: [incomingOnly, poolsToConnect.length],
      });
    }

    setPoolsToConnect(newPools);
    if (!hasToggledConnect.current) {
      hasToggledConnect.current = true;
    }
  };

  if (incomingOnly) {
    return (
      <PageLayout>
        <BeamrHeadline />
        <SwapModal opened={opened} onClose={close} />
        <BalanceDisplay openSwap={open} setTab={setTab} />
        <Card>
          <Receiving
            onConnectClick={handleConnectStage}
            poolsToConnect={poolsToConnect}
            isLoadingConnect={isLoadingConnect}
          />
        </Card>
      </PageLayout>
    );
  }

  if (notConnectedToPoolAddress) {
    return (
      <PageLayout>
        <BeamrHeadline />
        <Stack>
          <Paper>
            <Stack align="center" gap="sm">
              <UserX size={60} strokeWidth={1.5} />
              <Text fz={'lg'} mt="md" fw={500}>
                Re-connect to your main account
              </Text>
              <Text c={colors.gray[3]} ta="center">
                Your main account is {truncateAddress(userPoolAddress || '')}.
                Please re-connect to this account. (Usually requires refresh)
              </Text>
            </Stack>
          </Paper>
          <Paper p={'md'}>
            <Group gap={2} c={colors.gray[3]}>
              <BeamrNav size={18} />
              <Text mr={6}>Beamr</Text>
              <Text fw={500} fz={'lg'} c={colors.gray[0]} mr={'auto'}>
                {userBalance ? formatUnitBalance(userBalance, 18, 4) : '0'}
              </Text>
            </Group>
          </Paper>
        </Stack>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <BeamrHeadline />
      <SwapModal opened={opened} onClose={close} />
      <BalanceDisplay openSwap={open} setTab={setTab} />
      <Card>
        <SegmentedControl
          w="100%"
          value={tab}
          onChange={setTab}
          data={['Sending', 'Receiving']}
          mb="md"
        />
        {tab === 'Sending' && <Sending />}
        {tab === 'Receiving' && (
          <Receiving
            onConnectClick={handleConnectStage}
            poolsToConnect={poolsToConnect}
            isLoadingConnect={isLoadingConnect}
          />
        )}
      </Card>
    </PageLayout>
  );
};
