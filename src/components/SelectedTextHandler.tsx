import React, { useState, useEffect, useRef } from 'react';
import './SelectedTextHandler.css';

const SelectedTextHandler = ({ backendUrl, onNewQuery }) => {
  const [selection, setSelection] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  // Handle text selection
  useEffect(() => {
    const handleSelection = () => {
      const selectedText = window.getSelection().toString().trim();
      
      if (selectedText) {
        const selectionRange = window.getSelection().getRangeAt(0);
        const rect = selectionRange.getBoundingClientRect();
        
        // Position the button near the selection
        setPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 10
        });
        
        setSelection(selectedText);
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    const handleClick = () => {
      // Small timeout to ensure selection is complete
      setTimeout(() => {
        if (!window.getSelection().toString().trim()) {
          setShowButton(false);
        }
      }, 1);
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleAskAI = () => {
    if (selection) {
      // Create a custom event to signal that chat should open with this query
      const query = `Explain this selected text: ${selection}`;
      const event = new CustomEvent('selectedTextQuery', { detail: { query } });
      window.dispatchEvent(event);

      // Call the onNewQuery callback if provided
      if (onNewQuery) {
        onNewQuery(query);
      }

      // Hide the button after clicking
      setShowButton(false);

      // Clear the selection
      window.getSelection().removeAllRanges();
    }
  };

  if (!showButton) {
    return null;
  }

  return (
    <button
      ref={buttonRef}
      className="selected-text-button"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onClick={handleAskAI}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        className="ask-icon"
      >
        <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
      </svg>
      Ask AI
    </button>
  );
};

export default SelectedTextHandler;