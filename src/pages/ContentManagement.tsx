import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Search, Filter, Edit, Trash2, Eye, Calendar } from 'lucide-react';

const ContentManagement: React.FC = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Content Management</h1>
        <p className="text-gray-600">Manage and organize your content with role-based permissions</p>
        <button className="btn-primary mt-6">
          <Plus className="w-4 h-4 mr-2" />
          Create Content
        </button>
      </motion.div>
    </div>
  );
};

export default ContentManagement;