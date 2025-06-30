import { styled } from "../styled";
import type { Theme } from "../styled";

interface WidgetProps {
  theme: Theme;
  isMinimized?: boolean;
  position?: string;
}

const minimizedPosition = (position: string) => {
  switch (position) {
    case "bottom-right":
      return "bottom: 10px; right: 10px;";
    case "bottom-left":
      return "bottom: 10px; left: 10px;";
    case "top-right":
      return "top: 10px; right: 10px;";
    case "top-left":
      return "top: 10px; left: 10px;";
    default:
      return "bottom: 10px; right: 10px;";
  }
};

export const WidgetContainer = styled("div")<WidgetProps>(
  ({ theme, isMinimized, position = "bottom-right" }) => `
    width: ${isMinimized ? "300px" : "400px"};
    height: ${isMinimized ? "60px" : "600px"};
    background: ${theme.colors.containerBg};
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.floating};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    font-family: ${theme.typography.fontFamily};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid ${theme.colors.borderColor};
    box-sizing: border-box;

    position: fixed !important;
    z-index: ${theme.zIndex.floating};
    max-width: ${isMinimized ? "300px" : "400px"};
    max-height: ${isMinimized ? "60px" : "600px"};
    margin: 0 !important;

    ${
      position === "bottom-right"
        ? `
      bottom: 20px;
      right: 20px;
      top: auto;
      left: auto;
    `
        : ""
    }

    ${
      position === "bottom-left"
        ? `
      bottom: 20px;
      left: 20px;
      top: auto;
      right: auto;
    `
        : ""
    }

    ${
      position === "top-right"
        ? `
      top: 20px;
      right: 20px;
      bottom: auto;
      left: auto;
    `
        : ""
    }

    ${
      position === "top-left"
        ? `
      top: 20px;
      left: 20px;
      bottom: auto;
      right: auto;
    `
        : ""
    }

    ${
      isMinimized
        ? `
      cursor: pointer;

      &:hover {
        transform: scale(1.02);
      }
    `
        : ""
    }

    @media (max-width: 768px) {
      width: ${isMinimized ? "280px" : "calc(100vw - 32px)"};
      height: ${isMinimized ? "56px" : "500px"};
      max-width: ${isMinimized ? "280px" : "calc(100vw - 32px)"};
      max-height: ${isMinimized ? "56px" : "500px"};
      
      ${
        position === "bottom-right" || position === "bottom-left"
          ? `
        bottom: 16px;
        right: 16px;
        left: 16px;
      `
          : `
        top: 16px;
        right: 16px;
        left: 16px;
      `
      }
    }

    @media (max-width: 480px) {
      width: ${isMinimized ? "260px" : "calc(100vw - 20px)"};
      height: ${isMinimized ? "52px" : "calc(100vh - 40px)"};
      max-width: ${isMinimized ? "260px" : "calc(100vw - 20px)"};
      max-height: ${isMinimized ? "52px" : "calc(100vh - 40px)"};
      
      ${
        position === "bottom-right" || position === "bottom-left"
          ? `
        bottom: 10px;
        right: 10px;
        left: 10px;
      `
          : `
        top: 10px;
        right: 10px;
        left: 10px;
      `
      }

      ${
        isMinimized
          ? `
        ${minimizedPosition(position)}
        width: 260px;
      `
          : ""
      }

      border-radius: ${
        isMinimized ? theme.borderRadius.lg : theme.borderRadius.md
      };
    }

    @media (max-width: 320px) {
      width: ${isMinimized ? "240px" : "calc(100vw - 16px)"};
      
      ${
        isMinimized
          ? `
        width: 240px;
      `
          : ""
      }
    }
  `
);

export const ContentArea = styled("div")<{ theme: Theme }>(
  ({ theme }) => `
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    min-height: 0;
    background: ${theme.colors.messagesBg};
    box-sizing: border-box;

    @media (max-width: 480px) {
      min-height: 200px;
    }
  `
);
