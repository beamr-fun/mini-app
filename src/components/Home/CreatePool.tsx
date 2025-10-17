import { Outlet, useLocation } from 'react-router-dom';
import { PageTitle } from '../PageTitle';

import { OnboardDataProvider } from '../../context/OnboardContext';

const titles = [
  'Unknown',
  'About Beamr',
  'Set Budget',
  'Choose Friends',
  'Confirm',
];

export const CreatePool = () => {
  const location = useLocation();

  const subroute = location.pathname.split('/')[2];

  const routeNumber = subroute ? parseInt(subroute) : 0;

  return (
    <OnboardDataProvider>
      <PageTitle title={titles[routeNumber]} />
      <Outlet />
    </OnboardDataProvider>
  );
};
