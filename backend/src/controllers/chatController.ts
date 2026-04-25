import { Request, Response } from "express";
import { sendMessageToAI } from "../services/geminiService";

export const getChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      res.status(400).json({ error: "Message is required." });
      return;
    }

    const aiResponse = await sendMessageToAI(userMessage);
    res.json({ response: aiResponse });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while getting the chat response." });
  }
};
