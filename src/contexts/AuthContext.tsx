import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  setupSuperAdmin: (password: string) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
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

// Mock user database
const mockUsers = [
  {
    id: '1',
    email: 'admin@adminhub.com',
    password: 'admin123',
    name: 'Super Admin',
    role: 'Super Admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: '2',
    email: 'john.doe@example.com',
    password: 'password123',
    name: 'John Doe',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    createdAt: '2024-01-02T00:00:00Z',
    isActive: true
  },
  {
    id: '3',
    email: 'jane.smith@example.com',
    password: 'password123',
    name: 'Jane Smith',
    role: 'Editor',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    createdAt: '2024-01-03T00:00:00Z',
    isActive: true
  },
  {
    id: '4',
    email: 'viewer@example.com',
    password: 'password123',
    name: 'View User',
    role: 'Viewer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    createdAt: '2024-01-04T00:00:00Z',
    isActive: true
  }
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in mock database
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser && foundUser.isActive) {
      const userSession: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        avatar: foundUser.avatar,
        createdAt: foundUser.createdAt,
        lastLogin: new Date().toISOString(),
        isActive: foundUser.isActive
      };
      
      setUser(userSession);
      localStorage.setItem('adminUser', JSON.stringify(userSession));
      setIsLoading(false);
      toast.success(`Welcome back, ${foundUser.name}!`);
      return true;
    }
    
    setIsLoading(false);
    toast.error('Invalid credentials or account is inactive');
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
    toast.success('Logged out successfully');
  };

  const setupSuperAdmin = async (password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    toast.success('Super Admin password set successfully');
    return true;
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    toast.success('Password changed successfully');
    return true;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
    setupSuperAdmin,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};