/**
 * Represents a chat message in the widget
 */
export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

/**
 * Common position types
 */
export type FloatingPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

/**
 * Common callback types
 */
export interface ChatCallbacks {
  onSendMessage?: (message: string) => void;
  onAIResponse?: (response: string, userMessage: string) => void;
  onAIError?: (error: Error, userMessage: string) => void;
  onToggleMinimize?: (isMinimized: boolean) => void;
}
