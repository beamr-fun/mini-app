import {
  Avatar,
  Box,
  Group,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useAccount } from 'wagmi';
import { useUser } from '../hooks/useUser';
import { ConnectionIndicator } from './ConnectionIndicator';
import { useQuery } from '@tanstack/react-query';
import { getTipLimit } from '../utils/api';
import { Glass } from './Glass';
import { AlertCircle } from 'lucide-react';
import classes from '../styles/effects.module.css';

export const Header = () => {
  const { address } = useAccount();

  const { user, getAuthHeaders } = useUser();

  const { colors } = useMantineTheme();

  const { data, error, isLoading } = useQuery({
    queryKey: [`tip-limit`, user?.fid],
    queryFn: async () => {
      const headers = await getAuthHeaders();

      if (!headers) return;

      return getTipLimit(headers);
    },
    enabled: !!user?.fid,
  });

  const pfp = user?.pfp_url || `https://effigy.im/a/${address}.svg`;

  return (
    <Box w="100%">
      <Group w="100%" justify="space-between">
        {data && data?.limited && !isLoading && !error && (
          <Tooltip
            multiline
            label={
              <Box>
                <Text fz="sm" mb="xs">
                  You have extended your daily tip limit (50)
                </Text>
                <Text fz="sm">
                  Resets {new Date(data?.resetsAt || 0).toLocaleString()}
                </Text>
              </Box>
            }
          >
            <Glass
              px={'sm'}
              py="xs"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <AlertCircle
                size={20}
                color={colors.yellow[7]}
                className={classes.glow}
              />
            </Glass>
          </Tooltip>
        )}
        <Box pos={'relative'} ml="auto">
          <Avatar src={pfp} size="32" />
          <ConnectionIndicator />
        </Box>
      </Group>
    </Box>
  );
};
