import React from 'react';
import { useAuth } from '../../context/AuthContext';

const MessageList = ({ messages, messagesEndRef }) => {
  const { user } = useAuth();

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      <div className="space-y-4">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender_id === user.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              <p className="break-words">{msg.message}</p>
              <p className={`text-xs mt-1 ${
                msg.sender_id === user.id ? 'text-indigo-200' : 'text-gray-400'
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