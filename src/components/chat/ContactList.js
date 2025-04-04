import React from 'react';
import SettingsMenu from './SettingsMenu';

const ContactList = ({ contacts, selectedContact, onContactSelect }) => {
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    // If less than 24 hours, show time
    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    // If less than 7 days, show day name
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      return date.toLocaleDateString([], { weekday: 'short' });
    }
    // Otherwise show date
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 flex flex-col h-full">
      <div className="p-4 border-b border-gray-300 dark:border-gray-700">
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onContactSelect(contact)}
            className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
              selectedContact?.id === contact.id ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-800 dark:text-indigo-200 font-semibold">
                  {contact.name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold truncate dark:text-white">{contact.name}</h3>
                  <span className="text-xs text-gray-400 dark:text-gray-500 ml-2 whitespace-nowrap">
                    {formatTime(contact.lastMessageTime)}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate flex-1">
                    {contact.lastMessage}
                  </p>
                  {contact.unreadCount > 0 && (
                    <span className="ml-2 bg-indigo-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      {contact.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-300 dark:border-gray-700">
        <SettingsMenu />
      </div>
    </div>
  );
};

export default ContactList; 