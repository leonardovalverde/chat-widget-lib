import { type ReactNode } from "react";
import {
  type Message,
  type FloatingPosition,
  type ChatCallbacks,
} from "./common";
import { type StyleConfig, type ClassConfig } from "./styling";
import { type IconConfig, type BrandingConfig } from "./branding";
import { ServiceStatus } from "./theme";

/**
 * OpenAI configuration for AI-powered responses
 */
export interface OpenAIConfig {
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
  apiKey?: string;
}

/**
 * Core widget configuration
 */
export interface WidgetConfig {
  initialMessages?: Message[];
  placeholder?: string;
  disabled?: boolean;
  openai?: OpenAIConfig;
  enableMockResponses?: boolean;
  defaultMinimized?: boolean;
  floatingPosition?: FloatingPosition;
  serviceStatus?: ServiceStatus;
}

/**
 * Complete ChatWidget props
 */
export interface WidgetProps
  extends StyleConfig,
    ClassConfig,
    WidgetConfig,
    ChatCallbacks {
  children?: ReactNode;
  icons?: IconConfig;
  branding?: BrandingConfig;
  persistMessages?: boolean;
  chatbotId?: string;
  maxStoredMessages?: number;
  onHistoryCleared?: () => void;
  onHistoryExported?: (data: any) => void;
}
