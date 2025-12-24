# Implementation Plan: RAG Chatbot System

**Branch**: `001-rag-chatbot` | **Date**: 2025-12-17 | **Spec**: [link]
**Input**: Feature specification from `/specs/001-rag-chatbot/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a complete Retrieval-Augmented Generation (RAG) chatbot system integrated into the existing Docusaurus v3 book. The system consists of a FastAPI backend with LangChain for the RAG pipeline, Qdrant Cloud for vector storage, Neon Serverless Postgres for conversation history, and OpenAI for embeddings and generation. The frontend includes custom React components for chat interface, floating chat button, and selected text handling integrated site-wide in Docusaurus.

## Technical Context

**Language/Version**: Python 3.11 (backend), TypeScript/React (frontend)
**Primary Dependencies**: FastAPI, LangChain, Qdrant, Neon Postgres, OpenAI API, Docusaurus v3, React
**Storage**: Qdrant Cloud (vector store for book content), Neon Serverless Postgres (conversation history)
**Testing**: pytest, Jest for backend and frontend
**Target Platform**: Cross-platform web application
**Project Type**: Web application with backend and frontend components
**Performance Goals**: <500ms response time for queries, support 100 concurrent users
**Constraints**: Must ensure zero hallucinations, responses grounded in book content only, secure API access
**Scale/Scope**: Support the entire book content with proper chunking and metadata, anonymous session-based conversations

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

For the Physical AI and Humanoid Robotics textbook project, ensure all plans comply with these constitutional principles:
- All content must cite primary sources only (official NVIDIA docs, ROS 2 documentation, IEEE/arXiv papers, Unitree/Robotis GitHub repos, Isaac Sim tutorials, or official textbooks)
- All technical claims must be verified against the cited primary sources before writing
- APA 7th edition citation format required for both in-text and References section
- Zero plagiarism - every sentence must be paraphrased in original words
- Each chapter must contain at least 2–3 visual elements: screenshots, diagrams, architecture figures, or Mermaid flowcharts
- Content must be engaging and student-friendly for university students and hackathon participants
- All content must use MDX format only (so code blocks, tabs, admonitions, and interactive components render perfectly in Docusaurus)
- Include runnable ROS 2 Python code snippets with proper syntax highlighting
- Minimum 15 high-quality sources required across the entire book (at least 10 must be peer-reviewed papers or official NVIDIA/ROS documentation)
- All content must be compatible with Docusaurus v3 (classic template), MDX v3, dark mode enabled, Algolia DocSearch, responsive for mobile
- Deployment to GitHub Pages (username.github.io repo) with GitHub Actions CI/CD
- All code examples must be tested and verified to run correctly
- Chatbot responses must be strictly grounded in the book's ingested content only. No external knowledge or hallucinations allowed. If a query cannot be answered from the book, respond: "I can only answer questions based on the content of this book. That information is not covered here."
- Chatbot responses should include citations to relevant book sections/chapters where possible
- Chatbot must maintain conversation history accurately and support context-aware follow-up questions
- All content (book and chatbot UI) must be accessible to students with disabilities

## Project Structure

### Documentation (this feature)

```text
specs/001-rag-chatbot/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── models/
│   │   ├── document.py      # Document models and schemas
│   │   └── conversation.py  # Conversation models and schemas
│   ├── services/
│   │   ├── rag_service.py   # Main RAG service
│   │   ├── embedding_service.py  # Embedding service
│   │   └── conversation_service.py # Conversation history service
│   ├── api/
│   │   ├── v1/
│   │   │   ├── chat.py      # Chat endpoints
│   │   │   ├── history.py   # History endpoints
│   │   │   └── router.py    # Main API router
│   │   └── main.py          # FastAPI app entry point
│   ├── utils/
│   │   ├── config.py        # Configuration loader
│   │   ├── logger.py        # Logging utilities
│   │   └── helpers.py       # General helper functions
│   └── ingestion/
│       └── ingest.py        # Book content ingestion script
├── tests/
│   ├── unit/
│   ├── integration/
│   └── contract/
├── .env.example
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
└── README.md

frontend/
├── src/
│   ├── components/
│   │   ├── ChatWidget.tsx      # Full chat panel component
│   │   ├── FloatingChatButton.tsx  # Floating button component
│   │   ├── SelectedTextHandler.tsx # Text selection handler
│   │   └── ChatMessage.tsx     # Individual message component
│   ├── hooks/
│   │   ├── useChat.tsx         # Chat state management hook
│   │   └── useConversationHistory.tsx  # History management hook
│   ├── services/
│   │   └── api.ts              # API client for backend
│   ├── types/
│   │   └── index.ts            # Type definitions
│   └── styles/
│       └── chat.css            # Chat-specific styles
├── tests/
│   └── ...
├── .env.example
├── package.json
├── tsconfig.json
└── webpack.config.js

# Existing Docusaurus structure
docs/
├── chatbot.md               # Dedicated page with full-screen chat

# Root project
├── docusaurus.config.ts     # Docusaurus configuration
├── sidebars.ts              # Sidebar configuration
├── package.json             # Root package file
├── .env                     # Environment variables
└── ...
```

**Structure Decision**: Using a multi-project structure with separate backend and frontend directories to clearly separate concerns. The backend will handle all RAG processing and API endpoints, while the frontend contains React components integrated into Docusaurus. This structure aligns with the requirements for a web application with both backend and frontend components.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|