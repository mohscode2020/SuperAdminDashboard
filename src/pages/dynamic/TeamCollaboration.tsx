import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import CommentSystem from '../../components/CommentSystem';

const TeamCollaboration: React.FC = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Team Collaboration</h1>
        <p className="text-gray-600">Collaborate with team members on projects</p>
      </motion.div>
      
      <CommentSystem pageId="team" />
    </div>
  );
};

export default TeamCollaboration;