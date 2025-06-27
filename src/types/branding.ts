/* filepath: src/types/branding.ts */
import { type ReactNode } from "react";

/**
 * Icon configuration for the chat widget
 */
export interface IconConfig {
  botIcon?: string | ReactNode;
  sendIcon?: ReactNode;
  minimizeIcon?: ReactNode;
  maximizeIcon?: ReactNode;
  closeIcon?: ReactNode;
  floatingIcon?: ReactNode;
}

/**
 * Typography configuration
 */
export interface TypographyConfig {
  /** Font family for the entire widget */
  fontFamily?: string;
  /** Font size for messages */
  messageFontSize?: string;
  /** Font weight for messages */
  messageFontWeight?: string | number;
  /** Font size for headers */
  headerFontSize?: string;
  /** Font weight for headers */
  headerFontWeight?: string | number;
  /** Line height for messages */
  messageLineHeight?: string | number;
}

/**
 * Enhanced branding configuration for the chat widget
 */
export interface BrandingConfig {
  /** Company/Bot name displayed in header */
  botName?: string;
  /** Subtitle text shown below bot name */
  subtitle?: string;
  /** Company logo - can be image URL or React component */
  logo?: string | ReactNode;
  /** Brand colors - fully customizable */
  colors?: {
    /** Primary brand color for gradients and accents */
    primary?: string;
    /** Secondary brand color */
    secondary?: string;

    /** CONTAINER BACKGROUNDS */
    /** Main widget container background */
    containerBg?: string;
    /** Header background color */
    headerBg?: string;
    /** Messages area background */
    messagesBg?: string;
    /** Input area background */
    inputAreaBg?: string;

    /** TEXT COLORS */
    /** Header text color */
    headerText?: string;
    /** User message background color */
    userMessageBg?: string;
    /** User message text color */
    userMessageText?: string;
    /** Bot message background color */
    botMessageBg?: string;
    /** Bot message text color */
    botMessageText?: string;
    /** Input background */
    inputBg?: string;
    /** Input text color */
    inputText?: string;
    /** Input placeholder color */
    inputPlaceholder?: string;
    /** Border colors */
    borderColor?: string;
    /** Text colors */
    textColor?: string;
    /** Secondary text color */
    textSecondary?: string;

    /** DEPRECATED - mantido para compatibilidade */
    /** @deprecated Use messagesBg instead */
    contentBg?: string;
  };
  /** Typography settings */
  typography?: TypographyConfig;
}
