import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Calendar, 
  Check, 
  X,
  Eye,
  Edit3,
  PlusCircle,
  Trash
} from 'lucide-react';
import { usePermissions } from '../contexts/PermissionContext';
import toast from 'react-hot-toast';

const RoleManagement: React.FC = () => {
  const { 
    roles, 
    permissions, 
    updateRolePermissions, 
    createRole, 
    updateRole, 
    deleteRole 
  } = usePermissions();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRole, setEditingRole] = useState<any>(null);
  const [showPermissionMatrix, setShowPermissionMatrix] = useState<string | null>(null);
  
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [],
    isSystem: false,
    userCount: 0
  });

  const pageDisplayNames: { [key: string]: string } = {
    'dashboard': 'Dashboard',
    'users': 'User Management',
    'roles': 'Role Management',
    'analytics': 'Analytics',
    'content': 'Content Management',
    'reports': 'Reports',
    'notifications': 'Notifications',
    'security': 'Security',
    'api': 'API Management',
    'activity': 'Activity Logs',
    'settings': 'Settings',
    'products': 'Products List',
    'marketing': 'Marketing List',
    'orders': 'Order List',
    'media-plans': 'Media Plans',
    'support': 'Customer Support',
    'inventory': 'Inventory Management',
    'sales-reports': 'Sales Reports',
    'content-library': 'Content Library',
    'team': 'Team Collaboration',
    'projects': 'Project Management'
  };

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    
    const roleData = {
      ...newRole,
      permissions: permissions.map(p => ({ ...p, view: false, edit: false, create: false, delete: false }))
    };
    
    createRole(roleData);
    setShowCreateModal(false);
    setNewRole({ name: '', description: '', permissions: [], isSystem: false, userCount: 0 });
    toast.success('Role created successfully');
  };

  const handleUpdateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRole) return;

    updateRole(editingRole.id, editingRole);
    setEditingRole(null);
    toast.success('Role updated successfully');
  };

  const handleDeleteRole = (roleId: string, roleName: string) => {
    if (window.confirm(`Are you sure you want to delete the role "${roleName}"?`)) {
      deleteRole(roleId);
      toast.success('Role deleted successfully');
    }
  };

  const updatePermission = (roleId: string, pageId: string, action: string, value: boolean) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return;

    const updatedPermissions = role.permissions.map(p => 
      p.page === pageId ? { ...p, [action]: value } : p
    );

    updateRolePermissions(roleId, updatedPermissions);
  };

  const getRoleColor = (role: any) => {
    if (role.isSystem) {
      switch (role.name) {
        case 'Super Admin': return 'bg-red-100 text-red-700 border-red-200';
        case 'Admin': return 'bg-orange-100 text-orange-700 border-orange-200';
        case 'Editor': return 'bg-blue-100 text-blue-700 border-blue-200';
        case 'Viewer': return 'bg-gray-100 text-gray-700 border-gray-200';
        default: return 'bg-green-100 text-green-700 border-green-200';
      }
    }
    return 'bg-purple-100 text-purple-700 border-purple-200';
  };

  const PermissionMatrix: React.FC<{ role: any }> = ({ role }) => {
    const actions = ['view', 'edit', 'create', 'delete'];
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Permission Matrix: {role.name}
          </h3>
          <button
            onClick={() => setShowPermissionMatrix(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Page</th>
                {actions.map(action => (
                  <th key={action} className="text-center py-3 px-4 font-medium text-gray-700 capitalize">
                    <div className="flex items-center justify-center space-x-1">
                      {action === 'view' && <Eye className="w-4 h-4" />}
                      {action === 'edit' && <Edit3 className="w-4 h-4" />}
                      {action === 'create' && <PlusCircle className="w-4 h-4" />}
                      {action === 'delete' && <Trash className="w-4 h-4" />}
                      <span>{action}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {role.permissions.map((permission: any) => (
                <tr key={permission.page} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {pageDisplayNames[permission.page] || permission.page}
                  </td>
                  {actions.map(action => (
                    <td key={action} className="py-3 px-4 text-center">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={permission[action as keyof typeof permission]}
                          onChange={(e) => updatePermission(role.id, permission.page, action, e.target.checked)}
                          disabled={role.isSystem && role.name === 'Super Admin'}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                      </label>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

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
            <Shield className="w-6 h-6 mr-3 text-blue-600" />
            Role Management
          </h1>
          <p className="text-gray-600 mt-1">Manage roles and their permissions</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Role
        </button>
      </motion.div>

      {/* Permission Matrix */}
      {showPermissionMatrix && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <PermissionMatrix role={roles.find(r => r.id === showPermissionMatrix)} />
        </motion.div>
      )}

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role, index) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${getRoleColor(role)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                  {role.isSystem && (
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                      System
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4">{role.description}</p>
              </div>
              
              {!role.isSystem && (
                <div className="flex space-x-1">
                  <button
                    onClick={() => setEditingRole(role)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role.id, role.name)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Users
                </span>
                <span className="font-medium text-gray-900">{role.userCount}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Created
                </span>
                <span className="font-medium text-gray-900">
                  {new Date(role.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <button
                  onClick={() => setShowPermissionMatrix(role.id)}
                  className="w-full btn-secondary text-sm"
                >
                  Configure Permissions
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Role Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Role</h2>
            <form onSubmit={handleCreateRole} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                <input
                  type="text"
                  required
                  value={newRole.name}
                  onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter role name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  value={newRole.description}
                  onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe the role's purpose and responsibilities"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Create Role
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Edit Role Modal */}
      {editingRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Role</h2>
            <form onSubmit={handleUpdateRole} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                <input
                  type="text"
                  required
                  value={editingRole.name}
                  onChange={(e) => setEditingRole({...editingRole, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  value={editingRole.description}
                  onChange={(e) => setEditingRole({...editingRole, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Update Role
                </button>
                <button
                  type="button"
                  onClick={() => setEditingRole(null)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;