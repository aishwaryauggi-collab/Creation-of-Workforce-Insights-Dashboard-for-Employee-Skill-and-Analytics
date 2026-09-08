export const ROLES = {
  ADMIN: 'Admin',
  HR_MANAGER: 'HR Manager',
  EMPLOYEE: 'Employee',
};

export const ROUTE_PERMISSIONS = {
  '/dashboard': [ROLES.ADMIN, ROLES.HR_MANAGER, ROLES.EMPLOYEE],
  '/retention': [ROLES.ADMIN, ROLES.HR_MANAGER],
  '/performance': [ROLES.ADMIN, ROLES.HR_MANAGER],
  '/dei': [ROLES.ADMIN, ROLES.HR_MANAGER],
  '/recruitment': [ROLES.ADMIN, ROLES.HR_MANAGER],
  '/ai-assistant': [ROLES.ADMIN, ROLES.HR_MANAGER, ROLES.EMPLOYEE],
};

export const hasPermission = (userRole, allowedRoles = []) => {
  if (!userRole) return false;
  return allowedRoles.includes(userRole);
};