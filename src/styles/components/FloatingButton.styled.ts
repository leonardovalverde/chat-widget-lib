import { styled, css, animations } from "../styled";
import type { Theme } from "../styled";

interface FloatingButtonProps {
  theme: Theme;
  position?: string;
  gradient?: string;
}

export const FloatingButtonContainer = styled("button")<FloatingButtonProps>`
  position: fixed;
  z-index: ${(props) => props.theme.zIndex.floating - 1};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: ${(props) => props.theme.shadows.floating};
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${(props) =>
    props.gradient ||
    `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})`};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 40px rgba(139, 92, 246, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  ${(props) =>
    props.position === "bottom-right" &&
    css`
      bottom: 20px;
      right: 20px;
    `}

  ${(props) =>
    props.position === "bottom-left" &&
    css`
      bottom: 20px;
      left: 20px;
    `}
  
  ${(props) =>
    props.position === "top-right" &&
    css`
      top: 20px;
      right: 20px;
    `}
  
  ${(props) =>
    props.position === "top-left" &&
    css`
      top: 20px;
      left: 20px;
    `}
`;

export const FloatingIcon = styled("div")`
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const FloatingUnreadBadge = styled("span")<{ theme: Theme }>`
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
