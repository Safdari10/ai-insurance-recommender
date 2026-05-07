import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRobot } from "@fortawesome/free-solid-svg-icons";

interface ChatHistoryProps {
  history: { role: string; text: string; timestamp: string }[];
}

const tidyMessage = (text: string) =>
  text.replace(/\*\*/g, "").replace(/^\s*[-*]\s+/gm, "- ");

const isRecommendation = (text: string) =>
  text.toLowerCase().includes("recommend");

const ChatDisplay: React.FC<ChatHistoryProps> = ({ history }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [history]);

  return (
    <div
      ref={scrollRef}
      className="min-h-0 flex-1 overflow-y-auto rounded-[1.4rem] border border-[#d8e1ee] bg-[linear-gradient(180deg,#f8fafc_0%,#edf3f8_100%)] px-4 py-6 md:px-6"
    >
      <div className="mx-auto flex w-full max-w-328 flex-col gap-5">
        {history.map((message, index) => {
          const isUser = message.role === "user";
          const messageText = tidyMessage(message.text);
          const showRecommendationPanel =
            !isUser && isRecommendation(messageText);

          return (
            <div
              key={index}
              className={`flex items-end gap-3 ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isUser && (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c7d2e0] bg-white text-[#33445f] shadow-[0_8px_20px_rgba(17,24,39,0.08)]">
                  <FontAwesomeIcon
                    icon={faRobot}
                    className="h-6 w-6"
                  />
                </div>
              )}

              <div
                className={`max-w-[72%] px-5 py-4 shadow-[0_10px_28px_rgba(17,24,39,0.08)] max-md:max-w-[82%] ${
                  isUser
                    ? "rounded-[1.8rem] rounded-br-[0.4rem] bg-(--turner-ink) text-white"
                    : "rounded-[1.8rem] rounded-bl-[0.4rem] border border-[#d8e1ec] bg-white text-(--turner-ink)"
                }`}
              >
                <div
                  className={`mb-1 text-[1.15rem] font-bold uppercase ${
                    isUser ? "text-(--turner-yellow)" : "text-[#596b84]"
                  }`}
                >
                  {isUser ? "You" : "Consultant"}
                </div>

                {showRecommendationPanel && (
                  <div className="mb-3 rounded-2xl border-l-4 border-(--turner-yellow) bg-[#f8fafc] px-4 py-3">
                    <p className="text-[1.25rem] font-extrabold uppercase text-[#33445f]">
                      Recommended cover
                    </p>
                  </div>
                )}

                <p className="whitespace-pre-line text-[1.55rem] leading-[1.62]">
                  {messageText}
                </p>

                <div
                  className={`mt-2 text-[1.15rem] ${
                    isUser ? "text-gray-300" : "text-[#758397]"
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-(--turner-yellow) bg-[#1f2937] text-(--turner-yellow) shadow-[0_8px_20px_rgba(17,24,39,0.12)]">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="h-6 w-6"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatDisplay;
