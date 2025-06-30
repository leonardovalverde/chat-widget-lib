import { styled, css, animations } from "../styled";
import type { Theme } from "../styled";

const statusBgColor = (props: {
  isOnline?: boolean;
  isMaintenance?: boolean;
}) => {
  if (props.isMaintenance) return "#f59e0b";
  return props.isOnline ? "#10b981" : "#ef4444";
};

const controlButtonBgColor = (props: {
  variant?: "minimize" | "close";
  theme: Theme;
}) => {
  if (props.variant === "minimize") return "#fbbf24";
  if (props.variant === "close") return "#ef4444";
  return `${props.theme.colors.textSecondary}20`;
};

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
  position: relative;
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
    props.gradient ??
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
    statusBgColor({
      isOnline: props.isOnline,
      isMaintenance: props.isMaintenance,
    })};
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
  align-items: center;
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
    controlButtonBgColor({
      variant: props.variant,
      theme: props.theme,
    })};
  color: ${(props) =>
    props.variant === "minimize" || props.variant === "close"
      ? "white"
      : props.theme.colors.textSecondary};

  &:hover {
    transform: scale(1.1);
  }
`;

// Novos componentes para o menu
export const MenuContainer = styled("div")`
  position: relative;
`;

export const MenuButton = styled("button")<{ theme: Theme }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.15s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.textSecondary}20;
  color: ${(props) => props.theme.colors.textSecondary};

  &:hover {
    transform: scale(1.1);
    background-color: ${(props) => props.theme.colors.textSecondary}30;
  }
`;

export const MenuDropdown = styled("div")<{ theme: Theme }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${(props) => props.theme.colors.containerBg};
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  border-radius: ${(props) => props.theme.borderRadius.md};
  box-shadow: ${(props) => props.theme.shadows.lg};
  z-index: ${(props) => props.theme.zIndex.floating + 1};
  min-width: 160px;
  margin-top: 4px;
`;

export const MenuItem = styled("button")<{ theme?: Theme }>`
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  color: ${(props) => props.theme?.colors.textColor ?? "#374151"};
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.theme?.colors.borderColor ?? "#f3f4f6"};
  }

  &:first-child {
    border-radius: ${(props) => props.theme?.borderRadius.md ?? "6px"}
      ${(props) => props.theme?.borderRadius.md ?? "6px"} 0 0;
  }

  // This error is a bug
  // https://github.com/styled-components/vscode-styled-components/issues/371
  // https://stackoverflow.com/questions/71767813/getting-at-rule-or-selector-expectedts-styled-plugin9999-error-in-style-comp
  // There's no impact on the code, just a false positive error
  &:last-child {
    border-radius: 0 0 ${(props) => props.theme?.borderRadius.md ?? "6px"}
      ${(props) => props.theme?.borderRadius.md ?? "6px"};
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
