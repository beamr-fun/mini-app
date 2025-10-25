import {
  Box,
  CloseButton,
  Group,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalRootProps,
  Text,
} from '@mantine/core';
import { ReactNode } from 'react';

export const AppModal = (
  props: ModalRootProps & {
    children: ReactNode;
    title?: string;
    description?: string;
  }
) => {
  const { children, title, description, onClose, ...rest } = props;
  return (
    <Modal.Root centered onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <Modal.Body pos="relative" pb={32}>
          <CloseButton pos="absolute" top={22} right={22} onClick={onClose} />
          <Box mt={16}>{children}</Box>
          <Text
            fz="lg"
            c="var(--mantine-color-gray-0)"
            fw={600}
            ta="center"
            mb={4}
          >
            {title}
          </Text>
          <Text variant="label" ta="center" c="var(--mantine-color-gray-3)">
            {description}
          </Text>
        </Modal.Body>
      </ModalContent>
    </Modal.Root>
  );
};
