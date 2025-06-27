/* filepath: src/components/ui/ChatMessage.tsx */
import React from "react";
import { useBranding } from "../../hooks/useBranding";
import { type BrandingConfig, type Message } from "../../types/theme";

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

  const baseMessageClasses = "px-4 py-3 mb-4 flex-shrink-0 rounded-lg";

  const botStyle = {
    backgroundColor: colors.botMessageBg,
    color: colors.botMessageText,
    fontSize: typography.messageFontSize,
    fontWeight: typography.messageFontWeight,
    lineHeight: typography.messageLineHeight,
    fontFamily: typography.fontFamily,
    alignSelf: "flex-start",
    maxWidth: "80%",
    borderRadius: "1.25rem 1.25rem 1.25rem 0.375rem",
    ...messageStyle,
  };

  const userStyle = {
    background: colors.userMessageBg,
    color: colors.userMessageText,
    fontSize: typography.messageFontSize,
    fontWeight: typography.messageFontWeight,
    lineHeight: typography.messageLineHeight,
    fontFamily: typography.fontFamily,
    alignSelf: "flex-end",
    maxWidth: "80%",
    borderRadius: "1.25rem 1.25rem 0.375rem 1.25rem",
    ...userMessageStyle,
  };

  const botClasses = `chat-leos-message ${baseMessageClasses} ${messageClassName}`;
  const userClasses = `chat-leos-user-message ${baseMessageClasses} ${userMessageClassName}`;

  return (
    <div
      className={isUser ? userClasses : botClasses}
      style={isUser ? userStyle : botStyle}
    >
      {message.content}
    </div>
  );
};
