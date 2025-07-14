import { create } from "zustand";
import axios from "axios";
import { socket } from "../services/socket";

// userStore.jsx
export const useUserStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,

  getUsers: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`/api/users`);
      set({ users: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createUser: async (data) => {
    try {
      set({ loading: true, error: null });
      await axios.post(`/api/users`, data);
      // Refetch the full user list after adding
      const response = await axios.get(`/api/users`);
      set({ users: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  initSocketListeners: () => {
    //prevent multiple socket listeners
    if (get().socketInitialized) return;

        // ✅ Real-time leaderboard update
        socket.on('pointsClaimed', ({ user }) => {
          set((state) => ({
            users: state.users.map((u) =>
              u._id === user._id
                ? { ...u, totalPoints: user.totalPoints } // ✅ update totalPoints
                : u
            ),
          }));
        });
    

    socket.on("userCreated", (newUser) => {
      set((state) => ({
        users: [...state.users, newUser],
      }));
    });
    set({ socketInitialized: true });
  },
  socketInitialized: false,
}));
