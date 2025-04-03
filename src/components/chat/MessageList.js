import React from 'react';

const MessageList = ({ messages, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      <div className="space-y-4">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === 'me'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              <p className="break-words">{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === 'me' ? 'text-indigo-200' : 'text-gray-400'
              }`}>{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList; 