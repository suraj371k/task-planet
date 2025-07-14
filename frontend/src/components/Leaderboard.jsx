import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star } from 'lucide-react';
import { useUserStore } from '../store/userStore';

const Leaderboard = () => {
  const { users, getUsers , initSocketListeners } = useUserStore();

  useEffect(() => {
    getUsers();
    initSocketListeners()
  }, [getUsers]);

  // Sort users by totalPoints descending
  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);
  // Assign rank based on sorted order
  const usersWithRank = sortedUsers.map((user, idx) => ({ ...user, rank: idx + 1 }));
  const maxPoints = Math.max(...(usersWithRank.map(u => u.totalPoints)), 1);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <Star className="w-5 h-5 text-blue-400" />;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-400 to-gray-600';
      case 3:
        return 'from-amber-500 to-amber-700';
      default:
        return 'from-blue-400 to-blue-600';
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className='max-w-md mx-auto mt-10 ml-10 p-8 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20'>
      <div className='flex gap-2 items-center text-xl font-bold text-white'>
        <Award className='text-yellow-300' />
        <h2>Leaderboard</h2>
      </div>
    <div className="space-y-3 mt-5 max-h-96 overflow-y-auto">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {usersWithRank.map((user, index) => (
          <motion.div
            key={user._id}
            variants={item}
            layout
            className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:border-white/40 transition-all duration-300 ${
              user.rank <= 3 ? 'ring-2 ring-opacity-50' : ''
            } ${
              user.rank === 1 ? 'ring-yellow-400' : 
              user.rank === 2 ? 'ring-gray-400' : 
              user.rank === 3 ? 'ring-amber-500' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Rank */}
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getRankColor(user.rank)} flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">#{user.rank}</span>
                </div>
                {/* Avatar */}
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                {/* Name */}
                <div>
                  <div className="font-semibold text-white flex items-center">
                    {user.name}
                    {user.rank <= 3 && (
                      <span className="ml-2">
                        {getRankIcon(user.rank)}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-blue-200">
                    {user.rank === 1 ? 'Champion' : 
                     user.rank === 2 ? 'Runner-up' : 
                     user.rank === 3 ? 'Third Place' : 
                     `Rank ${user.rank}`}
                  </div>
                </div>
              </div>
              {/* Points */}
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {user.totalPoints}
                </div>
                <div className="text-sm text-blue-200">points</div>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-3">
              <div className="w-full bg-white/10 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((user.totalPoints / maxPoints) * 100, 100)}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`h-2 rounded-full bg-gradient-to-r ${getRankColor(user.rank)}`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
    </div>
  );
};

export default Leaderboard;