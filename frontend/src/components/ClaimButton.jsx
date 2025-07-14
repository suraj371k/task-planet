import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Zap, Star } from "lucide-react";
import { useClaimStore } from "../store/claimStore";
import toast from "react-hot-toast";

const ClaimButton = () => {
  const {
    loading: isLoading,
    claimPoints,
    error,
    selectedUser,
    claimResult,
  } = useClaimStore();

  const handleClaim = async () => {
    try {
      await claimPoints();
      toast.success("Points claimed successfully");
    } catch (error) {
      toast.error("Error in getting claim points");
    }
  };

  const lastClaimedPoints = claimResult?.pointsClaimed;

  return (
    <div className="max-w-md mx-auto mt-10 ml-10 p-8 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
      <div className="flex items-center gap-2 text-xl font-bold  ">
        <Target className="w-5 h-5 mr-2 text-green-500 " />
        <h2 className="text-white opacity-95"> Claim Points</h2>
      </div>
      <div className="space-y-4 mt-5">
        <motion.button
          onClick={handleClaim}
          disabled={!selectedUser || isLoading}
          className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 ${
            !selectedUser || isLoading
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105"
          }`}
          whileHover={selectedUser && !isLoading ? { scale: 1.05 } : {}}
          whileTap={selectedUser && !isLoading ? { scale: 0.95 } : {}}
        >
          <div className="flex items-center justify-center">
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                />
                Claiming Points...
              </>
            ) : (
              <>
                <Target className="w-5 h-5 mr-2" />
                Claim Points
              </>
            )}
          </div>
        </motion.button>

        {!selectedUser && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 text-sm"
          >
            Select a user to claim points
          </motion.p>
        )}

        <AnimatePresence>
          {lastClaimedPoints && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-green-500/20 border border-green-500/40 rounded-lg p-4 text-center"
            >
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-yellow-400 mr-2" />
                <span className="text-green-400 font-bold text-lg">
                  +{lastClaimedPoints} Points!
                </span>
              </div>
              <p className="text-green-300 text-sm">
                Points successfully claimed!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Points Range:</span>
            <span className="text-white font-medium">1 - 10 points</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-gray-400">Type:</span>
            <span className="text-white font-medium flex items-center">
              <Zap className="w-3 h-3 mr-1 text-yellow-400" />
              Random
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimButton;
