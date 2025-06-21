import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userApi, activityApi } from '../services/api';
import { User, ActivityLog } from '../types';
import { Users, Shield, Activity, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRoles: 0,
    recentActivities: 0,
  });
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [recentActivities, setRecentActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersResponse, activitiesResponse] = await Promise.all([
          userApi.getUsers(1),
          activityApi.getActivityLogs(1),
        ]);

        setStats({
          totalUsers: usersResponse.count,
          activeUsers: usersResponse.results.filter(u => u.is_active).length,
          totalRoles: 0, // Will be updated when roles API is called
          recentActivities: activitiesResponse.count,
        });

        setRecentUsers(usersResponse.results.slice(0, 5));
        setRecentActivities(activitiesResponse.results.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      name: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      name: 'Active Users',
      value: stats.activeUsers,
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      name: 'Total Roles',
      value: stats.totalRoles,
      icon: Shield,
      color: 'bg-purple-500',
      change: '+2%',
    },
    {
      name: 'Recent Activities',
      value: stats.recentActivities,
      icon: Activity,
      color: 'bg-orange-500',
      change: '+15%',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.first_name}!
        </h1>
        <p className="text-primary-100">
          Here's what's happening with your admin dashboard today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <span className="ml-2 text-sm font-medium text-green-600">
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity and Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Users</h3>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-600">
                      {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.is_active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-gray-600" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user.username}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(activity.timestamp), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;