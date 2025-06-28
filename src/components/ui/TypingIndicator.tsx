import React from "react";
import { useBranding } from "../../hooks/useBranding";
import { type BrandingConfig } from "../../types/branding";
import { defaultTheme } from "../../styles/styled";
import {
  TypingIndicator as StyledTypingIndicator,
  TypingDots,
  TypingDot,
} from "../../styles/components/ChatMessages.styled";

interface TypingIndicatorProps {
  messageClassName?: string;
  branding?: BrandingConfig;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  messageClassName = "",
  branding,
}) => {
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
    <StyledTypingIndicator theme={theme} className={messageClassName}>
      <span>AI is typing</span>
      <TypingDots>
        <TypingDot delay={-0.32} />
        <TypingDot delay={-0.16} />
        <TypingDot delay={0} />
      </TypingDots>
    </StyledTypingIndicator>
  );
};
