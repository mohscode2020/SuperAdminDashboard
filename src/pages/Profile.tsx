import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { User, Shield, Mail, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface ProfileFormData {
  first_name: string;
  last_name: string;
  email: string;
}

interface PasswordFormData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>();

  const newPassword = watch('new_password');

  const handleUpdateProfile = async (data: ProfileFormData) => {
    try {
      // API call to update profile would go here
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleChangePassword = async (data: PasswordFormData) => {
    try {
      // API call to change password would go here
      toast.success('Password changed successfully');
      resetPassword();
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
          <span className="text-xl font-medium text-primary-600">
            {user.first_name.charAt(0)}{user.last_name.charAt(0)}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* User Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Username</p>
              <p className="text-lg font-semibold text-gray-900">{user.username}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Role</p>
              <p className="text-lg font-semibold text-gray-900">
                {user.role?.name || 'No Role'}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Joined</p>
              <p className="text-lg font-semibold text-gray-900">
                {format(new Date(user.date_joined), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'password'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Change Password
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'permissions'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Permissions
            </button>
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmitProfile(handleUpdateProfile)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    {...registerProfile('first_name', { required: 'First name is required' })}
                    className="input-field mt-1"
                  />
                  {profileErrors.first_name && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.first_name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    {...registerProfile('last_name', { required: 'Last name is required' })}
                    className="input-field mt-1"
                  />
                  {profileErrors.last_name && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.last_name.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  {...registerProfile('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  className="input-field mt-1"
                />
                {profileErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{profileErrors.email.message}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  Update Profile
                </button>
              </div>
            </form>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handleSubmitPassword(handleChangePassword)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  {...registerPassword('current_password', { required: 'Current password is required' })}
                  type="password"
                  className="input-field mt-1"
                />
                {passwordErrors.current_password && (
                  <p className="mt-1 text-sm text-red-600">{passwordErrors.current_password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  {...registerPassword('new_password', {
                    required: 'New password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                  type="password"
                  className="input-field mt-1"
                />
                {passwordErrors.new_password && (
                  <p className="mt-1 text-sm text-red-600">{passwordErrors.new_password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  {...registerPassword('confirm_password', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === newPassword || 'Passwords do not match',
                  })}
                  type="password"
                  className="input-field mt-1"
                />
                {passwordErrors.confirm_password && (
                  <p className="mt-1 text-sm text-red-600">{passwordErrors.confirm_password.message}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  Change Password
                </button>
              </div>
            </form>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Your Permissions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.permissions.map((permission) => (
                  <div key={permission} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">{permission}</span>
                  </div>
                ))}
                {user.permissions.length === 0 && (
                  <p className="text-gray-500 col-span-2">No specific permissions assigned.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;