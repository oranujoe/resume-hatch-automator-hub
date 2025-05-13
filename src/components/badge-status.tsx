
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type StatusType = 
  | "applied" 
  | "interview" 
  | "offer" 
  | "rejected" 
  | "draft" 
  | "active" 
  | "inactive" 
  | "pending" 
  | "completed";

interface BadgeStatusProps {
  status: StatusType;
  className?: string;
}

export function BadgeStatus({ status, className }: BadgeStatusProps) {
  const statusConfig = {
    applied: {
      label: "Applied",
      variant: "default",
      className: "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300",
    },
    interview: {
      label: "Interview",
      variant: "default",
      className: "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-300",
    },
    offer: {
      label: "Offer",
      variant: "default",
      className: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300",
    },
    rejected: {
      label: "Rejected",
      variant: "default",
      className: "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300",
    },
    draft: {
      label: "Draft",
      variant: "outline",
      className: "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300",
    },
    active: {
      label: "Active",
      variant: "default",
      className: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300",
    },
    inactive: {
      label: "Inactive",
      variant: "default",
      className: "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300",
    },
    pending: {
      label: "Pending",
      variant: "default",
      className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300",
    },
    completed: {
      label: "Completed",
      variant: "default",
      className: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge 
      variant="outline" 
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
