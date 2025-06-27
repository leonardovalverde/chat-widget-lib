/* filepath: src/hooks/useBranding.tsx */
import React, { type ReactNode } from "react";
import { type BrandingConfig } from "../types/branding";

const DEFAULT_BRANDING = {
  botName: "AI Assistant",
  subtitle: "How can I help you?",
  logo: null,
  colors: {
    primary: "#8b5cf6",
    secondary: "#a855f7",

    // Container backgrounds
    containerBg: "#ffffff",
    headerBg: "#ffffff",
    messagesBg: "linear-gradient(to bottom, #f8fafc, #f1f5f9)",
    inputAreaBg: "#ffffff",

    // Text colors
    headerText: "#374151",
    userMessageBg: "linear-gradient(135deg, #8b5cf6, #a855f7)",
    userMessageText: "#ffffff",
    botMessageBg: "#ffffff",
    botMessageText: "#374151",
    inputBg: "#ffffff",
    inputText: "#374151",
    inputPlaceholder: "#9ca3af",
    borderColor: "#e2e8f0",
    textColor: "#374151",
    textSecondary: "#6b7280",

    // Retrocompatibilidade
    contentBg: "linear-gradient(to bottom, #f8fafc, #f1f5f9)",
  },
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    messageFontSize: "0.875rem",
    messageFontWeight: "400",
    headerFontSize: "1.125rem",
    headerFontWeight: "600",
    messageLineHeight: "1.5",
  },
} as const;

/**
 * Hook to manage branding configuration with fallbacks
 */
export const useBranding = (customBranding?: BrandingConfig) => {
  const renderLogo = (logo?: string | ReactNode): ReactNode => {
    if (!logo) return null;

    // If it's a string, treat it as image URL
    if (typeof logo === "string") {
      return (
        <img src={logo} alt="Logo" className="w-8 h-8 object-contain rounded" />
      );
    }
    // If it's a React component, render it
    return logo;
  };

  const merged = {
    botName: customBranding?.botName || DEFAULT_BRANDING.botName,
    subtitle: customBranding?.subtitle || DEFAULT_BRANDING.subtitle,
    logo: renderLogo(customBranding?.logo),
    colors: {
      ...DEFAULT_BRANDING.colors,
      ...customBranding?.colors,
      // CORRIGIDO: Fallback para contentBg -> messagesBg para retrocompatibilidade
      messagesBg:
        customBranding?.colors?.messagesBg ||
        customBranding?.colors?.contentBg ||
        DEFAULT_BRANDING.colors.messagesBg,
      // CORRIGIDO: Garantir que contentBg também seja aplicado
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
};
