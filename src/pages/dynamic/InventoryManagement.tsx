import React from 'react';
import { motion } from 'framer-motion';
import { Archive } from 'lucide-react';
import CommentSystem from '../../components/CommentSystem';

const InventoryManagement: React.FC = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <Archive className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Inventory Management</h1>
        <p className="text-gray-600">Track stock levels and inventory movements</p>
      </motion.div>
      
      <CommentSystem pageId="inventory" />
    </div>
  );
};

export default InventoryManagement;