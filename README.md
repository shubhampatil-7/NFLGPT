# NFL GPT - RAG Chatbot

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app) that creates an NFL-focused chatbot using Retrieval-Augmented Generation (RAG) with LangChain.js.
![image](https://github.com/user-attachments/assets/56e5d59b-8761-4e13-80be-7f1e6d355a63)

## Overview

NFL GPT is an intelligent chatbot that uses RAG (Retrieval-Augmented Generation) technology to provide accurate, up-to-date information about the NFL. The application scrapes NFL websites, processes the data using LangChain.js, stores it in a vector database (AstraDB), and uses OpenAI's embeddings to provide contextual responses.

## Prerequisites

Before running this application, ensure you have:

- Node.js 18+ installed
- An AstraDB account and database setup
- OpenAI API key

## Environment Variables

Create a `.env` file in the root directory with the following required variables:

```env
ASTRA_DB_NAMESPACE=your_namespace
ASTRA_DB_COLLECTION=your_collection_name
ASTRA_DB_API_ENDPOINT=your_astra_db_endpoint
ASTRA_DB_APPLICATION_TOKEN=your_astra_db_token
OPEN_AI_API_KEY=your_openai_api_key
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Seed the Database

**Important:** Before running the development server, you must first seed your database with NFL data:

```bash
npm run seed
```

This command will:

- Scrape NFL websites for current data
- Process and chunk the content using LangChain.js
- Generate embeddings using OpenAI
- Store the data in your AstraDB vector database

### 3. Run the Development Server

After seeding is complete, start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the NFL GPT chatbot.

## Customization

### Changing Data Sources

To scrape different NFL websites or add new data sources:

1. Open `scripts/loadDb.ts`
2. Modify the `NFLData` array with your desired URLs
3. Run `npm run seed` again to update your database

Example:

```typescript
const NFLData = [
  "https://www.nfl.com/news/",
  // Add your custom URLs here
];
```

## Project Structure

- `app/inde.tsx` - Main chat interface
- `/api/chat` - API routes for chat functionality
- `scripts/loadDb.ts` - Database seeding script
- `.env` - Environment variables (create this file)

## Technologies Used

- **Next.js** - React framework
- **LangChain.js** - Document processing and RAG implementation
- **AstraDB** - Vector database for embeddings storage
- **OpenAI** - Embeddings and chat completion
- **Puppeteer** - Web scraping
- **TypeScript** - Type safety

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

**Note:** Before deploying, ensure you:

1. Set up your environment variables in your deployment platform
2. Run the seeding process in your production environment
3. Configure your AstraDB for production access

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## Troubleshooting

### Common Issues

1. **Database not seeded**: Make sure to run `npm run seed` before starting the development server
2. **Missing environment variables**: Verify all required environment variables are set in your `.env` file
3. **Scraping failures**: Some websites may have anti-bot measures; check the console for scraping errors

### Support

For issues related to:

- AstraDB setup: Check [AstraDB documentation](https://docs.datastax.com/en/astra/docs/)
- OpenAI API: Visit [OpenAI documentation](https://platform.openai.com/docs)
- LangChain.js: See [LangChain.js documentation](https://js.langchain.com/docs/)
