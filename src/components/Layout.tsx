import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Shield, BarChart3, FileText, Bell, Lock, Settings, Activity, Code, Search, LogOut, Menu, X, Package, Megaphone, ShoppingCart, Calendar, MessageCircle, Archive, TrendingUp, FolderOpen, IceCreamIcon as Team, Briefcase } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePermissions } from '../contexts/PermissionContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { canAccessPage } = usePermissions();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, page: 'dashboard' },
    { name: 'User Management', href: '/users', icon: Users, page: 'users' },
    { name: 'Role Management', href: '/roles', icon: Shield, page: 'roles' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, page: 'analytics' },
    { name: 'Content Management', href: '/content', icon: FileText, page: 'content' },
    { name: 'Reports', href: '/reports', icon: TrendingUp, page: 'reports' },
    { name: 'Notifications', href: '/notifications', icon: Bell, page: 'notifications' },
    { name: 'Security', href: '/security', icon: Lock, page: 'security' },
    { name: 'API Management', href: '/api', icon: Code, page: 'api' },
    { name: 'Activity Logs', href: '/activity', icon: Activity, page: 'activity' },
    { name: 'Settings', href: '/settings', icon: Settings, page: 'settings' },
  ];

  const dynamicPages = [
    { name: 'Products List', href: '/products', icon: Package, page: 'products' },
    { name: 'Marketing List', href: '/marketing', icon: Megaphone, page: 'marketing' },
    { name: 'Order List', href: '/orders', icon: ShoppingCart, page: 'orders' },
    { name: 'Media Plans', href: '/media-plans', icon: Calendar, page: 'media-plans' },
    { name: 'Customer Support', href: '/support', icon: MessageCircle, page: 'support' },
    { name: 'Inventory Management', href: '/inventory', icon: Archive, page: 'inventory' },
    { name: 'Sales Reports', href: '/sales-reports', icon: TrendingUp, page: 'sales-reports' },
    { name: 'Content Library', href: '/content-library', icon: FolderOpen, page: 'content-library' },
    { name: 'Team Collaboration', href: '/team', icon: Team, page: 'team' },
    { name: 'Project Management', href: '/projects', icon: Briefcase, page: 'projects' },
  ];

  const isActive = (href: string) => location.pathname === href;

  // Filter navigation items based on user permissions
  const filteredNavigationItems = navigationItems.filter(item => canAccessPage(item.page));
  const filteredDynamicPages = dynamicPages.filter(item => canAccessPage(item.page));

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">AdminHub</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-4">
            <div className="space-y-1">
              {filteredNavigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${isActive(item.href) ? 'text-blue-700' : 'text-gray-400'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {filteredDynamicPages.length > 0 && (
              <div className="mt-8">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dynamic Pages</h3>
                <div className="mt-2 space-y-1">
                  {filteredDynamicPages.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          isActive(item.href)
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon className={`mr-3 h-4 w-4 ${isActive(item.href) ? 'text-blue-700' : 'text-gray-400'}`} />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-gray-600 mr-4"
              >
                <Menu size={20} />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                Super Admin Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Layout;