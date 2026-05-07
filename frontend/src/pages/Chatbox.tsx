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
    <main className="flex min-h-screen items-center justify-center bg-[#e9eef5] p-6 max-md:p-4">
      <section className="flex h-[min(78rem,calc(100vh-4rem))] w-full max-w-416 flex-col overflow-hidden rounded-[1.8rem] border border-[#d3dce9] bg-white shadow-[0_28px_80px_rgba(17,24,39,0.16)] max-md:h-auto max-md:min-h-[calc(100vh-3.2rem)]">
        <header className="flex items-center justify-between gap-6 border-b border-[#263247] bg-(--turner-ink) px-8 py-6 text-white max-md:px-6 max-md:py-5">
          <div className="min-w-0">
            <p className="text-[1.2rem] font-extrabold uppercase text-(--turner-yellow)">
              Turner Insurance Assistant
            </p>
            <h1 className="mt-2 text-[2.8rem] font-extrabold leading-none max-md:text-[2.4rem]">
              Motor Cover Support
            </h1>
          </div>
          <div className="hidden shrink-0 items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[1.25rem] font-semibold text-gray-100 md:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-(--turner-yellow)" />
            Secure policy guidance
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col bg-[#f5f7fb] p-5 md:p-7 max-md:min-h-0">
          {isChatStarted ? (
            <>
              <ChatDisplay history={chatHistory} />
              {isLoading && (
                <div className="mt-3 text-center text-[1.4rem] font-semibold text-[#52627a]">
                  Consultant is typing...
                </div>
              )}
              <MessageInput onSend={handleSend} />
            </>
          ) : (
            <div className="grid min-h-0 flex-1 overflow-hidden rounded-[1.4rem] border border-[#d8e1ee] bg-white md:grid-cols-[0.9fr_1.1fr] max-md:overflow-y-auto">
              <div className="flex flex-col justify-between bg-[#121d2d] p-8 text-white max-md:p-6">
                <div>
                  <p className="text-[1.15rem] font-extrabold uppercase text-(--turner-yellow)">
                    Guided insurance recommendation
                  </p>
                  <h2 className="mt-5 max-w-xl text-[3.4rem] font-extrabold leading-[1.05] max-md:text-[2.8rem]">
                    Confidence before choosing cover.
                  </h2>
                  <p className="mt-5 max-w-152 text-[1.6rem] leading-relaxed text-[#c8d2e1]">
                    A short consultation that turns vehicle details, driving
                    history, and cover preferences into a practical next step.
                  </p>
                </div>
                <div className="mt-8 grid gap-3 text-[1.35rem] font-semibold text-[#e6edf7]">
                  <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                    Vehicle and driver profile
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                    Cover needs and extras
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                    Clear recommendation summary
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center p-8 max-md:p-6">
                <div className="w-full max-w-2xl">
                  <div className="mb-6 inline-flex rounded-full bg-[#fff4ba] px-4 py-2 text-[1.25rem] font-extrabold text-[#4a3b00]">
                    Tina is ready to help
                  </div>
                  <h3 className="text-[2.8rem] font-extrabold leading-tight text-(--turner-ink) max-md:text-[2.45rem]">
                    Find the right car insurance cover for your vehicle.
                  </h3>
                  <p className="mt-4 text-[1.6rem] leading-relaxed text-[#52627a]">
                    Start the consultation and answer a few focused questions.
                    The final response will be easier to scan and free from raw
                    markdown formatting.
                  </p>
                  <button
                    onClick={handleStart}
                    className="mt-8 inline-flex min-h-16 items-center justify-center rounded-full bg-(--turner-yellow) px-9 text-[1.6rem] font-extrabold text-(--turner-ink) shadow-[0_12px_26px_rgba(242,188,0,0.3)] transition hover:bg-(--turner-yellow-strong) focus:outline-none focus:ring-2 focus:ring-(--turner-yellow) focus:ring-offset-2"
                  >
                    Start Chat
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ChatBox;
