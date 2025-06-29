import React from "react";
import ReactDOM from "react-dom/client";
import { ChatWidget } from "../components/ChatWidget";
import { type GlobalChatConfig, DEFAULT_GLOBAL_CONFIG } from "./globalConfig";

declare global {
  interface Window {
    ChatWidgetConfig?: GlobalChatConfig;
    ChatWidget?: {
      init: (config?: GlobalChatConfig) => void;
      destroy: () => void;
      show: () => void;
      hide: () => void;
      update: (config: Partial<GlobalChatConfig>) => void;
      isVisible: () => boolean;
      createInline: (config: InlineWidgetConfig) => void;
    };
  }
}

interface InlineWidgetConfig {
  containerId: string;
  branding?: GlobalChatConfig["branding"];
  openai?: GlobalChatConfig["openai"];
  placeholder?: string;
  apiKey?: string;
  onSendMessage?: (message: string) => void;
  onAIResponse?: (response: string, userMessage: string) => void;
  onAIError?: (error: Error, userMessage: string) => void;
}

class GlobalChatWidget {
  private root: ReactDOM.Root | null = null;
  private container: HTMLElement | null = null;
  private config: GlobalChatConfig = DEFAULT_GLOBAL_CONFIG;
  private isVisible: boolean = true;
  private isInitialized: boolean = false;
  private readonly inlineWidgets: Map<string, ReactDOM.Root> = new Map();

  init(config?: GlobalChatConfig) {
    console.log("[ChatWidget] Initializing...");

    this.config = {
      ...DEFAULT_GLOBAL_CONFIG,
      ...window.ChatWidgetConfig,
      ...config,
    };

    console.log("[ChatWidget] Final config:", this.config);

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.render());
    } else {
      this.render();
    }
  }

  private render() {
    try {
      console.log("[ChatWidget] Starting render...");

      if (this.root) {
        this.destroy();
      }

      this.container = this.createContainer();

      const openaiConfig =
        this.config.apiKey || this.config.openai
          ? {
              systemPrompt:
                this.config.openai?.systemPrompt ??
                "You are a helpful AI assistant.",
              maxTokens: this.config.openai?.maxTokens ?? 500,
              temperature: this.config.openai?.temperature ?? 0.7,
              ...this.config.openai,
              apiKey: this.config.apiKey || this.config.openai?.apiKey,
            }
          : undefined;

      const ChatWidgetComponent = React.createElement(ChatWidget, {
        ...this.config,
        openai: openaiConfig,
        onSendMessage: (message: string) => {
          console.log(
            `[ChatWidget ${this.config.chatbotId}] Message sent:`,
            message
          );
          this.config.onSendMessage?.(message);
        },
        onAIResponse: (response: string, userMessage: string) => {
          console.log(
            `[ChatWidget ${this.config.chatbotId}] AI responded:`,
            response
          );
          this.config.onAIResponse?.(response, userMessage);
        },
        onAIError: (error: Error, userMessage: string) => {
          console.error(
            `[ChatWidget ${this.config.chatbotId}] AI Error:`,
            error
          );
          this.config.onAIError?.(error, userMessage);
        },
        onToggleMinimize: (isMinimized: boolean) => {
          console.log(
            `[ChatWidget ${this.config.chatbotId}] Minimized:`,
            isMinimized
          );
          this.config.onToggleMinimize?.(isMinimized);
        },
      });

      this.root = ReactDOM.createRoot(this.container);
      this.root.render(ChatWidgetComponent);
      this.isInitialized = true;

      console.log(
        `[ChatWidget] Successfully initialized with ID: ${this.config.chatbotId}`
      );
    } catch (error) {
      console.error("[ChatWidget] Error during initialization:", error);
    }
  }

  createInline(config: InlineWidgetConfig) {
    console.log("[ChatWidget] Creating inline widget with config:", config);

    const container = document.getElementById(config.containerId);
    if (!container) {
      console.error(
        `[ChatWidget] Container with id "${config.containerId}" not found`
      );
      return;
    }

    if (this.inlineWidgets.has(config.containerId)) {
      const existingRoot = this.inlineWidgets.get(config.containerId);
      existingRoot?.unmount();
      this.inlineWidgets.delete(config.containerId);
    }

    container.innerHTML = "";

    const root = ReactDOM.createRoot(container);
    this.inlineWidgets.set(config.containerId, root);

    const openaiConfig =
      config.apiKey || this.config.apiKey || config.openai || this.config.openai
        ? {
            systemPrompt:
              config.openai?.systemPrompt ||
              this.config.openai?.systemPrompt ||
              "You are a helpful inline chat assistant.",
            maxTokens:
              config.openai?.maxTokens || this.config.openai?.maxTokens || 500,
            temperature:
              config.openai?.temperature ||
              this.config.openai?.temperature ||
              0.7,
            ...config.openai,
          }
        : undefined;

    const widgetElement = React.createElement(ChatWidget, {
      openai: openaiConfig,
      branding: {
        botName: config.branding?.botName || "Chat Assistant",
        subtitle: config.branding?.subtitle || "inline mode",
        colors: {
          primary: "#f59e0b",
          secondary: "#f97316",
          headerBg: "linear-gradient(135deg, #fef3c7, #fed7aa)",
          userMessageBg: "linear-gradient(135deg, #f59e0b, #f97316)",
          botMessageBg: "linear-gradient(135deg, #ddd6fe, #c7d2fe)",
          ...config.branding?.colors,
        },
        ...config.branding,
      },
      placeholder: config.placeholder || "Type your message...",
      onSendMessage: (message: string) => {
        console.log(
          `[ChatWidget Inline ${config.containerId}] Message sent:`,
          message
        );
        config.onSendMessage?.(message);
        this.config.onSendMessage?.(message);
      },
      onAIResponse: (response: string, userMessage: string) => {
        console.log(
          `[ChatWidget Inline ${config.containerId}] AI responded:`,
          response
        );
        config.onAIResponse?.(response, userMessage);
        this.config.onAIResponse?.(response, userMessage);
      },
      onAIError: (error: Error, userMessage: string) => {
        console.error(
          `[ChatWidget Inline ${config.containerId}] AI error:`,
          error
        );
        config.onAIError?.(error, userMessage);
        this.config.onAIError?.(error, userMessage);
      },
    });

    root.render(widgetElement);

    console.log(
      `[ChatWidget] Inline widget rendered successfully in container: ${config.containerId}`
    );
  }

  private createContainer(): HTMLElement {
    let container = document.getElementById(
      this.config.containerId || "chat-widget-container"
    );

    if (!container) {
      container = document.createElement("div");
      container.id = this.config.containerId || "chat-widget-container";
      document.body.appendChild(container);
    }

    return container;
  }

  update(newConfig: Partial<GlobalChatConfig>) {
    console.log("[ChatWidget] Updating config:", newConfig);
    this.config = { ...this.config, ...newConfig };
    if (this.isInitialized) {
      this.render();
    }
  }

  destroy() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
      this.container = null;
    }

    this.inlineWidgets.forEach((root) => {
      root.unmount();
    });
    this.inlineWidgets.clear();

    this.isInitialized = false;
    console.log(`[ChatWidget] Destroyed`);
  }

  show() {
    if (this.container) {
      this.container.style.display = "block";
      this.isVisible = true;
    }
  }

  hide() {
    if (this.container) {
      this.container.style.display = "none";
      this.isVisible = false;
    }
  }

  isVisibleMethod(): boolean {
    return this.isVisible && this.isInitialized;
  }
}

const globalChatWidget = new GlobalChatWidget();

window.ChatWidget = {
  init: (config?: GlobalChatConfig) => globalChatWidget.init(config),
  destroy: () => globalChatWidget.destroy(),
  show: () => globalChatWidget.show(),
  hide: () => globalChatWidget.hide(),
  update: (config: Partial<GlobalChatConfig>) =>
    globalChatWidget.update(config),
  isVisible: () => globalChatWidget.isVisibleMethod(),
  createInline: (config: InlineWidgetConfig) =>
    globalChatWidget.createInline(config),
};

if (window.ChatWidgetConfig?.autoInit !== false) {
  globalChatWidget.init();
}

export { GlobalChatWidget, type GlobalChatConfig };
