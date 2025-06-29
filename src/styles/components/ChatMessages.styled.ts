import { styled, animations } from "../styled";
import type { Theme } from "../styled";

export const MessagesContainer = styled("div")<{ theme: Theme }>`
  flex: 1 1 0%;
  overflow-y: auto;
  padding: ${(props) => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
  background: ${(props) => props.theme.colors.messagesBg};
  min-height: 0;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #94a3b8;
  }
`;

export const MessageBubble = styled("div")<{
  theme: Theme;
  isUser?: boolean;
  customBg?: string;
  customColor?: string;
}>`
  background: ${(props) =>
    props.isUser
      ? props.customBg ?? props.theme.colors.userMessageBg
      : props.customBg ?? props.theme.colors.botMessageBg};
  color: ${(props) =>
    props.isUser
      ? props.customColor ?? props.theme.colors.userMessageText
      : props.customColor ?? props.theme.colors.botMessageText};
  padding: 12px 16px;
  border-radius: ${(props) =>
    props.isUser ? "20px 20px 6px 20px" : "20px 20px 20px 6px"};
  box-shadow: ${(props) =>
    props.isUser
      ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      : props.theme.shadows.sm};
  max-width: 80%;
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  word-wrap: break-word;
  line-height: ${(props) => props.theme.typography.messageLineHeight};
  margin-bottom: 16px;
  flex-shrink: 0;
  animation: ${animations.fadeInUp} 0.3s ease-out;
  font-size: ${(props) => props.theme.typography.messageFontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
`;

export const TypingIndicator = styled("div")<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${(props) => props.theme.colors.botMessageBg};
  color: ${(props) => props.theme.colors.botMessageText};
  border-radius: 20px 20px 20px 6px;
  box-shadow: ${(props) => props.theme.shadows.sm};
  max-width: 80%;
  align-self: flex-start;
  margin-bottom: 16px;
  flex-shrink: 0;
  animation: ${animations.fadeInUp} 0.3s ease-out;
`;

export const TypingDots = styled("div")`
  display: flex;
  gap: 4px;
`;

export const TypingDot = styled("div")<{ theme: Theme; delay?: number }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.textSecondary};
  animation: ${animations.bounce} 1.4s infinite ease-in-out both;
  animation-delay: ${(props) => props.delay ?? 0}s;
`;
