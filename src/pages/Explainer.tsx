import { useNavigate } from 'react-router-dom';
import { Card, List, Stack, Text, useMantineTheme } from '@mantine/core';
import { PageLayout } from '../layouts/PageLayout';
import { useCTA } from '../hooks/useCTA';
import Diagram from '../components/Diagram';

export const Explainer = () => {
  const navigate = useNavigate();
  const { colors } = useMantineTheme();

  useCTA({
    label: 'Get Started',
    onClick: () => {
      navigate('/create-pool/2', { viewTransition: true });
    },
  });
  return (
    <PageLayout title="About Beamr Pools">
      <Stack gap="md">
        <Card>
          <Text mb={'md'}>
            Beamr pools are the easiest way to sustainably reward the people who
            make your feed worth scrolling.
          </Text>
          <List type="ordered" px={4} spacing={4} mb="lg">
            <List.Item>You open a $BEAMR token stream</List.Item>
            <List.Item>
              We dynamically split that stream based on your interactions
              (likes, comments, follows, etc.){' '}
            </List.Item>
            <List.Item>
              Creators earn instantly & consistently based on (your) human
              choice, not gameable metrics.
            </List.Item>
          </List>
          <Diagram />
          <Text fz="sm" ta="center" c={colors.gray[3]}>
            Beamr pools—a dynamic micro-subscription service
          </Text>
        </Card>
      </Stack>
    </PageLayout>
  );
};
