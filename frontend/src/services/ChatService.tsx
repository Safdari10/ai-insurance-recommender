import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const sendMessageToAI = async (
  message: string,
  history: { role: string; text: string }[],
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, {
      message,
      history,
    });
    return response.data.response || response.data;
  } catch (error) {
    console.error("Error communicating with the AI:", error);
    const err = new Error("Failed to communicate with the AI.");
    err.cause = error;
    throw err;
  }
};
