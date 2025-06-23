import React, { useState, useEffect } from 'react';
import { activityApi } from '../services/api';
import { ActivityLog } from '../types';
import { Activity, Search, Filter, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const ActivityLogs: React.FC = () => {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    action: '',
    date_from: '',
    date_to: '',
  });

  useEffect(() => {
    fetchActivities();
  }, [currentPage, filters]);

  const fetchActivities = async () => {
    try {
      const response = await activityApi.getActivityLogs(currentPage, filters);
      setActivities(response.results);
      setTotalPages(Math.ceil(response.count / 10));
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create':
        return 'bg-green-100 text-green-800';
      case 'update':
        return 'bg-blue-100 text-blue-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      case 'login':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-600">Real-time activity tracking</span>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filters.action}
              onChange={(e) => handleFilterChange('action', e.target.value)}
              className="input-field pl-10"
            >
              <option value="">All Actions</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
              <option value="login">Login</option>
            </select>
          </div>
          
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={filters.date_from}
              onChange={(e) => handleFilterChange('date_from', e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={filters.date_to}
              onChange={(e) => handleFilterChange('date_to', e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="card">
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, activityIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== activities.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center ring-8 ring-white">
                        <Activity className="h-4 w-4 text-primary-600" />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user.username}</span>{' '}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(activity.action)}`}>
                            {activity.action}
                          </span>{' '}
                          <span className="font-medium">{activity.object_type}</span>
                          {activity.object_repr && (
                            <span className="text-gray-600"> "{activity.object_repr}"</span>
                          )}
                        </p>
                        {activity.changes && Object.keys(activity.changes).length > 0 && (
                          <div className="mt-2">
                            <details className="text-xs text-gray-600">
                              <summary className="cursor-pointer hover:text-gray-900">
                                View changes
                              </summary>
                              <pre className="mt-2 bg-gray-50 p-2 rounded text-xs overflow-x-auto">
                                {JSON.stringify(activity.changes, null, 2)}
                              </pre>
                            </details>
                          </div>
                        )}
                        <div className="mt-1 text-xs text-gray-500">
                          IP: {activity.ip_address}
                        </div>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        <time dateTime={activity.timestamp}>
                          {format(new Date(activity.timestamp), 'MMM d, yyyy h:mm a')}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === page
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityLogs;