import OpenAI from "openai";
import { DataAPIClient } from "@datastax/astra-db-ts";

const {
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  OPEN_AI_API_KEY,
} = process.env;

const openai = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
});
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1]?.content;

    let docContext = "";

    // Get embedding for latest message
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: latestMessage,
      encoding_format: "float",
    });

    try {
      const collection = await db.collection(ASTRA_DB_COLLECTION);
      const cursor = collection.find(null, {
        sort: {
          $vector: embedding.data[0].embedding,
        },
        limit: 10,
      });
      const documents = await cursor.toArray();
      const docsMap = documents?.map((doc) => doc.text);
      docContext = JSON.stringify(docsMap);
    } catch (error) {
      console.log("ERROR QUERYING DB", error);
    }

    const systemMessage = {
      role: "system",
      content: `You are an AI assistant who knows everything about National Football League aka NFL.
Use the below context to augment what you know about National Football League.
The context will provide you with the most recent page data from wikipedia,
the official NFL website and others.
If the context doesn't include the information you need answer based on your
existing knowledge and don't mention the source of your information or
what the context does or doesn't include.
Format responses using markdown where applicable and don't return
images.

-----------------

START CONTEXT
${docContext}
END CONTEXT

-----------------`,
    };

    // Stream chat completion from OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      stream: true,
      messages: [systemMessage, ...messages],
    });

    // Convert OpenAI's async iterator to a ReadableStream for Next.js
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            // Format as AI SDK expects
            const formatted = `0:"${content.replace(/"/g, '\\"')}"\n`;
            controller.enqueue(encoder.encode(formatted));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.log("BACKEND ERROR", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
