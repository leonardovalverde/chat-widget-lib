import { useState, useEffect, useCallback } from "react";
import { type Message } from "../types/common";

const DEFAULT_INITIAL_MESSAGE: Message = {
  id: "1",
  content: "Hi there! How can I assist you today?",
  sender: "bot",
  timestamp: new Date(),
};

const STORAGE_KEY = "chat-widget-messages";
const MAX_STORED_MESSAGES = 50;
interface UseMessageStateOptions {
  persistMessages?: boolean;
  storageKey?: string;
  maxStoredMessages?: number;
  chatbotId?: string;
}

/**
 * Custom hook to manage chat messages state with localStorage persistence.
 * It provides methods to add user and bot messages, and maintains the message history.
 */
export const useMessageState = (
  initialMessages: Message[] = [],
  options: UseMessageStateOptions = {}
) => {
  const {
    persistMessages = true,
    storageKey = STORAGE_KEY,
    maxStoredMessages = MAX_STORED_MESSAGES,
    chatbotId = "default",
  } = options;

  const fullStorageKey = chatbotId ? `${storageKey}-${chatbotId}` : storageKey;

  const [messages, setMessages] = useState<Message[]>(() => {
    if (!persistMessages) {
      return [DEFAULT_INITIAL_MESSAGE, ...initialMessages];
    }

    try {
      const stored = localStorage.getItem(fullStorageKey);
      if (stored) {
        const parsedMessages: Message[] = JSON.parse(stored).map(
          (msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })
        );

        if (parsedMessages.length > 0) {
          return parsedMessages;
        }
      }
    } catch (error) {
      console.warn("Failed to load messages from localStorage:", error);
    }

    return [DEFAULT_INITIAL_MESSAGE, ...initialMessages];
  });

  useEffect(() => {
    if (!persistMessages) return;

    try {
      const messagesToSave = messages.slice(-maxStoredMessages);
      localStorage.setItem(fullStorageKey, JSON.stringify(messagesToSave));
    } catch (error) {
      console.warn("Failed to save messages to localStorage:", error);
    }
  }, [messages, persistMessages, fullStorageKey, maxStoredMessages]);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const addUserMessage = useCallback(
    (content: string): Message => {
      const message: Message = {
        id: `user-${Date.now()}`,
        content: content.trim(),
        sender: "user",
        timestamp: new Date(),
      };
      addMessage(message);
      return message;
    },
    [addMessage]
  );

  const addBotMessage = useCallback(
    (content: string): Message => {
      const message: Message = {
        id: `bot-${Date.now()}`,
        content,
        sender: "bot",
        timestamp: new Date(),
      };
      addMessage(message);
      return message;
    },
    [addMessage]
  );

  const clearHistory = useCallback(() => {
    setMessages([DEFAULT_INITIAL_MESSAGE]);
    if (persistMessages) {
      try {
        localStorage.removeItem(fullStorageKey);
      } catch (error) {
        console.warn("Failed to clear messages from localStorage:", error);
      }
    }
  }, [persistMessages, fullStorageKey]);

  const exportHistory = useCallback(() => {
    return {
      messages: messages.filter((msg) => msg.id !== "1"),
      exportedAt: new Date().toISOString(),
      chatbotId,
    };
  }, [messages, chatbotId]);

  const importHistory = useCallback((importedData: any) => {
    try {
      const importedMessages = importedData.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setMessages([DEFAULT_INITIAL_MESSAGE, ...importedMessages]);
    } catch (error) {
      console.error("Failed to import history:", error);
    }
  }, []);

  return {
    messages,
    addMessage,
    addUserMessage,
    addBotMessage,
    clearHistory,
    exportHistory,
    importHistory,
    messageCount: messages.length,
    hasHistory: messages.length > 1,
  };
};
