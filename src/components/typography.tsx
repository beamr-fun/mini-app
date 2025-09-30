import { Text, TextProps } from '@mantine/core';
import { ReactNode } from 'react';
import typeClasses from '../styles/typography.module.css';

export const ExternalLink = ({
  children,
  href,
  external = true,
  ...props
}: TextProps & { children?: ReactNode; href: string; external?: boolean }) => (
  <Text
    {...props}
    component="a"
    href={href}
    classNames={{ root: typeClasses.textLink }}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
  >
    {children}
  </Text>
);

export const Bold = ({
  children,
  ...props
}: { children: ReactNode } & TextProps) => (
  <Text
    classNames={{
      root: typeClasses.bold,
    }}
    {...props}
  >
    {children}
  </Text>
);

export const Italic = ({ children }: { children: ReactNode }) => (
  <Text classNames={{ root: typeClasses.italic }}>{children}</Text>
);

export const BoldItalic = ({ children }: { children: ReactNode }) => (
  <Text classNames={{ root: typeClasses.boldItalic }}>{children}</Text>
);
