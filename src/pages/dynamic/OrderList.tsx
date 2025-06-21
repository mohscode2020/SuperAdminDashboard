import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import CommentSystem from '../../components/CommentSystem';

const OrderList: React.FC = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <ShoppingCart className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order List</h1>
        <p className="text-gray-600">Manage customer orders and fulfillment</p>
      </motion.div>
      
      <CommentSystem pageId="orders" />
    </div>
  );
};

export default OrderList;