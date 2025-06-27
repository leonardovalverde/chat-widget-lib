/* filepath: src/components/ui/MaintenanceBanner.tsx */
import React from "react";
import { useBranding } from "../../hooks/useBranding";
import { type BrandingConfig } from "../../types/branding";

interface MaintenanceBannerProps {
  message?: string;
  branding?: BrandingConfig;
}

export const MaintenanceBanner: React.FC<MaintenanceBannerProps> = ({
  message = "System is currently under maintenance. Please try again later.",
  branding,
}) => {
  const { typography } = useBranding(branding);

  const bannerStyle = {
    backgroundColor: "#fef3c7",
    borderColor: "#f59e0b",
    color: "#92400e",
    fontFamily: typography.fontFamily,
    fontSize: typography.messageFontSize,
  };

  return (
    <div
      className="mx-4 mb-2 p-3 border-l-4 rounded-r-lg shadow-sm"
      style={bannerStyle}
    >
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm">🔧 Maintenance Mode</p>
          <p className="text-sm mt-1 opacity-90">{message}</p>
        </div>
      </div>
    </div>
  );
};
