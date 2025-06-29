import { styled, animations } from "../styled";
import type { Theme } from "../styled";

interface FloatingButtonProps {
  theme: Theme;
  position?: string;
  gradient?: string;
}

export const FloatingButtonContainer = styled("button")<FloatingButtonProps>`
  position: fixed;
  z-index: ${(props) => props.theme.zIndex.floating};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  box-shadow: ${(props) => props.theme.shadows.floating};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${(props) =>
    props.gradient ??
    `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})`};

  ${(props) => {
    const position = props.position ?? "bottom-right";

    if (position === "bottom-right") {
      return `
        bottom: 20px;
        right: 20px;
      `;
    }
    if (position === "bottom-left") {
      return `
        bottom: 20px;
        left: 20px;
      `;
    }
    if (position === "top-right") {
      return `
        top: 20px;
        right: 20px;
      `;
    }
    if (position === "top-left") {
      return `
        top: 20px;
        left: 20px;
      `;
    }
    return "";
  }}

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const UnreadBadge = styled("span")<{ theme: Theme }>`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${(props) => props.theme.zIndex.badge};
  box-shadow: ${(props) => props.theme.shadows.sm};
  animation: ${animations.pulse} 2s infinite;
`;
