export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: string;
  last_login?: string;
  role?: Role;
  permissions: string[];
}

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Permission[];
  created_at: string;
  updated_at: string;
}

export interface Permission {
  id: number;
  name: string;
  codename: string;
  content_type: string;
}

export interface ActivityLog {
  id: number;
  user: {
    id: number;
    username: string;
    email: string;
  };
  action: string;
  object_type: string;
  object_id?: number;
  object_repr: string;
  changes: Record<string, any>;
  timestamp: string;
  ip_address: string;
  user_agent: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface CreateUserData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role_id?: number;
  permissions: string[];
}

export interface UpdateUserData {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  role_id?: number;
  permissions?: string[];
}

export interface CreateRoleData {
  name: string;
  description: string;
  permissions: number[];
}

export interface ApiResponse<T> {
  results: T[];
  count: number;
  next?: string;
  previous?: string;
}