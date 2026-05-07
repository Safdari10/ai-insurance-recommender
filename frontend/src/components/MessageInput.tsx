import React, { useState } from "react";

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="mt-4 flex items-center gap-3 rounded-lg border border-(--turner-border) bg-white p-3"
    >
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="h-14 flex-1 rounded-md border border-(--turner-border) px-4 text-[1.6rem] text-(--turner-ink) placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-(--turner-yellow)"
      />
      <button
        type="submit"
        className="h-14 rounded-md bg-(--turner-yellow) px-7 text-[1.6rem] font-bold text-(--turner-ink) transition-colors duration-200 hover:bg-(--turner-yellow-strong) focus:outline-none focus:ring-2 focus:ring-(--turner-yellow)"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
