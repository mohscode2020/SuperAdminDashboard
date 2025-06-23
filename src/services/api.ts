import axios from 'axios';
import { 
  User, 
  Role, 
  ActivityLog, 
  AuthTokens, 
  LoginCredentials, 
  CreateUserData, 
  UpdateUserData, 
  CreateRoleData,
  ApiResponse,
  Permission
} from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const tokens = localStorage.getItem('tokens');
  if (tokens) {
    const { access } = JSON.parse(tokens);
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const tokens = localStorage.getItem('tokens');
      if (tokens) {
        try {
          const { refresh } = JSON.parse(tokens);
          const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh,
          });
          
          const newTokens = {
            access: response.data.access,
            refresh,
          };
          
          localStorage.setItem('tokens', JSON.stringify(newTokens));
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('tokens');
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> => {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
  },
  
  getProfile: async (token: string): Promise<User> => {
    const response = await api.get('/auth/profile/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  
  refreshToken: async (refresh: string): Promise<{ access: string }> => {
    const response = await api.post('/auth/token/refresh/', { refresh });
    return response.data;
  },
};

export const userApi = {
  getUsers: async (page = 1, search = ''): Promise<ApiResponse<User>> => {
    const response = await api.get(`/users/?page=${page}&search=${search}`);
    return response.data;
  },
  
  getUser: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}/`);
    return response.data;
  },
  
  createUser: async (userData: CreateUserData): Promise<User> => {
    const response = await api.post('/users/', userData);
    return response.data;
  },
  
  updateUser: async (id: number, userData: UpdateUserData): Promise<User> => {
    const response = await api.patch(`/users/${id}/`, userData);
    return response.data;
  },
  
  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}/`);
  },
  
  toggleUserStatus: async (id: number): Promise<User> => {
    const response = await api.post(`/users/${id}/toggle-status/`);
    return response.data;
  },
};

export const roleApi = {
  getRoles: async (): Promise<Role[]> => {
    const response = await api.get('/roles/');
    return response.data.results;
  },
  
  getRole: async (id: number): Promise<Role> => {
    const response = await api.get(`/roles/${id}/`);
    return response.data;
  },
  
  createRole: async (roleData: CreateRoleData): Promise<Role> => {
    const response = await api.post('/roles/', roleData);
    return response.data;
  },
  
  updateRole: async (id: number, roleData: Partial<CreateRoleData>): Promise<Role> => {
    const response = await api.patch(`/roles/${id}/`, roleData);
    return response.data;
  },
  
  deleteRole: async (id: number): Promise<void> => {
    await api.delete(`/roles/${id}/`);
  },
};

export const permissionApi = {
  getPermissions: async (): Promise<Permission[]> => {
    const response = await api.get('/permissions/');
    return response.data.results;
  },
};

export const activityApi = {
  getActivityLogs: async (page = 1, filters = {}): Promise<ApiResponse<ActivityLog>> => {
    const params = new URLSearchParams({ page: page.toString(), ...filters });
    const response = await api.get(`/activity-logs/?${params}`);
    return response.data;
  },
};

export default api;