import { type WidgetProps } from "../types/components";

export interface GlobalChatConfig extends Omit<WidgetProps, "children"> {
  chatbotId?: string;
  containerId?: string;
  autoInit?: boolean;
  // ADICIONADO: Suporte para API key
  apiKey?: string;
}

export const DEFAULT_GLOBAL_CONFIG: GlobalChatConfig = {
  chatbotId: "default",
  containerId: "chat-widget-container",
  autoInit: true,
  floatingPosition: "bottom-right",
  defaultMinimized: true,
  placeholder: "How can we help you?",
  enableMockResponses: true,
  branding: {
    botName: "AI Assistant",
    subtitle: "How can I help you?",
    colors: {
      primary: "#3b82f6",
      secondary: "#8b5cf6",
    },
  },
};
