/* filepath: src/components/composite/ChatMessages.tsx */
import React, { useRef, useEffect } from "react";
import { ChatMessage } from "../ui/ChatMessage";
import { TypingIndicator } from "../ui/TypingIndicator";
import { useBranding } from "../../hooks/useBranding";
import { type Message, type BrandingConfig } from "../../types/theme";

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  messageClassName?: string;
  userMessageClassName?: string;
  messageStyle?: React.CSSProperties;
  userMessageStyle?: React.CSSProperties;
  children?: React.ReactNode;
  branding?: BrandingConfig;
}

/**
 * Messages container component
 * Handles the scrollable list of messages and typing indicator
 */
export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isTyping,
  messageClassName,
  userMessageClassName,
  messageStyle,
  userMessageStyle,
  children,
  branding,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { colors, typography } = useBranding(branding);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, isTyping]);

  // CORRIGIDO: Usar messagesBg em vez de contentBg
  const messagesStyle = {
    background: colors.messagesBg,
    fontFamily: typography.fontFamily,
  };

  return (
    <div
      className="chat-leos-messages flex-1 overflow-y-auto p-6 space-y-4"
      style={messagesStyle}
    >
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          messageClassName={messageClassName}
          userMessageClassName={userMessageClassName}
          messageStyle={messageStyle}
          userMessageStyle={userMessageStyle}
          branding={branding}
        />
      ))}

      {/* Typing indicator */}
      {isTyping && (
        <TypingIndicator
          messageClassName={messageClassName}
          branding={branding}
        />
      )}

      {children}
      <div ref={messagesEndRef} />
    </div>
  );
};
