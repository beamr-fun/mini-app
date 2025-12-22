import { ActionIcon, Box, Button, Group } from '@mantine/core';
import { Globe, Settings, User } from 'lucide-react';
import classes from '../styles/layout.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { BeamrNav } from '../components/svg/BeamrNav';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useCTA } from '../hooks/useCTA';

const DEFAULT_NAV_LINKS = [
  {
    link: '/global',
    Icon: Globe,
  },
  // {
  //   link: '/strategy',
  //   Icon: BeamrNav,
  // },
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

  const { cta, hideNav } = useCTA();

  const hasButton = !!cta && !!cta.label && !!cta.onClick;

  return (
    <Box className={classes.navBox} data-hidden={hideNav || isHidden}>
      {hasButton && (
        <Button
          className={classes.ctaBtn}
          onClick={cta.onClick}
          disabled={cta.disabled}
          size={'lg'}
          data-extend={isHidden || hideNav ? 'true' : 'false'}
        >
          {cta.label}
        </Button>
      )}
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
