# Data Model: RAG Chatbot System

## Overview
This document defines the data models for the Retrieval-Augmented Generation (RAG) chatbot system integrated with the Physical AI and Humanoid Robotics textbook. It includes models for document storage, conversation history, API requests/responses, and frontend components.

## 1. Document Models (Backend - Vector Store)

### 1.1 BookChunk Model
Represents a chunk of book content stored in the vector database with metadata for retrieval.

```python
class BookChunk(BaseModel):
    id: str              # Unique identifier for the chunk
    content: str         # The actual text content of the chunk
    embedding: List[float]  # Vector embedding of the content
    metadata: ChunkMetadata  # Associated metadata
    created_at: datetime    # Timestamp of creation
    updated_at: datetime    # Timestamp of last update
```

### 1.2 ChunkMetadata Model
Metadata associated with each book chunk for filtering and referencing.

```python
class ChunkMetadata(BaseModel):
    chapter: str           # Chapter title (e.g., "Chapter 2: ROS 2")
    section: str           # Section title (e.g., "2.3 Nodes and Topics")
    title: str             # Specific heading within section
    page_reference: str    # Page number if applicable
    source_file: str       # Source MDX/Markdown file path
    book_version: str      # Version of the book this chunk is from
```

## 2. Conversation Models (Backend - Postgres)

### 2.1 Session Model
Represents a chat session with anonymous identification.

```python
class Session(BaseModel):
    id: str              # Session UUID (anonymous)
    created_at: datetime  # When the session was started
    updated_at: datetime  # When the session was last updated
    last_accessed: datetime  # When the session was last used
    is_active: bool      # Whether the session is currently active
```

### 2.2 Message Model
Represents a single message within a conversation.

```python
class Message(BaseModel):
    id: str              # Message UUID
    session_id: str      # References the session this message belongs to
    role: str            # 'user' or 'assistant'
    content: str         # The actual message content
    timestamp: datetime   # When the message was sent/received
    sources: List[SourceReference]  # Book sections referenced in response
    token_count: int     # Number of tokens in the message
    latency: float       # Processing time for this message (optional)
```

### 2.3 SourceReference Model
Reference to book sections cited in an AI response.

```python
class SourceReference(BaseModel):
    chunk_id: str        # ID of the book chunk used
    chapter: str         # Chapter where the information was found
    section: str         # Specific section where the information was found
    title: str           # Title of the section
    relevance_score: float  # How relevant this source was to the response
    text_preview: str    # Short preview of the relevant text
```

## 3. API Request/Response Models (Backend - FastAPI)

### 3.1 ChatRequest Model
Structure for incoming chat requests to the backend.

```python
class ChatRequest(BaseModel):
    message: str                # The user's message/query
    session_id: Optional[str] = None  # Session ID (will be created if not provided)
    selected_text: Optional[str] = None  # Optional text selected by user on page
    stream: Optional[bool] = True  # Whether to stream the response
    temperature: Optional[float] = 0.7  # LLM temperature parameter
```

### 3.2 ChatResponse Model
Structure for chat responses from the backend.

```python
class ChatResponse(BaseModel):
    response: str               # The AI-generated response
    session_id: str            # The session ID
    sources: List[SourceReference]  # Sources used in generating response
    latency: float             # Total processing time
    timestamp: datetime         # When the response was generated
```

### 3.3 HistoryRequest Model
Structure for requests to retrieve conversation history.

```python
class HistoryRequest(BaseModel):
    session_id: str    # The session ID to retrieve history for
    limit: Optional[int] = 50  # Maximum number of messages to return
```

### 3.4 HistoryResponse Model
Structure for conversation history responses.

```python
class HistoryResponse(BaseModel):
    session_id: str     # The session ID
    messages: List[Message]  # List of messages in the conversation
    total_count: int    # Total number of messages in session
```

## 4. Frontend Models (TypeScript/React)

### 4.1 ChatMessage Model
Type definition for messages in the React chat interface.

```typescript
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: SourceReference[];  // For assistant messages
  isStreaming?: boolean;        // For assistant messages being streamed
}
```

### 4.2 ChatSession Model
Type definition for chat sessions in the frontend.

```typescript
interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.3 SourceReference Model (Frontend)
Type definition for source references in the frontend.

```typescript
interface SourceReference {
  chunkId: string;
  chapter: string;
  section: string;
  title: string;
  relevanceScore: number;
  textPreview: string;
}
```

### 4.4 ChatConfig Model
Configuration options for the chat interface.

```typescript
interface ChatConfig {
  backendUrl: string;        // URL of the chatbot backend
  defaultSessionId?: string; // Optional default session ID
  maxMessageLength?: number; // Maximum length of user messages
  enableStreaming?: boolean; // Whether to enable response streaming
  enableCitations?: boolean; // Whether to show source citations
}
```

## 5. Environment Configuration Models

### 5.1 Backend Environment Variables
Required environment variables for the backend service.

```bash
# OpenAI Configuration
OPENAI_API_KEY=sk-...

# Qdrant Vector Database
QDRANT_URL=https://your-cluster.qdrant.tech
QDRANT_API_KEY=...

# Neon Postgres Database
NEON_DB_URL=postgresql://user:pass@ep-...

# Application Configuration
DEBUG_MODE=true/false
LOG_LEVEL=INFO/WARN/ERROR
COLLECTION_NAME=book_chunks
MAX_TOKENS=1500
TEMPERATURE=0.7
</textarea>

### 5.2 Frontend Environment Variables
Required environment variables for the frontend integration.

```bash
# Backend API Configuration
REACT_APP_CHATBOT_API_URL=https://your-backend-api.com
REACT_APP_ENABLE_CHATBOT=true/false
```

## 6. Database Schema (PostgreSQL)

### 6.1 Sessions Table
Stores chat session information.

```sql
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    last_accessed TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    is_active BOOLEAN NOT NULL DEFAULT true
);
```

### 6.2 Messages Table
Stores individual messages within sessions.

```sql
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    role VARCHAR(10) NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    sources JSONB,  -- Stores source references as JSON
    token_count INTEGER,
    latency FLOAT    -- Processing time in seconds
);

CREATE INDEX idx_messages_session_id ON messages(session_id);
CREATE INDEX idx_messages_timestamp ON messages(timestamp);
```

## 7. Vector Database Schema (Qdrant)

### 7.1 Collection Structure
Qdrant collection for storing book content chunks.

```json
{
  "collection_name": "book_chunks",
  "vector_size": 1536,
  "distance": "Cosine",
  "payload_schema": {
    "chapter": {
      "type": "keyword"
    },
    "section": {
      "type": "keyword"
    },
    "title": {
      "type": "text"
    },
    "source_file": {
      "type": "keyword"
    },
    "book_version": {
      "type": "keyword"
    },
    "created_at": {
      "type": "integer"
    }
  }
}
```

This data model supports the RAG chatbot's requirements for storing book content with rich metadata, maintaining conversation history with source tracking, and providing structured data for both backend and frontend components. The schema enforces the grounding requirements from the constitution by capturing source information for all AI responses.