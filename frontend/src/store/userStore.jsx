import { create } from "zustand";
import axios from "axios";
import { socket } from "../services/socket";

const backend_url='https://task-planet.onrender.com'

// userStore.jsx
export const useUserStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,

  getUsers: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${backend_url}/api/users`);
      set({ users: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createUser: async (data) => {
    try {
      set({ loading: true, error: null });
      await axios.post(`${backend_url}/api/users`, data);
      // Refetch the full user list after adding
      const response = await axios.get(`${backend_url}/api/users`);
      set({ users: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  initSocketListeners: () => {
    //prevent multiple socket listeners
    if (get().socketInitialized) return;

        socket.on('pointsClaimed', ({ user }) => {
          set((state) => ({
            users: state.users.map((u) =>
              u._id === user._id
                ? { ...u, totalPoints: user.totalPoints } 
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
