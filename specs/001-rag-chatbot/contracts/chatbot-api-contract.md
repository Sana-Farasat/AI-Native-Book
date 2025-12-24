# API Contracts: RAG Chatbot System

## Overview
This document defines the API contracts for the Retrieval-Augmented Generation (RAG) chatbot system. The API follows REST principles with JSON requests and responses, and supports Server-Sent Events (SSE) for streaming responses.

## Base URL
```
https://api.yourdomain.com/v1
```

## Authentication
All API endpoints require an API key in the header:
```
Authorization: Bearer {API_KEY}
```

## Common Headers
- `Content-Type: application/json`
- `Accept: application/json` (for non-streaming endpoints)
- `Accept: text/event-stream` (for streaming endpoints)

## Error Handling
All endpoints return standardized error responses:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": "Additional error details if applicable"
  }
}
```

## Endpoints

### 1. POST /chat
Initiate a conversation or continue an existing one with a new message. Supports streaming responses.

#### Request
**Headers:**
- `Authorization: Bearer {API_KEY}`
- `Content-Type: application/json`

**Body:**
```json
{
  "message": "Your question about the book content",
  "session_id": "optional-session-id",
  "selected_text": "optional-selected-text-from-page",
  "stream": true,
  "temperature": 0.7
}
```

**Fields:**
- `message` (string, required): The user's message or question
- `session_id` (string, optional): Existing session ID; creates new if not provided
- `selected_text` (string, optional): Text the user selected on the page
- `stream` (boolean, optional): Whether to return streaming response (default: true)
- `temperature` (number, optional): LLM temperature parameter (default: 0.7)

#### Response (Non-streaming)
**Status: 200 OK**

```json
{
  "response": "The AI-generated response to your query",
  "session_id": "session-id-used-or-created",
  "sources": [
    {
      "chunk_id": "unique-chunk-id",
      "chapter": "Chapter 2: ROS 2",
      "section": "2.3 Nodes and Topics",
      "title": "Understanding Node Communication",
      "relevance_score": 0.85,
      "text_preview": "In ROS 2, nodes communicate through..."
    }
  ],
  "latency": 1.24,
  "timestamp": "2025-12-17T10:30:45.123456Z"
}
```

#### Response (Streaming via SSE)
**Status: 200 OK**
**Content-Type: text/event-stream**

Streamed as Server-Sent Events with the following formats:

1. Token events:
```
data: {"token": "The"}
id: token-1

data: {"token": " next"}
id: token-2

data: {"token": " word"}
id: token-3
```

2. Final completion event:
```
data: {"done": true, "response": "Complete response text", "session_id": "session-id", "sources": [...], "latency": 1.24, "timestamp": "2025-12-17T10:30:45.123456Z"}
id: completion
```

#### Error Responses
**Status: 400 Bad Request**
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Message field is required"
  }
}
```

**Status: 401 Unauthorized**
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing API key"
  }
}
```

**Status: 429 Too Many Requests**
```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Rate limit exceeded"
  }
}
```

### 2. GET /history
Retrieve conversation history for a session.

#### Request
**Headers:**
- `Authorization: Bearer {API_KEY}`

**Query Parameters:**
- `session_id` (string, required): The session ID to retrieve history for
- `limit` (integer, optional): Maximum number of messages to return (default: 50)

#### Response
**Status: 200 OK**

```json
{
  "session_id": "session-id-requested",
  "messages": [
    {
      "id": "message-id",
      "role": "user",
      "content": "What are ROS 2 nodes?",
      "timestamp": "2025-12-17T10:25:30.123456Z",
      "sources": []
    },
    {
      "id": "message-id",
      "role": "assistant",
      "content": "ROS 2 nodes are processes that perform computation...",
      "timestamp": "2025-12-17T10:25:31.234567Z",
      "sources": [
        {
          "chunk_id": "chunk-id",
          "chapter": "Chapter 2: ROS 2",
          "section": "2.3 Nodes and Topics",
          "title": "Understanding Node Communication",
          "relevance_score": 0.92,
          "text_preview": "In ROS 2, nodes communicate through..."
        }
      ],
      "token_count": 150,
      "latency": 0.87
    }
  ],
  "total_count": 2
}
```

#### Error Responses
**Status: 400 Bad Request**
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Session ID is required"
  }
}
```

**Status: 404 Not Found**
```json
{
  "error": {
    "code": "SESSION_NOT_FOUND",
    "message": "Session with provided ID not found"
  }
}
```

### 3. POST /sessions/clear
Clear conversation history for a session (keeps session alive).

#### Request
**Headers:**
- `Authorization: Bearer {API_KEY}`
- `Content-Type: application/json`

**Body:**
```json
{
  "session_id": "session-id-to-clear"
}
```

#### Response
**Status: 200 OK**

```json
{
  "session_id": "session-id-cleared",
  "message": "Session history cleared successfully"
}
```

#### Error Responses
**Status: 400 Bad Request**
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Session ID is required"
  }
}
```

## Rate Limits
- Chat endpoint: 100 requests per minute per API key
- History endpoint: 200 requests per minute per API key

## Schema Definitions

### Message Object
```json
{
  "id": "string",
  "role": "user | assistant",
  "content": "string",
  "timestamp": "string (ISO 8601 datetime)",
  "sources": [
    {
      "chunk_id": "string",
      "chapter": "string",
      "section": "string", 
      "title": "string",
      "relevance_score": "number",
      "text_preview": "string"
    }
  ],
  "token_count": "integer",
  "latency": "number"
}
```

### Source Reference Object
```json
{
  "chunk_id": "string",
  "chapter": "string",
  "section": "string",
  "title": "string",
  "relevance_score": "number",
  "text_preview": "string"
}
```

## Security Considerations
- All requests must use HTTPS
- API keys must be sent in Authorization header, never in query parameters
- Sessions are anonymous and linked only to temporary IDs stored in client-side storage
- Input is sanitized to prevent injection attacks