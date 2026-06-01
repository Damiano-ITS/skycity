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
  const hasPermission = (perm: Permission | Permission[], operator: 'any' | 'all' = 'any'): boolean => {
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