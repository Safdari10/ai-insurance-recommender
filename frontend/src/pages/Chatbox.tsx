import React, { useState } from "react";
import ChatDisplay from "../components/ChatDisplay";
import MessageInput from "../components/MessageInput";
import { sendMessageToAI } from "../services/ChatService";

const ChatBox: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<
    { role: string; text: string; timestamp: string }[]
  >([]);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async () => {
    try {
      const introMessage = await sendMessageToAI("Start Conversation", []);
      setChatHistory([
        {
          role: "ai",
          text: introMessage,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setIsChatStarted(true);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  const handleSend = async (message: string) => {
    const newUserMessage = {
      role: "user",
      text: message,
      timestamp: new Date().toLocaleTimeString(),
    };
    setChatHistory((prev) => [...prev, newUserMessage]);

    setIsLoading(true);
    try {
      const aiResponse = await sendMessageToAI(message, chatHistory);
      const newAIMessage = {
        role: "ai",
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString(),
      };

      setChatHistory((prev) => [...prev, newAIMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 md:px-10">
      <div className="mx-auto flex h-[calc(100vh-8rem)] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-(--turner-border) bg-white shadow-[0_20px_50px_rgba(17,24,39,0.08)]">
        <div className="flex items-center justify-between border-b border-(--turner-border) bg-(--turner-ink) px-8 py-6 text-white">
          <div>
            <p className="text-[1.4rem] font-semibold uppercase tracking-[0.08em] text-(--turner-yellow)">
              Turner Insurance Assistant
            </p>
            <h1 className="mt-2 text-[3rem] font-extrabold leading-none">
              Motor Cover Support
            </h1>
          </div>
          <div className="hidden rounded-md border border-white/20 px-4 py-2 text-[1.3rem] font-medium text-gray-200 md:block">
            Secure guidance for policy and claims questions
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col bg-[#f8fafc] p-6 md:p-8">
          {isChatStarted ? (
            <>
              <ChatDisplay history={chatHistory} />
              {isLoading && (
                <div className="mt-4 text-center text-[1.5rem] font-medium text-(--turner-ink-soft)">
                  AI is typing...
                </div>
              )}
              <MessageInput onSend={handleSend} />
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="max-w-xl text-center">
                <h2 className="text-[3.2rem] font-bold text-(--turner-ink)">
                  Ask About Your Car Insurance in Minutes
                </h2>
                <p className="mt-4 text-[1.7rem] leading-relaxed text-(--turner-ink-soft)">
                  Get practical guidance for cover, claims, and policy options
                  with a clear, step-by-step chat experience.
                </p>
              </div>
              <button
                onClick={handleStart}
                className="mt-10 rounded-md bg-(--turner-yellow) px-10 py-4 text-[1.8rem] font-bold text-(--turner-ink) transition-colors duration-200 hover:bg-(--turner-yellow-strong) focus:outline-none focus:ring-2 focus:ring-(--turner-yellow) focus:ring-offset-2"
              >
                Start Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
