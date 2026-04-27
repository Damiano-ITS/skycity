import React, { type ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import { type Permission } from '../../config/permissions';

interface CanProps {
  /** Il permesso o la lista di permessi richiesti per visualizzare il contenuto. */
  perform: Permission | Permission[];
  /** * L'operatore logico da applicare in caso di permessi multipli:
   * - 'any': basta possedere uno dei permessi (OR)
   * - 'all': bisogna possederli tutti (AND)
   * @default 'any'
   */
  operator?: 'any' | 'all';
  /** Componente opzionale da mostrare se l'utente non ha i permessi (es. un messaggio di errore o un lucchetto). */
  noAccess?: ReactNode;
  /** Il contenuto protetto da renderizzare. */
  children: ReactNode;
}

/**
 * Componente Wrapper per la gestione dei permessi granulari (ACL).
 * * @example
 * ```tsx
 * <Can perform="users:delete" noAccess={<p>Accesso negato</p>}>
 * <Button label="Elimina" />
 * </Can>
 * ```
 */
export const Can: React.FC<CanProps> = ({ 
  perform, 
  operator = 'any', 
  noAccess = null, 
  children 
}) => {
  const { hasPermission } = useAuth();

  if (hasPermission(perform, operator)) {
    return <>{children}</>;
  }

  return <>{noAccess}</>;
};