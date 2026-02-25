import {
  Avatar,
  Box,
  Group,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { flowratePerSecondToMonth } from '../../utils/common';
import beamrTokenLogo from '../../assets/beamrTokenLogo.png';
import { Check, ZapIcon, ZapOff } from 'lucide-react';
import classes from '../../styles/effects.module.css';

export const TableRow = ({
  pfpUrl,
  flowRate,
  percentage,
  avatarOnClick,
  avatarTooltip,
  sending,
  showConnection = !sending,
  isConnected,
  connectOnClick,
  isConnectSelected,
  isLoadingConnect,
}: {
  isLoadingConnect?: boolean;
  sending?: boolean;
  showConnection?: boolean;
  pfpUrl: string;
  flowRate: bigint;
  percentage: number;
  avatarOnClick?: () => void;
  avatarTooltip?: string;
  isConnected?: boolean;
  connectOnClick?: () => void;
  isConnectSelected?: boolean;
}) => {
  const { colors } = useMantineTheme();

  const sizes = !sending && showConnection ? [32, 32, 65, 44] : [32, 32, 75, 48];

  return (
    <Group justify="space-between">
      <Tooltip label={avatarTooltip} disabled={!avatarTooltip}>
        <Avatar
          size={sizes[0]}
          radius="xl"
          src={pfpUrl}
          style={{ cursor: avatarOnClick ? 'pointer' : 'default' }}
          onClick={avatarOnClick}
        />
      </Tooltip>
      <Box w={sizes[1]} ta="left">
        <Avatar src={beamrTokenLogo} size={24} />
      </Box>
      {!sending && showConnection && (
        <Box
          w={24}
          style={{
            transform: 'translateY(2px)',
            cursor: isConnected
              ? 'default'
              : isLoadingConnect
                ? 'not-allowed'
                : 'pointer',
          }}
          onClick={isConnected || isLoadingConnect ? undefined : connectOnClick}
        >
          {isConnected ? (
            <Check size={16} />
          ) : isConnectSelected ? (
            <ZapIcon
              size={16}
              color={isConnectSelected ? colors.blue[5] : colors.gray[1]}
              className={isConnectSelected ? undefined : classes.glow}
            />
          ) : (
            <ZapOff
              size={16}
              color={isConnectSelected ? colors.blue[5] : colors.gray[1]}
              className={isConnectSelected ? undefined : classes.glow}
            />
          )}
        </Box>
      )}
      <Box w={sizes[2]} ta="right">
        {flowratePerSecondToMonth(flowRate)}
      </Box>

      <Text w={sizes[3]} ta="right">
        {percentage}%
      </Text>
    </Group>
  );
};

export const TableHeader = ({
  sending,
  showConnection = !sending,
}: {
  sending: boolean;
  showConnection?: boolean;
}) => {
  const { colors } = useMantineTheme();
  return (
    <Group justify="space-between" c={colors.gray[0]} mb="12px">
      <Text w={32} fz="sm" fw={500} ta="left">
        {sending ? 'To' : 'From'}
      </Text>
      <Text w={32} fz="sm" fw={500} ta="left">
        Token
      </Text>
      {!sending && showConnection && (
        <Text w={32} fz="sm" fw={500} ta="right">
          Conn.
        </Text>
      )}
      <Text w={75} fz="sm" fw={500} ta="right">
        Amount/mo
      </Text>
      <Text w={48} fz="sm" fw={500} ta="right">
        Pool %
      </Text>
    </Group>
  );
};
