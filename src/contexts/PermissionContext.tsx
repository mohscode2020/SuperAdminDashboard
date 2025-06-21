import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface Permission {
  id: string;
  page: string;
  view: boolean;
  edit: boolean;
  create: boolean;
  delete: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystem: boolean;
  userCount: number;
  createdAt: string;
}

interface PermissionContextType {
  roles: Role[];
  permissions: Permission[];
  updateRolePermissions: (roleId: string, permissions: Permission[]) => void;
  createRole: (role: Omit<Role, 'id' | 'createdAt'>) => void;
  updateRole: (roleId: string, updates: Partial<Role>) => void;
  deleteRole: (roleId: string) => void;
  hasPermission: (page: string, action: 'view' | 'edit' | 'create' | 'delete') => boolean;
  canAccessPage: (page: string) => boolean;
  getUserPermissions: () => Permission[];
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  return context;
};

const defaultPages = [
  'dashboard', 'users', 'roles', 'analytics', 'content', 'reports',
  'notifications', 'security', 'api', 'activity', 'settings',
  'products', 'marketing', 'orders', 'media-plans', 'support',
  'inventory', 'sales-reports', 'content-library', 'team', 'projects'
];

const createDefaultPermissions = (fullAccess = false): Permission[] => {
  return defaultPages.map(page => ({
    id: `${page}-permission`,
    page,
    view: fullAccess,
    edit: fullAccess,
    create: fullAccess,
    delete: fullAccess
  }));
};

interface PermissionProviderProps {
  children: ReactNode;
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({ children }) => {
  const { user } = useAuth();
  
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'super-admin',
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      permissions: createDefaultPermissions(true),
      isSystem: true,
      userCount: 1,
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'admin',
      name: 'Admin',
      description: 'Administrative access with most permissions',
      permissions: createDefaultPermissions().map(p => ({
        ...p,
        view: true,
        edit: !['settings', 'security', 'api'].includes(p.page),
        create: !['settings', 'security', 'api'].includes(p.page),
        delete: !['settings', 'security', 'api', 'users'].includes(p.page)
      })),
      isSystem: true,
      userCount: 2,
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'editor',
      name: 'Editor',
      description: 'Content management and editing permissions',
      permissions: createDefaultPermissions().map(p => ({
        ...p,
        view: ['dashboard', 'content', 'content-library', 'reports', 'products', 'marketing'].includes(p.page),
        edit: ['content', 'content-library', 'products'].includes(p.page),
        create: ['content', 'content-library', 'products'].includes(p.page),
        delete: false
      })),
      isSystem: true,
      userCount: 5,
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'viewer',
      name: 'Viewer',
      description: 'Read-only access to most areas',
      permissions: createDefaultPermissions().map(p => ({
        ...p,
        view: ['dashboard', 'analytics', 'reports', 'products', 'orders'].includes(p.page),
        edit: false,
        create: false,
        delete: false
      })),
      isSystem: true,
      userCount: 8,
      createdAt: '2024-01-01T00:00:00Z'
    }
  ]);

  const updateRolePermissions = (roleId: string, permissions: Permission[]) => {
    setRoles(prev => prev.map(role => 
      role.id === roleId ? { ...role, permissions } : role
    ));
  };

  const createRole = (roleData: Omit<Role, 'id' | 'createdAt'>) => {
    const newRole: Role = {
      ...roleData,
      id: `role-${Date.now()}`,
      createdAt: new Date().toISOString(),
      permissions: createDefaultPermissions() // Start with no permissions
    };
    setRoles(prev => [...prev, newRole]);
  };

  const updateRole = (roleId: string, updates: Partial<Role>) => {
    setRoles(prev => prev.map(role => 
      role.id === roleId ? { ...role, ...updates } : role
    ));
  };

  const deleteRole = (roleId: string) => {
    setRoles(prev => prev.filter(role => role.id !== roleId));
  };

  const getUserPermissions = (): Permission[] => {
    if (!user) return [];
    
    // Super Admin always has full access
    if (user.role === 'Super Admin') {
      return createDefaultPermissions(true);
    }
    
    const userRole = roles.find(role => role.name === user.role);
    return userRole ? userRole.permissions : [];
  };

  const hasPermission = (page: string, action: 'view' | 'edit' | 'create' | 'delete'): boolean => {
    if (!user) return false;
    
    // Super Admin always has full access
    if (user.role === 'Super Admin') {
      return true;
    }
    
    const userPermissions = getUserPermissions();
    const pagePermission = userPermissions.find(p => p.page === page);
    
    return pagePermission ? pagePermission[action] : false;
  };

  const canAccessPage = (page: string): boolean => {
    return hasPermission(page, 'view');
  };

  const permissions = createDefaultPermissions();

  const value: PermissionContextType = {
    roles,
    permissions,
    updateRolePermissions,
    createRole,
    updateRole,
    deleteRole,
    hasPermission,
    canAccessPage,
    getUserPermissions
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};