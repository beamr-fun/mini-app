import { Bold } from '../components/typography';
import { Arrow } from '../components/Arrow';
import gravenAvatar from '../assets/graven-avatar.png';
import jordAvatar from '../assets/jord-avatar.png';
import stefanoAvatar from '../assets/stefano-avatar.jpeg';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { Tag } from '../components/Tag';
import { PageTitle } from '../components/PageTitle';
import { PageLayout } from '../layouts/PageLayout';
import { useCTA } from '../hooks/useCTA';
import Diagram from '../components/Diagram';

export const Explainer = () => {
  const navigate = useNavigate();

  useCTA({
    label: 'Get Started',
    onClick: () => {
      navigate('/create-pool/2', { viewTransition: true });
    },
  });

  return (
    <PageLayout title="About Beamr">
      <Stack gap="md">
        <Card>
          <Text fz={'lg'} fw={500} mb="md" c={'var(--mantine-color-gray-0)'}>
            Welcome!
          </Text>
          <Text mb={'md'}>
            Beamr is a mini-app that allows you to <Bold>beam</Bold> funds to
            your favorite content creators
          </Text>
          <Text>
            Every time you interact (Like, Comment, Recast), you stream{' '}
            <Bold>BEAMR</Bold> to that cast's creator. Unlike traditional
            tipping apps, your monthly budget does not change. Instead, your
            total budget is divided among all the creators you interact with.
          </Text>
        </Card>
        <Card>
          <Text fz={'lg'} fw={500} mb="md" c={'var(--mantine-color-gray-0)'}>
            Beamr Tipping Pool
          </Text>
          <Diagram />
          <Text mb={'md'}>
            The Beamr Tipping Pool aims to be the first of many token streaming
            features offered through this platform.
          </Text>
        </Card>
      </Stack>
    </PageLayout>
  );
};
