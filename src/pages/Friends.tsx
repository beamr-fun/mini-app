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
import { formatBalance } from '../utils/common';

export const Friends = () => {
  const { budget, besties, form, selectedFriends, handlePoolCreate } =
    useOnboard();

  const navigate = useNavigate();

  const filteredFriends = useMemo(() => {
    if (!besties) return [];

    return besties.map((friend) => ({ ...friend, checked: false }));
  }, [besties]);

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
      <Stack mb="md" align="center">
        <Text fz={36}>{formatBalance(budget)}/mo</Text>
        <Text
          fz={'sm'}
          variant="label"
          style={{
            transform: 'translateY(-9px)',
          }}
        >
          BEAMR/mo
        </Text>
      </Stack>

      <Text fz="lg" mb="md" ta="center">
        Add the first recipients to your pool (3+)
      </Text>
      <Card>
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
