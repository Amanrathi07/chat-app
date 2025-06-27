import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

function Sidebar() {
  const { user, getUser, selectedUser, setFriend, isUserLoading } = useChatStore();
  const { onlineUser, isCheckingAuth } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUser();
  }, [ getUser,onlineUser,selectedUser]);

  const filteredUsers = showOnlineOnly
    ? user.filter((user) => onlineUser.includes(user._id))
    : user;

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full px-5 py-4 bg-base-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Users className="size-6 text-primary" />
              <span className="absolute -top-2 -right-5 bg-green-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                {onlineUser.length}
              </span>
            </div>
            <span className="text-lg ml-5 font-semibold hidden lg:block">Members</span>
          </div>
        </div>
      </div>



    
      <div className="overflow-y-auto w-full py-3 scrollbar-hide">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setFriend(user)}
            className={`w-full p-3 flex items-center gap-3 
              hover:bg-base-300 transition-colors 
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={
                  user.profilePic ||
                  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.Gfp0lwE6h7139625a-r3aAHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=578a757cfee81dd3acaf8dd4360f777c84c173551375eb4e787e37b7ade54d9f&ipo=images'
                }
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUser.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.name}</div>
              <div className="text-sm text-zinc-400">
                {onlineUser.includes(user._id) ? 'Online' : 'Offline'}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
