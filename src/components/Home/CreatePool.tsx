import { Outlet } from 'react-router-dom';

import { OnboardDataProvider } from '../../context/OnboardContext';
import { useOnboard } from '../../hooks/useOnboard';
import { ErrorDisplay } from '../ErrorDisplay';

export const CreatePool = () => {
  return (
    <OnboardDataProvider>
      <ErrorHandler>
        <Outlet />
      </ErrorHandler>
    </OnboardDataProvider>
  );
};

const ErrorHandler = ({ children }: { children: React.ReactNode }) => {
  const { bestiesError } = useOnboard();

  if (bestiesError) {
    return (
      <ErrorDisplay
        title="Data fetch error"
        description="There was an error fetching your besties. Please try again later."
      />
    );
  }

  return <>{children}</>;
};
