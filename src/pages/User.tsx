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
import { charLimit } from '../utils/common';
import { BeamrHeadline } from '../components/BeamrHeadline';
import { usePoolAccount } from '../hooks/usePoolAccount';
import {
  NotPoolAddressDisplay,
  NotPrimaryDisplay,
} from '../components/User/WrongAddressDisplay';

export const User = () => {
  const [tab, setTab] = useState('Sending');
  const [opened, { open, close }] = useDisclosure(false);
  const { data: walletClient } = useWalletClient();

  const { address } = useAccount();
  const [isLoadingConnect, setIsLoadingConnect] = useState(false);

  const [poolsToConnect, setPoolsToConnect] = useState<Address[]>([]);

  const hasToggledConnect = useRef(false);

  const { incomingOnly, userBalance, user } = useUser();
  const { notConnectedToPoolAddress, userPoolAddress } = usePoolAccount();

  const navigate = useNavigate();

  const { setCTA, cta } = useCTA();

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
    const primary = user?.verified_addresses?.primary.eth_address || null;

    const isPrimaryAddress = primary?.toLowerCase() === address?.toLowerCase();

    if (!isPrimaryAddress) {
      return <NotPrimaryDisplay primaryAddress={primary} />;
    }

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
    return <NotPoolAddressDisplay userPoolAddress={userPoolAddress} />;
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
