import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Zap,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Sun,
  AlertTriangle
} from "lucide-react";
import { SolarLogo } from "@/components/SolarLogo";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { useLanguage } from "@/contexts/LanguageContext";

export const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboard'), path: "/dashboard" },
    { icon: AlertTriangle, label: t('defects'), path: "/defects" },
    { icon: BarChart3, label: t('analytics'), path: "/analytics" },
    { icon: Settings, label: t('settings'), path: "/settings" },
  ];

  return (
    <aside
      className={cn(
        "h-screen glass border-r border-border/50 flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          {!collapsed && <SolarLogo size="sm" />}
          {collapsed && (
            <div className="w-10 h-10 gradient-sun rounded-full flex items-center justify-center mx-auto">
              <Sun className="h-5 w-5 text-accent-foreground" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all",
              collapsed && "mx-auto mt-4"
            )}
          >
            <ChevronLeft className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "gradient-solar text-primary-foreground glow-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border/50 space-y-1">
        <Link
          to="/help"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
        >
          <HelpCircle className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">{t('help')}</span>}
        </Link>
        <Link
          to="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">{t('sign_out')}</span>}
        </Link>
      </div>
    </aside>
  );
};
