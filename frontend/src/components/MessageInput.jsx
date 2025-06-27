import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';
import { Image, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

function MessageInput() {

    const{authUser}=useAuthStore();

    const [text,setText]=useState('');
    const [imagePre,setImagePre]=useState(null);
  

    const{sendMessage}=useChatStore();

    const fileInputRef=useRef(null);

  function handelImageChange(e) {
  const file = e.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
       return;
    }

    const reader = new FileReader();
      reader.onloadend = () => {
        setImagePre(reader.result);
    };
    reader.readAsDataURL(file);
}


    function removeImage(){
        setImagePre(null);
        if(fileInputRef.current) fileInputRef.current.value = ""
    };

    async function handelSendMessage(e){
        e.preventDefault();
               
        if (!text.trim() && !imagePre) return;
        try { 
                  await sendMessage({text:text.trim() ,image:imagePre});
          setText('');
          setImagePre(null);
        } catch (error) {
          console.log("failed to send message",error);
          toast.error("failed to send message");
        }
    };

  return (
    <div className='p-4 w-full'>
        {imagePre && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePre}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handelSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input focus:outline-none rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handelImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePre ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePre  }
        >
          <Send size={22} />
        </button>
      </form>

    </div>
  )
}

export default MessageInput