// Goober
export { styled, css, keyframes, defaultTheme } from "./styles/styled";
export type { Theme } from "./styles/styled";

// Main component
export { ChatWidget } from "./components/ChatWidget";

// UI Components
export { ChatHeader } from "./components/ui/ChatHeader";
export { ChatMessages } from "./components/composite/ChatMessages";
export { ChatMessage } from "./components/ui/ChatMessage";
export { ChatInput } from "./components/ui/ChatInput";
export { TypingIndicatorComponent } from "./components/ui/TypingIndicator";
export { FloatingButton } from "./components/ui/FloatingButton";
export { MaintenanceBanner } from "./components/ui/MaintenanceBanner";

// Icons
export {
  SendIcon,
  MinimizeIcon,
  MaximizeIcon,
  CloseIcon,
  ChatIcon,
  BotIcon,
  LeoAIIcon,
} from "./components/icons/DefaultIcons";

// Hooks
export { useIcons } from "./hooks/useIcons";
export { useBranding } from "./hooks/useBranding";
export { useServiceStatus } from "./hooks/useServiceStatus";
export { useOpenAI } from "./hooks/useOpenAI";
export { useMessageState } from "./hooks/useMessageState";
export { useUnreadCounter } from "./hooks/useUnreadCounter";
export { useMinimizeState } from "./hooks/useMinimizeState";
export { useChatLogic } from "./hooks/useChatLogic";

// Services
export { OpenAIService } from "./services/openai";

// Types
export type { Message, FloatingPosition, ChatCallbacks } from "./types/common";
export type { StyleConfig, ClassConfig } from "./types/styling";
export type {
  OpenAIConfig,
  WidgetConfig,
  WidgetProps,
} from "./types/components";
export type {
  IconConfig,
  TypographyConfig,
  BrandingConfig,
} from "./types/branding";
export type { ServiceStatus } from "./types/theme";

// Utils
export {
  generateMockResponse,
  simulateThinkingDelay,
} from "./utils/mockResponses";

// Global configuration
export type { GlobalChatConfig } from "./global/globalConfig";
