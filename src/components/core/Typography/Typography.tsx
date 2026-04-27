import React, { type ReactNode } from 'react';
import './Typography.scss';

interface TypographyProps {
  /** Tag HTML reale da utilizzare nel DOM. */
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  /** Variante estetica che definisce dimensione e interlinea. @default 'body-md' */
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body-lg' | 'body-md' | 'body-sm' | 'caption' | 'overline';
  /** Peso del font (spessore). @default 'regular' */
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  /** Colore del testo basato sui token di sistema. @default 'main' */
  color?: 'main' | 'light' | 'primary' | 'error' | 'success' | 'white';
  /** Allineamento del testo. @default 'left' */
  align?: 'left' | 'center' | 'right';
  children: ReactNode;
  className?: string;
}

/**
 * Atomo Typography: Gestisce l'intera scala gerarchica dei testi dell'applicazione.
 * Permette di separare il tag semantico (SEO) dall'aspetto visuale.
 */
export const Typography: React.FC<TypographyProps> = ({
  component: Component = 'p',
  variant = 'body-md',
  weight = 'regular',
  color = 'main',
  align = 'left',
  children,
  className = '',
}) => {
  const classes = [
    'atom-type',
    `atom-type--v-${variant}`,
    `atom-type--w-${weight}`,
    `atom-type--c-${color}`,
    `atom-type--a-${align}`,
    className
  ].filter(Boolean).join(' ');

  return <Component className={classes}>{children}</Component>;
};