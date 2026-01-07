import React, { useEffect, useRef } from 'react';
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
} from '@mantine/core';
import { BookIcon, Share2Icon } from 'lucide-react';
import poolDiagram from '../assets/poolDiagram.png';
import { useScrollIntoView } from '@mantine/hooks';

export const Strategy = () => {
  const { colors } = useMantineTheme();

  const explainedRef = useRef<HTMLDivElement>(null);
  const explainedRef2 = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Align the top of the element to the top of the container
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
          <Group mb={20}>
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
          <Text mb={16}>
            This is for you to understand what the product is and how to use it
            effectively.
          </Text>
          <Text mb="sm">On this page:</Text>
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
                Beamr Boosts
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
            <Share2Icon
              size={24}
              style={{
                stroke: 'url(#beamr-gradient)',
              }}
            />
            <Text fz={20} fw={600} c={colors.gray[0]} ref={explainedRef2}>
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
      </Stack>
    </PageLayout>
  );
};
