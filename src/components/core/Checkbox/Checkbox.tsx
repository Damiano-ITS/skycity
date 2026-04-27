import React from 'react';
import './Checkbox.scss';

interface CheckboxProps {
  id?: string;
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Se true, disabilita l'interazione e cambia lo stile visivo. @default false */
  disabled?: boolean;
  name?: string;
  className?: string;
}

/**
 * Atomo Checkbox: Input di tipo booleano con stile personalizzato SkyCity.
 * Supporta la navigazione da tastiera e gli standard di accessibilità.
 * * @example
 * <Checkbox 
 * label="Accetto i termini e le condizioni" 
 * checked={accepted} 
 * onChange={(val) => setAccepted(val)} 
 * />
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  name,
  className = ''
}) => {
  const checkboxId = id || `checkbox-${name || Math.random().toString(36).substr(2, 9)}`;

  const containerClasses = [
    'atom-checkbox',
    disabled ? 'atom-checkbox--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <div className="atom-checkbox__wrapper">
        <input
          type="checkbox"
          id={checkboxId}
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="atom-checkbox__input"
        />
        {/* Questo span simula il quadrato grafico della checkbox */}
        <span className="atom-checkbox__box">
          {checked && (
            <svg 
              className="atom-checkbox__icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </span>
      </div>
      {label && (
        <label htmlFor={checkboxId} className="atom-checkbox__label">
          {label}
        </label>
      )}
    </div>
  );
};