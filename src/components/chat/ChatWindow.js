import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow = ({ selectedContact, messages, message, setMessage, handleSendMessage, messagesEndRef }) => {
  return (
    <div className="flex-1 flex flex-col h-full">
      {selectedContact ? (
        <>
          <ChatHeader contact={selectedContact} />
          <MessageList 
            messages={messages[selectedContact.id]} 
            messagesEndRef={messagesEndRef} 
          />
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