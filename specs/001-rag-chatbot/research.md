# Research Findings: RAG Chatbot Implementation

## Overview
This document captures research findings for implementing a Retrieval-Augmented Generation (RAG) chatbot system for the Physical AI and Humanoid Robotics textbook. The research addresses technical unknowns and best practices identified during the initial planning phase.

## 1. Architecture Research

### 1.1 Backend Technology Choice: FastAPI
**Decision**: Use FastAPI as the backend framework
**Rationale**: FastAPI provides excellent performance with async support, automatic API documentation, strong typing with Pydantic, and seamless integration with LangChain. Its speed and developer experience make it ideal for RAG applications.
**Alternatives considered**: 
- Flask: More familiar but slower and lacks built-in async support
- Django: Too heavy for this specific use case
- Express.js: Would introduce multiple languages/frameworks

### 1.2 Vector Database: Qdrant Cloud
**Decision**: Use Qdrant Cloud as the vector database
**Rationale**: Qdrant offers excellent similarity search capabilities, native Python/Pydantic integration, scalable cloud hosting, and good performance for semantic search. Its filtering capabilities allow us to properly tag book content with metadata (chapter, section, title).
**Alternatives considered**:
- Pinecone: Commercial option but vendor lock-in concerns
- Weaviate: Good alternative but Qdrant has simpler setup for our needs
- Supabase Vector: Still maturing compared to dedicated solutions
- ChromaDB: Good for prototyping but lacks cloud scalability

### 1.3 Conversation Storage: Neon Serverless Postgres
**Decision**: Use Neon Serverless Postgres for conversation history
**Rationale**: Neon provides serverless PostgreSQL with smart branching and global distribution. It offers SQL's power for querying conversation data while maintaining the scalability and cost-effectiveness needed for a book chatbot with anonymous sessions.
**Alternatives considered**:
- MongoDB: Good for document storage but would add another datastore
- Redis: Great for caching but not ideal for persistent conversation history
- Local SQLite: Simple but not scalable for production use

### 1.4 LLM and Embeddings: OpenAI API
**Decision**: Use OpenAI's gpt-4o-mini for generation and text-embedding-3-small for embeddings
**Rationale**: OpenAI provides reliable, well-documented APIs with consistent performance. The newer models offer excellent cost-performance ratio while meeting our quality requirements. text-embedding-3-small is efficient for our use case.
**Alternatives considered**:
- Anthropic Claude: Excellent models but higher costs
- Open-source models (Llama): More complex deployment and maintenance
- Google Gemini: Good alternative but OpenAI has more established ecosystem

## 2. RAG Pipeline Research

### 2.1 Document Chunking Strategy
**Decision**: Use recursive character splitting with overlap, preserving section context
**Rationale**: Recursive splitting maintains semantic coherence while ensuring context preservation. Adding overlap between chunks helps prevent cutting off meaningful information. For book content, preserving section headers and context is crucial for accurate responses.
**Considerations**:
- Chunk size: 512-1024 tokens balancing recall and context
- Overlap: 50-100 tokens to maintain continuity
- Metadata: Preserve chapter/section information with each chunk

### 2.2 Retrieval Strategy
**Decision**: Use LangChain's retrievers with metadata filtering and reranking
**Rationale**: LangChain provides mature tools for RAG applications. Using metadata filtering ensures we retrieve only relevant book sections. For improved precision, we'll implement reranking of top results.
**Components**:
- Similarity search based on vector embeddings
- Metadata filtering to ensure relevance
- Optional reranking for higher precision

### 2.3 Prompt Engineering
**Decision**: Use a grounded response template with citation requirements
**Rationale**: To ensure responses are grounded in the book content only, the prompt must explicitly instruct the LLM not to hallucinate. It should also encourage citing relevant book sections when possible.
**Template elements**:
- Context: retrieved documents from book
- Instruction: "Only answer from the provided context"
- Citation: "Reference the relevant book sections"

## 3. Frontend Integration Research

### 3.1 Docusaurus Integration Method
**Decision**: Use Docusaurus theme swizzling and custom MDX components
**Rationale**: Swizzling the theme layout allows global injection of the chatbot components. MDX components can be used for the dedicated chat page with full control over the UI. This approach maintains compatibility with Docusaurus updates while allowing customization.
**Approaches**:
- Theme swizzling for global components (floating button)
- Custom MDX components for dedicated chat page
- Direct modification of layouts (avoids if possible due to upgrade conflicts)

### 3.2 Real-time Features
**Decision**: Use Server-Sent Events (SSE) for response streaming
**Rationale**: SSE is simpler to implement than WebSockets for one-way streaming from server to client. It handles connection management well and is supported across modern browsers, providing a smooth typing effect in the chat interface.
**Alternatives considered**:
- WebSockets: More complex for this use case
- Polling: Less efficient and creates more server load

### 3.3 Text Selection Handling
**Decision**: Use global mouse event listeners with position calculation
**Rationale**: Global event listeners can detect text selection across the entire site. Calculating position allows placing the "Ask AI" tooltip near the selected text without interfering with page elements.
**Implementation considerations**:
- Event throttling to prevent performance issues
- Position calculation accounting for scroll and viewport boundaries
- Disappearing behavior after timeout or click-away

## 4. Security and Privacy Research

### 4.1 API Protection
**Decision**: Implement environment-controlled CORS with origin restrictions
**Rationale**: For a book chatbot, strict origin control prevents unauthorized usage while allowing legitimate access from the deployed site. API keys could be used for additional protection if needed.
**Measures**:
- CORS restricted to deployment domains
- Rate limiting to prevent abuse
- Session tracking for analytics (without identifying users)

### 4.2 Data Privacy
**Decision**: Anonymous sessions with no personally identifiable information
**Rationale**: The chatbot stores only anonymous conversation history linked to temporary session IDs. No user data is collected or retained, maintaining privacy while allowing conversation continuity.
**Compliance considerations**:
- GDPR compliance through anonymized data
- No cookies or persistent identifiers beyond session storage
- Clear data retention policy

## 5. Deployment and Operations Research

### 5.1 Backend Hosting
**Decision**: Deploy to Railway or Render for easy scaling
**Rationale**: Both platforms offer excellent Python/ FastAPI support with easy configuration and auto-scaling. Railway provides convenient environment variable management, while Render has robust deployment pipelines.
**Considerations**:
- Free tiers available for development/testing
- Easy scaling as usage grows
- Built-in monitoring and logging

### 5.2 Frontend Integration with Existing Deployment
**Decision**: Maintain existing Vercel deployment for Docusaurus while adding backend separately
**Rationale**: The chatbot backend serves as an API that the frontend will connect to. This separation allows independent scaling and updates while leveraging existing Dercel infrastructure for the book site.
**Integration points**:
- Backend API URL configuration
- CORS configuration for Vercel domain
- Environment-specific deployments

## 6. Accessibility and Usability Research

### 6.1 Accessibility Compliance
**Decision**: Follow WCAG 2.1 AA guidelines for chat interface
**Rationale**: The chatbot must be accessible to all students, including those with disabilities. This includes keyboard navigation, screen reader compatibility, and proper ARIA attributes.
**Requirements**:
- Keyboard navigable interface
- ARIA labels for all interactive elements
- Sufficient color contrast
- Screen reader compatibility for chat responses

### 6.2 Mobile Responsiveness
**Decision**: Responsive design adapting to all screen sizes
**Rationale**: Students access educational content on various devices. The chat interface must be functional and usable on mobile devices while maintaining the floating button's visibility.
**Considerations**:
- Floating button positioning on mobile
- Touch-friendly interface elements
- Optimized input methods for mobile keyboards