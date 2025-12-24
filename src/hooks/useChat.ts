// React hook for managing chat state and interactions

import { useState, useEffect, useCallback } from 'react';
import { Message, ChatRequest } from '../types';
import ApiService from '../services/api';

interface UseChatOptions {
  sessionId?: string;
  backendUrl: string;
}

interface UseChatReturn {
  messages: Message[];
  sendMessage: (message: string, selectedText?: string) => Promise<void>;
  isLoading: boolean;
  sessionId: string | null;
  clearMessages: () => Promise<void>;
}

const useChat = ({ sessionId: initialSessionId, backendUrl }: UseChatOptions): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(initialSessionId || null);
  
  const apiService = new ApiService(backendUrl);

  // Load history if we have a session ID
  useEffect(() => {
    if (currentSessionId) {
      loadHistory(currentSessionId);
    }
  }, [currentSessionId]);

  const loadHistory = async (sessionId: string) => {
    try {
      setIsLoading(true);
      const response = await apiService.getHistory({ session_id: sessionId });
      setMessages(response.messages);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = useCallback(async (message: string, selectedText?: string) => {
    if (!message.trim()) return;

    // Add user message to UI immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const chatRequest: ChatRequest = {
        message,
        session_id: currentSessionId || undefined,
        selected_text: selectedText,
        stream: true
      };

      const response = await apiService.chat(chatRequest);
      
      // Update session ID if it was newly created
      if (!currentSessionId) {
        setCurrentSessionId(response.session_id);
      }

      // Add assistant response to messages
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.response,
        sources: response.sources,
        timestamp: response.timestamp
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message to UI
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [currentSessionId, apiService]);

  const clearMessages = useCallback(async () => {
    if (currentSessionId) {
      try {
        await apiService.clearSession(currentSessionId);
        setMessages([]);
      } catch (error) {
        console.error('Error clearing session:', error);
      }
    } else {
      setMessages([]);
    }
  }, [currentSessionId, apiService]);

  return {
    messages,
    sendMessage,
    isLoading,
    sessionId: currentSessionId,
    clearMessages
  };
};

export default useChat;