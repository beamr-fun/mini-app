import { Avatar, Box, Group, Text, useMantineTheme } from '@mantine/core';
import { flowratePerSecondToMonth } from '../../utils/common';
import beamrTokenLogo from '../../assets/beamrTokenLogo.png';

export const TableRow = ({
  pfpUrl,
  flowRate,
  percentage,
}: {
  pfpUrl: string;
  flowRate: bigint;
  percentage: number;
}) => {
  return (
    <Group justify="space-between">
      <Avatar size={32} radius="xl" src={pfpUrl} />
      <Box w={32} ta="left">
        <Avatar src={beamrTokenLogo} size={24} />
      </Box>
      <Box w={75} ta="right">
        {flowratePerSecondToMonth(flowRate)}
      </Box>
      <Text w={48} ta="right">
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
      <Text w={75} fz="sm" fw={500} ta="right">
        Amount/mo
      </Text>
      <Text w={48} fz="sm" fw={500} ta="right">
        Pool %
      </Text>
    </Group>
  );
};
