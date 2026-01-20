import { Sun } from "lucide-react";

interface SolarLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const SolarLogo = ({ className, size = "md" }: SolarLogoProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute inset-0 gradient-sun rounded-full animate-pulse-slow opacity-50 blur-sm" />
        <div className="relative gradient-sun rounded-full flex items-center justify-center h-full w-full">
          <Sun className="text-accent-foreground" size={size === "lg" ? 28 : size === "md" ? 20 : 16} />
        </div>
      </div>
      <span className="font-display font-bold text-foreground text-xl">
        Solar<span className="text-gradient-solar">Flow</span>
      </span>
    </div>
  );
};
