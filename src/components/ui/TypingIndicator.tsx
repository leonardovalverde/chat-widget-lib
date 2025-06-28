import React from "react";
import { useBranding } from "../../hooks/useBranding";
import { type BrandingConfig } from "../../types/branding";
import { defaultTheme } from "../../styles/styled";
import {
  TypingIndicator,
  TypingDots,
  TypingDot,
} from "../../styles/components/ChatMessages.styled";

interface TypingIndicatorProps {
  branding?: BrandingConfig;
}

export const TypingIndicatorComponent: React.FC<TypingIndicatorProps> = ({
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
    <TypingIndicator theme={theme}>
      <span>typing</span>
      <TypingDots>
        <TypingDot theme={theme} delay={0} />
        <TypingDot theme={theme} delay={0.16} />
        <TypingDot theme={theme} delay={0.32} />
      </TypingDots>
    </TypingIndicator>
  );
};
