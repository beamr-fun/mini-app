import { Outlet } from 'react-router-dom';

import { OnboardDataProvider } from '../../context/OnboardContext';
import { useOnboard } from '../../hooks/useOnboard';
import { ErrorDisplay } from '../ErrorDisplay';
import { useUser } from '../../hooks/useUser';
import { useMemo } from 'react';
import { Card, Flex, Group, Text, useMantineTheme } from '@mantine/core';
import { AlertCircle } from 'lucide-react';

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
  const { userSubscription, user, hasOpenPool } = useUser();
  const { creationSteps, budget } = useOnboard();

  const { colors } = useMantineTheme();

  if (bestiesError) {
    return (
      <ErrorDisplay
        title="Data fetch error"
        description="There was an error fetching your besties. Please try again later."
      />
    );
  }

  const freshOnboardContextState =
    Object.values(creationSteps).every((step) => step === 'loading') &&
    budget === '';

  const shouldBlockCreatePool = useMemo(() => {
    if (!user) return true;

    if (!userSubscription || !userSubscription.pools.length) return false;

    if (freshOnboardContextState) return false;

    if (hasOpenPool) return true;

    return false;
  }, [userSubscription, user, hasOpenPool, freshOnboardContextState]);

  if (shouldBlockCreatePool) {
    return (
      <Flex h={'50vh'} justify={'center'} align={'center'}>
        <Card>
          <Group mb="md" gap={'xs'}>
            <AlertCircle />
            <Text fw={500} fz="lg">
              Multiple Pools: Coming Soon
            </Text>
          </Group>
          <Text c={colors.gray[3]}>
            You have already created a pool. The ability to manage multiple
            pools is not yet supported. Stay tuned!
          </Text>
        </Card>
      </Flex>
    );
  }

  return <>{children}</>;
};
