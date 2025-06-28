import React, { useState } from "react";
import { withShadowDom } from "../utils/withShadowDom";
import { createRoot } from "react-dom/client";
import { ChatHeader } from "./ui/ChatHeader";
import { ChatMessages } from "./composite/ChatMessages";
import { ChatInput } from "./ui/ChatInput";
import { FloatingButton } from "./ui/FloatingButton";
import { MaintenanceBanner } from "./ui/MaintenanceBanner";
import { useBranding } from "../hooks/useBranding";
import { useServiceStatus } from "../hooks/useServiceStatus";
import { useOpenAI } from "../hooks/useOpenAI";
import { useMessageState } from "../hooks/useMessageState";
import { useUnreadCounter } from "../hooks/useUnreadCounter";
import { useMinimizeState } from "../hooks/useMinimizeState";
import { useChatLogic } from "../hooks/useChatLogic";
import { type WidgetProps } from "../types/components";
import { defaultTheme } from "../styles/styled";
import {
  WidgetContainer,
  ContentArea,
} from "../styles/components/ChatWidget.styled";

const ChatWidgetComponent: React.FC<WidgetProps> = ({
  // Style props
  containerStyle,
  headerStyle,
  contentStyle,
  messageStyle,
  userMessageStyle,
  inputStyle,

  // Class props
  containerClassName = "",
  headerClassName = "",
  contentClassName = "",
  messageClassName = "",
  userMessageClassName = "",
  inputClassName = "",

  // Content props
  children,
  initialMessages = [],
  placeholder = "Type your message here...",
  disabled = false,

  // AI props
  openai,
  enableMockResponses = true,

  // Service status
  serviceStatus,

  // Floating props
  isFloating = false,
  defaultMinimized = false,
  floatingPosition = "bottom-right",

  // Callbacks
  onSendMessage,
  onAIResponse,
  onAIError,
  onToggleMinimize,

  // Customization
  icons,
  branding,
  apiKey,
}) => {
  const [inputValue, setInputValue] = useState("");

  // Custom hooks for state management
  const { messages, addUserMessage, addBotMessage } =
    useMessageState(initialMessages);
  const { isMinimized, toggleMinimize } = useMinimizeState(
    defaultMinimized,
    onToggleMinimize
  );
  const { unreadCount, markAllAsRead } = useUnreadCounter(
    messages,
    isMinimized
  );

  // Branding, service status and AI
  const brandingConfig = useBranding(branding);
  const status = useServiceStatus(serviceStatus);
  const {
    sendMessage: sendOpenAIMessage,
    isLoading: isOpenAILoading,
    isConfigured: isOpenAIConfigured,
  } = useOpenAI({
    config: openai,
    enabled: !!openai,
    onError: onAIError,
    apiKey,
  });

  // Chat logic
  const { isTyping, handleSendMessage } = useChatLogic({
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
  });

  // Event handlers
  const handleToggleMinimize = () => {
    const newState = toggleMinimize();
    if (!newState) {
      markAllAsRead();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Determine if input should be disabled
  const isInputDisabled =
    disabled || status.isMaintenanceMode || !status.isOnline;

  // Get dynamic placeholder
  const getPlaceholder = () => {
    if (status.isMaintenanceMode) return "Service under maintenance...";
    if (!status.isOnline) return "Service currently offline...";
    return placeholder;
  };

  // Create theme with merged branding
  const theme = {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      ...brandingConfig.colors,
    },
    typography: {
      ...defaultTheme.typography,
      ...brandingConfig.typography,
    },
  };

  // Render floating button when minimized
  if (isFloating && isMinimized) {
    return (
      <FloatingButton
        onClick={handleToggleMinimize}
        position={floatingPosition}
        unreadCount={unreadCount}
        icons={icons}
        branding={branding}
      />
    );
  }

  const isCurrentlyTyping = isTyping || isOpenAILoading;

  return (
    <WidgetContainer
      theme={theme}
      isFloating={isFloating}
      isMinimized={isMinimized}
      position={floatingPosition}
      style={containerStyle}
      className={containerClassName}
    >
      <ChatHeader
        isMinimized={isMinimized}
        isTyping={isCurrentlyTyping}
        unreadCount={unreadCount}
        onToggleMinimize={handleToggleMinimize}
        headerClassName={headerClassName}
        headerStyle={headerStyle}
        icons={icons}
        branding={branding}
        serviceStatus={serviceStatus}
      />

      {!isMinimized && (
        <ContentArea
          theme={theme}
          style={contentStyle}
          className={contentClassName}
        >
          <ChatMessages
            messages={messages}
            isTyping={isCurrentlyTyping}
            messageClassName={messageClassName}
            userMessageClassName={userMessageClassName}
            messageStyle={messageStyle}
            userMessageStyle={userMessageStyle}
            branding={branding}
          >
            {children}
          </ChatMessages>

          {/* Maintenance Banner */}
          {status.isMaintenanceMode && (
            <MaintenanceBanner
              message={status.maintenanceMessage}
              branding={branding}
            />
          )}

          <ChatInput
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onSend={handleSendMessage}
            placeholder={getPlaceholder()}
            disabled={isInputDisabled || isCurrentlyTyping}
            inputClassName={inputClassName}
            inputStyle={inputStyle}
            icons={icons}
            branding={branding}
          />
        </ContentArea>
      )}
    </WidgetContainer>
  );
};

export const ChatWidget = withShadowDom(ChatWidgetComponent);
