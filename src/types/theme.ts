import { type CSSProperties, type ReactNode } from "react";
import type { BrandingConfig } from "./branding";

/**
 * Represents a chat message in the widget
 */
export interface Message {
  /** Unique identifier for the message */
  id: string;
  /** The text content of the message */
  content: string;
  /** Who sent the message - either user or bot */
  sender: "user" | "bot";
  /** When the message was sent */
  timestamp: Date;
}

/**
 * Icon configuration for the chat widget
 */
export interface IconConfig {
  /** Custom bot avatar/icon - can be emoji, image URL, or React component */
  botIcon?: string | ReactNode;
  /** Custom send button icon - React component or string */
  sendIcon?: ReactNode;
  /** Custom minimize button icon - React component or string */
  minimizeIcon?: ReactNode;
  /** Custom maximize button icon - React component or string */
  maximizeIcon?: ReactNode;
  /** Custom close button icon - React component or string */
  closeIcon?: ReactNode;
  /** Custom floating button icon - React component or string */
  floatingIcon?: ReactNode;
}

/**
 * Service status configuration
 */
export interface ServiceStatus {
  /** Whether the service is online */
  isOnline?: boolean;
  /** Whether the service is in maintenance mode */
  isMaintenanceMode?: boolean;
  /** Custom maintenance message */
  maintenanceMessage?: string;
  /** Show detailed status in subtitle */
  showDetailedStatus?: boolean;
}

/**
 * OpenAI configuration for AI-powered responses
 */
export interface OpenAIConfig {
  /** Maximum tokens for response (default: 500) */
  maxTokens?: number;
  /** Temperature for response creativity (default: 0.7) */
  temperature?: number;
  /** System prompt to guide AI behavior */
  systemPrompt?: string;
  /** OpenAI API key */
  apiKey?: string;
}

/**
 * Configuration props for the ChatWidget component
 */
export interface WidgetProps {
  // === Inline Styles ===
  /** Custom inline styles for the main container */
  containerStyle?: CSSProperties;
  /** Custom inline styles for the header area */
  headerStyle?: CSSProperties;
  /** Custom inline styles for the content/messages area */
  contentStyle?: CSSProperties;
  /** Custom inline styles for bot messages */
  messageStyle?: CSSProperties;
  /** Custom inline styles for user messages */
  userMessageStyle?: CSSProperties;
  /** Custom inline styles for the input field */
  inputStyle?: CSSProperties;

  // === CSS Classes ===
  /** Additional CSS classes for the main container */
  containerClassName?: string;
  /** Additional CSS classes for the header area */
  headerClassName?: string;
  /** Additional CSS classes for the content/messages area */
  contentClassName?: string;
  /** Additional CSS classes for bot messages */
  messageClassName?: string;
  /** Additional CSS classes for user messages */
  userMessageClassName?: string;
  /** Additional CSS classes for the input field */
  inputClassName?: string;

  // === Content & Behavior ===
  /** Custom content to render inside the chat */
  children?: ReactNode;

  /**
   * Callback fired when user sends a message
   */
  onSendMessage?: (message: string) => void;

  /**
   * Callback fired when AI responds to a message
   */
  onAIResponse?: (response: string, userMessage: string) => void;

  /**
   * Callback fired when there's an error with AI response
   */
  onAIError?: (error: Error, userMessage: string) => void;

  /**
   * Callback fired when chat is minimized or maximized
   */
  onToggleMinimize?: (isMinimized: boolean) => void;

  /**
   * Initial messages to display in the chat
   */
  initialMessages?: Message[];

  /**
   * Placeholder text for the input field
   */
  placeholder?: string;

  /**
   * Whether the chat input is disabled
   */
  disabled?: boolean;

  // === AI Integration ===
  /**
   * OpenAI configuration for AI-powered responses
   */
  openai?: OpenAIConfig;

  /**
   * Whether to enable mock AI responses when OpenAI is not configured
   */
  enableMockResponses?: boolean;

  // === Service Status ===
  /**
   * Service status configuration for online/offline and maintenance mode
   */
  serviceStatus?: ServiceStatus;

  /**
   * Whether the chat starts minimized
   */
  defaultMinimized?: boolean;

  /**
   * Position of the floating chat widget
   */
  floatingPosition?: "bottom-right" | "bottom-left" | "top-right" | "top-left";

  // === Customization ===
  /**
   * Custom icons configuration
   */
  icons?: IconConfig;

  /**
   * Branding and theming configuration
   */
  branding?: BrandingConfig;
}
