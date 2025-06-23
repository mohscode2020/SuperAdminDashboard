import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthTokens, LoginCredentials } from '../types';
import { authApi } from '../services/api';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  tokens: AuthTokens | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedTokens = localStorage.getItem('tokens');
      if (storedTokens) {
        try {
          const parsedTokens = JSON.parse(storedTokens);
          setTokens(parsedTokens);
          
          // Verify token and get user info
          const userData = await authApi.getProfile(parsedTokens.access);
          setUser(userData);
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('tokens');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const response = await authApi.login(credentials);
      setTokens(response.tokens);
      setUser(response.user);
      localStorage.setItem('tokens', JSON.stringify(response.tokens));
      toast.success('Login successful!');
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Login failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem('tokens');
    toast.success('Logged out successfully');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.is_superuser) return true;
    return user.permissions.includes(permission);
  };

  const value = {
    user,
    tokens,
    login,
    logout,
    loading,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};