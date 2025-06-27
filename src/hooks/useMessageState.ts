import { useState } from "react";
import { type Message } from "../types/common";

const DEFAULT_INITIAL_MESSAGE: Message = {
  id: "1",
  content: "Hi there! How can I assist you today?",
  sender: "bot",
  timestamp: new Date(),
};

export const useMessageState = (initialMessages: Message[] = []) => {
  const [messages, setMessages] = useState<Message[]>([
    DEFAULT_INITIAL_MESSAGE,
    ...initialMessages,
  ]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const addUserMessage = (content: string): Message => {
    const message: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    };
    addMessage(message);
    return message;
  };

  const addBotMessage = (content: string): Message => {
    const message: Message = {
      id: (Date.now() + 1).toString(),
      content,
      sender: "bot",
      timestamp: new Date(),
    };
    addMessage(message);
    return message;
  };

  return {
    messages,
    addMessage,
    addUserMessage,
    addBotMessage,
  };
};
