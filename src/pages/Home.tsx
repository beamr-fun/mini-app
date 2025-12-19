import { Card, Image, SegmentedControl } from '@mantine/core';
import { PageLayout } from '../layouts/PageLayout';
import beamrLogo from '../assets/beamrLogo.png';
import { useState } from 'react';

import { useDisclosure } from '@mantine/hooks';
import { useCTA } from '../hooks/useCTA';
import { Address, isAddress } from 'viem';
import { multiConnect } from '../utils/interactions';
import { useAccount, useWalletClient } from 'wagmi';
import { notifications } from '@mantine/notifications';
import { Sending } from '../components/Home/Sending';
import { Receiving } from '../components/Home/Receiving';
import { SwapModal } from '../components/Home/SwapModal';
import { BalanceDisplay } from '../components/Home/BalanceDisplay';

export const Home = () => {
  const [tab, setTab] = useState('Sending');
  const [opened, { open, close }] = useDisclosure(false);
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [isLoadingConnect, setIsLoadingConnect] = useState(false);

  const [poolsToConnect, setPoolsToConnect] = useState<Address[]>([]);

  const { setCTA } = useCTA();

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

    if (newPools.length === 0) {
      setCTA(null);
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
              });
            },
            onSuccess: () => {
              setIsLoadingConnect(false);
              setCTA(null);
              setPoolsToConnect([]);
            },
            onError: (errMsg: string) => {
              setIsLoadingConnect(false);
              setCTA(null);
              setPoolsToConnect([]);
              notifications.show({
                title: 'Error',
                message: errMsg || 'Failed to connect to pools.',
                color: 'red',
              });
            },
          });
        },
      });
    }

    setPoolsToConnect(newPools);
  };

  return (
    <PageLayout>
      <Image
        src={beamrLogo}
        alt="Beamr Logo"
        width={80}
        height={80}
        mb="xl"
        fit="contain"
      />

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
