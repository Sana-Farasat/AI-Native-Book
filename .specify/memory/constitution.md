<!-- SYNC IMPACT REPORT
Version change: 1.2.0 → 1.3.0
Modified principles: Updated for RAG chatbot integration; added new principles for chatbot responses and features
Added sections: Chatbot-Specific Principles, Updated Bonus Pages, Updated Technology Stack
Removed sections: Old Gemini reference in bonus pages
Templates requiring updates: ✅ updated as needed (.specify/templates/*)
Follow-up TODOs: Ingest book content into vector DB during deployment
-->

# Physical AI and Humanoid Robotics Textbook Constitution

## Core Principles

### I. Primary Sources Mandatory
All **book content** must cite primary sources only (official NVIDIA docs, ROS 2 documentation, IEEE/arXiv papers, Unitree/Robotis GitHub repos, Isaac Sim tutorials, or official textbooks).

### II. Verification Requirement
All technical claims in the book must be verified against the cited primary sources before writing.

### III. APA 7th Edition Citation Standard
Use APA 7th edition citation format for both in-text and References section in book chapters.

### IV. Zero Plagiarism Tolerance
Zero plagiarism in book content – every sentence must be paraphrased in original words.

### V. Visual Content Requirement
Every book chapter must contain at least 2–3 visual elements: screenshots, diagrams, architecture figures, or Mermaid flowcharts.

### VI. Student-Friendly Language
All content (book chapters and chatbot responses) must be written in clear, engaging, student-friendly English suitable for university students and hackathon participants.

### VII. MDX Format Compliance
Use MDX format only (so code blocks, tabs, admonitions, and interactive components render perfectly in Docusaurus).

### VIII. Executable Code Snippets
Include runnable ROS 2 Python code snippets with proper syntax highlighting in book chapters.

### IX. Peer-Reviewed Sources Threshold
Minimum 15 high-quality sources across the entire book (at least 10 must be peer-reviewed papers or official NVIDIA/ROS documentation).

### X. Grounded Responses for Chatbot (New)
Chatbot responses must be strictly grounded in the book's ingested content only. No external knowledge or hallucinations allowed. If a query cannot be answered from the book, respond: "I can only answer questions based on the content of this book. That information is not covered here."

### XI. Source Citation in Chatbot (New)
Where possible, chatbot responses should include citations to relevant book sections/chapters (e.g., "Based on Chapter 2: ROS 2 – The Robotic Nervous System").

### XII. Conversational Accuracy (New)
Chatbot must maintain conversation history accurately and support context-aware follow-up questions.

## Additional Constraints

### Technology Stack
- All content must be compatible with Docusaurus v3 (classic template), MDX v3, dark mode enabled, Algolia DocSearch, responsive for mobile
- Images and diagrams should be in formats supported by Docusaurus (PNG, JPG, SVG, Mermaid)
- Code examples must be valid ROS 2 Python snippets with syntax highlighting
- Deployment to Vercel or GitHub Pages with CI/CD
- **RAG Chatbot Stack**: FastAPI backend, Qdrant Cloud (vector storage), Neon Serverless Postgres (conversation history), OpenAI embeddings and LLM (e.g., text-embedding-3-small, gpt-4o-mini), LangChain or similar for RAG pipeline
- Frontend: Custom React/MDX components for chat UI, supporting streaming, history, and selected text querying

### Specification Requirements
- **Book Title**: Physical AI & Humanoid Robotics
- **Subtitle**: From Simulated Brains to Embodied Intelligence
- **Thesis**: The future of AI is physical – humanoid robots with embodied intelligence, built using open-source tools and spec-first development, will seamlessly integrate into human daily life by 2030
- **Target total length**: 5,500–6,000 words (book content)
- **Exact chapter structure** (7 chapters total):
  1. Introduction to Physical AI
  2. ROS 2 – The Robotic Nervous System
  3. Digital Twins – Simulation with Gazebo & Isaac Sim
  4. NVIDIA Isaac Platform & Synthetic Data
  5. Vision-Language-Action (VLA) Models
  6. Building & Controlling Real Humanoid Robots
  7. Capstone Project – Autonomous Conversational Humanoid
- Every chapter must end with:
   - Learning Outcomes
   - Hands-on Lab Exercise (with code)
   - Interactive Quiz (using Docusaurus <Tabs> or custom React component)
   - Further Reading section
- **Bonus pages required**:
   - /docs/hardware-guide.md → Complete hardware buying guide + cost tables (Jetson Kit, RealSense, Unitree options, cloud alternatives)
   - /docs/chatbot.md → Fully working RAG chatbot using OpenAI models that answers questions from this book, supports conversation history, selected text queries, and source citations
   - Downloadable PDF button (using appropriate Docusaurus plugins)
- **Hackathon submission deadline**: December 15, 2025 (met – ongoing improvements)
- **Overall tone**: Exciting, practical, and beginner-to-advanced progression – exactly like Panaversity/Panacloud style

### Accessibility Requirements
- All content (book and chatbot UI) must be accessible to students with disabilities
- Alt texts required for all images
- Proper heading hierarchy for screen readers
- Properly formatted code blocks with syntax highlighting
- Chatbot UI: ARIA labels, keyboard navigation support, screen reader compatible

## Development Workflow

### Writing Standards
- Each chapter undergoes source verification before publication
- Content reviewed for academic accuracy and student comprehension
- Plagiarism detection tools applied before merge
- All code examples must be tested and verified to run correctly
- All visual elements must be relevant and enhance understanding
- **Chatbot-specific**: Ingestion pipeline must process all book MDX content accurately; test queries against known book sections

### Review Process
- Peer review by subject matter experts
- Technical accuracy verification (book + RAG responses)
- Academic standard compliance check
- Code execution verification
- Visual content quality assessment
- **Chatbot testing**: End-to-end tests for grounding, history, selected text, and performance

## Governance

This constitution governs all contributions to the Physical AI and Humanoid Robotics textbook and its integrated RAG chatbot. All contributors must comply with these principles. Amendments require documentation of changes with approval from project maintainers. All changes to book content must be verified against primary sources according to principle #2, all code examples must be runnable, and all chatbot features must ensure grounded responses according to principles #10–12.

**Version**: 1.3.0 | **Ratified**: 2025-01-15 | **Last Amended**: 2025-12-17