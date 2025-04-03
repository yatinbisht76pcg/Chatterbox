import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white font-bold text-xl">Chatterbox</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/chat" className="text-white hover:text-gray-300 px-3 py-2">Chat</Link>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 