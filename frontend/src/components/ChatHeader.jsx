import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setFriend } = useChatStore();
  const { onlineUser } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.Gfp0lwE6h7139625a-r3aAHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=578a757cfee81dd3acaf8dd4360f777c84c173551375eb4e787e37b7ade54d9f&ipo=images'} alt={selectedUser.name} />
            </div>
          </div>

       
          <div>
            <h3 className="font-medium">{selectedUser.name}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUser.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

         {/* close  button */}
        <button onClick={() => setFriend(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;