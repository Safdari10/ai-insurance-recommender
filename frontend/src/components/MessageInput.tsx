import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
      className="mx-auto mt-4 flex w-full max-w-328 items-center gap-3 rounded-full border border-[#d6deea] bg-white p-2 pl-5 shadow-[0_14px_35px_rgba(17,24,39,0.08)]"
    >
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="h-14 min-w-0 flex-1 bg-transparent text-[1.55rem] text-(--turner-ink) placeholder:text-[#8a97aa] focus:outline-none"
      />
      <button
        type="submit"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-(--turner-yellow) text-(--turner-ink) transition hover:bg-(--turner-yellow-strong) focus:outline-none focus:ring-2 focus:ring-(--turner-yellow) focus:ring-offset-2"
        aria-label="Send message"
      >
        <FontAwesomeIcon
          icon={faPaperPlane}
          className="h-5 w-5"
        />
      </button>
    </form>
  );
};

export default MessageInput;
