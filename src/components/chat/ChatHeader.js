import React from 'react';

const ChatHeader = ({ contact }) => {
  if (!contact) return null;
  
  return (
    <div className="p-4 border-b border-gray-300 bg-white">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-indigo-800 font-semibold">
            {contact.name.split(' ').map((n) => n[0]).join('')}
          </span>
        </div>
        <h2 className="ml-3 text-lg font-semibold">{contact.name}</h2>
      </div>
    </div>
  );
};

export default ChatHeader; 