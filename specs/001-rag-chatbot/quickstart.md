# Quickstart Guide: RAG Chatbot System

## Overview
This guide provides step-by-step instructions to quickly set up and run the Retrieval-Augmented Generation (RAG) chatbot system for the Physical AI and Humanoid Robotics textbook. Follow these steps to get the system running with minimal configuration.

## Prerequisites
- Python 3.11+ installed
- Node.js 18+ and npm/yarn installed
- An OpenAI API key
- Access to Qdrant Cloud (free tier account)
- Neon Serverless Postgres account (free tier)

## 1. Repository Setup

### Clone the Repository
```bash
git clone https://github.com/your-org/ai-native-book-with-chatbot.git
cd ai-native-book-with-chatbot
```

### Repository Structure
```
ai-native-book-with-chatbot/
├── backend/              # FastAPI backend
├── frontend/             # React components for Docusaurus integration
├── docs/                 # Docusaurus book content
├── docusaurus.config.ts  # Docusaurus configuration
└── package.json          # Root package file
```

## 2. Backend Setup

### Navigate to Backend Directory
```bash
cd backend
```

### Create Python Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Environment Configuration
Create a `.env` file in the `backend` directory with the following content:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Qdrant Vector Database
QDRANT_URL=https://your-cluster.qdrant.tech
QDRANT_API_KEY=your_qdrant_api_key_here

# Neon Postgres Database
NEON_DB_URL=postgresql://username:password@ep-xxxxx.us-east-1.aws.neon.tech/dbname

# Application Configuration
DEBUG_MODE=true
LOG_LEVEL=INFO
COLLECTION_NAME=book_chunks
MAX_TOKENS=1500
TEMPERATURE=0.7
```

## 3. Frontend Setup

### Navigate to Repository Root
```bash
cd ..  # from backend directory, back to root
```

### Install Docusaurus Dependencies
```bash
npm install
```

### Environment Configuration for Frontend
Add the following to a `.env` file in the root directory:

```bash
# Backend API Configuration
REACT_APP_CHATBOT_API_URL=http://localhost:8000  # When running locally
```

## 4. Ingest Book Content

Before running the chatbot, you need to ingest the book content into the vector database.

### Navigate to Backend Directory
```bash
cd backend
```

### Run the Ingestion Script
```bash
python -m src.ingestion.ingest
```

This script will:
- Parse all MDX/Markdown files in the `docs` directory
- Split content into appropriately sized chunks
- Generate embeddings using OpenAI's text-embedding-3-small
- Store the content in Qdrant with metadata (chapter, section, title)

## 5. Run the Backend Server

### Start the Backend
```bash
cd backend
# Make sure your virtual environment is activated
uvicorn src.api.main:app --reload --port 8000
```

The backend should now be running at `http://localhost:8000`.

The API documentation will be available at `http://localhost:8000/docs`.

## 6. Integrate with Docusaurus

### Run Docusaurus Development Server
From the repository root:
```bash
npm run start
```

This will start the Docusaurus development server, typically at `http://localhost:3000`, with the chatbot components integrated.

## 7. Test the Integration

1. Visit your local Docusaurus site (e.g., `http://localhost:3000`)
2. You should see a floating chat button in the bottom-right corner
3. Click the button to open the chat widget
4. Try asking questions about the book content
5. You can also select text on any page and click the "Ask AI about this" tooltip

## 8. API Testing (Optional)

You can test the backend API directly using curl:

```bash
curl -X POST http://localhost:8000/v1/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key" \
  -d '{
    "message": "What are ROS 2 nodes?",
    "session_id": "test-session-123"
  }'
```

## 9. Production Deployment

### Backend Deployment
1. Choose a hosting platform (Railway, Render, or Vercel)
2. Set up environment variables as defined in step 2
3. Deploy the backend application
4. Update the frontend's `REACT_APP_CHATBOT_API_URL` to point to your deployed backend

### Frontend Deployment
1. Update the Docusaurus configuration to use production backend URL
2. Build the site: `npm run build`
3. Deploy to your preferred static hosting (Vercel, Netlify, GitHub Pages)

## Troubleshooting

### Common Issues

1. **"Module not found" errors**: Ensure you've installed dependencies in the correct virtual environment
2. **Database connection errors**: Verify your database URLs and credentials in the environment files
3. **Embedding generation errors**: Check that your OpenAI API key is valid and has sufficient quota
4. **CORS errors**: Ensure your backend allows requests from your frontend domain

### Debugging Tips

1. Check the backend server logs for error messages
2. Use browser developer tools to inspect network requests
3. Verify that all required environment variables are set
4. Confirm that the ingestion process completed successfully

## Next Steps

1. Customize the chat UI by modifying the React components in `frontend/src/components/`
2. Adjust the RAG pipeline parameters in the backend for optimal performance
3. Add additional book content by updating the ingestion script
4. Implement additional features like feedback collection or analytics