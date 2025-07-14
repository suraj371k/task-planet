import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, UserPlus, User } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import toast from 'react-hot-toast';

const AddUserModal = ({onClose}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { loading, createUser } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }
    await createUser({ name: name.trim() });
    toast.success("user created successfully")
    setName('');
    setError('');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm w-full flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.3 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <UserPlus className="w-6 h-6 text-green-400 mr-2" />
            <h2 className="text-xl font-bold text-white">Add New User</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              User Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter user name..."
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                autoFocus
              />
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {error}
              </motion.p>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add User'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddUserModal;