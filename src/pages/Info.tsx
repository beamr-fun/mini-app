import React, { useRef } from 'react';
import { PageLayout } from '../layouts/PageLayout';
import {
  Paper,
  Group,
  Text,
  useMantineTheme,
  List,
  Box,
  Stack,
  Image,
  Avatar,
} from '@mantine/core';
import { BookIcon, Share2Icon } from 'lucide-react';
import poolDiagram from '../assets/poolDiagram.png';
import beamrEcon from '../assets/beamrEcon.png';
import beamrLogo from '../assets/beamrTokenLogo.png';

export const Strategy = () => {
  const { colors } = useMantineTheme();

  const explainedRef = useRef<HTMLDivElement>(null);
  const explainedRef2 = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <PageLayout>
      <Text fz={24} fw={600} c={colors.gray[0]} mb="md">
        About Beamr
      </Text>

      <Stack>
        <Paper>
          <Group mb={'sm'}>
            <BookIcon
              size={24}
              // color={colors.gray[0]}
              style={{
                stroke: 'url(#beamr-gradient)',
                // fill: 'url(#beamr-gradient)',
              }}
            />
            <Text fz={20} fw={600} c={colors.gray[0]}>
              Learn
            </Text>
          </Group>

          <List spacing={'xs'} withPadding>
            <List.Item>
              <Text
                td="underline"
                style={{ cursor: 'pointer' }}
                onClick={() => scrollToSection(explainedRef)}
              >
                Beamr Pools Explained
              </Text>
            </List.Item>
            <List.Item>
              <Text
                td="underline"
                style={{ cursor: 'pointer' }}
                onClick={() => scrollToSection(explainedRef2)}
              >
                Real Time Streaming
              </Text>
            </List.Item>
          </List>
        </Paper>
        <Paper>
          <Group mb={20}>
            <Share2Icon
              size={24}
              style={{
                stroke: 'url(#beamr-gradient)',
              }}
            />
            <Text fz={20} fw={600} c={colors.gray[0]} ref={explainedRef}>
              Pools Explained
            </Text>
          </Group>
          <Stack gap={8} mb="md">
            <Text mb={'md'}>
              Beamr pools are the easiest way to sustainably reward the people
              who make your feed worth scrolling:
            </Text>
            <Text> 1. Open a $BEAMR token stream</Text>
            <Text>
              {' '}
              2. Beamr dynamically splits that stream based on your interactions
              (likes, comments, follows, etc.)
            </Text>
            <Text>
              3. Creators earn instantly & consistently based on (your) human
              choice, not gameable metrics{' '}
            </Text>
          </Stack>
          <Group justify="center">
            <Box w={247} h={190} mt="md">
              <Image
                src={poolDiagram}
                alt="Beamr Economy Diagram"
                w="100%"
                h="100%"
                fit="contain"
                bg={'var(--glass-light)'}
              />
            </Box>
          </Group>
        </Paper>
        <Paper>
          <Group mb={20}>
            <Avatar size={28} src={beamrLogo} />
            <Text fz={20} fw={600} c={colors.gray[0]} ref={explainedRef2}>
              Streams Are Real Time
            </Text>
          </Group>
          <Text mb={'md'}>
            Beamr streams settle passively (ie without repetitive transactions)
            and in real-time.
          </Text>
          <Text mb={'md'}>
            If you have incoming streams, they can fund your outgoing
            streams--resulting in maximum capital efficiency and stream
            composability.
          </Text>

          <Group justify="center">
            <Box w={299} h={236} mt="md">
              <Image
                src={beamrEcon}
                alt="Beamr Economy Diagram"
                w="100%"
                h="100%"
                fit="contain"
                bg={'var(--glass-light)'}
              />
            </Box>
          </Group>
        </Paper>
      </Stack>
    </PageLayout>
  );
};
