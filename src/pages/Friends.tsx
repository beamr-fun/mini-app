import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Group,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useOnboard } from '../hooks/useOnboard';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useCTA } from '../hooks/useCTA';
import { PageLayout } from '../layouts/PageLayout';
import { useNavigate } from 'react-router-dom';

export const Friends = () => {
  const { budget, besties, form, selectedFriends, handlePoolCreate } =
    useOnboard();

  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredFriends = useMemo(() => {
    if (!besties) return [];

    const query = filter.toLowerCase();
    return besties
      .filter(
        (friend) =>
          friend.username.toLowerCase().includes(query) ||
          friend.display_name?.toLowerCase().includes(query)
      )
      .map((friend) => ({ ...friend, checked: false }));
  }, [besties, filter]);

  const hasSelected3 =
    (selectedFriends && selectedFriends?.length >= 3) || false;

  useCTA({
    label: 'Launch',
    onClick: () => {
      navigate('/create-pool/4');
      handlePoolCreate?.();
    },
    disabled: !hasSelected3,
    extraDeps: [form?.values.selectedFriends],
  });

  return (
    <PageLayout title="Choose Friends">
      <Group justify="center" mb={24}>
        <Group align="end">
          <Text fz={36}>{budget}/mo</Text>
          <Text
            fz={'sm'}
            variant="label"
            style={{
              transform: 'translateY(-9px)',
            }}
          >
            BEAMR
          </Text>
        </Group>
      </Group>
      <Text mb={'xl'}>Seed your Beamr with 3 of your favorite Casters</Text>
      <Text fz="lg" mb="md" c={'var(--mantine-color-gray-2)'}>
        Select 3+ Casters to start Beamin!
      </Text>
      <Card>
        <TextInput
          leftSection={<Search size={18} />}
          mb="sm"
          variant="search"
          placeholder="Search by username or display name"
          onChange={handleSearch}
          leftSectionWidth={36}
        />

        <Stack gap={6}>
          {filteredFriends.map((friend) => {
            return (
              <Box
                key={friend.fid}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (
                    form?.values.selectedFriends?.includes(
                      friend.fid.toString()
                    )
                  ) {
                    form?.setFieldValue(
                      'selectedFriends',
                      (form.values.selectedFriends || []).filter(
                        (fid: string) => fid !== friend.fid.toString()
                      )
                    );
                  } else {
                    form?.setFieldValue(
                      'selectedFriends',

                      [
                        ...(form.values.selectedFriends || []),
                        friend.fid.toString(),
                      ]
                    );
                  }
                }}
              >
                <Group p={4}>
                  <Checkbox.Indicator
                    checked={form?.values.selectedFriends?.includes(
                      friend.fid.toString()
                    )}
                  />
                  <Group gap={8}>
                    <Avatar src={friend.pfp_url} size={36} />
                    <Box>
                      <Text fz="sm">{friend.display_name}</Text>
                      <Text fz="sm" c="dim">
                        @{friend.username}
                      </Text>
                    </Box>
                  </Group>
                </Group>
              </Box>
            );
          })}
        </Stack>
      </Card>
    </PageLayout>
  );
};
