import { CheckCircle2, XCircle, Loader2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type DeploymentStatus = "success" | "failed" | "building" | "pending";

interface DeploymentBadgeProps {
  status: DeploymentStatus;
}

const statusConfig = {
  success: {
    icon: CheckCircle2,
    label: "Success",
    className: "bg-success/10 text-success hover:bg-success/20 border-success/20",
  },
  failed: {
    icon: XCircle,
    label: "Failed",
    className: "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20",
  },
  building: {
    icon: Loader2,
    label: "Building",
    className: "bg-warning/10 text-warning hover:bg-warning/20 border-warning/20",
  },
  pending: {
    icon: Clock,
    label: "Pending",
    className: "bg-muted text-muted-foreground hover:bg-muted border-border",
  },
};

export const DeploymentBadge = ({ status }: DeploymentBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={config.className}>
      <Icon className={`mr-1.5 h-3 w-3 ${status === "building" ? "animate-spin" : ""}`} />
      {config.label}
    </Badge>
  );
};
