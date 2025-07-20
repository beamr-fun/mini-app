import { useAccount } from 'wagmi';
import { useUser } from '../hooks/useUser';
import { useMiniAppContext } from '../hooks/useMiniAppContext';
import { Avatar, Tooltip } from '@mantine/core';

export const ConnectionIndicator = () => {
  const { userFC, isMiniApp, isSocketConnected } = useUser();
  const { isConnected } = useAccount();
  const { isLoading } = useMiniAppContext();
  const isFarcaster = userFC && isMiniApp;
  const isFarcasterAndDisconnected = isFarcaster && !isSocketConnected;
  const isOutsideFarcaster = !isFarcaster && isConnected;
  const isOutsideFarcasterAndDisconnected =
    isOutsideFarcaster && !isSocketConnected;

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

  return (
    <Tooltip label={message}>
      <Avatar bg={color} size="8" />
    </Tooltip>
  );
};
