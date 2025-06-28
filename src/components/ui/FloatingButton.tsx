import React from "react";
import { useIcons } from "../../hooks/useIcons";
import { useBranding } from "../../hooks/useBranding";
import { type FloatingPosition } from "../../types/common";
import { type IconConfig, type BrandingConfig } from "../../types/branding";
import { defaultTheme } from "../../styles/styled";
import {
  FloatingButtonContainer,
  UnreadBadge,
} from "../../styles/components/FloatingButton.styled";

interface FloatingButtonProps {
  onClick: () => void;
  position?: FloatingPosition;
  unreadCount?: number;
  icons?: IconConfig;
  branding?: BrandingConfig;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  onClick,
  position = "bottom-right",
  unreadCount = 0,
  icons,
  branding,
}) => {
  const { chatIcon, floatingIcon } = useIcons(icons);
  const { colors, logo } = useBranding(branding);

  // Create theme with merged branding
  const theme = {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      ...colors,
    },
  };

  // Prioridade: logo do branding > floatingIcon > chatIcon > default
  const iconToRender = logo || floatingIcon || chatIcon || "💬";

  return (
    <FloatingButtonContainer
      theme={theme}
      position={position}
      gradient={`linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`}
      onClick={onClick}
      aria-label="Open chat"
      title="Open chat"
    >
      <div
        style={{
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {iconToRender}
      </div>

      {unreadCount > 0 && (
        <UnreadBadge theme={theme}>
          {unreadCount > 9 ? "9+" : unreadCount}
        </UnreadBadge>
      )}
    </FloatingButtonContainer>
  );
};
