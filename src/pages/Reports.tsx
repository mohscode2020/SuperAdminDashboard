import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Download, Calendar, BarChart3 } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports</h1>
        <p className="text-gray-600">Generate comprehensive reports and analytics</p>
        <button className="btn-primary mt-6">
          <Download className="w-4 h-4 mr-2" />
          Generate Report
        </button>
      </motion.div>
    </div>
  );
};

export default Reports;