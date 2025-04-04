import React from 'react';
import { useAuth } from '../../context/AuthContext';

const MessageList = ({ messages, messagesEndRef }) => {
  const { user } = useAuth();

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800">
      <div className="space-y-4">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender_id === user.id
                  ? 'bg-indigo-600 dark:bg-indigo-700 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              <p className="break-words">{msg.message}</p>
              <p className={`text-xs mt-1 ${
                msg.sender_id === user.id 
                  ? 'text-indigo-200 dark:text-indigo-300' 
                  : 'text-gray-400 dark:text-gray-500'
              }`}>
                {new Date(msg.created_at).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList; 