<!-- SYNC IMPACT REPORT
Version change: 1.1.0 → 1.2.0
Modified principles: Principles updated to be more specific
Added sections: New technology stack and specification requirements for the Physical AI and Humanoid Robotics textbook
Removed sections: None
Templates requiring updates: ✅ updated (.specify/templates/plan-template.md, .specify/templates/spec-template.md, .specify/templates/tasks-template.md)
Follow-up TODOs: None
-->

# Physical AI and Humanoid Robotics Textbook Constitution

## Core Principles

### I. Primary Sources Mandatory
All content must cite primary sources only (official NVIDIA docs, ROS 2 documentation, IEEE/arXiv papers, Unitree/Robotis GitHub repos, Isaac Sim tutorials, or official textbooks).

### II. Verification Requirement
All technical claims must be verified against the cited primary sources before writing.

### III. APA 7th Edition Citation Standard
Use APA 7th edition citation format for both in-text and References section.

### IV. Zero Plagiarism Tolerance
Zero plagiarism – every sentence must be paraphrased in original words.

### V. Visual Content Requirement
Every chapter must contain at least 2–3 visual elements: screenshots, diagrams, architecture figures, or Mermaid flowcharts.

### VI. Student-Friendly Language
Write in clear, engaging, student-friendly English suitable for university students and hackathon participants.

### VII. MDX Format Compliance
Use MDX format only (so code blocks, tabs, admonitions, and interactive components render perfectly in Docusaurus).

### VIII. Executable Code Snippets
Include runnable ROS 2 Python code snippets with proper syntax highlighting.

### IX. Peer-Reviewed Sources Threshold
Minimum 15 high-quality sources across the entire book (at least 10 must be peer-reviewed papers or official NVIDIA/ROS documentation).

## Additional Constraints

### Technology Stack
- All content must be compatible with Docusaurus v3 (classic template), MDX v3, dark mode enabled, Algolia DocSearch, responsive for mobile
- Images and diagrams should be in formats supported by Docusaurus (PNG, JPG, SVG, Mermaid)
- Code examples must be valid ROS 2 Python snippets with syntax highlighting
- Deployment to GitHub Pages (username.github.io repo) with GitHub Actions CI/CD

### Specification Requirements
- Book Title: Physical AI & Humanoid Robotics – From Simulated Brains to Embodied Intelligence
- Subtitle: A Hands-On Capstone Textbook using ROS 2, Gazebo, NVIDIA Isaac Sim, and Vision-Language-Action Models
- Thesis: The future of AI is physical – humanoid robots with embodied intelligence, built using open-source tools and spec-first development, will seamlessly integrate into human daily life by 2030
- Target total length: 5,500–6,000 words
- Exact chapter structure (7 chapters total):
  1. Introduction to Physical AI & Embodied Intelligence
  2. The Robotic Nervous System – ROS 2 Deep Dive
  3. Digital Twins – Simulation with Gazebo, Isaac Sim & Unity
  4. The AI-Robot Brain – NVIDIA Isaac Platform & Synthetic Data
  5. Vision-Language-Action (VLA) Models – From Voice to Physical Action
  6. Building & Controlling Real Humanoid Robots (Unitree G1, Hiwonder, Jetson Edge Kits)
  7. Capstone Project – Autonomous Conversational Humanoid + Future & Ethics
- Every chapter must end with:
   - Learning Outcomes
   - Hands-on Lab Exercise (with code)
   - Interactive Quiz (using Docusaurus <Tabs> or custom React component)
   - Further Reading section
- Bonus pages required:
   - /docs/hardware-guide.md → Complete hardware buying guide + cost tables (Jetson Kit, RealSense, Unitree options, cloud alternatives)
   - /docs/chatbot.md → Fully working RAG chatbot using free Gemini 1.5 Flash API that answers questions from this book
   - Downloadable PDF button (using @docusaurus/plugin-ideal-image and Prince PDF)
- Hackathon submission deadline: December 15, 2025
- Overall tone: Exciting, practical, and beginner-to-advanced progression – exactly like Panaversity/Panacloud style

### Accessibility Requirements
- All content must be accessible to students with disabilities
- Alt texts required for all images
- Proper heading hierarchy for screen readers
- Properly formatted code blocks with syntax highlighting for all code snippets

## Development Workflow

### Writing Standards
- Each chapter undergoes source verification before publication
- Content reviewed for academic accuracy and student comprehension
- Plagiarism detection tools applied before merge
- All code examples must be tested and verified to run correctly
- All visual elements must be relevant and enhance understanding

### Review Process
- Peer review by subject matter experts
- Technical accuracy verification
- Academic standard compliance check
- Code execution verification
- Visual content quality assessment

## Governance

This constitution governs all contributions to the Physical AI and Humanoid Robotics textbook. All contributors must comply with these principles. Amendments require documentation of changes with approval from project maintainers. All changes to content must be verified against primary sources according to principle #2, and all code examples must be runnable with the specified tools according to principle #8.

**Version**: 1.2.0 | **Ratified**: 2025-01-15 | **Last Amended**: 2025-12-11
