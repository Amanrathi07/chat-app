import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SiginUpPage from './pages/SiginUpPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SettingPage from './pages/SettingPage';
import FirstPage from './pages/FirstPage';
import { useAuthStore } from './store/useAuthStore';
import { useTheamStore } from './store/useTheamStore';
import { Toaster } from 'react-hot-toast';

function App() {
  const { authUser, checkAuth, isCheckingAuth ,onlineUser} = useAuthStore();
  const { theam } = useTheamStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
    <Navigate to="/home" />
  }, []);



 
  if (isCheckingAuth && !authUser) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  
  return (
    <div className='min-h-screen' data-theme={theam}>
      <Toaster position="top-right" />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navbar />}>
            <Route
              path='/'
              element={!authUser ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <FirstPage />
                </motion.div>
              ) : <Navigate to="/home" />}
            />
            <Route
              path='/home'
              element={authUser ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <HomePage />
                </motion.div>
              ) : <Navigate to="/" />}
            />
            <Route
              path='/signup'
              element={!authUser ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <SiginUpPage />
                </motion.div>
              ) : <Navigate to="/home" />}
            />
            <Route
              path='/login'
              element={!authUser ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <LoginPage />
                </motion.div>
              ) : <Navigate to="/home" />}
            />
            <Route
              path='/profile'
              element={authUser ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ProfilePage />
                </motion.div>
              ) : <Navigate to="/login" />}
            />
            <Route
              path='/Setting'
              element={authUser ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <SettingPage />
                </motion.div>
              ) : <Navigate to="/login" />}
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
