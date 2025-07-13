import mongoose from "mongoose";

const claimHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    points: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    claimedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } 
);

const ClaimHistory = mongoose.model("ClaimHistory" , claimHistorySchema)

export default ClaimHistory