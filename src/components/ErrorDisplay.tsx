import { Group, Paper, Spoiler, Text, useMantineTheme } from '@mantine/core';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export const ErrorDisplay = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const [collapseOpened, setCollapseOpened] = useState(false);
  const { colors } = useMantineTheme();

  return (
    <Paper>
      <Group gap="sm" mb="sm">
        <AlertCircle size={20} color={colors.red[6]} />
        <Text fw={500} c={colors.gray[0]}>
          {title}
        </Text>
      </Group>

      <Spoiler
        expanded={collapseOpened}
        maxHeight={12}
        showLabel={null}
        hideLabel={null}
        onExpandedChange={() => setCollapseOpened(!collapseOpened)}
      >
        <Text fz="sm">{description}</Text>
      </Spoiler>
      <Group
        gap={2}
        mt="sm"
        style={{ cursor: 'pointer' }}
        onClick={() => setCollapseOpened(!collapseOpened)}
      >
        {collapseOpened ? (
          <ChevronUp
            size={20}
            style={{ transform: 'translateY(-2px)' }}
            color={colors.gray[3]}
          />
        ) : (
          <ChevronDown size={20} color={colors.gray[3]} />
        )}
        <Text fz="sm" c={colors.gray[3]}>
          {collapseOpened ? 'Hide' : 'Read More'}
        </Text>
      </Group>
    </Paper>
  );
};
