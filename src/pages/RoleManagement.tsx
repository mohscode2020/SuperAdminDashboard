import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { roleApi, permissionApi } from '../services/api';
import { Role, Permission, CreateRoleData } from '../types';
import { Plus, Edit, Trash2, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateRoleData>();

  const selectedPermissions = watch('permissions') || [];

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    try {
      const rolesData = await roleApi.getRoles();
      setRoles(rolesData);
    } catch (error) {
      toast.error('Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      const permissionsData = await permissionApi.getPermissions();
      setPermissions(permissionsData);
    } catch (error) {
      console.error('Failed to fetch permissions:', error);
    }
  };

  const handleCreateRole = async (data: CreateRoleData) => {
    try {
      await roleApi.createRole(data);
      toast.success('Role created successfully');
      setShowCreateModal(false);
      reset();
      fetchRoles();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to create role');
    }
  };

  const handleUpdateRole = async (data: CreateRoleData) => {
    if (!editingRole) return;
    
    try {
      await roleApi.updateRole(editingRole.id, data);
      toast.success('Role updated successfully');
      setEditingRole(null);
      reset();
      fetchRoles();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to update role');
    }
  };

  const handleDeleteRole = async (roleId: number) => {
    if (!confirm('Are you sure you want to delete this role?')) return;
    
    try {
      await roleApi.deleteRole(roleId);
      toast.success('Role deleted successfully');
      fetchRoles();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to delete role');
    }
  };

  const openEditModal = (role: Role) => {
    setEditingRole(role);
    reset({
      name: role.name,
      description: role.description,
      permissions: role.permissions.map(p => p.id),
    });
  };

  const handlePermissionToggle = (permissionId: number) => {
    const currentPermissions = selectedPermissions;
    const updatedPermissions = currentPermissions.includes(permissionId)
      ? currentPermissions.filter(id => id !== permissionId)
      : [...currentPermissions, permissionId];
    
    setValue('permissions', updatedPermissions);
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
        <h1 className="text-2xl font-bold text-gray-900">Role Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Role
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
                  <p className="text-sm text-gray-500">
                    Created {format(new Date(role.created_at), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(role)}
                  className="text-primary-600 hover:text-primary-900"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <p className="mt-3 text-sm text-gray-600">{role.description}</p>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Permissions</h4>
              <div className="flex flex-wrap gap-1">
                {role.permissions.slice(0, 3).map((permission) => (
                  <span
                    key={permission.id}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {permission.name}
                  </span>
                ))}
                {role.permissions.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    +{role.permissions.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Role Modal */}
      {(showCreateModal || editingRole) && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <form onSubmit={handleSubmit(editingRole ? handleUpdateRole : handleCreateRole)}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {editingRole ? 'Edit Role' : 'Create New Role'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Role Name
                      </label>
                      <input
                        {...register('name', { required: 'Role name is required' })}
                        className="input-field mt-1"
                        placeholder="Enter role name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        {...register('description', { required: 'Description is required' })}
                        rows={3}
                        className="input-field mt-1"
                        placeholder="Enter role description"
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Permissions
                      </label>
                      <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
                        <div className="space-y-2">
                          {permissions.map((permission) => (
                            <label
                              key={permission.id}
                              className="flex items-center space-x-3 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedPermissions.includes(permission.id)}
                                onChange={() => handlePermissionToggle(permission.id)}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              />
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900">
                                  {permission.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {permission.codename}
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="btn-primary w-full sm:w-auto sm:ml-3"
                  >
                    {editingRole ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingRole(null);
                      reset();
                    }}
                    className="btn-secondary w-full sm:w-auto mt-3 sm:mt-0"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;