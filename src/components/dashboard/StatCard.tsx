import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
  unit?: string;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "accent";
}

export const StatCard = ({
  title,
  value,
  unit,
  subtitle,
  icon,
  trend,
  variant = "default",
  className,
  ...props
}: StatCardProps) => {
  const variantClasses = {
    default: "glass",
    primary: "glass border-primary/30",
    accent: "glass border-accent/30",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "h-12 w-12 rounded-xl flex items-center justify-center",
            variant === "primary" && "gradient-solar",
            variant === "accent" && "gradient-sun",
            variant === "default" && "bg-secondary"
          )}
        >
          {icon}
        </div>
        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
              trend.isPositive
                ? "bg-primary/20 text-primary"
                : "bg-destructive/20 text-destructive"
            )}
          >
            <span>{trend.isPositive ? "↑" : "↓"}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-3xl font-bold text-foreground">
            {value}
          </span>
          {unit && <span className="text-lg text-muted-foreground">{unit}</span>}
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
};
