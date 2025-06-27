/* filepath: src/components/ui/ChatHeader.tsx */
import React from "react";
import { useIcons } from "../../hooks/useIcons";
import { useBranding } from "../../hooks/useBranding";
import { useServiceStatus } from "../../hooks/useServiceStatus";
import {
  type IconConfig,
  type BrandingConfig,
  type ServiceStatus,
} from "../../types/theme";

interface ChatHeaderProps {
  isMinimized: boolean;
  isTyping: boolean;
  unreadCount: number;
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

  const baseClasses =
    "chat-leos-header p-6 border-b flex items-center flex-shrink-0 shadow-sm";
  const dynamicStyle = {
    backgroundColor: colors.headerBg,
    color: colors.headerText,
    borderBottomColor: colors.borderColor,
    fontFamily: typography.fontFamily,
    ...headerStyle,
  };

  // Status indicator component
  const StatusIndicator = () => {
    if (status.isMaintenanceMode) {
      return (
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-amber-600 font-medium">
            Maintenance
          </span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1">
        <div
          className={`w-2 h-2 rounded-full ${
            status.isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"
          }`}
        ></div>
        <span
          className={`text-xs font-medium ${
            status.isOnline ? "text-green-600" : "text-red-600"
          }`}
        >
          {status.isOnline ? "Online" : "Offline"}
        </span>
      </div>
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
      <button
        className={`${baseClasses} ${headerClassName} w-full text-left relative overflow-hidden`}
        style={dynamicStyle}
        onClick={onToggleMinimize}
        onKeyDown={handleKeyDown}
        aria-label="Expand chat widget"
        title="Click to expand chat"
      >
        <div className="flex items-center gap-3 w-full h-full">
          {logo ? (
            <div className="w-8 h-8">{logo}</div>
          ) : (
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center text-white text-sm flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              }}
            >
              {typeof icons?.botIcon === "string" ? icons.botIcon : "🤖"}
            </div>
          )}

          <div className="flex flex-col justify-center min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3
                className="font-semibold text-base leading-tight truncate"
                style={{
                  fontSize: typography.headerFontSize,
                  fontWeight: typography.headerFontWeight,
                  color: colors.headerText,
                }}
              >
                {botName}
              </h3>
              {status.showDetailedStatus && <StatusIndicator />}
            </div>
          </div>
        </div>

        {unreadCount > 0 && (
          <span className="chat-leos-unread-badge bg-red-500 text-white flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className={`${baseClasses} ${headerClassName}`} style={dynamicStyle}>
      <div className="flex items-center gap-3 flex-1">
        {logo ? (
          <div className="flex-shrink-0">{logo}</div>
        ) : (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-lg flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            }}
          >
            {typeof icons?.botIcon === "string" ? icons.botIcon : "🤖"}
          </div>
        )}

        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2">
            <h3
              className="font-semibold"
              style={{
                fontSize: typography.headerFontSize,
                fontWeight: typography.headerFontWeight,
                color: colors.headerText,
              }}
            >
              {botName}
            </h3>
            {status.showDetailedStatus && <StatusIndicator />}
          </div>
          <p
            className="text-sm mt-1"
            style={{
              color: colors.textSecondary,
              fontFamily: typography.fontFamily,
            }}
          >
            {getSubtitle()}
          </p>
        </div>
      </div>

      <div className="chat-leos-controls">
        <button
          className="chat-leos-control-button flex items-center justify-center"
          onClick={onToggleMinimize}
          style={{
            backgroundColor: `${colors.textSecondary}20`,
            color: colors.textSecondary,
          }}
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
        </button>
      </div>
    </div>
  );
};
