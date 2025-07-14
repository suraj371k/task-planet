import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, TrendingUp, User, Calendar, ArrowLeft} from 'lucide-react';
import { useClaimStore } from '../store/claimStore';

const PointHistory = () => {
  const {
    allClaims,
    userClaims,
    fetchAllClaims,
    fetchClaimsByUser,
    loading,
    error
  } = useClaimStore();

  const [viewUserId, setViewUserId] = useState(null);
  const [viewUserName, setViewUserName] = useState('');

  useEffect(() => {
    if (!viewUserId) {
      fetchAllClaims();
    }
  }, [viewUserId, fetchAllClaims]);

  const handleUserClick = (userId, userName) => {
    setViewUserId(userId);
    setViewUserName(userName);
    fetchClaimsByUser(userId);
  };

  const handleBack = () => {
    setViewUserId(null);
    setViewUserName('');
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(new Date(date));
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };

  // Choose which history to show
  const history = viewUserId ? userClaims : allClaims;

  if (loading) {
    return <div className="text-center py-8 text-blue-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-400">{error}</div>;
  }

  if (!history || history.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">No point history yet</p>
        <p className="text-sm text-gray-500 mt-2">Start claiming points to see the history!</p>
      </div>
    );
  }

  return (
    <div className='max-w-md mx-auto mt-10 ml-10 p-8 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20'>
      <div className='flex gap-3 text-white font-bold'>
        <Clock className='text-blue-500'/>
        <h2>Point History</h2>
      </div>
    <div title='view details' className="space-y-3 mt-5 max-h-96 overflow-y-auto">
      {viewUserId && (
        <button
          className="flex items-center mb-2 text-blue-300 hover:text-blue-500 transition"
          onClick={handleBack}
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to all history
        </button>
      )}
      {viewUserId && (
        <div className="mb-2 text-white font-semibold text-lg">{viewUserName}'s Claim History</div>
      )}
      <AnimatePresence>
        {history.map((entry, index) => (
          <motion.div
            key={entry._id || entry.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer"
            onClick={() => {
              if (!viewUserId && entry.userId && entry.userId._id) {
                handleUserClick(entry.userId._id, entry.userId.name);
              }
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                {/* Details */}
                <div>
                  <div className="font-medium text-white">
                    {entry.userId?.name || entry.userName || 'Unknown'}
                  </div>
                  <div className="text-sm text-blue-200 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(entry.claimedAt || entry.timestamp)} at {formatTime(entry.claimedAt || entry.timestamp)}
                  </div>
                </div>
              </div>
              {/* Points */}
              <div className="flex items-center space-x-2">
                <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{entry.points}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
    </div>
  );
};

export default PointHistory;