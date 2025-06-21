"use client";

import Image from "next/image";
import nflLogo from "./assets/nflLogo.png";
import { useChat } from "@ai-sdk/react";
// import { Message } from "ai"; // 🔥 Commented out to preserve it and prevent build error
import { useState } from "react";

import Bubble from "./components/Bubble";
import LoadingBubble from "./components/LoadingBubble";
import PromptSuggestionRow from "./components/PromptSuggestionRow";

const InfoBanner = ({ shake }: { shake: boolean }) => (
  <div className={`info-banner ${shake ? "shake" : ""}`}>
    ℹ️ GPT service is currently unavailable, out of API credits. Chat won&apos;t
    work for now. Thank you for your support!
  </div>
);

const Home = () => {
  const { status, messages, input, handleInputChange } = useChat({
    api: "/api/chat",
  });

  const [shake, setShake] = useState(false);

  const noMessages = !messages || messages.length === 0;

  const handlePrompt = (promptText) => {
    // const msg: Message = {
    //   id: crypto.randomUUID(),
    //   content: promptText,
    //   role: "user",
    // };
    // // append(msg);
    // // handleSubmit();
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShake(true);
    setTimeout(() => setShake(false), 500);
    // handleSubmit();
  };

  return (
    <main>
      <Image src={nflLogo} width={250} alt="NFL Logo" />
      <InfoBanner shake={shake} />
      <section className={noMessages ? "" : "populated"}>
        {noMessages ? (
          <>
            <p className="starter-text">
              Welcome to NFL! Your AI-powered assistant for all things NFL. Ask
              questions and get the latest updates on your favorite teams and
              players.
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
        <form onSubmit={handleFormSubmit}>
          <input
            className="question-box"
            onChange={handleInputChange}
            value={input}
            placeholder="Ask me anything about NFL..."
          />
          <input type="submit" value="Send" />
        </form>
      </section>
    </main>
  );
};

export default Home;
