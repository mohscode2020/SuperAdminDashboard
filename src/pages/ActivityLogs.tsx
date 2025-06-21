import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Search, Filter, Download } from 'lucide-react';

const ActivityLogs: React.FC = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <Activity className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Activity Logs</h1>
        <p className="text-gray-600">Monitor and track all system activities</p>
        <button className="btn-primary mt-6">
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </button>
      </motion.div>
    </div>
  );
};

export default ActivityLogs;