import { styled, css, animations } from "../styled";
import type { Theme } from "../styled";

interface HeaderProps {
  theme: Theme;
  isMinimized?: boolean;
}

export const HeaderContent = styled("div")`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1 1 0%;
`;

export const HeaderContainer = styled("div")<HeaderProps>`
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};
  display: flex;
  align-items: center;
  flex-shrink: 0;
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition: all 0.15s ease-in-out;
  padding: ${(props) =>
    props.isMinimized ? props.theme.spacing.lg : props.theme.spacing.xl};
  background: ${(props) => props.theme.colors.headerBg};
  color: ${(props) => props.theme.colors.headerText};
  font-family: ${(props) => props.theme.typography.fontFamily};

  ${(props) =>
    props.isMinimized &&
    css`
      height: 60px !important;
      min-height: 60px !important;
      padding: ${props.theme.spacing.lg};
      border-radius: ${props.theme.borderRadius.lg};
      border-bottom: none;
    `}
`;

export const Avatar = styled("div")<{ theme: Theme; gradient?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) =>
    props.gradient ||
    `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
`;

export const HeaderText = styled("div")`
  flex: 1 1 0%;
  min-width: 0;
`;

export const BotName = styled("h3")<{ theme: Theme }>`
  font-weight: ${(props) => props.theme.typography.headerFontWeight};
  font-size: ${(props) => props.theme.typography.headerFontSize};
  line-height: 1.5;
  color: ${(props) => props.theme.colors.headerText};
  margin: 0;
`;

export const BotSubtitle = styled("p")<{ theme: Theme }>`
  font-size: 12px;
  line-height: 1.25;
  color: ${(props) => props.theme.colors.textSecondary};
  margin: 0;
`;

export const StatusIndicator = styled("div")<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  line-height: 1.25;
  color: #059669;
`;

export const StatusDot = styled("div")<{
  isOnline?: boolean;
  isMaintenance?: boolean;
}>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isMaintenance ? "#f59e0b" : props.isOnline ? "#10b981" : "#ef4444"};
  animation: ${(props) =>
    props.isOnline && !props.isMaintenance
      ? css`
          ${animations.pulse} 2s infinite
        `
      : "none"};
`;

export const Controls = styled("div")`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

export const ControlButton = styled("button")<{
  theme: Theme;
  variant?: "minimize" | "close";
}>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.15s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.variant === "minimize"
      ? "#fbbf24"
      : props.variant === "close"
      ? "#ef4444"
      : `${props.theme.colors.textSecondary}20`};
  color: ${(props) =>
    props.variant === "minimize" || props.variant === "close"
      ? "white"
      : props.theme.colors.textSecondary};

  &:hover {
    transform: scale(1.1);
  }
`;

export const UnreadBadge = styled("span")<{ theme: Theme }>`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${(props) => props.theme.zIndex.badge};
  box-shadow: ${(props) => props.theme.shadows.sm};
  animation: ${animations.pulse} 2s infinite;
`;
