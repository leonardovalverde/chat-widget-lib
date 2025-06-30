import React, { useState } from "react";
import { useIcons } from "../../hooks/useIcons";
import { useBranding } from "../../hooks/useBranding";
import { useServiceStatus } from "../../hooks/useServiceStatus";
import { type IconConfig, type ServiceStatus } from "../../types/theme";
import { type BrandingConfig } from "../../types/branding";
import { defaultTheme } from "../../styles/styled";
import {
  HeaderContainer,
  HeaderContent,
  Avatar,
  HeaderText,
  BotName,
  BotSubtitle,
  Controls,
  ControlButton,
  UnreadBadge,
  MenuContainer,
  MenuButton,
  MenuDropdown,
  MenuItem,
} from "../../styles/components/ChatHeader.styled";
import { StatusIndicatorComponent } from "./StatusIndicatorComponent";
import { LeoAIIcon } from "../icons/DefaultIcons";

interface ChatHeaderProps {
  isMinimized?: boolean;
  isTyping?: boolean;
  unreadCount?: number;
  onToggleMinimize: () => void;
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
  icons?: IconConfig;
  branding?: BrandingConfig;
  serviceStatus?: ServiceStatus;
  hasHistory?: boolean;
  onClearHistory?: () => void;
  onExportHistory?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  isMinimized,
  isTyping,
  unreadCount,
  onToggleMinimize,
  headerClassName = "",
  headerStyle,
  icons,
  branding,
  serviceStatus,
  hasHistory = false,
  onClearHistory,
  onExportHistory,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const { minimizeIcon } = useIcons(icons);
  const { botName, subtitle, logo, colors, typography } = useBranding(branding);
  const status = useServiceStatus(serviceStatus);

  const theme = {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      ...colors,
    },
    typography: {
      ...defaultTheme.typography,
      ...typography,
    },
  };

  // Menu handler
  const handleMenuAction = (action: string) => {
    switch (action) {
      case "clear-history":
        if (confirm("Are you sure you want to clear the chat history?")) {
          onClearHistory?.();
        }
        break;
      case "export-history":
        onExportHistory?.();
        break;
    }
    setShowMenu(false);
  };

  const getSubtitle = () => {
    if (isTyping) return "typing...";
    if (status.isMaintenanceMode) return "under maintenance";
    if (!status.isOnline) return "currently offline";
    return subtitle;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isMinimized && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onToggleMinimize();
    }
  };

  if (isMinimized) {
    return (
      <HeaderContainer
        theme={theme}
        isMinimized={isMinimized}
        style={headerStyle}
        className={headerClassName}
        onClick={onToggleMinimize}
        onKeyDown={handleKeyDown}
        aria-label="Expand chat widget"
        title="Click to expand chat"
      >
        <HeaderContent>
          {logo ? (
            <div
              style={{
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              {logo}
            </div>
          ) : (
            <Avatar
              theme={theme}
              gradient={`linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`}
            >
              {typeof icons?.botIcon === "string" ? (
                icons.botIcon
              ) : (
                <LeoAIIcon />
              )}
            </Avatar>
          )}

          <HeaderText>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <BotName theme={theme}>{botName}</BotName>
              {status.showDetailedStatus && (
                <StatusIndicatorComponent theme={theme} status={status} />
              )}
            </div>
          </HeaderText>
        </HeaderContent>

        {unreadCount && unreadCount > 0 && (
          <UnreadBadge theme={theme}>
            {unreadCount > 9 ? "9+" : unreadCount}
          </UnreadBadge>
        )}
      </HeaderContainer>
    );
  }

  return (
    <HeaderContainer
      theme={theme}
      isMinimized={isMinimized}
      style={headerStyle}
      className={headerClassName}
    >
      <HeaderContent>
        {logo ? (
          <div
            style={{
              flexShrink: 0,
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
            {logo}
          </div>
        ) : (
          <Avatar
            theme={theme}
            gradient={`linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`}
          >
            {typeof icons?.botIcon === "string" ? icons.botIcon : <LeoAIIcon />}
          </Avatar>
        )}

        <HeaderText>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <BotName theme={theme}>{botName}</BotName>
            {status.showDetailedStatus && (
              <StatusIndicatorComponent status={status} theme={theme} />
            )}
          </div>
          <BotSubtitle theme={theme}>{getSubtitle()}</BotSubtitle>
        </HeaderText>
      </HeaderContent>

      <Controls>
        {hasHistory && (
          <MenuContainer>
            <MenuButton
              theme={theme}
              onClick={() => setShowMenu(!showMenu)}
              title="Chat options"
              aria-label="Chat options"
            >
              ⋯
            </MenuButton>

            {showMenu && (
              <MenuDropdown theme={theme}>
                <MenuItem
                  theme={theme}
                  onClick={() => handleMenuAction("export-history")}
                  title="Download chat history as JSON"
                >
                  📥 Export History
                </MenuItem>
                <MenuItem
                  theme={theme}
                  onClick={() => handleMenuAction("clear-history")}
                  title="Clear all chat messages"
                  style={{ color: "#dc2626" }}
                >
                  🗑️ Clear History
                </MenuItem>
              </MenuDropdown>
            )}
          </MenuContainer>
        )}

        <ControlButton
          theme={theme}
          variant="minimize"
          onClick={onToggleMinimize}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggleMinimize();
            }
          }}
          title="Minimize chat"
          aria-label="Minimize chat"
        >
          {minimizeIcon}
        </ControlButton>
      </Controls>
    </HeaderContainer>
  );
};
