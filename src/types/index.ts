// Type definitions for the RAG chatbot frontend

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: SourceReference[];
  token_count?: number;
  latency?: number;
}

export interface SourceReference {
  chunk_id: string;
  chapter: string;
  section: string;
  title: string;
  relevance_score: number;
  text_preview: string;
}

export interface ChatRequest {
  message: string;
  session_id?: string;
  selected_text?: string;
  stream?: boolean;
  temperature?: number;
}

export interface ChatResponse {
  response: string;
  session_id: string;
  sources: SourceReference[];
  latency: number;
  timestamp: string;
}

export interface HistoryRequest {
  session_id: string;
  limit?: number;
}

export interface HistoryResponse {
  session_id: string;
  messages: Message[];
  total_count: number;
}

export interface ChatConfig {
  backendUrl: string;
  defaultSessionId?: string;
  maxMessageLength?: number;
  enableStreaming?: boolean;
  enableCitations?: boolean;
}