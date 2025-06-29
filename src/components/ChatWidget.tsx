import React, { useState } from "react";
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
import { createPortal } from "react-dom";

const ChatWidget: React.FC<WidgetProps> = ({
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
  placeholder = "Type your message here...",
  disabled = false,

  // AI props
  openai,
  enableMockResponses = true,

  // Service status
  serviceStatus,

  // Floating props
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

  // storage messages
  persistMessages = true,
  chatbotId = "default",
  maxStoredMessages = 50,
  onHistoryCleared,
  onHistoryExported,
}) => {
  const [inputValue, setInputValue] = useState("");

  const {
    messages,
    addUserMessage,
    addBotMessage,
    clearHistory,
    exportHistory,
    hasHistory,
  } = useMessageState([], {
    persistMessages,
    chatbotId,
    maxStoredMessages,
  });
  const { isMinimized, toggleMinimize } = useMinimizeState(
    defaultMinimized,
    onToggleMinimize
  );
  const { unreadCount, markAllAsRead } = useUnreadCounter(
    messages,
    isMinimized
  );

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
    apiKey: openai?.apiKey,
  });

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

  const isInputDisabled =
    disabled || status.isMaintenanceMode || !status.isOnline;

  const getPlaceholder = () => {
    if (status.isMaintenanceMode) return "Service under maintenance...";
    if (!status.isOnline) return "Service currently offline...";
    return placeholder;
  };

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

  const isCurrentlyTyping = isTyping || isOpenAILoading;

  const handleClearHistory = () => {
    clearHistory();
    onHistoryCleared?.();
  };

  const handleExportHistory = () => {
    const data = exportHistory();
    onHistoryExported?.(data);

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-history-${chatbotId}-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isMinimized) {
    const floatingButton = (
      <FloatingButton
        onClick={handleToggleMinimize}
        position={floatingPosition}
        unreadCount={unreadCount}
        icons={icons}
        branding={branding}
      />
    );
    return createPortal(floatingButton, document.body);
  }

  const widget = (
    <WidgetContainer
      theme={theme}
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
        hasHistory={hasHistory}
        onClearHistory={handleClearHistory}
        onExportHistory={handleExportHistory}
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

  return createPortal(widget, document.body);
};

export { ChatWidget };
