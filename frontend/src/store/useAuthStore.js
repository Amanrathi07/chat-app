import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = "http://localhost:3000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUser: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  LogIn: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("login successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  LogOut: async () => {
    try {
      await axiosInstance.get("/auth/logout");
      set({ authUser: null, onlineUser: [] });
      get().disconnectSocket();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/user", data);
      set({ authUser: res.data });
      toast.success("profile update successfully");
    } catch (error) {
      toast.error(error.response.statusText);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket) return;

    const newSocket = io(BASE_URL, {
      query: { userID: authUser._id },
      autoConnect: true,
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUser: userIds });
    });

    newSocket.connect();
    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null, onlineUser: [] });
    }
  },

  updateOnlineUser: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("getOnlineUsers");
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUser: userIds });
    });
  },
}));
