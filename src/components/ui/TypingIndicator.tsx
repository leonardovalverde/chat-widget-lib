/* filepath: src/components/ui/TypingIndicator.tsx */
import React from "react";
import { useBranding } from "../../hooks/useBranding";
import { type BrandingConfig } from "../../types/branding";

interface TypingIndicatorProps {
  messageClassName?: string;
  branding?: BrandingConfig;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  messageClassName = "",
  branding,
}) => {
  const { colors, typography } = useBranding(branding);

  const typingStyle = {
    backgroundColor: colors.botMessageBg,
    color: colors.botMessageText,
    fontSize: typography.messageFontSize,
    fontFamily: typography.fontFamily,
    borderRadius: "1.25rem 1.25rem 1.25rem 0.375rem",
    alignSelf: "flex-start",
    maxWidth: "80%",
  };

  return (
    <div
      className={`chat-leos-message px-4 py-3 mb-4 text-sm self-start ${messageClassName} opacity-70`}
      style={typingStyle}
    >
      <div className="flex items-center gap-1">
        <div className="flex gap-1">
          <div
            className="chat-leos-typing-dot w-2 h-2 rounded-full"
            style={{ backgroundColor: colors.textSecondary }}
          ></div>
          <div
            className="chat-leos-typing-dot w-2 h-2 rounded-full"
            style={{ backgroundColor: colors.textSecondary }}
          ></div>
          <div
            className="chat-leos-typing-dot w-2 h-2 rounded-full"
            style={{ backgroundColor: colors.textSecondary }}
          ></div>
        </div>
      </div>
    </div>
  );
};
