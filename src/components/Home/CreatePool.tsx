import { Box, BoxComponentProps } from '@mantine/core';
import { Outlet, useLocation } from 'react-router-dom';
import { PageTitle } from '../PageTitle';

import { ReactNode } from 'react';

const titles = ['Unknown', 'About Beamr', 'Set Budget', 'Choose Friends'];

export const CreatePool = () => {
  const location = useLocation();

  const subroute = location.pathname.split('/')[2];

  const routeNumber = subroute ? parseInt(subroute) : 0;

  return (
    <Box>
      <PageTitle title={titles[routeNumber]} />
      <Outlet />
    </Box>
  );
};

export const Step2 = () => {
  return <div> Step 2 </div>;
};

export const Tag = (props: BoxComponentProps & { children: ReactNode }) => {
  return (
    <Box
      {...props}
      bg={'var(--mantine-color-gray-8)'}
      px={6}
      py={4}
      fz={10}
      color={'var(--mantine-color-gray-0)'}
      style={{ borderRadius: 6 }}
    >
      {props.children}
    </Box>
  );
};
