"use client";

import Image from "next/image";
import nflLogo from "./assets/nflLogo.png";
import { useChat } from "@ai-sdk/react";
import { Message } from "ai";

import Bubble from "./components/Bubble";
import LoadingBubble from "./components/LoadingBubble";
import PromptSuggestionRow from "./components/PromptSuggestionRow";

const Home = () => {
  const { append, status, messages, input, handleInputChange, handleSubmit } =
    useChat({ api: "/api/chat" });

  const noMessages = !messages || messages.length === 0;

  const handlePrompt = (promptText) => {
    const msg: Message = {
      id: crypto.randomUUID(),
      content: promptText,
      role: "user",
    };
    append(msg);
    handleSubmit();
  };
  return (
    <main>
      <Image src={nflLogo} width={250} alt="F1 Logo" />
      <section className={noMessages ? "" : "populated"}>
        {noMessages ? (
          <>
            <p className="starter-text">
              Welcome to F1GPT! Your AI-powered assistant for all things Formula
              1—ask questions, explore race history, and get the latest updates
              on your favorite teams and drivers.
            </p>
            <br />
            <PromptSuggestionRow onPromptClick={handlePrompt} />
          </>
        ) : (
          <>
            {messages.map((message, index) => (
              <Bubble key={`message-${index}`} message={message} />
            ))}
            {(status === "submitted" || status === "streaming") && (
              <LoadingBubble />
            )}
          </>
        )}
        <form onSubmit={handleSubmit}>
          <input
            className="question-box"
            onChange={handleInputChange}
            value={input}
            placeholder="Ask me anything about F1..."
          />
          <input type="submit" value="Send" />
        </form>
      </section>
    </main>
  );
};

export default Home;
