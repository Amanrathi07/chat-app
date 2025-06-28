import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { AnimatePresence, motion } from "motion/react";

function Navbar() {
  const { LogOut, authUser } = useAuthStore();
  const [outScreen, setOutScreen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = outScreen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [outScreen]);

  return (
    <>
      <AnimatePresence>
        {outScreen && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setOutScreen(false)}
          >
            <motion.div
              key="logout-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 text-white rounded-xl p-6 shadow-2xl w-[90%] max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4 text-center">Do you want to log out?</h2>
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition"
                  onClick={() => setOutScreen(false)}
                >Cancel</button>
                <button
                  className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition"
                  onClick={() => { LogOut(); setOutScreen(false); }}
                >Log out</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-40">
        <div className="flex-1">
          <Link to={authUser ? "/home" : "/"} className="text-xl font-semibold text-primary hover:text-primary/80 transition">
            chatApp
          </Link>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                alt="profile"
                src={authUser?.profilePic || "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.52T8HHBWh6b0dwrG6tSpVQHaFe%26pid%3DApi&f=1&ipt=bdd5dd42c354db317aee4203f5612cf3d4f1451523a1ded10b190dca517debc2&ipo=images"}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-2 p-2 shadow border border-zinc-100 z-20 w-52"
          >
            {authUser ? (
              <>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/setting">Settings</Link></li>
                <li><button onClick={() => setOutScreen(true)}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>

      <motion.div
        className="px-2 sm:px-4 pt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Outlet />
      </motion.div>
    </>
  );
}

export default Navbar;
