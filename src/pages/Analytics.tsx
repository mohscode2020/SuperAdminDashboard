import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, TrendingUp, Activity, Calendar, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Analytics: React.FC = () => {
  const roleAnalytics = [
    { role: 'Viewer', users: 8, percentage: 50, color: '#8B5CF6' },
    { role: 'Editor', users: 5, percentage: 31.25, color: '#06B6D4' },
    { role: 'Admin', users: 2, percentage: 12.5, color: '#10B981' },
    { role: 'Super Admin', users: 1, percentage: 6.25, color: '#F59E0B' }
  ];

  const userActivityData = [
    { month: 'Jan', active: 12, new: 3, total: 15 },
    { month: 'Feb', active: 15, new: 2, total: 17 },
    { month: 'Mar', active: 18, new: 4, total: 21 },
    { month: 'Apr', active: 16, new: 1, total: 22 },
    { month: 'May', active: 20, new: 3, total: 25 },
    { month: 'Jun', active: 22, new: 2, total: 27 }
  ];

  const permissionUsage = [
    { permission: 'View', usage: 95 },
    { permission: 'Edit', usage: 70 },
    { permission: 'Create', usage: 60 },
    { permission: 'Delete', usage: 30 }
  ];

  const pageAccess = [
    { page: 'Dashboard', views: 450, users: 16 },
    { page: 'User Management', views: 120, users: 8 },
    { page: 'Products', views: 340, users: 12 },
    { page: 'Reports', views: 280, users: 10 },
    { page: 'Analytics', views: 200, users: 6 },
    { page: 'Settings', views: 80, users: 3 }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Role analytics and user behavior insights</p>
        </div>
        <button className="btn-primary flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </button>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Roles</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">4</p>
              <p className="text-sm text-green-600 mt-1">2 custom roles</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">16</p>
              <p className="text-sm text-green-600 mt-1">+12% this month</p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Permission Changes</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">23</p>
              <p className="text-sm text-blue-600 mt-1">Last 30 days</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Session Time</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">24m</p>
              <p className="text-sm text-orange-600 mt-1">+8% vs last week</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-xl">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Role Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Role Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleAnalytics}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="users"
                  label={({ role, percentage }) => `${role}: ${percentage.toFixed(1)}%`}
                >
                  {roleAnalytics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {roleAnalytics.map((item, index) => (
              <div key={index} className="flex items-center text-sm">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-600">{item.role}: {item.users} users</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Permission Usage */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Permission Usage</h2>
          <div className="space-y-4">
            {permissionUsage.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.permission}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${item.usage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12">{item.usage}%</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Most Accessed Pages</h3>
            <div className="space-y-3">
              {pageAccess.slice(0, 4).map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">{page.page}</span>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{page.views} views</p>
                    <p className="text-xs text-gray-500">{page.users} users</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* User Activity Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-6">User Activity Timeline</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="active" fill="#3b82f6" name="Active Users" radius={[4, 4, 0, 0]} />
              <Bar dataKey="new" fill="#10b981" name="New Users" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;