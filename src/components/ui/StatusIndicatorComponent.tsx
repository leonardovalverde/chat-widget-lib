import {
  StatusDot,
  StatusIndicator,
} from "../../styles/components/ChatHeader.styled";
import { Theme } from "../../styles/styled";
import { ServiceStatus } from "../../types/theme";

interface StatusIndicatorProps {
  theme: Theme;
  status: ServiceStatus;
}

const StatusIndicatorComponent = ({ theme, status }: StatusIndicatorProps) => {
  if (status.isMaintenanceMode) {
    return (
      <StatusIndicator theme={theme}>
        <StatusDot isMaintenance={true} />
        <span style={{ color: "#f59e0b" }}>Maintenance</span>
      </StatusIndicator>
    );
  }

  return (
    <StatusIndicator theme={theme}>
      <StatusDot isOnline={status.isOnline} />
      <span style={{ color: status.isOnline ? "#059669" : "#dc2626" }}>
        {status.isOnline ? "Online" : "Offline"}
      </span>
    </StatusIndicator>
  );
};

export { StatusIndicatorComponent };
