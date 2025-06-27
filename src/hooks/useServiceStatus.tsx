/* filepath: src/hooks/useServiceStatus.tsx */
import { useMemo } from "react";
import { type ServiceStatus } from "../types/theme";

const DEFAULT_STATUS: Required<ServiceStatus> = {
  isOnline: true,
  isMaintenanceMode: false,
  maintenanceMessage:
    "System is currently under maintenance. Please try again later.",
  showDetailedStatus: true,
};

/**
 * Hook to manage service status with fallbacks
 */
export const useServiceStatus = (customStatus?: ServiceStatus) => {
  return useMemo(
    () => ({
      ...DEFAULT_STATUS,
      ...customStatus,
    }),
    [customStatus]
  );
};
