import React from 'react';
import { PageLayout } from '../layouts/PageLayout';
import { Paper, Group, Text, useMantineTheme, List, Box } from '@mantine/core';
import { BookIcon, Clock, Icon } from 'lucide-react';

export const Strategy = () => {
  const { colors } = useMantineTheme();
  return (
    <PageLayout>
      <Text fz={24} fw={600} c={colors.gray[0]} mb="md">
        About Beamr
      </Text>

      <Paper>
        <Group mb={20}>
          <BookIcon
            size={24}
            // color={colors.gray[0]}
            style={{
              stroke: 'url(#beamr-gradient)',
              // fill: 'url(#beamr-gradient)',
            }}
          />
          <Text fz={20} fw={600} c={colors.gray[0]}>
            Learn
          </Text>
        </Group>
        <Text mb={16}>
          This is for you to understand what the product is and how to use it
          effectively.
        </Text>
        <Text mb="sm">On this page:</Text>
        <List spacing={'xs'} withPadding>
          <List.Item>
            <Text td="underline" style={{ cursor: 'pointer' }}>
              Beamr Pools Explained
            </Text>
          </List.Item>
          <List.Item>
            <Text td="underline" style={{ cursor: 'pointer' }}>
              Beamr Boosts
            </Text>
          </List.Item>
        </List>
      </Paper>
    </PageLayout>
  );
};
