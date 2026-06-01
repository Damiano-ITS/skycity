import React, { type ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import { type Permission } from '../../config/permissions';

interface CanProps {
  perform: Permission | Permission[];
  operator?: 'any' | 'all';
  noAccess?: ReactNode;
  children: ReactNode;
}

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