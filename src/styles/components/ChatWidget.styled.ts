import { styled, css } from "../styled";
import type { Theme } from "../styled";

interface WidgetProps {
  theme: Theme;
  isFloating?: boolean;
  isMinimized?: boolean;
  position?: string;
}

export const WidgetContainer = styled("div")<WidgetProps>`
  width: ${(props) => (props.isMinimized ? "300px" : "400px")};
  height: ${(props) => (props.isMinimized ? "60px" : "600px")};
  background: ${(props) => props.theme.colors.containerBg};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.floating};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: ${(props) => props.theme.typography.fontFamily};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid ${(props) => props.theme.colors.borderColor};

  ${(props) =>
    props.isFloating &&
    css`
      position: fixed;
      z-index: ${props.theme.zIndex.floating};
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      max-width: ${props.isMinimized ? "300px" : "400px"};
      max-height: ${props.isMinimized ? "60px" : "600px"};

      ${props.position === "bottom-right" &&
      css`
        bottom: 20px;
        right: 20px;
      `}

      ${props.position === "bottom-left" &&
      css`
        bottom: 20px;
        left: 20px;
      `}
    
    ${props.position === "top-right" &&
      css`
        top: 20px;
        right: 20px;
      `}
    
    ${props.position === "top-left" &&
      css`
        top: 20px;
        left: 20px;
      `}
    `}

  ${(props) =>
    props.isMinimized &&
    css`
      cursor: pointer;

      &:hover {
        transform: scale(1.02);
      }
    `}
`;

export const ContentArea = styled("div")<{ theme: Theme }>`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: ${(props) => props.theme.colors.messagesBg};
`;
