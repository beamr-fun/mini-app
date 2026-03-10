import { Avatar, Box, Checkbox, Group, Text } from '@mantine/core';
import { memo } from 'react';
import { flowratePerSecondToMonth } from '../../utils/common';
import beamrTokenLogo from '../../assets/beamrTokenLogo.png';

type BeamRowProps = {
  id: string;
  pfpUrl: string;
  beamFlowRate: bigint;
  percentage: number;
  isSelected: boolean;
  onToggle: (id: string) => void;
};

export const BeamRow = memo(
  ({
    id,
    pfpUrl,
    beamFlowRate,
    percentage,
    isSelected,
    onToggle,
  }: BeamRowProps) => (
    <Group
      justify="space-between"
      px={4}
      style={{ cursor: 'pointer' }}
      onClick={() => onToggle(id)}
    >
      <Checkbox.Indicator checked={isSelected} style={{ cursor: 'pointer' }} />
      <Avatar size={32} radius="xl" src={pfpUrl} />
      <Box w={32}>
        <Avatar src={beamrTokenLogo} size={24} />
      </Box>
      <Box w={75} ta="right">
        {flowratePerSecondToMonth(beamFlowRate)}
      </Box>
      <Text w={48} ta="right">
        {percentage}%
      </Text>
    </Group>
  ),
);
