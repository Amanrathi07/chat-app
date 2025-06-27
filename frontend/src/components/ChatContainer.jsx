// Modernized ChatContainer.jsx
import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';

function ChatContainer() {
  const { messages, getMessage, ismessageLoading, selectedUser ,realTimeMessageOn,realTimeMessageOff } = useChatStore();
  const { authUser } = useAuthStore();
  const bottomRef = useRef(null);

  useEffect(() => {
    getMessage(selectedUser._id);

    realTimeMessageOn();
   
    
    return()=>realTimeMessageOff();
  }, [selectedUser, getMessage , realTimeMessageOn , realTimeMessageOff]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  


  if (ismessageLoading) {
    return (
      <div className="flex-1 flex flex-col bg-base-100">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-base-100">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || './src/pic/profile.png'
                      : selectedUser.profilePic || './src/pic/User-Profile.png'
                  }
                  alt="profile pic"
                />
              </div>
            </div>

            

            <div className="chat-bubble bg-base-300 text-base-content shadow-sm rounded-xl p-3">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
            <div className="text-xs text-base-content/50 mt-1">
  {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
</div>

            
          </div>
          
        ))}
        <div ref={bottomRef} />
        
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
