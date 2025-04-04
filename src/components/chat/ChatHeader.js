import React from 'react';

const ChatHeader = ({ contact, onBack }) => {
  if (!contact) return null;
  
  return (
    <div className="p-4 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-indigo-800 dark:text-indigo-200 font-semibold">
            {contact.name.split(' ').map((n) => n[0]).join('')}
          </span>
        </div>
        <h2 className="ml-3 text-lg font-semibold dark:text-white">{contact.name}</h2>
        <button 
          onClick={onBack} 
          className="ml-auto text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
        >
          Back
        </button>  
      </div>
    </div>
  );
};

export default ChatHeader; 