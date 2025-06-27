import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios'; // your pre-configured axios
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set, get) => ({
  user: [],
  messages: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUser: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get('/message/allUser');
      set({ user: res.data });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessage: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/message/user/${userId}`);
                       
      set({ messages:[...res.data.allMessage]}); 
        
           
      
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  setFriend: (friend) => {
    set({ selectedUser: friend });
  },

  sendMessage: async (messageData) => {
    try {
      const selected = get().selectedUser;
      const res = await axiosInstance.post(`/message/send/${selected._id}`, messageData);
      const currentMessage = res.data.currentMessage;

      const currentMessages = Array.isArray(get().messages) ? get().messages : [];
      set({ messages: [...currentMessages, currentMessage] });

    } catch (error) {
      console.error("SendMessage Error:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  },
  realTimeMessageOn: () => {
  const socket = useAuthStore.getState().socket;
  if (!socket) return;

  socket.on("newMessage", (newMessage) => {
    const messages = get().messages;

    const alreadyExists = messages.some(
      (msg) => msg._id === newMessage._id
    );

    if (!alreadyExists) {
      set({ messages: [...messages, newMessage] });
    }
  });
}
,

  realTimeMessageOff: () => {
  const socket = useAuthStore.getState().socket;
  if (socket) socket.off("newMessage"); 
}


}));
