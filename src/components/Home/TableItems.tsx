import { Avatar, Box, Group, Text, useMantineTheme } from '@mantine/core';
import { flowratePerSecondToMonth } from '../../utils/common';
import beamrTokenLogo from '../../assets/beamrTokenLogo.png';
import { Check, Radio } from 'lucide-react';
import classes from '../../styles/effects.module.css';

export const TableRow = ({
  pfpUrl,
  flowRate,
  percentage,
  sending,
  isConnected,
  connectOnClick,
  isConnectSelected,
}: {
  sending?: boolean;
  pfpUrl: string;
  flowRate: bigint;
  percentage: number;
  isConnected?: boolean;
  connectOnClick?: () => void;
  isConnectSelected?: boolean;
}) => {
  const { colors } = useMantineTheme();

  const sizes = !sending ? [32, 32, 65, 44] : [32, 32, 75, 48];

  return (
    <Group justify="space-between">
      <Avatar size={sizes[0]} radius="xl" src={pfpUrl} />
      <Box w={sizes[1]} ta="left">
        <Avatar src={beamrTokenLogo} size={24} />
      </Box>
      {!sending && (
        <Box
          w={24}
          style={{
            transform: 'translateY(2px)',
            cursor: isConnected ? 'default' : 'pointer',
          }}
          onClick={isConnected ? undefined : connectOnClick}
        >
          {isConnected ? (
            <Check size={16} />
          ) : (
            <Radio
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

export const TableHeader = ({ sending }: { sending: boolean }) => {
  const { colors } = useMantineTheme();
  return (
    <Group justify="space-between" c={colors.gray[0]} mb="12px">
      <Text w={32} fz="sm" fw={500} ta="left">
        {sending ? 'To' : 'From'}
      </Text>
      <Text w={32} fz="sm" fw={500} ta="left">
        Token
      </Text>
      {!sending && (
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
