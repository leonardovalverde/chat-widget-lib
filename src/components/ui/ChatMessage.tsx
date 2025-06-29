import React from "react";
import { useBranding } from "../../hooks/useBranding";
import { type Message } from "../../types/theme";
import { defaultTheme } from "../../styles/styled";
import { MessageBubble } from "../../styles/components/ChatMessages.styled";
import { BrandingConfig } from "../../types/branding";

interface ChatMessageProps {
  message: Message;
  messageClassName?: string;
  userMessageClassName?: string;
  messageStyle?: React.CSSProperties;
  userMessageStyle?: React.CSSProperties;
  branding?: BrandingConfig;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  messageClassName = "",
  userMessageClassName = "",
  messageStyle,
  userMessageStyle,
  branding,
}) => {
  const { colors, typography } = useBranding(branding);
  const isUser = message.sender === "user";

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
    <MessageBubble
      theme={theme}
      isUser={isUser}
      customBg={
        isUser
          ? (userMessageStyle?.background as string)
          : (messageStyle?.background as string)
      }
      customColor={
        isUser
          ? (userMessageStyle?.color as string)
          : (messageStyle?.color as string)
      }
      style={isUser ? userMessageStyle : messageStyle}
      className={isUser ? userMessageClassName : messageClassName}
    >
      {message.content}
    </MessageBubble>
  );
};
