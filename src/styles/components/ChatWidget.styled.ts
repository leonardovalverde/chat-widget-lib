import { styled, css } from "../styled";
import type { Theme } from "../styled";

interface WidgetProps {
  theme: Theme;
  isMinimized?: boolean;
  position?: string;
}

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

    /* Widget sempre flutuante */
    position: fixed !important;
    z-index: ${theme.zIndex.floating};
    max-width: ${isMinimized ? "300px" : "400px"};
    max-height: ${isMinimized ? "60px" : "600px"};
    margin: 0 !important;

    /* Posicionamento baseado na prop position */
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
  `
);
