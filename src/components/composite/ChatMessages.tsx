import React, { useEffect, useRef } from "react";
import { ChatMessage } from "../ui/ChatMessage";
import { TypingIndicatorComponent } from "../ui/TypingIndicator";
import { useBranding } from "../../hooks/useBranding";
import { type Message } from "../../types/common";
import { type BrandingConfig } from "../../types/branding";
import { defaultTheme } from "../../styles/styled";
import { MessagesContainer } from "../../styles/components/ChatMessages.styled";

interface ChatMessagesProps {
  messages: Message[];
  isTyping?: boolean;
  messageClassName?: string;
  userMessageClassName?: string;
  messageStyle?: React.CSSProperties;
  userMessageStyle?: React.CSSProperties;
  branding?: BrandingConfig;
  children?: React.ReactNode;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isTyping = false,
  messageClassName = "",
  userMessageClassName = "",
  messageStyle,
  userMessageStyle,
  branding,
  children,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { colors, typography } = useBranding(branding);

  // Create theme with merged branding
  const theme = {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      ...colors,
    },
    typography: {
      ...defaultTheme.typography,
      ...typography,
    },
  };

  return (
    <MessagesContainer theme={theme}>
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
        <TypingIndicatorComponent
          messageClassName={messageClassName}
          branding={branding}
        />
      )}

      {children}
      <div ref={messagesEndRef} />
    </MessagesContainer>
  );
};
