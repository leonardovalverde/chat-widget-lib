import React, { type ReactNode } from "react";
import {
  SendIcon,
  MinimizeIcon,
  MaximizeIcon,
  CloseIcon,
  ChatIcon,
} from "../components/icons/DefaultIcons";
import { type IconConfig } from "../types/theme";

/**
 * Hook to manage custom icons with fallbacks
 */
export const useIcons = (customIcons?: IconConfig) => {
  const renderIcon = (
    customIcon?: string | ReactNode,
    fallbackIcon?: ReactNode
  ): ReactNode => {
    if (customIcon) {
      // If it's a string, treat it as emoji or text
      if (typeof customIcon === "string") {
        return <span>{customIcon}</span>;
      }
      // If it's a React component, render it
      return customIcon;
    }
    // Return fallback icon
    return fallbackIcon;
  };

  return {
    botIcon: customIcons?.botIcon || "🤖",
    sendIcon: renderIcon(customIcons?.sendIcon, <SendIcon />),
    minimizeIcon: renderIcon(customIcons?.minimizeIcon, <MinimizeIcon />),
    maximizeIcon: renderIcon(customIcons?.maximizeIcon, <MaximizeIcon />),
    closeIcon: renderIcon(customIcons?.closeIcon, <CloseIcon />),
    floatingIcon: renderIcon(customIcons?.floatingIcon, <ChatIcon />),
  };
};
