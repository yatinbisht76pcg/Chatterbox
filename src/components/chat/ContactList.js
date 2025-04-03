import React from 'react';

const ContactList = ({ contacts, selectedContact, onContactSelect }) => {
  return (
    <div className="w-1/3 bg-white border-r border-gray-300 flex flex-col h-full">
      <div className="p-4 border-b border-gray-300">
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onContactSelect(contact)}
            className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
              selectedContact?.id === contact.id ? 'bg-gray-100' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-800 font-semibold">
                  {contact.name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <h3 className="text-sm font-semibold truncate">{contact.name}</h3>
                <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
              </div>
              <span className="text-xs text-gray-400 ml-2">{contact.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList; 