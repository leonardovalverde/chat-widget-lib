import React from "react";
import { useIcons } from "../../hooks/useIcons";
import { useBranding } from "../../hooks/useBranding";
import { type IconConfig, type BrandingConfig } from "../../types/branding";
import { defaultTheme } from "../../styles/styled";
import {
  InputArea,
  InputContainer,
  Input,
  SendButton,
} from "../../styles/components/ChatInput.styled";

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
    <InputArea theme={theme}>
      <InputContainer>
        <Input
          theme={theme}
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClassName}
          style={inputStyle}
        />
        <SendButton
          theme={theme}
          onClick={onSend}
          disabled={!value.trim() || disabled}
          gradient={`linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`}
          title="Send message"
          aria-label="Send message"
        >
          {sendIcon}
        </SendButton>
      </InputContainer>
    </InputArea>
  );
};
