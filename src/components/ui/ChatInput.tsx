/* filepath: src/components/ui/ChatInput.tsx */
import React from "react";
import { useIcons } from "../../hooks/useIcons";
import { useBranding } from "../../hooks/useBranding";
import { type IconConfig, type BrandingConfig } from "../../types/branding";

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSend: () => void;
  placeholder: string;
  disabled: boolean;
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
  icons?: IconConfig;
  branding?: BrandingConfig;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onKeyDown,
  onSend,
  placeholder,
  disabled,
  inputClassName = "",
  inputStyle,
  icons,
  branding,
}) => {
  const { sendIcon } = useIcons(icons);
  const { colors, typography } = useBranding(branding);

  const buttonStyle = {
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
  };

  const inputAreaStyle = {
    backgroundColor: colors.inputAreaBg,
    borderTopColor: colors.borderColor,
    fontFamily: typography.fontFamily,
  };

  const inputFieldStyle = {
    backgroundColor: colors.inputBg,
    color: colors.inputText,
    borderColor: colors.borderColor,
    fontSize: typography.messageFontSize,
    fontFamily: typography.fontFamily,
    ...inputStyle,
  };

  // CORRIGIDO: CSS custom para placeholder
  const inputId = `chat-input-${Date.now()}`;

  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      #${inputId}::placeholder {
        color: ${colors.inputPlaceholder} !important;
        opacity: 1;
      }
      #${inputId}::-webkit-input-placeholder {
        color: ${colors.inputPlaceholder} !important;
      }
      #${inputId}::-moz-placeholder {
        color: ${colors.inputPlaceholder} !important;
      }
      #${inputId}:-ms-input-placeholder {
        color: ${colors.inputPlaceholder} !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [colors.inputPlaceholder, inputId]);

  return (
    <div className="chat-leos-input-area border-t" style={inputAreaStyle}>
      <div className="flex gap-2 p-4 w-full">
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`chat-leos-input flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50 ${inputClassName} ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{
            ...inputFieldStyle,
            ":focus": {
              borderColor: colors.primary,
              boxShadow: `0 0 0 3px ${colors.primary}20`,
            },
          }}
        />
        <button
          onClick={onSend}
          disabled={!value.trim() || disabled}
          className="chat-leos-send-button px-4 py-2 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 transition-all duration-200 hover:scale-105"
          style={buttonStyle}
          title="Send message"
          aria-label="Send message"
        >
          {sendIcon}
        </button>
      </div>
    </div>
  );
};
