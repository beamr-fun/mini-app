import { ActionIcon, Box, Group } from '@mantine/core';
import { Globe, Network, Settings, Share, User } from 'lucide-react';
import React from 'react';

const DEFAULT_NAV_LINKS = [
  {
    link: '/global',
    Icon: Globe,
  },
  {
    link: '/my',
    Icon: Network,
  },
  {
    link: 'user',
    Icon: User,
  },
  {
    link: 'settings',
    Icon: Settings,
  },
];

export const Nav = () => {
  return (
    <Box bg={'var(--mantine-color-9)'}>
      <Group gap={50} justify="space-around" py={14}>
        {DEFAULT_NAV_LINKS.map(({ link, Icon }, index) => (
          <ActionIcon key={link} h={32} w={32}>
            <Icon size={32} />
          </ActionIcon>
        ))}
      </Group>
    </Box>
  );
};
