import React from 'react';
import './Button.scss';

interface ButtonProps {
  label: string;
  /** * Determina lo stile visivo del bottone:
   * - `primary`: Colore principale del brand SkyCity.
   * - `secondary`: Stile con bordo, per azioni meno rilevanti.
   * - `danger`: Colore rosso per azioni distruttive (es. elimina).
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'danger';
  
  /** * Dimensione del componente:
   * - `small`
   * - `medium`:standard.
   * - `large`
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  onClick?: () => void;
  
  disabled?: boolean;
  
  className?: string;
}

/**
 * * @example
 * ```tsx
 * <Button 
 * label="Salva Modifiche" 
 * variant="primary" 
 * onClick={() => console.log('Saved!')} 
 * />
 * ```
 */
export const Button: React.FC<ButtonProps> = ({ 
  label, 
  variant = 'primary', 
  size = 'medium', 
  onClick,
  disabled = false,
  className = ''
}) => {
  
  const componentClasses = [
    'atom-btn',
    `atom-btn--${variant}`,
    `atom-btn--${size}`,
    disabled ? 'atom-btn--is-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={componentClasses} 
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      <span className="atom-btn__text">{label}</span>
    </button>
  );
};