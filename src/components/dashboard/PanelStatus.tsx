import { Check, AlertTriangle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Panel {
  id: string;
  status: "optimal" | "warning" | "offline";
  output: number;
  maxOutput: number;
}

const panels: Panel[] = [
  { id: "P1", status: "optimal", output: 340, maxOutput: 400 },
  { id: "P2", status: "optimal", output: 385, maxOutput: 400 },
  { id: "P3", status: "warning", output: 220, maxOutput: 400 },
  { id: "P4", status: "optimal", output: 360, maxOutput: 400 },
  { id: "P5", status: "optimal", output: 375, maxOutput: 400 },
  { id: "P6", status: "offline", output: 0, maxOutput: 400 },
  { id: "P7", status: "optimal", output: 395, maxOutput: 400 },
  { id: "P8", status: "optimal", output: 350, maxOutput: 400 },
];

export const PanelStatus = () => {
  const statusConfig = {
    optimal: {
      icon: Check,
      color: "text-primary",
      bg: "bg-primary/20",
      label: "Optimal",
    },
    warning: {
      icon: AlertTriangle,
      color: "text-accent",
      bg: "bg-accent/20",
      label: "Warning",
    },
    offline: {
      icon: Zap,
      color: "text-destructive",
      bg: "bg-destructive/20",
      label: "Offline",
    },
  };

  const statusCounts = {
    optimal: panels.filter((p) => p.status === "optimal").length,
    warning: panels.filter((p) => p.status === "warning").length,
    offline: panels.filter((p) => p.status === "offline").length,
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground">
            Panel Status
          </h3>
          <p className="text-sm text-muted-foreground">8 panels monitored</p>
        </div>
        <div className="flex items-center gap-3">
          {Object.entries(statusCounts).map(([status, count]) => {
            const config = statusConfig[status as keyof typeof statusConfig];
            return (
              <div
                key={status}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
                  config.bg,
                  config.color
                )}
              >
                <config.icon className="h-3.5 w-3.5" />
                <span>{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {panels.map((panel) => {
          const config = statusConfig[panel.status];
          const efficiency = Math.round((panel.output / panel.maxOutput) * 100);
          
          return (
            <div
              key={panel.id}
              className={cn(
                "relative rounded-xl p-4 transition-all duration-300 hover:scale-105 cursor-pointer",
                "bg-secondary/50 border",
                panel.status === "optimal" && "border-primary/30 hover:border-primary/50",
                panel.status === "warning" && "border-accent/30 hover:border-accent/50",
                panel.status === "offline" && "border-destructive/30 hover:border-destructive/50"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{panel.id}</span>
                <config.icon className={cn("h-4 w-4", config.color)} />
              </div>
              
              <div className="space-y-2">
                <div className="text-lg font-display font-bold text-foreground">
                  {panel.output}W
                </div>
                
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      panel.status === "optimal" && "gradient-solar",
                      panel.status === "warning" && "gradient-sun",
                      panel.status === "offline" && "bg-destructive"
                    )}
                    style={{ width: `${efficiency}%` }}
                  />
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {efficiency}% efficiency
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
