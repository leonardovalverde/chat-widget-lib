import { useState } from "react";
import { type Message, type ChatCallbacks } from "../types/common";
import { type OpenAIConfig } from "../types/components";
import {
  generateMockResponse,
  simulateThinkingDelay,
} from "../utils/mockResponses";

interface UseChatLogicProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  addUserMessage: (content: string) => Message;
  addBotMessage: (content: string) => Message;
  sendOpenAIMessage: (message: string, history: Message[]) => Promise<string>;
  isOpenAIConfigured: boolean;
  openai?: OpenAIConfig;
  enableMockResponses: boolean;
  onSendMessage?: ChatCallbacks["onSendMessage"];
  onAIResponse?: ChatCallbacks["onAIResponse"];
  onAIError?: ChatCallbacks["onAIError"];
}

export const useChatLogic = ({
  inputValue,
  setInputValue,
  addUserMessage,
  addBotMessage,
  sendOpenAIMessage,
  isOpenAIConfigured,
  openai,
  enableMockResponses,
  onSendMessage,
  onAIResponse,
  onAIError,
}: UseChatLogicProps) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const messageContent = inputValue.trim();

    // Add user message first
    addUserMessage(messageContent);
    setInputValue("");

    onSendMessage?.(messageContent);
    setIsTyping(true);

    try {
      let botResponse: string;

      // Try OpenAI first if configured
      if (openai && isOpenAIConfigured) {
        try {
          botResponse = await sendOpenAIMessage(messageContent, []);
          onAIResponse?.(botResponse, messageContent);
        } catch (openAIError) {
          console.warn(
            "OpenAI request failed, falling back to mock response:",
            openAIError
          );

          onAIError?.(
            openAIError instanceof Error
              ? openAIError
              : new Error("OpenAI request failed"),
            messageContent
          );

          // Fallback to mock response if enabled
          if (enableMockResponses) {
            botResponse = generateMockResponse(messageContent);
          } else {
            botResponse =
              "I'm sorry, I'm having trouble connecting to my AI service right now. Please try again later.";
          }
        }
      } else {
        // Use mock responses as fallback
        if (enableMockResponses) {
          await simulateThinkingDelay();
          botResponse = generateMockResponse(messageContent);
        } else {
          botResponse =
            "AI responses are not configured. Please provide an OpenAI API key.";
        }
      }

      addBotMessage(botResponse);
    } catch (error) {
      console.error("Error generating response:", error);
      addBotMessage("I'm sorry, I encountered an error. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  return {
    isTyping,
    handleSendMessage,
  };
};
