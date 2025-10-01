import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Group,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useOnboard } from '../hooks/useOnboard';
import { Search } from 'lucide-react';
import jordImg from '../assets/jord-avatar.png';
import gravenImg from '../assets/graven-avatar.png';
import stefanoImg from '../assets/stefano-avatar.jpeg';
import { useState } from 'react';
import checkStyles from '../styles/checkbox.module.css';

const FRIENDS = [
  {
    imgUrl: jordImg,
    username: 'jord',
    displayName: 'Jord',
    fid: 2342,
    checked: false,
  },
  {
    imgUrl: gravenImg,
    username: 'graven',
    displayName: 'Graven',
    fid: 5435,
    checked: false,
  },
  {
    imgUrl: stefanoImg,
    username: 'stefano',
    displayName: 'Stefano',
    fid: 8754,
    checked: false,
  },
  {
    imgUrl: jordImg,
    username: 'derp-jord',
    displayName: 'Derp Jord',
    fid: 234223,
    checked: false,
  },
  {
    imgUrl: gravenImg,
    username: 'derp-graven',
    displayName: 'Derp Graven',
    fid: 54352,
    checked: false,
  },
  {
    imgUrl: stefanoImg,
    username: 'derp-stefano',
    displayName: 'Derp Stefano',
    fid: 87543,
    checked: false,
  },
  {
    imgUrl: jordImg,
    username: 'foo-jord',
    displayName: 'Foo Jord',
    fid: 2342235,
    checked: false,
  },
  {
    imgUrl: gravenImg,
    username: 'foo-graven',
    displayName: 'Foo Graven',
    fid: 543525,
    checked: false,
  },
  {
    imgUrl: stefanoImg,
    username: 'foo-stefano',
    displayName: 'Foo Stefano',
    fid: 875435,
    checked: false,
  },
  {
    imgUrl: jordImg,
    username: 'bar-jord',
    displayName: 'Bar Jord',
    fid: 2342238,
    checked: false,
  },
  {
    imgUrl: gravenImg,
    username: 'bar-graven',
    displayName: 'Bar Graven',
    fid: 543528,
    checked: false,
  },
  {
    imgUrl: stefanoImg,
    username: 'bar-stefano',
    displayName: 'Bar Stefano',
    fid: 875438,
    checked: false,
  },
];

export const Friends = () => {
  const { budget } = useOnboard();
  const [filteredFriends, setFilteredFriends] = useState(FRIENDS);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    const filtered = FRIENDS.filter(
      (friend) =>
        friend.username.toLowerCase().includes(query) ||
        friend.displayName.toLowerCase().includes(query)
    );
    setFilteredFriends(filtered);
  };

  const handleCheckboxChange = (fid: number) => {
    setFilteredFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.fid === fid ? { ...friend, checked: !friend.checked } : friend
      )
    );
  };

  return (
    <Box>
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
      <Text mb={'xl'}>
        Add 3 friends to complete your Beamr setup and unlock your personalized
        experience. You only need to do this once.
      </Text>
      <Text variant="label" mb="md">
        Select 3 friends to start Beamin!
      </Text>
      <TextInput
        // style={}
        leftSection={<Search size={20} />}
        mb="sm"
        placeholder="Search by username or display name"
        onChange={handleSearch}
        // leftSectionWidth={100}
        // style={}
      />
      <ScrollArea h={290}>
        <Stack gap="sm">
          {filteredFriends.map((friend) => (
            <Checkbox.Card
              key={friend.fid}
              onChange={() => handleCheckboxChange(friend.fid)}
              classNames={{
                card: checkStyles.card,
              }}
              bg={friend.checked ? 'var(--mantine-color-gray-8)' : undefined}

              //   style={{ border: 'none' }}
            >
              <Group p={4}>
                <Checkbox.Indicator checked={friend.checked} />
                <Group gap={8}>
                  <Avatar src={friend.imgUrl} size={36} />
                  <Box>
                    <Text fz="sm">{friend.displayName}</Text>
                    <Text fz="sm" c="dim">
                      @{friend.username}
                    </Text>
                  </Box>
                </Group>
              </Group>
            </Checkbox.Card>
          ))}
        </Stack>
      </ScrollArea>
      <Button size="lg" mt="xl">
        Create Pool
      </Button>
    </Box>
  );
};
