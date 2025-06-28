import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import NoChatSelected from "../components/NoChatContainer"
import ChatContainer from "../components/ChatContainer"
import Sidebar from '../components/Sidebar';
import { useAuthStore } from '../store/useAuthStore';

function HomePage() {

  const{selectedUser,setFriend}=useChatStore();
  useEffect(()=>{
    setFriend(null);

  },[]);

  return (
      <div className="max-h-screen bg-base-200">
      <div className="flex items-center justify-center lg:p-5 lg:px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-4rem)] lg:h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {selectedUser ? <ChatContainer />:<NoChatSelected /> }
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage