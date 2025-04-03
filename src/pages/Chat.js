import React from 'react';
import ContactList from '../components/chat/ContactList';
import ChatWindow from '../components/chat/ChatWindow';
import useChat from '../hooks/useChat';
import { contacts } from '../utils/mockData';

const Chat = () => {
  const {
    selectedContact,
    message,
    setMessage,
    messages,
    messagesEndRef,
    handleContactSelect,
    handleSendMessage,
  } = useChat();

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <ContactList 
        contacts={contacts} 
        selectedContact={selectedContact} 
        onContactSelect={handleContactSelect} 
      />
      <ChatWindow 
        selectedContact={selectedContact}
        messages={messages}
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        messagesEndRef={messagesEndRef}
      />
    </div>
  );
};

export default Chat; 