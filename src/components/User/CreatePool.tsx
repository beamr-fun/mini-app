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
  const { userSubscription } = useUser();

  const { colors } = useMantineTheme();

  if (bestiesError) {
    return (
      <ErrorDisplay
        title="Data fetch error"
        description="There was an error fetching your besties. Please try again later."
      />
    );
  }

  const hasOneOrMorePools = useMemo(() => {
    if (!userSubscription || !userSubscription.pools) {
      return false;
    }

    const activePools = userSubscription.pools?.filter(
      (pool) => pool.active === true
    );

    if (activePools.length >= 1) {
      return true;
    }

    return false;
  }, [userSubscription]);

  if (hasOneOrMorePools) {
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
