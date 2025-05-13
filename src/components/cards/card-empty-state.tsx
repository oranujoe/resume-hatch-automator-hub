
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface CardEmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function CardEmptyState({
  title,
  description,
  icon: Icon,
  actionLabel,
  onAction,
  className,
}: CardEmptyStateProps) {
  return (
    <Card className={cn(
      "border-dashed text-center glass-card",
      className
    )}>
      <CardHeader>
        {Icon && (
          <div className="flex justify-center mb-4">
            <div className="rounded-full p-3 bg-muted">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        )}
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {actionLabel && onAction && (
          <Button 
            variant="default" 
            onClick={onAction}
            className="bg-primary hover:bg-primary/90"
          >
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
