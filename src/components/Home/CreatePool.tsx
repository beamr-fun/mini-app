import { Outlet, useLocation } from 'react-router-dom';

import { OnboardDataProvider } from '../../context/OnboardContext';

export const CreatePool = () => {
  return (
    <OnboardDataProvider>
      <Outlet />
    </OnboardDataProvider>
  );
};
