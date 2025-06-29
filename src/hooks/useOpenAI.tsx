import { useState, useCallback, useEffect } from "react";
import {
  OpenAIService,
  type OpenAIConfig,
  type ChatMessage,
} from "../services/openai";
import { type Message } from "../types/common";

interface UseOpenAIProps {
  config?: OpenAIConfig;
  enabled?: boolean;
  onError?: (error: Error, userMessage: string) => void;
  apiKey?: string;
}

/**
 * Custom hook to interact with OpenAI's chat API.
 * It provides methods to send messages and manage the OpenAI service configuration.
 */
export const useOpenAI = ({
  config,
  enabled = false,
  onError,
  apiKey,
}: UseOpenAIProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Criar serviço com a chave correta
  const [service, setService] = useState<OpenAIService | null>(() => {
    if (config || apiKey) {
      // ✅ Priorizar apiKey direto sobre config.apiKey
      const finalConfig = {
        ...config,
        apiKey: apiKey || config?.apiKey,
      };
      console.log("[useOpenAI] Creating service with config:", {
        hasApiKey: !!finalConfig.apiKey,
        apiKey: finalConfig.apiKey
          ? finalConfig.apiKey.substring(0, 10) + "..."
          : "none",
      });
      return new OpenAIService(finalConfig);
    }
    return null;
  });

  // ✅ Recriar serviço quando apiKey mudar
  useEffect(() => {
    if (config || apiKey) {
      const finalConfig = {
        ...config,
        apiKey: apiKey || config?.apiKey,
      };
      console.log("[useOpenAI] Updating service with new config:", {
        hasApiKey: !!finalConfig.apiKey,
        apiKey: finalConfig.apiKey
          ? finalConfig.apiKey.substring(0, 10) + "..."
          : "none",
      });
      setService(new OpenAIService(finalConfig));
    }
  }, [config, apiKey]);

  const configure = useCallback(
    (newConfig: OpenAIConfig) => {
      const finalConfig = {
        ...newConfig,
        apiKey: apiKey || newConfig.apiKey,
      };
      console.log("[useOpenAI] Manual configure with:", {
        hasApiKey: !!finalConfig.apiKey,
      });
      setService(new OpenAIService(finalConfig));
    },
    [apiKey]
  );

  const convertMessages = useCallback((messages: Message[]): ChatMessage[] => {
    return messages
      .filter((msg) => msg.sender === "user" || msg.sender === "bot")
      .map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content,
      }));
  }, []);

  const sendMessage = useCallback(
    async (
      userMessage: string,
      chatHistory: Message[] = []
    ): Promise<string> => {
      if (!service || !enabled) {
        throw new Error("OpenAI service not configured or not enabled");
      }

      if (!service.isConfigured()) {
        throw new Error("OpenAI API key not provided");
      }

      setIsLoading(true);

      try {
        const messages = convertMessages(chatHistory);
        const response = await service.sendMessage(messages, userMessage);
        return response;
      } catch (error) {
        const apiError =
          error instanceof Error ? error : new Error("Unknown OpenAI error");
        if (onError) {
          onError(apiError, userMessage);
        }
        throw apiError;
      } finally {
        setIsLoading(false);
      }
    },
    [service, enabled, convertMessages, onError]
  );

  return {
    sendMessage,
    isLoading,
    isConfigured: service?.isConfigured() ?? false,
    configure,
  };
};
