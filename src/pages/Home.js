import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Chatterbox</h1>
      <p className="mb-4">Start chatting with your friends and colleagues!</p>
      <div className="space-x-4">
        <Link to="/chat" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Go to Chat
        </Link>
        <Link to="/login" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home; 