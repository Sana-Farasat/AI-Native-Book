// // API service for the RAG chatbot frontend

// import { ChatRequest, ChatResponse, HistoryRequest, HistoryResponse } from '../types';

// class ApiService {
//   private baseUrl: string;

//   constructor(baseUrl: string) {
//     this.baseUrl = baseUrl;
//   }

//   async chat(request: ChatRequest): Promise<ChatResponse> {
//     const response = await fetch(`${this.baseUrl}/v1/chat`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(request),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return response.json();
//   }

//   async getHistory(request: HistoryRequest): Promise<HistoryResponse> {
//     const params = new URLSearchParams({
//       session_id: request.session_id,
//       ...(request.limit && { limit: request.limit.toString() }),
//     });

//     const response = await fetch(`${this.baseUrl}/v1/history?${params}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return response.json();
//   }

//   async clearSession(sessionId: string): Promise<void> {
//     const response = await fetch(`${this.baseUrl}/v1/sessions/clear`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ session_id: sessionId }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//   }
// }

// export default ApiService;

// API service for the RAG chatbot frontend
import { ChatRequest, ChatResponse, HistoryRequest, HistoryResponse } from '../types';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Chat endpoint
  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch(`${this.baseUrl}/chat`, { // <-- removed /v1
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Get chat history
  async getHistory(request: HistoryRequest): Promise<HistoryResponse> {
    const params = new URLSearchParams({
      session_id: request.session_id,
      ...(request.limit && { limit: request.limit.toString() }),
    });

    const response = await fetch(`${this.baseUrl}/history?${params}`, { // <-- removed /v1
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Clear session
  async clearSession(sessionId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/sessions/clear`, { // <-- removed /v1
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
}

export default ApiService;
