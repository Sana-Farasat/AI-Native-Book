# Data Model: Physical AI & Humanoid Robotics Textbook

## Entities

### Textbook Chapter
- **Name**: The title of the chapter
- **Content**: The MDX content containing text, visual elements, and code
- **Learning Outcomes**: List of learning objectives for the chapter
- **Lab Exercise**: Hands-on exercise with ROS 2 Python code examples
- **Interactive Quiz**: 10-question quiz using React state or MDX components
- **Chapter Summary**: TL;DR with bullet points and Mermaid mindmap
- **Further Reading**: Links to additional resources
- **Visual Elements**: 2-3 visual elements (screenshots, diagrams, architecture figures, Mermaid flowcharts)
- **Primary Sources**: Minimum of 2 primary sources cited in APA 7th edition format

### Hardware Guide
- **Hardware Options**: List of humanoid robot platforms and components
- **Cost Tables**: Price information for different options
- **Technical Specifications**: Detailed specs for each component
- **Recommendations**: Suggestions based on different requirements and budgets

### RAG Chatbot
- **Context**: Textbook content vectorized for retrieval
- **Query Interface**: Input for user questions
- **Response Generation**: AI-generated answers based on textbook content
- **API Integration**: Connection to Gemini 1.5 Flash API

### Quiz Component
- **Questions**: Array of 10 questions related to the chapter content
- **Options**: Multiple choice or other interactive answer formats
- **Correct Answers**: Reference answers for scoring
- **Feedback**: Explanations for correct and incorrect answers

### Chapter Summary Component
- **Key Points**: Bullet points summarizing the main concepts
- **Mermaid Mindmap**: Visual representation of chapter concepts
- **Takeaways**: Key insights and concepts students should remember

### User Preferences
- **Language**: Selected language (English/Urdu)
- **Theme**: Light/dark mode preference
- **Progress Tracking**: (Future enhancement) Track user's reading progress

## Relationships

- One Textbook contains 7 Chapters
- One Chapter contains One Lab Exercise
- One Chapter contains One Interactive Quiz
- One Chapter contains One Summary
- One Textbook contains One Hardware Guide
- One Textbook contains One RAG Chatbot

## State Transitions

### Quiz Component
- Initial state: Questions displayed without answers
- User interaction: Answer selection
- After submission: Results displayed with feedback
- Reset: Back to initial state

### RAG Chatbot
- Initial state: Ready for user input
- User interaction: Question submitted
- Processing: Query sent to API
- Response: Answer displayed to user

## Validation Rules

- All chapters must contain 2-3 visual elements
- All chapters must include at least 2 primary sources
- All code examples must be in ROS 2 Python with syntax highlighting
- All citations must follow APA 7th edition format
- All content must be in MDX format
- All chapters must end with learning outcomes, lab exercise, interactive quiz, and further reading
- Hardware guide must include cost tables and technical specifications
- Content must total between 5,500-6,000 words
- Each chapter summary must include bullet points and Mermaid mindmap
- All content must be student-friendly and engaging