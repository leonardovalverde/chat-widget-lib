import { useState, useEffect, useRef } from "react";
import { type Message } from "../types/common";

export const useUnreadCounter = (messages: Message[], isMinimized: boolean) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const lastReadMessageCountRef = useRef(messages.length);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      return;
    }

    if (isMinimized) {
      const botMessagesAfterLastRead = messages
        .slice(lastReadMessageCountRef.current)
        .filter((msg) => msg.sender === "bot").length;

      setUnreadCount(botMessagesAfterLastRead);
    } else {
      setUnreadCount(0);
      lastReadMessageCountRef.current = messages.length;
    }
  }, [messages, isMinimized]);

  const markAllAsRead = () => {
    setUnreadCount(0);
    lastReadMessageCountRef.current = messages.length;
  };

  return {
    unreadCount,
    markAllAsRead,
  };
};
