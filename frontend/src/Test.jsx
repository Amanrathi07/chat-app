import { Image, Send } from 'lucide-react';
import { div } from 'motion/react-client';
import React, { useRef, useState } from 'react'

function Test() {


    const [text, setText] = useState('');
    const [imagePre, setImagePre] = useState(null);

  
    const fileInputRef = useRef(null);

    function handelImageChange() {

    };
    function removeImage() {

    };
    async function handelSendMessage(e) {
        e.preventDefault();
    };
    return (
        <div className='h-screen p-[30%] flex items-center justify-center'>
            <div className='p-4 w-full'>
            <form onSubmit={handelSendMessage} className="flex items-center gap-2">
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
                    className="bg-blue-600"
                    ref={fileInputRef}
                    onChange={handelImageChange}
                />

                {/* <button
                    type="button"
                    className={`hidden sm:flex btn btn-circle
                     ${imagePre ? "text-emerald-500" : "text-zinc-400"}`}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Image size={20} />
                </button> */}
                    <Send size={22} />
            </form>
        </div>
        </div>
    )
}

export default Test