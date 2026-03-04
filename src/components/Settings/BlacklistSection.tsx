import {
  ActionIcon,
  Avatar,
  Card,
  Combobox,
  Group,
  InputBase,
  Loader,
  Stack,
  Text,
  useCombobox,
  useMantineTheme,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { User } from '@neynar/nodejs-sdk/build/api';
import { useUser } from '../../hooks/useUser';
import {
  addToBlacklist,
  getBlacklist,
  removeFromBlacklist,
  searchUsers,
} from '../../utils/api';
import { ErrorDisplay } from '../ErrorDisplay';

export const BlacklistSection = () => {
  const { colors } = useMantineTheme();
  const { user, getAuthHeaders } = useUser();
  const queryClient = useQueryClient();
  const [removingFid, setRemovingFid] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 400);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['blacklist', user?.fid],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      if (!headers) throw new Error('Failed to get headers');
      return getBlacklist(headers, true);
    },
    enabled: !!user?.fid,
  });

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setSearchResults([]);
      combobox.closeDropdown();
      return;
    }

    const doSearch = async () => {
      setIsSearching(true);
      try {
        const headers = await getAuthHeaders();
        if (!headers) return;
        const results = await searchUsers(debouncedSearch, headers);
        setSearchResults(results);
        combobox.openDropdown();
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    doSearch();
  }, [debouncedSearch]);

  const handleAdd = async (fidStr: string) => {
    if (!user?.fid) return;
    combobox.closeDropdown();
    setSearch('');
    setSearchResults([]);
    setIsAdding(true);
    try {
      const headers = await getAuthHeaders();
      if (!headers) throw new Error('Failed to get headers');
      await addToBlacklist({ fid: user.fid, blacklistFids: [Number(fidStr)], headers });
      queryClient.invalidateQueries({ queryKey: ['blacklist', user.fid] });
    } catch {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Failed to block user',
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemove = async (fid: number) => {
    if (!user?.fid) return;
    setRemovingFid(fid);
    try {
      const headers = await getAuthHeaders();
      if (!headers) throw new Error('Failed to get headers');
      await removeFromBlacklist({ fid: user.fid, blacklistFids: [fid], headers });
      queryClient.invalidateQueries({ queryKey: ['blacklist', user.fid] });
    } catch {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Failed to remove from blacklist',
      });
    } finally {
      setRemovingFid(null);
    }
  };

  if (isLoading) {
    return (
      <Group justify="center" h={350}>
        <Loader color="var(--glass-thick)" />
      </Group>
    );
  }

  if (error) {
    return <ErrorDisplay title="Failed to load blacklist" description="" />;
  }

  const profiles = data?.profiles ?? [];
  const blacklistedFids = new Set(profiles.map((p) => p.fid));
  const options = searchResults.filter((u) => !blacklistedFids.has(u.fid));

  return (
    <Card>
      <Text fz="lg" fw={500} mb="xs">
        Blocked Users
      </Text>
      <Text c={colors.gray[4]} fz="sm" mb="md">
        Blocked users cannot receive beams from you.
      </Text>

      <Combobox store={combobox} onOptionSubmit={handleAdd}>
        <Combobox.Target>
          <InputBase
            placeholder="Search by username..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (!e.target.value.trim()) combobox.closeDropdown();
            }}
            onFocus={() => {
              if (searchResults.length) combobox.openDropdown();
            }}
            onBlur={() => combobox.closeDropdown()}
            rightSection={isSearching || isAdding ? <Loader size={14} /> : null}
            mb="md"
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {options.length === 0 && !isSearching ? (
              <Combobox.Empty>No results</Combobox.Empty>
            ) : (
              options.map((result) => (
                <Combobox.Option key={result.fid} value={String(result.fid)}>
                  <Group gap="sm">
                    <Avatar src={result.pfp_url} size={28} radius="xl" />
                    <Stack gap={0}>
                      <Text fz="sm" fw={500}>
                        {result.display_name}
                      </Text>
                      <Text fz="xs" c={colors.gray[4]}>
                        @{result.username}
                      </Text>
                    </Stack>
                  </Group>
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      {profiles.length === 0 ? (
        <Text c={colors.gray[5]} fz="sm">
          No blocked users.
        </Text>
      ) : (
        <Group wrap="wrap" gap="xs">
          {profiles.map((profile) => (
            <Group
              key={profile.fid}
              gap={6}
              px={10}
              py={5}
              style={{
                background: 'var(--glass-pane)',
                border: '1px solid var(--glass-edge)',
                borderRadius: 'var(--mantine-radius-xl)',
              }}
            >
              <Avatar src={profile.pfp_url} size={20} radius="xl" />
              <Text fz="sm">@{profile.username}</Text>
              <ActionIcon
                size={16}
                variant="transparent"
                color={colors.gray[5]}
                loading={removingFid === profile.fid}
                onClick={() => handleRemove(profile.fid)}
              >
                <X size={12} />
              </ActionIcon>
            </Group>
          ))}
        </Group>
      )}
    </Card>
  );
};
