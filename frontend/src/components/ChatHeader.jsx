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
              <img src={selectedUser.profilePic || "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F5%2FUser-Profile-PNG-Image.png&f=1&nofb=1&ipt=4201d34c0df2b75bbe84e2358ca73e908ae572fe3bb86227ffa1fb3acd6212d5"} alt={selectedUser.name} />
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