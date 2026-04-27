import React, { createContext, useContext, type ReactNode } from 'react';
import { type Permission, PERMISSIONS } from '../config/permissions';

interface AuthContextType {
  userPermissions: Permission[];
  hasPermission: (
    perm: Permission | Permission[], 
    operator?: 'any' | 'all'
  ) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode, userPermissions: Permission[] }> = ({ 
  children, 
  userPermissions 
}) => {
/**
 * Verifica se l'utente possiede i permessi richiesti.
 * * @param perm - Singolo permesso o array di permessi (es. 'users:list' o ['map:view', 'map:edit']).
 * @param operator - Definizione della logica ('any' richiede almeno un match, 'all' richiede il match totale).
 * @returns boolean - True se l'utente è autorizzato (o se possiede il jolly '*').
 * * @description
 * Questa funzione controlla prima la presenza del permesso wildcard `*`. 
 * Se non presente, procede alla comparazione basata sull'operatore fornito.
 */
  const hasPermission = (perm: Permission | Permission[], operator: 'any' | 'all' = 'any'): boolean => {
    // Controllo Super Admin (Jolly)
    if (userPermissions.includes(PERMISSIONS.SUPER_ADMIN)) return true;

    const requiredPerms = Array.isArray(perm) ? perm : [perm];

    if (operator === 'all') {
      return requiredPerms.every(p => userPermissions.includes(p));
    }
    
    return requiredPerms.some(p => userPermissions.includes(p));
  };

  return (
    <AuthContext.Provider value={{ userPermissions, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve essere utilizzato all\'interno di un AuthProvider');
  }
  return context;
};