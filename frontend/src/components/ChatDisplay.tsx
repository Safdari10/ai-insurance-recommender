import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRobot } from "@fortawesome/free-solid-svg-icons";

interface ChatHistoryProps {
  history: { role: string; text: string; timestamp: string }[];
}

const ChatDisplay: React.FC<ChatHistoryProps> = ({ history }) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col space-y-4 overflow-y-auto rounded-lg border border-(--turner-border) bg-white p-5">
      {history.map((message, index) => (
        <div
          key={index}
          className={`flex max-w-4xl items-start gap-4 rounded-md border p-4 ${
            message.role === "user"
              ? "ml-auto flex-row-reverse border-transparent bg-(--turner-ink) text-white"
              : "mr-auto border-(--turner-border) bg-[#f8fafc] text-(--turner-ink)"
          }`}
        >
          <div className="shrink-0">
            <FontAwesomeIcon
              icon={message.role === "user" ? faUser : faRobot}
              className={`h-8 w-8 rounded-full ${
                message.role === "user"
                  ? "text-(--turner-yellow)"
                  : "text-(--turner-ink-soft)"
              }`}
            />
          </div>
          <div className="space-y-2">
            <div className="text-[1.6rem] leading-relaxed">{message.text}</div>
            <div
              className={`text-[1.2rem] ${
                message.role === "user" ? "text-gray-300" : "text-gray-500"
              }`}
            >
              {message.timestamp}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;
