import { useMemo } from "react";
import { type BrandingConfig } from "../types/branding";

const DEFAULT_BRANDING: Required<BrandingConfig> = {
  botName: "Assistant",
  subtitle: "Online",
  logo: "🤖",
  colors: {
    primary: "#3b82f6",
    secondary: "#8b5cf6",
    containerBg: "#ffffff",
    headerBg: "#ffffff",
    messagesBg: "linear-gradient(to bottom, #f8fafc, #f1f5f9)",
    inputAreaBg: "#ffffff",
    headerText: "#374151",
    userMessageBg: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    userMessageText: "#ffffff",
    botMessageBg: "#ffffff",
    botMessageText: "#374151",
    inputBg: "#ffffff",
    inputText: "#374151",
    inputPlaceholder: "#9ca3af",
    borderColor: "#e2e8f0",
    textColor: "#374151",
    textSecondary: "#6b7280",
    contentBg: "#ffffff",
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    messageFontSize: "14px",
    messageFontWeight: 400,
    headerFontSize: "16px",
    headerFontWeight: 600,
    messageLineHeight: 1.5,
  },
};

export const useBranding = (customBranding?: BrandingConfig) => {
  return useMemo(() => {
    const renderLogo = (logo?: string | React.ReactNode) => {
      if (!logo) return DEFAULT_BRANDING.logo;

      if (typeof logo === "string") {
        return logo;
      }

      return logo;
    };

    const merged = {
      botName: customBranding?.botName || DEFAULT_BRANDING.botName,
      subtitle: customBranding?.subtitle || DEFAULT_BRANDING.subtitle,
      logo: renderLogo(customBranding?.logo),
      colors: {
        ...DEFAULT_BRANDING.colors,
        ...customBranding?.colors,

        messagesBg:
          customBranding?.colors?.messagesBg ||
          customBranding?.colors?.contentBg ||
          DEFAULT_BRANDING.colors.messagesBg,
        contentBg:
          customBranding?.colors?.contentBg ||
          customBranding?.colors?.messagesBg ||
          DEFAULT_BRANDING.colors.contentBg,
      },
      typography: {
        ...DEFAULT_BRANDING.typography,
        ...customBranding?.typography,
      },
    };

    return merged;
  }, [customBranding]);
};
