import React from "react";
import { useBranding } from "../../hooks/useBranding";
import { type BrandingConfig } from "../../types/branding";
import { defaultTheme } from "../../styles/styled";
import {
  BannerContainer,
  BannerContent,
  BannerIcon,
  BannerText,
  BannerTitle,
  BannerMessage,
} from "../../styles/components/MaintenanceBanner.styled";

interface MaintenanceBannerProps {
  message?: string;
  branding?: BrandingConfig;
}

export const MaintenanceBanner: React.FC<MaintenanceBannerProps> = ({
  message = "Service is currently under maintenance. Please try again later.",
  branding,
}) => {
  const { typography } = useBranding(branding);

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
