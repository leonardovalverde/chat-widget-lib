import { styled } from "../styled";
import type { Theme } from "../styled";

export const BannerContainer = styled("div")<{ theme: Theme }>`
  margin: 0 ${(props) => props.theme.spacing.lg}
    ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.lg};
  padding: ${(props) => props.theme.spacing.md};
  border-left: 4px solid #f59e0b;
  border-radius: 0 ${(props) => props.theme.borderRadius.sm}
    ${(props) => props.theme.borderRadius.sm} 0;
  box-shadow: ${(props) => props.theme.shadows.sm};
  background-color: #fef3c7;
  color: #92400e;
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

export const BannerContent = styled("div")`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const BannerIcon = styled("div")`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export const BannerText = styled("div")`
  flex: 1;
  min-width: 0;
`;

export const BannerTitle = styled("h4")<{ theme: Theme }>`
  font-weight: 500;
  font-size: 14px;
  margin: 0 0 4px 0;
  font-family: ${(props) => props.theme.typography.fontFamily};
  color: #92400e;
`;

export const BannerMessage = styled("p")<{ theme: Theme }>`
  font-size: ${(props) => props.theme.typography.messageFontSize};
  margin: 0;
  opacity: 0.9;
  font-family: ${(props) => props.theme.typography.fontFamily};
  color: #92400e;
  line-height: ${(props) => props.theme.typography.messageLineHeight};
`;
