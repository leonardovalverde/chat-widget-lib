import React from "react";
import { useIcons } from "../../hooks/useIcons";
import { useBranding } from "../../hooks/useBranding";
import { useServiceStatus } from "../../hooks/useServiceStatus";
import {
  type IconConfig,
  type BrandingConfig,
  type ServiceStatus,
} from "../../types/theme";
import { defaultTheme } from "../../styles/styled";
import {
  HeaderContainer,
  HeaderContent,
  Avatar,
  HeaderText,
  BotName,
  BotSubtitle,
  StatusIndicator,
  StatusDot,
  Controls,
  ControlButton,
  UnreadBadge,
} from "../../styles/components/ChatHeader.styled";

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
}) => {
  const { minimizeIcon } = useIcons(icons);
  const { botName, subtitle, logo, colors, typography } = useBranding(branding);
  const status = useServiceStatus(serviceStatus);

  // Create theme with merged branding
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

  // Status indicator component
  const StatusIndicatorComponent = () => {
    if (status.isMaintenanceMode) {
      return (
        <StatusIndicator theme={theme}>
          <StatusDot isMaintenance={true} />
          <span style={{ color: "#f59e0b" }}>Maintenance</span>
        </StatusIndicator>
      );
    }

    return (
      <StatusIndicator theme={theme}>
        <StatusDot isOnline={status.isOnline} />
        <span style={{ color: status.isOnline ? "#059669" : "#dc2626" }}>
          {status.isOnline ? "Online" : "Offline"}
        </span>
      </StatusIndicator>
    );
  };

  // Get dynamic subtitle based on status
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
        as="button"
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
              {typeof icons?.botIcon === "string" ? icons.botIcon : "🤖"}
            </Avatar>
          )}

          <HeaderText>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <BotName theme={theme}>{botName}</BotName>
              {status.showDetailedStatus && <StatusIndicatorComponent />}
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
            {typeof icons?.botIcon === "string" ? icons.botIcon : "🤖"}
          </Avatar>
        )}

        <HeaderText>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <BotName theme={theme}>{botName}</BotName>
            {status.showDetailedStatus && <StatusIndicatorComponent />}
          </div>
          <BotSubtitle theme={theme}>{getSubtitle()}</BotSubtitle>
        </HeaderText>
      </HeaderContent>

      <Controls>
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
