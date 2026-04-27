// Segue il formato `modulo:azione`.

export const PERMISSIONS = {
  // Permesso universale
  SUPER_ADMIN: '*',

  // User Module
  USERS_LIST: 'users:list',
  USERS_WRITE: 'users:write',
  USERS_DELETE: 'users:delete',

  // Dashboard Module
  DASHBOARD_VIEW: 'dashboard:view',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS] | string;