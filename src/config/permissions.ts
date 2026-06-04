export const PERMISSIONS = {
  SUPER_ADMIN: '*',
  DASHBOARD_VIEW: 'dashboard:view',
  MANUTENZIONI_VIEW: 'manutenzioni:view',
  VEICOLI_VIEW: 'veicoli:view',
  STAZIONI_VIEW: 'stazioni:view',
  REPORT_VIEW: 'report:view',
  ANALYTICS_VIEW: 'analytics:view',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS] | string;