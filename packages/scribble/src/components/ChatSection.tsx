import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatSectionProps {
  messages: Array<{
    id: string;
    sender: string;
    text: string;
    isCorrect?: boolean;
  }>;
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export default function ChatSection({
  messages,
  onSendMessage,
  disabled = false,
}: ChatSectionProps) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-4 p-2 bg-gray-50 rounded-md">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 py-4">No messages yet</div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 p-2 rounded-lg ${msg.isCorrect ? "bg-green-100 text-green-800" : "bg-white border"}`}
            >
              <div className="font-semibold text-sm">
                {msg.sender}
                {msg.isCorrect && " (Correct!)"}
              </div>
              <div>{msg.text}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={disabled ? "You are drawing..." : "Type your guess..."}
          disabled={disabled}
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={disabled}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
