import React from 'react';
import { Users, Activity, MessageCircle, Shield, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const stats = [
    {
      name: 'Total Users',
      value: '3',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'blue'
    },
    {
      name: 'Active Sessions',
      value: '24',
      change: '+5%',
      changeType: 'increase',
      icon: Activity,
      color: 'green'
    },
    {
      name: 'Total Comments',
      value: '2',
      change: '+8%',
      changeType: 'increase',
      icon: MessageCircle,
      color: 'purple'
    },
    {
      name: 'Security Alerts',
      value: '2',
      change: '-3%',
      changeType: 'decrease',
      icon: Shield,
      color: 'red'
    }
  ];

  const activityData = [
    { time: '00:00', users: 12, sessions: 8 },
    { time: '04:00', users: 8, sessions: 5 },
    { time: '08:00', users: 24, sessions: 18 },
    { time: '12:00', users: 32, sessions: 28 },
    { time: '16:00', users: 28, sessions: 22 },
    { time: '20:00', users: 20, sessions: 15 }
  ];

  const roleDistribution = [
    { name: 'Viewer', value: 8, color: '#8B5CF6' },
    { name: 'Editor', value: 5, color: '#06B6D4' },
    { name: 'Admin', value: 2, color: '#10B981' },
    { name: 'Super Admin', value: 1, color: '#F59E0B' }
  ];

  const recentActivity = [
    {
      id: 1,
      user: 'Super Admin',
      action: 'Created new user account for john.doe@example.com',
      time: '1/15/2024, 2:30:00 PM',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    {
      id: 2,
      user: 'Super Admin',
      action: 'Updated permissions for Editor role',
      time: '1/15/2024, 1:45:00 PM',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    {
      id: 3,
      user: 'Admin User',
      action: 'Published new content in Marketing section',
      time: '1/15/2024, 11:20:00 AM',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    },
    {
      id: 4,
      user: 'Editor User',
      action: 'Modified product catalog entry',
      time: '1/15/2024, 10:15:00 AM',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    }
  ];

  const systemHealth = [
    { name: 'Database', status: 'Healthy', color: 'green' },
    { name: 'API Services', status: 'Online', color: 'green' },
    { name: 'Storage', status: '75% Used', color: 'yellow' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your system.</p>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          Last updated: 9:36:18 AM
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.changeType === 'increase' ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                Recent Activity
              </h2>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    src={activity.avatar}
                    alt={activity.user}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-blue-600">{activity.user}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.action}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">System Health</h2>
            <div className="space-y-4">
              {systemHealth.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.color === 'green' 
                      ? 'bg-green-100 text-green-700'
                      : item.color === 'yellow'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Role Distribution Chart */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-700 mb-4">User Role Distribution</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roleDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      dataKey="value"
                    >
                      {roleDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {roleDistribution.map((item, index) => (
                  <div key={index} className="flex items-center text-xs">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-600">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-6">User Activity Over Time</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                name="Active Users"
              />
              <Line 
                type="monotone" 
                dataKey="sessions" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="Sessions"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;