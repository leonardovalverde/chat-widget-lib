import { type ReactNode } from "react";
import {
  SendIcon,
  MinimizeIcon,
  MaximizeIcon,
  CloseIcon,
  ChatIcon,
  LeoAIIcon,
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
      if (typeof customIcon === "string") {
        return <span>{customIcon}</span>;
      }
      return customIcon;
    }
    return fallbackIcon;
  };

  return {
    botIcon: customIcons?.botIcon || <LeoAIIcon />,
    sendIcon: renderIcon(customIcons?.sendIcon, <SendIcon />),
    minimizeIcon: renderIcon(customIcons?.minimizeIcon, <MinimizeIcon />),
    maximizeIcon: renderIcon(customIcons?.maximizeIcon, <MaximizeIcon />),
    closeIcon: renderIcon(customIcons?.closeIcon, <CloseIcon />),
    floatingIcon: renderIcon(customIcons?.floatingIcon, <ChatIcon />),
  };
};
