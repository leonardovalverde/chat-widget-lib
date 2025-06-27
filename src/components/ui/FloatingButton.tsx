import React from "react";
import { useIcons } from "../../hooks/useIcons";
import { useBranding } from "../../hooks/useBranding";
import { type IconConfig, type BrandingConfig } from "../../types/theme";

interface FloatingButtonProps {
  onClick: () => void;
  position: string;
  unreadCount: number;
  icons?: IconConfig;
  branding?: BrandingConfig;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  onClick,
  position,
  unreadCount,
  icons,
  branding,
}) => {
  const { floatingIcon } = useIcons(icons);
  const { colors } = useBranding(branding);

  const buttonStyle = {
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
  };

  return (
    <button
      className={`chat-leos-floating-button ${position}`}
      onClick={onClick}
      aria-label="Open Leo AI chat"
      style={buttonStyle}
    >
      <span className="text-white text-xl flex items-center justify-center">
        {floatingIcon}
      </span>

      {unreadCount > 0 && (
        <span className="chat-leos-unread-badge bg-red-500 text-white flex items-center justify-center">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  );
};
