import { ActionIcon, Box, Group } from '@mantine/core';
import { Globe, Network, Settings, User } from 'lucide-react';
import classes from '../styles/layout.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BeamrNav } from '../components/svg/BeamrNav';

const DEFAULT_NAV_LINKS = [
  {
    link: '/global',
    Icon: Globe,
  },
  {
    link: '/strategy',
    Icon: BeamrNav,
  },
  {
    link: '/home',
    Icon: User,
  },
  {
    link: '/settings',
    Icon: Settings,
  },
];

export const Nav = () => {
  const location = useLocation();

  const currentPath = location.pathname;

  const navigate = useNavigate();

  return (
    <Box className={classes.navBox}>
      <Group className={classes.innerNavBox}>
        {DEFAULT_NAV_LINKS.map(({ link, Icon }, index) => {
          const isSelected = currentPath === link;

          return (
            <ActionIcon
              key={link}
              className={isSelected ? classes.navLinkSelected : classes.navLink}
              onClick={() => {
                navigate(link, { viewTransition: true });
              }}
            >
              <Icon size={28} />
            </ActionIcon>
          );
        })}
      </Group>
    </Box>
  );
};
