import React, { useState, useRef, useEffect } from "react";
import ContactList from "../components/chat/ContactList";
import ChatWindow from "../components/chat/ChatWindow";
import { useContacts } from "../hooks/useContacts";
import { useSupabaseMessages } from "../hooks/useSupabaseMessages";
import { useAuth } from "../context/AuthContext";

const Chat = () => {
  const { user } = useAuth();
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [step, setStep] = useState("contacts");

  const {
    contacts,
    loading: contactsLoading,
    error: contactsError,
  } = useContacts();
  const {
    messages,
    loading: messagesLoading,
    error: messagesError,
    sendMessage,
  } = useSupabaseMessages(selectedContact?.id);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setMessage("");
    setStep("chat");
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() && selectedContact) {
      const result = await sendMessage(message.trim());
      if (result.success) {
        setMessage("");
      } else {
        console.error("Failed to send message:", result.error);
      }
    }
  };

  if (contactsLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (contactsError) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center text-red-600">
          <p>Error loading contacts: {contactsError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div
        className={`${
          step === "contacts" ? "block w-full" : "hidden"
        } md:block md:w-1/4`}
      >
        <ContactList
          contacts={contacts}
          selectedContact={selectedContact}
          onContactSelect={handleContactSelect}
        />
      </div>

      <div className={`${step === "chat" ? "block w-full" : "hidden"}`}>
        <ChatWindow
          selectedContact={selectedContact}
          messages={messages}
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          messagesEndRef={messagesEndRef}
          loading={messagesLoading}
          error={messagesError}
          onBack={() => setStep("contacts")}
        />
      </div>
    </div>
  );
};

export default Chat;
