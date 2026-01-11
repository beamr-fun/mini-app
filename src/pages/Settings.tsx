import { ReactNode, useState } from 'react';
import { PoolSection } from '../components/Settings/PoolSection';
import { Select, Text } from '@mantine/core';
import { PageLayout } from '../layouts/PageLayout';

const Panel = {
  Pools: <PoolSection />,
  Connection: <Text>Connection</Text>,
};

export const Settings = () => {
  const [panel, setPanel] = useState<keyof typeof Panel>('Pools');

  return (
    <SettingsLayout>
      <Select
        mb="xl"
        value={panel}
        data={Object.keys(Panel)}
        onChange={(value) => {
          if (!value) return;
          setPanel(value as keyof typeof Panel);
        }}
      />
      {Panel[panel]}
    </SettingsLayout>
  );
};

const SettingsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <PageLayout>
      <Text fz="xl" fw="700" mb="lg">
        Settings
      </Text>
      {children}
    </PageLayout>
  );
};

const Connection = () => {
  return <Text>Connection</Text>;
};
