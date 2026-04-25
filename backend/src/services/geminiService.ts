import { chatSession } from "./geminiModel";

export const sendMessageToAI = async (userMessage: string) => {
  try {
    // Stream response from Gemini chat
    const stream = await chatSession.sendMessageStream({
      message: userMessage,
    });

    let aiMessage = "";
    for await (const chunk of stream) {
      aiMessage += chunk.text;
    }

    return aiMessage;
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    throw new Error("Failed to get a response from the AI.");
  }
};
