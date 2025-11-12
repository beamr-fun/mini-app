import React from 'react';
import { PageLayout } from '../layouts/PageLayout';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Collapse,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Tag } from '../components/Tag';
import beamrTokenLogo from '../assets/beamrTokenLogo.png';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';

export const Settings = () => {
  const { colors } = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <PageLayout title="Settings">
      <Stack>
        <Box>
          <Text fw={600} mb="md">
            Your Pools
          </Text>
          <Card>
            <Group justify="space-between">
              <Text>Jord's Tipping Pool</Text>
              <Tag bg={colors.blue[9]} c={colors.blue[3]} w="fit-content">
                Tipping Pool
              </Tag>
            </Group>
            <Text c={colors.gray[3]} fz="sm" mb="md">
              Created Oct 28th
            </Text>
            <Group justify="space-between" mb="lg">
              <Group gap="xs">
                <Avatar src={beamrTokenLogo} size={24} />
                <Text fw={500}>300/mo</Text>
              </Group>
              <Group gap="xs">
                <Button size="xs">Adjust Flow</Button>
                <Button size="xs" variant="secondary">
                  Stop
                </Button>
              </Group>
            </Group>

            <Collapse in={opened}>
              <Box h={150}>d</Box>
            </Collapse>
            <Group gap={4}>
              <Text c={colors.gray[3]} fz="sm">
                Prefs
              </Text>

              <ActionIcon size="xs" onClick={toggle}>
                {opened ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </ActionIcon>
            </Group>
          </Card>
        </Box>
      </Stack>
    </PageLayout>
  );
};
