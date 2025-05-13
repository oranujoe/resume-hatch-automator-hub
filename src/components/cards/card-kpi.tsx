
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CardKPIProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  description?: string;
  trend?: number;
  trendLabel?: string;
  className?: string;
  isLoading?: boolean;
}

export function CardKPI({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendLabel,
  className,
  isLoading = false,
}: CardKPIProps) {
  const isPositiveTrend = trend && trend > 0;
  const isNegativeTrend = trend && trend < 0;

  return (
    <Card className={cn("overflow-hidden glass-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-8 w-28 animate-pulse rounded bg-muted" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        {(description || trend) && (
          <p className="text-xs text-muted-foreground mt-2">
            {description}
            {trend && (
              <span
                className={cn(
                  "ml-2",
                  isPositiveTrend && "text-green-500",
                  isNegativeTrend && "text-red-500"
                )}
              >
                {isPositiveTrend && "+"}
                {trend}% {trendLabel}
              </span>
            )}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
