import React, { useState, useEffect, useRef } from 'react';
import useChat from '../hooks/useChat';
import { Message } from '../types';
import './ChatWidget.css';

interface ChatWidgetProps {
  sessionId?: string;
  onClose: () => void;
  backendUrl: string;
  initialQuery?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ sessionId, onClose, backendUrl, initialQuery = '' }) => {
  const [inputValue, setInputValue] = useState(initialQuery);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    sendMessage,
    isLoading,
    sessionId: currentSessionId,
    clearMessages
  } = useChat({
    sessionId,
    backendUrl
  });

  // Set the initial query when component mounts if provided
  useEffect(() => {
    if (initialQuery && initialQuery.trim() !== '') {
      setInputValue(initialQuery);
      // Automatically send the initial query after a short delay
      const timer = setTimeout(() => {
        sendMessage(initialQuery);
        setInputValue('');
      }, 500); // 500ms delay to allow UI to update

      return () => clearTimeout(timer);
    }
  }, []); // Only run once when component mounts

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    await sendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="chat-widget">
      <div className="chat-header">
        <div className="chat-title">Book Assistant</div>
        <div className="chat-actions">
          <button onClick={clearMessages} className="clear-btn" title="Clear conversation">
            Clear
          </button>
          <button onClick={onClose} className="close-btn" title="Close chat">
            ×
          </button>
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <p>Ask me anything about the book content, and I'll find the relevant information for you.</p>
          </div>
        ) : (
          messages.map((message: Message) => (
            <div
              key={message.id}
              className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <div className="message-content">
                {message.content}
              </div>
              <div className="message-actions">
                <div className="message-info">
                  <div className="message-timestamp">
                    {message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <button
                    onClick={() => handleCopy(message.content)}
                    className="copy-btn"
                    title="Copy message"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message assistant-message">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input-area">
        <textarea
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about the book..."
          disabled={isLoading}
          rows={1}
        />
        <button 
          onClick={handleSend} 
          disabled={!inputValue.trim() || isLoading}
          className="send-btn"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;