import { useState, useRef, useEffect } from 'react';
import { getInitialMessages } from '../utils/mockData';

const useChat = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({});
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    if (!messages[contact.id]) {
      setMessages((prev) => ({
        ...prev,
        [contact.id]: getInitialMessages(contact.id),
      }));
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && selectedContact) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => ({
        ...prev,
        [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage],
      }));
      setMessage('');
    }
  };

  return {
    selectedContact,
    setSelectedContact,
    message,
    setMessage,
    messages,
    messagesEndRef,
    handleContactSelect,
    handleSendMessage,
  };
};

export default useChat; 