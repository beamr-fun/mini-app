import { ActionIcon, Box, Group } from '@mantine/core';
import { Globe, Settings, User } from 'lucide-react';
import classes from '../styles/layout.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { BeamrNav } from '../components/svg/BeamrNav';
import { useScrollDirection } from '../hooks/useScrollDirection';

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
  const navigate = useNavigate();

  const isHidden = useScrollDirection(50);

  const currentPath = location.pathname;

  return (
    <Box className={classes.navBox} data-hidden={isHidden}>
      <Group className={classes.innerNavBox}>
        {DEFAULT_NAV_LINKS.map(({ link, Icon }) => {
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
