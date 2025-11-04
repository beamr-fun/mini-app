import {
  Avatar,
  Box,
  Button,
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
import { useNavigate } from 'react-router-dom';
import { useCTA } from '../hooks/useCTA';
import { PageLayout } from '../layouts/PageLayout';

export const Friends = () => {
  const { budget, following, form, selectedFriends, handlePoolCreate } =
    useOnboard();
  const navigate = useNavigate();

  const [filter, setFilter] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredFriends = useMemo(() => {
    if (!following) return [];

    const query = filter.toLowerCase();
    return following
      .filter(
        (friend) =>
          friend.user.username.toLowerCase().includes(query) ||
          friend.user.display_name?.toLowerCase().includes(query)
      )
      .map((friend) => ({ ...friend, checked: false }));
  }, [following, filter]);

  const hasSelected3 =
    (selectedFriends && selectedFriends?.length >= 3) || false;

  useCTA({
    label: 'Launch Pool',
    onClick: () => {
      handlePoolCreate?.();
      navigate('/create-pool/4', { viewTransition: true });
    },
    disabled: !hasSelected3,
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
                key={friend.user.fid}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (
                    form?.values.selectedFriends?.includes(
                      friend.user.fid.toString()
                    )
                  ) {
                    form?.setFieldValue(
                      'selectedFriends',
                      (form.values.selectedFriends || []).filter(
                        (fid: string) => fid !== friend.user.fid.toString()
                      )
                    );
                  } else {
                    form?.setFieldValue(
                      'selectedFriends',

                      [
                        ...(form.values.selectedFriends || []),
                        friend.user.fid.toString(),
                      ]
                    );
                  }
                }}
              >
                <Group p={4}>
                  <Checkbox.Indicator
                    checked={form?.values.selectedFriends?.includes(
                      friend.user.fid.toString()
                    )}
                  />
                  <Group gap={8}>
                    <Avatar src={friend.user.pfp_url} size={36} />
                    <Box>
                      <Text fz="sm">{friend.user.display_name}</Text>
                      <Text fz="sm" c="dim">
                        @{friend.user.username}
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
