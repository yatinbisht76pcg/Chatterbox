import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow = ({ 
  selectedContact, 
  messages, 
  message, 
  setMessage, 
  handleSendMessage, 
  messagesEndRef,
  loading,
  error
}) => {
  return (
    <div className="flex-1 flex flex-col h-full">
      {selectedContact ? (
        <>
          <ChatHeader contact={selectedContact} />
          {loading ? (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading messages...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center text-red-600">
                <p>Error loading messages: {error}</p>
              </div>
            </div>
          ) : (
            <MessageList 
              messages={messages} 
              messagesEndRef={messagesEndRef} 
            />
          )}
          <MessageInput 
            message={message} 
            setMessage={setMessage} 
            handleSendMessage={handleSendMessage} 
          />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500 text-lg">Select a contact to start chatting</p>
        </div>
      )}
    </div>
  );
};

export default ChatWindow; 