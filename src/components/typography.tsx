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

export const Bold = ({ children }: { children: ReactNode }) => (
  <span className={typeClasses.bold}>{children}</span>
);

export const Italic = ({ children }: { children: ReactNode }) => (
  <span className={typeClasses.italic}>{children}</span>
);

export const Underline = ({ children }: { children: ReactNode }) => (
  <span className={typeClasses.underline}>{children}</span>
);

export const BoldItalic = ({ children }: { children: ReactNode }) => (
  <span className={typeClasses.boldItalic}>{children}</span>
);
