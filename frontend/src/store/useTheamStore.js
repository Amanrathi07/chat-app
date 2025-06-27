import { create } from "zustand";

export const useTheamStore = create((set)=>({
    theam:localStorage.getItem("chat-theam") || "dark" ,

    setTheme:(theam)=> {
        localStorage.setItem("chat-theam",theam)
        set({theam})
    }
}))