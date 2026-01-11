import { ReactNode, use, useState } from 'react';
import { PoolSection } from '../components/Settings/PoolSection';
import { Select, Text } from '@mantine/core';
import { PageLayout } from '../layouts/PageLayout';
import { WebhookConnection } from '../components/Settings/WebhookConnection';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../hooks/useUser';
import { notifications } from '@mantine/notifications';
import {
  fetchActivePool,
  fetchIsConnected,
  fetchUserPrefs,
} from '../utils/api';

const OPTIONS = ['Pools', 'Connection'] as const;
type Option = (typeof OPTIONS)[number];

export const Settings = () => {
  const [panel, setPanel] = useState<Option>('Pools');

  const { user, getAuthHeaders } = useUser();

  const {
    data: apiData,
    isLoading: isLoadingPrefs,
    error,
    refetch: refetchPrefs,
  } = useQuery({
    queryKey: ['user-prefs', user?.fid],
    queryFn: async () => {
      const headers = await getAuthHeaders();

      if (!headers) {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: 'Failed to get headers',
        });

        return;
      }

      const [userPrefs, activePoolAddress, isConnected] = await Promise.all([
        fetchUserPrefs(user!.fid, headers),
        fetchActivePool(headers),
        fetchIsConnected(headers),
      ]);

      return {
        userPrefs,
        activePoolAddress: activePoolAddress || undefined,

        isConnected,
      };
    },
    enabled: !!user?.fid,
  });

  const { userPrefs, activePoolAddress, isConnected } = apiData || {};

  if (panel === 'Pools') {
    return (
      <SettingsLayout panel={panel} setPanel={setPanel}>
        <PoolSection
          userPrefs={userPrefs}
          activePoolAddress={activePoolAddress}
          isLoadingPrefs={isLoadingPrefs}
          prefsError={error}
          refetchPrefs={refetchPrefs as () => void}
        />
      </SettingsLayout>
    );
  }

  if (panel === 'Connection') {
    return (
      <SettingsLayout panel={panel} setPanel={setPanel}>
        <WebhookConnection />
      </SettingsLayout>
    );
  }
  return null;
};

const SettingsLayout = ({
  children,
  panel,
  setPanel,
}: {
  children: ReactNode;
  setPanel: (option: Option) => void;
  panel: Option;
}) => {
  return (
    <PageLayout>
      <Text fz="xl" fw="700" mb="lg">
        Settings
      </Text>
      <Select
        mb="xl"
        value={panel}
        data={OPTIONS}
        onChange={(value) => {
          if (!value) return;
          setPanel(value as Option);
        }}
      />
      {children}
    </PageLayout>
  );
};
