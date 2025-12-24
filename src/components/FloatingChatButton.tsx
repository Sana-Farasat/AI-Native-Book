import React, { useState, useEffect } from 'react';
import ChatWidget from './ChatWidget';
import './FloatingChatButton.css';

const FloatingChatButton = ({ backendUrl }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setHasUnread(false); // Clear unread indicator when opening
    }
  };

  // Handler to set unread when receiving messages
  const onNewMessage = () => {
    if (!isChatOpen) {
      setHasUnread(true);
    }
  };

  // Listen for selected text query events
  useEffect(() => {
    const handleSelectedTextQuery = (event) => {
      setInitialQuery(event.detail.query);
      setIsChatOpen(true); // Open the chat when we receive a query
    };

    window.addEventListener('selectedTextQuery', handleSelectedTextQuery);

    return () => {
      window.removeEventListener('selectedTextQuery', handleSelectedTextQuery);
    };
  }, []);

  return (
    <div className="floating-chat-container">
      {isChatOpen && (
        <div className="chat-overlay" onClick={toggleChat}></div>
      )}

      {isChatOpen && (
        <div className="chat-window">
          <ChatWidget
            onClose={toggleChat}
            backendUrl={backendUrl}
            initialQuery={initialQuery}
          />
        </div>
      )}

      <button
        className={`floating-chat-button ${hasUnread ? 'unread' : ''}`}
        onClick={toggleChat}
        aria-label={isChatOpen ? "Close chat" : "Open chat"}
      >
        {hasUnread ? (
          <span className="unread-indicator"></span>
        ) : null}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="chat-icon"
        >
          <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default FloatingChatButton;