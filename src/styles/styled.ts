import "./goober-setup";
import { styled, css, keyframes, glob } from "goober";

export { css, keyframes, glob, styled };

// Theme Interface and Default Theme
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    containerBg: string;
    headerBg: string;
    messagesBg?: string;
    inputAreaBg: string;
    headerText: string;
    userMessageBg: string;
    userMessageText: string;
    botMessageBg: string;
    botMessageText: string;
    inputBg: string;
    inputText: string;
    inputPlaceholder: string;
    borderColor: string;
    textColor: string;
    textSecondary: string;
  };
  typography: {
    fontFamily: string;
    messageFontSize: string;
    messageFontWeight: string | number;
    headerFontSize: string;
    headerFontWeight: string | number;
    messageLineHeight: string | number;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    floating: string;
  };
  zIndex: {
    floating: number;
    badge: number;
  };
}

export const defaultTheme: Theme = {
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
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
  },
  borderRadius: {
    sm: "6px",
    md: "8px",
    lg: "12px",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
    floating: "0 25px 50px rgba(139, 92, 246, 0.25)",
  },
  zIndex: {
    floating: 999999,
    badge: 1000000,
  },
};

// Global Animations

export const animations = {
  fadeInUp: keyframes`
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `,
  pulse: keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  `,
  bounce: keyframes`
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  `,
  slideInRight: keyframes`
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  `,
};
