import { Group, Text } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const PageTitle = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <Group gap={12} mb={32}>
      <ArrowLeft
        onClick={() => {
          navigate(-1);
        }}
        strokeWidth={1}
        size={24}
        style={{
          cursor: 'pointer',
          color: 'var(--mantine-color-gray-0)',
        }}
      />
      <Text fz="xl">{title}</Text>
    </Group>
  );
};
