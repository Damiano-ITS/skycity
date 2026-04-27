import React from 'react';
import './Input.scss';

interface InputProps {
  label?: string;
  placeholder?: string;
  
  /** * Tipo di input:
   * - `text`: Testo standard.
   * - `password`: Campo oscurato.
   * - `email`: Validazione formato email.
   * - `number`: Solo caratteri numerici.
   * @default 'text'
   */
  type?: 'text' | 'password' | 'email' | 'number';
  
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
}

/**
 * Atomo Input: Campo di inserimento dati testuali per SkyCity.
 * Supporta la gestione degli errori e diverse varianti di tipo.
 * * @example
 * ```tsx
 * <Input 
 * label="Email" 
 * type="email" 
 * placeholder="inserisci@email.it" 
 * error={hasError ? "Email non valida" : ""}
 * />
 * ```
 */
export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  disabled = false,
  className = '',
  name
}) => {
  
  const containerClasses = [
    'atom-input',
    error ? 'atom-input--has-error' : '',
    disabled ? 'atom-input--is-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label className="atom-input__label" htmlFor={name}>
          {label}
        </label>
      )}
      
      <div className="atom-input__wrapper">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="atom-input__field"
          aria-invalid={!!error}
        />
      </div>

      {error && (
        <span className="atom-input__error-message">
          {error}
        </span>
      )}
    </div>
  );
};