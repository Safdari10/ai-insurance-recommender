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
    <div className="flex flex-col h-screen bg-linear-to-r from-purple-50 to-pink-100">
      <div className="flex justify-center items-center h-24 bg-linear-to-r from-purple-500 to-pink-700 text-white shadow-lg rounded-t-lg">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-5xl font-bold">Chatbot</h1>
          <p className="text-lg text-gray-200">Your friendly AI assistant</p>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6">
        {isChatStarted ? (
          <>
            <ChatDisplay history={chatHistory} />
            {isLoading && (
              <div className="text-xl text-center text-gray-500 mt-4">
                AI is typing...
              </div>
            )}
            <MessageInput onSend={handleSend} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1">
            <button
              onClick={handleStart}
              className="text-xl px-8 py-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            >
              Start Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
