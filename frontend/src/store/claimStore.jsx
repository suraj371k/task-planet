import { create } from "zustand";
import axios from "axios";
import { socket } from "../services/socket";

const backend_url='https://task-planet.onrender.com'


export const useClaimStore = create((set, get) => ({
  selectedUser: null,
  claimResult: null,
  allClaims: [],
  userClaims: [],
  loading: false,
  error: null,
  socketInitialized: false, // ✅ Prevent duplicate listeners

  // ✅ Set selected user
  setSelectedUser: (user) => set({ selectedUser: user }),

  // ✅ Claim points for selected user
  claimPoints: async () => {
    const user = get().selectedUser;
    if (!user) {
      return set({ error: "No user selected" });
    }

    set({ loading: true, error: null });

    try {
      const res = await axios.post(`${backend_url}/api/claim`, { id: user._id });
      set({ claimResult: res.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Something went wrong",
        loading: false,
      });
    }
  },

  // ✅ Fetch all claim history
  fetchAllClaims: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${backend_url}/api/claim`);
      set({ allClaims: res.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Something went wrong",
        loading: false,
      });
    }
  },

  // ✅ Fetch claim history for a single user
  fetchClaimsByUser: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${backend_url}/api/claim/user/${userId}`);
      set({ userClaims: res.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Something went wrong",
        loading: false,
      });
    }
  },

  // ✅ Reset claim result after toast or modal
  resetClaimResult: () => set({ claimResult: null }),

  // ✅ Real-time socket event listener
  initSocketListeners: () => {
    if (get().socketInitialized) return;

    // Listen for new claim history entries
    socket.on("newClaimHistory", (claim) => {
      set((state) => ({
        allClaims: [claim, ...state.allClaims], // insert at top
        userClaims:
          state.selectedUser && claim.userId._id === state.selectedUser._id
            ? [claim, ...state.userClaims]
            : state.userClaims,
      }));
    });

    // Optional: listen to point updates as well
    socket.on("pointsClaimed", (data) => {
      console.log("Real-time points update:", data);
      // You can use this for animations or confirmation if needed
    });

    set({ socketInitialized: true });
  },
}));
