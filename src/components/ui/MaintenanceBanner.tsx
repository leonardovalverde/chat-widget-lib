import React from "react";
import { useBranding } from "../../hooks/useBranding";
import { type BrandingConfig } from "../../types/branding";
import { styled } from "../../styles/styled";
import { defaultTheme } from "../../styles/styled";

const BannerContainer = styled("div")<{ theme: any }>`
  margin: 0 ${(props) => props.theme.spacing.lg}
    ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.lg};
  padding: ${(props) => props.theme.spacing.md};
  border-left: 4px solid #f59e0b;
  border-radius: 0 ${(props) => props.theme.borderRadius.sm}
    ${(props) => props.theme.borderRadius.sm} 0;
  box-shadow: ${(props) => props.theme.shadows.sm};
  background-color: #fef3c7;
  color: #92400e;
`;

const BannerContent = styled("div")`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

const BannerIcon = styled("div")`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
`;

const BannerText = styled("div")`
  flex: 1;
`;

const BannerTitle = styled("h4")<{ theme: any }>`
  font-weight: 500;
  font-size: 14px;
  margin: 0 0 4px 0;
  font-family: ${(props) => props.theme.typography.fontFamily};
`;

const BannerMessage = styled("p")<{ theme: any }>`
  font-size: ${(props) => props.theme.typography.messageFontSize};
  margin: 0;
  opacity: 0.9;
  font-family: ${(props) => props.theme.typography.fontFamily};
`;

interface MaintenanceBannerProps {
  message?: string;
  branding?: BrandingConfig;
}

export const MaintenanceBanner: React.FC<MaintenanceBannerProps> = ({
  message = "Service is currently under maintenance. Please try again later.",
  branding,
}) => {
  const { typography } = useBranding(branding);

  // Create theme with merged branding
  const theme = {
    ...defaultTheme,
    typography: {
      ...defaultTheme.typography,
      ...typography,
    },
  };

  return (
    <BannerContainer theme={theme}>
      <BannerContent>
        <BannerIcon>⚠️</BannerIcon>
        <BannerText>
          <BannerTitle theme={theme}>Maintenance Mode</BannerTitle>
          <BannerMessage theme={theme}>{message}</BannerMessage>
        </BannerText>
      </BannerContent>
    </BannerContainer>
  );
};
