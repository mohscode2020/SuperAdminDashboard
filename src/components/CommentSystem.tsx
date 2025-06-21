import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Edit, Trash2, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePermissions } from '../contexts/PermissionContext';
import toast from 'react-hot-toast';

interface Comment {
  id: string;
  content: string;
  author: string;
  authorId: string;
  avatar: string;
  timestamp: string;
  edited?: boolean;
}

interface CommentSystemProps {
  pageId: string;
}

const CommentSystem: React.FC<CommentSystemProps> = ({ pageId }) => {
  const { user } = useAuth();
  const { hasPermission } = usePermissions();
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      content: 'This page looks great! The new features are working well.',
      author: 'John Doe',
      authorId: '2',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      content: 'I agree! The user interface improvements make everything much more intuitive.',
      author: 'Jane Smith',
      authorId: '3',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
      timestamp: '2024-01-15T11:15:00Z'
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  // Check permissions for this page
  const canView = hasPermission(pageId, 'view');
  const canEdit = hasPermission(pageId, 'edit');
  const canCreate = hasPermission(pageId, 'create');
  const canDelete = hasPermission(pageId, 'delete');

  if (!canView) {
    return null; // Don't show comments if user can't view the page
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canCreate) {
      toast.error('You do not have permission to create comments on this page');
      return;
    }

    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      author: user?.name || 'Anonymous',
      authorId: user?.id || 'unknown',
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      timestamp: new Date().toISOString()
    };

    setComments([...comments, comment]);
    setNewComment('');
    toast.success('Comment added successfully');
  };

  const handleEditComment = (commentId: string) => {
    if (!canEdit) {
      toast.error('You do not have permission to edit comments on this page');
      return;
    }

    const comment = comments.find(c => c.id === commentId);
    if (comment && comment.authorId === user?.id) {
      setEditingComment(commentId);
      setEditContent(comment.content);
    } else {
      toast.error('You can only edit your own comments');
    }
  };

  const handleSaveEdit = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, content: editContent, edited: true }
        : comment
    ));
    setEditingComment(null);
    setEditContent('');
    toast.success('Comment updated successfully');
  };

  const handleDeleteComment = (commentId: string) => {
    if (!canDelete) {
      toast.error('You do not have permission to delete comments on this page');
      return;
    }

    const comment = comments.find(c => c.id === commentId);
    if (comment && comment.authorId === user?.id) {
      if (window.confirm('Are you sure you want to delete this comment?')) {
        setComments(comments.filter(c => c.id !== commentId));
        toast.success('Comment deleted successfully');
      }
    } else {
      toast.error('You can only delete your own comments');
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex items-center mb-6">
        <MessageCircle className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Comments</h3>
        <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
          {comments.length}
        </span>
      </div>

      {/* Add Comment Form */}
      {canCreate && (
        <form onSubmit={handleAddComment} className="mb-6">
          <div className="flex space-x-3">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'}
              alt={user?.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex space-x-3 p-4 bg-gray-50 rounded-lg"
            >
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                  <span className="text-xs text-gray-500">{formatTimestamp(comment.timestamp)}</span>
                  {comment.edited && (
                    <span className="text-xs text-gray-400">(edited)</span>
                  )}
                </div>
                
                {editingComment === comment.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={3}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSaveEdit(comment.id)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingComment(null)}
                        className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                    {comment.authorId === user?.id && (
                      <div className="flex space-x-2">
                        {canEdit && (
                          <button
                            onClick={() => handleEditComment(comment.id)}
                            className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </button>
                        )}
                        {canDelete && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-xs text-red-600 hover:text-red-800 flex items-center"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default CommentSystem;