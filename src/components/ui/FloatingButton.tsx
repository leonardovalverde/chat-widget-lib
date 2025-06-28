import React from "react";
import { useIcons } from "../../hooks/useIcons";
import { useBranding } from "../../hooks/useBranding";
import { type FloatingPosition } from "../../types/common";
import { type IconConfig, type BrandingConfig } from "../../types/branding";
import { defaultTheme } from "../../styles/styled";
import {
  FloatingButtonContainer,
  FloatingIcon,
  FloatingUnreadBadge,
} from "../../styles/components/FloatingButton.styled";

interface FloatingButtonProps {
  onClick: () => void;
  position: FloatingPosition;
  unreadCount?: number;
  icons?: IconConfig;
  branding?: BrandingConfig;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  onClick,
  position,
  unreadCount = 0,
  icons,
  branding,
}) => {
  const { chatIcon, floatingIcon } = useIcons(icons);
  const { colors } = useBranding(branding);

  // Create theme with merged branding
  const theme = {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      ...colors,
    },
  };

  // Usar floatingIcon se disponível, senão usar chatIcon
  const iconToRender = floatingIcon || chatIcon;

  return (
    <FloatingButtonContainer
      theme={theme}
      position={position}
      gradient={`linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`}
      onClick={onClick}
      aria-label="Open chat"
      title="Open chat"
    >
      <FloatingIcon>{iconToRender}</FloatingIcon>

      {unreadCount > 0 && (
        <FloatingUnreadBadge theme={theme}>
          {unreadCount > 9 ? "9+" : unreadCount}
        </FloatingUnreadBadge>
      )}
    </FloatingButtonContainer>
  );
};
