import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Plus, Settings } from 'lucide-react';

const Notifications: React.FC = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <Bell className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
        <p className="text-gray-600">Manage system notifications and alerts</p>
        <button className="btn-primary mt-6">
          <Settings className="w-4 h-4 mr-2" />
          Configure Notifications
        </button>
      </motion.div>
    </div>
  );
};

export default Notifications;