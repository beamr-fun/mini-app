import { Bold } from '../components/typography';
import { Arrow } from '../components/Arrow';
import gravenAvatar from '../assets/graven-avatar.png';
import jordAvatar from '../assets/jord-avatar.png';
import stefanoAvatar from '../assets/stefano-avatar.jpeg';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Flex, Group, Text } from '@mantine/core';
import { Tag } from '../components/Home/CreatePool';

export const Explainer = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Text mb="sm" variant="label">
        Welcome!
      </Text>
      <Text mb={'md'}>
        Beamr is a mini-app that allows you to <Bold>beam</Bold> funds to your
        favorite content creators
      </Text>
      <Text mb={48}>
        Every time you interact (Like, Comment, Recast) with a cast, you stream{' '}
        <Bold>BEAMR</Bold> to that cast's creator. Unlike traditional tipping
        apps, your monthly budget does not change. Instead, your total budget is
        divided among all the creators you interact with.
      </Text>
      <Group gap={70} justify="center" mb="xl">
        <Flex direction="column" align="center" gap={4} pos="relative">
          <Avatar size={28} src={jordAvatar} />
          <Arrow />
          <Avatar size={28} src={gravenAvatar} />
          <Tag pos="absolute" top={'38%'} right="34px">
            100%
          </Tag>
        </Flex>

        <Flex direction="column" align="center" pos="relative">
          <Avatar size={28} src={jordAvatar} />
          <Box
            pos="absolute"
            style={{ transform: 'Rotate(-25deg) Translate(13px,6px)', top: 28 }}
          >
            <Arrow />
          </Box>
          <Box style={{ transform: 'Rotate(25deg) Translate(-13px,6px)' }}>
            <Arrow />
          </Box>
          <Tag pos="absolute" top={'38%'} right="-20px">
            50%
          </Tag>
          <Tag pos="absolute" top={'38%'} right="74px">
            50%
          </Tag>

          <Group gap={32}>
            <Avatar size={28} src={gravenAvatar} />
            <Avatar size={28} src={stefanoAvatar} />
          </Group>
        </Flex>
      </Group>

      <Text mb={48}>
        You can think of Beamr as your personalized rewards algorithm for
        Farcaster. Just set up a beam pool, choose your monthly budget, and
        start interacting with casts!
      </Text>

      <Button
        size="lg"
        onClick={() => navigate('/create-pool/2', { viewTransition: true })}
      >
        Next
      </Button>
    </Box>
  );
};
