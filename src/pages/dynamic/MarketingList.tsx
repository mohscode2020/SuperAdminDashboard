import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone } from 'lucide-react';
import CommentSystem from '../../components/CommentSystem';

const MarketingList: React.FC = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <Megaphone className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Marketing List</h1>
        <p className="text-gray-600">Track and manage marketing campaigns</p>
      </motion.div>
      
      <CommentSystem pageId="marketing" />
    </div>
  );
};

export default MarketingList;