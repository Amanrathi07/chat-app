import React from 'react';
import { Carrot } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function FirstPage() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8 bg-base-100 rounded-2xl shadow-xl border border-base-300 p-8">
        
        <div className="flex justify-center">
          <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
            <Carrot className="size-8 text-orange-500" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Welcome to chatApp!</h2>
          <p className="text-base-content/60 mt-1">
            Connect with friends, chat privately, and express yourself in real-time.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <NavLink to="/login">
            <button className="btn btn-primary px-6">Login</button>
          </NavLink>
          <NavLink to="/signup">
            <button className="btn btn-outline btn-primary px-6">Sign Up</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default FirstPage;
