import React from 'react';
import { motion } from 'framer-motion';
import { Code, Plus, Key, Settings } from 'lucide-react';

const APIManagement: React.FC = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <Code className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">API Management</h1>
        <p className="text-gray-600">Manage API keys and endpoint access</p>
        <button className="btn-primary mt-6">
          <Key className="w-4 h-4 mr-2" />
          Generate API Key
        </button>
      </motion.div>
    </div>
  );
};

export default APIManagement;