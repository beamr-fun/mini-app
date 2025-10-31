import { ActionIcon, Box, Group } from '@mantine/core';
import { Globe, Network, Settings, User } from 'lucide-react';
import classes from '../styles/layout.module.css';
import { Link } from 'react-router-dom';

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
    <Box className={classes.navBox}>
      <Group className={classes.innerNavBox}>
        {DEFAULT_NAV_LINKS.map(({ link, Icon }, index) => (
          <ActionIcon
            // to=""
            // component={Link}
            key={link}
            className={classes.navLink}
          >
            <Icon size={28} />
          </ActionIcon>
        ))}
      </Group>
    </Box>
  );
};
