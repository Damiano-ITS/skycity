import React from 'react';
import './Badge.scss';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  /** Se attivo, mostra un indicatore circolare prima del testo. @default false */
  dot?: boolean;
  className?: string;
}

/**
 * Atomo Badge: Visualizza piccole etichette per stati, ruoli o categorie.
 * * @example
 * <Badge label="Admin" variant="info" dot />
 */
export const Badge: React.FC<BadgeProps> = ({ 
  label, 
  variant = 'neutral', 
  dot = false,
  className = '' 
}) => {
  const componentClasses = [
    'atom-badge',
    `atom-badge--${variant}`,
    dot ? 'atom-badge--has-dot' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={componentClasses}>
      {dot && <span className="atom-badge__dot" aria-hidden="true" />}
      <span className="atom-badge__label">{label}</span>
    </span>
  );
};