---
id: 1
title: "Implement RAG Chatbot System"
stage: plan
date: "2025-12-17"
surface: "agent"
model: "Qwen Code"
feature: "001-rag-chatbot"
branch: "001-rag-chatbot"
user: "user"
command: "/sp.plan"
labels: ["rag", "chatbot", "docusaurus", "ai"]
links: 
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
---

# Prompt History Record: Implement RAG Chatbot System

## Outcome
Successfully created a comprehensive implementation plan for a Retrieval-Augmented Generation (RAG) chatbot system integrated with the Physical AI and Humanoid Robotics textbook. The plan includes all required artifacts: implementation plan, research findings, data models, API contracts, and quickstart guide.

## Evaluation
All planned deliverables were completed successfully:
- Implementation plan (plan.md) created with detailed technical context
- Research document (research.md) completed with technology decisions
- Data model document (data-model.md) defined with all required models
- API contracts created in the contracts directory
- Quickstart guide (quickstart.md) with step-by-step instructions
- All artifacts comply with the project constitution requirements

## Files
 - C:\Spec Kit Plus\ai-native-book-with-chatbot\specs\001-rag-chatbot\plan.md
 - C:\Spec Kit Plus\ai-native-book-with-chatbot\specs\001-rag-chatbot\research.md
 - C:\Spec Kit Plus\ai-native-book-with-chatbot\specs\001-rag-chatbot\data-model.md
 - C:\Spec Kit Plus\ai-native-book-with-chatbot\specs\001-rag-chatbot\contracts\chatbot-api-contract.md
 - C:\Spec Kit Plus\ai-native-book-with-chatbot\specs\001-rag-chatbot\quickstart.md

## Tests
(none)

## Prompt Text
Implement a complete Retrieval-Augmented Generation (RAG) chatbot system integrated into the existing Docusaurus v3 book at https://ai-native-book-omega.vercel.app/.

Separate the implementation into two parts: Backend and Frontend.

Backend (FastAPI):
- Create a dedicated backend folder/project with FastAPI as the main server.
- Use LangChain for the full RAG pipeline (chunking, retrieval, generation with context).
- Embeddings: OpenAI text-embedding-3-small.
- Generation: OpenAI gpt-4o-mini (or gpt-4o for better quality if budget allows).
- Vector store: Qdrant Cloud free tier (collections for book chunks with metadata: chapter, section, title).
- Conversation history storage: Neon Serverless Postgres (tables for sessions and messages, tied to anonymous session ID).
- Endpoints:
  - POST /chat: Accept message, optional selected_text context, session_id → retrieve relevant chunks → augment prompt → stream response → save history → return streamed tokens + optional source citations.
  - GET /history: Retrieve past messages for session.
  - Support streaming via SSE or WebSockets.
- Ingestion script: Separate ingest.py to parse all book MDX/Markdown files from the Docusaurus docs folder, chunk intelligently (with headings/metadata), generate embeddings, upsert into Qdrant.
- Security: API key protection or CORS limited to your domain.
- .env for all secrets (OPENAI_API_KEY, QDRANT_URL, QDRANT_API_KEY, NEON_DB_URL).

Frontend (Docusaurus integration):
- Create custom React components:
  - ChatWidget.tsx: Full chat panel with message bubbles, input, scrolling history, typing indicator, clear button, copy response.
  - FloatingChatButton.tsx: Site-wide floating circular icon in bottom-right corner (chat bubble or robot SVG icon, dark mode adaptive, mobile responsive, always visible).
  - SelectedTextHandler: Global JavaScript/React listener – when user selects text on any page, show a small floating tooltip/button near selection saying "Ask AI about this" → on click, open chat widget and pre-fill query with "Explain this selected text: [text]" + send automatically or let user edit.
- Integrate floating button and selected text feature site-wide (via Docusaurus theme swizzled Layout or custom plugin).
- Use fetch/EventSource for streaming responses.
- Persist session ID in localStorage, fallback to anonymous.
- UI: Modern, clean, Panaversity-style – message bubbles, streaming typing effect, thumbs up/down feedback (optional store in DB), source citations as clickable chips/links to book sections.
- Full accessibility: ARIA labels, keyboard navigation, focus management, screen reader support.
- Dark mode sync with Docusaurus theme.
- Dedicated /docs/chatbot.md page with full-screen chat as fallback.

Overall:
- Provide detailed Mermaid architecture diagram showing: User → Frontend (Docusaurus + React components) → Backend API → Qdrant retrieval + Neon history → OpenAI → Stream back.
- Deployment instructions: Backend to Railway/Render/Vercel, Frontend with existing Vercel deploy.
- Environment setup, .env.example, and one-time ingestion steps.
- Ensure zero hallucinations: System prompt must enforce "Answer only from provided book context" with fallback message for out-of-scope queries.

Follow the latest constitution v1.3.0 for grounding, student-friendly tone, and compatibility.

## Response Text
Created a complete implementation plan for the RAG chatbot system with all required artifacts:

1. Implementation Plan (plan.md): Comprehensive plan documenting the technical approach, architecture, and project structure for the RAG chatbot system.

2. Research Document (research.md): Detailed research findings on technology choices including FastAPI, Qdrant, Neon Postgres, OpenAI, and implementation approaches.

3. Data Model (data-model.md): Complete data models for backend (PostgreSQL and Qdrant schemas) and frontend (TypeScript interfaces) with all required fields and relationships.

4. API Contracts: Well-defined API specifications for chat, history, and session management endpoints with request/response schemas and error handling.

5. Quickstart Guide (quickstart.md): Step-by-step instructions for setting up, configuring, and running the RAG chatbot system with all prerequisites and deployment options.

All artifacts follow the project constitution v1.3.0 requirements for grounding responses in book content, student-friendly language, and accessibility standards.