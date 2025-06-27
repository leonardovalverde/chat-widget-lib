/* filepath: src/components/ChatWidget.tsx */
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
import { getWidgetClasses } from "../utils/cssClasses";
import { type WidgetProps } from "../types/components";

export const ChatWidget: React.FC<WidgetProps> = ({
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

  // CSS classes
  const widgetClasses = getWidgetClasses(
    isFloating,
    floatingPosition,
    isMinimized,
    containerClassName
  );

  // Container styles
  const containerDynamicStyle = {
    background: brandingConfig.colors.containerBg,
    fontFamily: brandingConfig.typography.fontFamily,
    borderColor: brandingConfig.colors.borderColor,
    ...containerStyle,
  };

  const isCurrentlyTyping = isTyping || isOpenAILoading;

  return (
    <div
      className={`chat-leos-widget border rounded-xl shadow-xl flex flex-col overflow-hidden ${widgetClasses}`}
      style={containerDynamicStyle}
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
        <div
          className={`chat-leos-content flex-1 flex flex-col min-h-0 ${contentClassName}`}
          style={{
            background: brandingConfig.colors.contentBg,
            ...contentStyle,
          }}
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
        </div>
      )}
    </div>
  );
};
