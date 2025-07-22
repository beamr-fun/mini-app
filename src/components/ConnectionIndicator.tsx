import { useAccount } from 'wagmi';
import { useUser } from '../hooks/useUser';
import { useMiniAppContext } from '../hooks/useMiniAppContext';
import { Avatar, Group, Tooltip } from '@mantine/core';
import { Radio } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const ConnectionIndicator = () => {
  const { userFC, isMiniApp, isSocketConnected } = useUser();
  const { isConnected } = useAccount();
  const { isLoading } = useMiniAppContext();

  const [forceOpened, setForceOpened] = useState(false);

  const isFarcaster = userFC && isMiniApp;
  const isFarcasterAndDisconnected = isFarcaster && !isSocketConnected;
  const isOutsideFarcaster = !isFarcaster && isConnected;

  const isOutsideFarcasterAndDisconnected =
    isOutsideFarcaster && !isSocketConnected;

  const wasConnected = useRef(false);

  const message = isLoading
    ? ''
    : isFarcasterAndDisconnected
      ? 'Disconnected from Server'
      : isFarcaster
        ? 'Connected to Farcaster'
        : isOutsideFarcasterAndDisconnected
          ? 'Disconnected'
          : isOutsideFarcaster
            ? 'Running outside Farcaster'
            : 'Wallet not connected';

  const color = isLoading
    ? 'gray'
    : isFarcasterAndDisconnected
      ? 'red'
      : isFarcaster
        ? 'green'
        : isOutsideFarcasterAndDisconnected
          ? 'red'
          : isOutsideFarcaster
            ? 'yellow'
            : 'red';

  useEffect(() => {
    if (color === 'green' || color === 'yellow') {
      if (!wasConnected.current) {
        wasConnected.current = true;
      }
    }

    if (color === 'red' && wasConnected.current) {
      wasConnected.current = false;
      setForceOpened(true);

      setTimeout(() => {
        setForceOpened(false);
      }, 3000);
    }
  }, [color]);

  const tooltipProps = forceOpened ? { opened: true } : {};

  return (
    <Group gap="4">
      <Tooltip label={message} {...tooltipProps}>
        <Avatar bg={color} size="8" />
      </Tooltip>
      <Radio size={16} strokeWidth="1.2px" />
    </Group>
  );
};
