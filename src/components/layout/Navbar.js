import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">Chatterbox</Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/chat" className="text-white hover:text-gray-300 px-3 py-2">Chat</Link>
              <Link to="/profile" className="text-white hover:text-gray-300 px-3 py-2">Profile</Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300 px-3 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/chat" className="text-white hover:text-gray-300 px-3 py-2">Chat</Link>
              <Link to="/login" className="text-white hover:text-gray-300 px-3 py-2">Login</Link>
            </>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-white hover:bg-gray-700 dark:hover:bg-gray-800"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 