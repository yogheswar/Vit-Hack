import { Zap, Battery, Sun, TrendingUp } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { EnergyChart } from "@/components/dashboard/EnergyChart";
import { PanelStatus } from "@/components/dashboard/PanelStatus";
import { WeatherWidget, QuickStats } from "@/components/dashboard/Widgets";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-auto p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Current Output"
              value="5.8"
              unit="kW"
              subtitle="Real-time power"
              icon={<Zap className="h-6 w-6 text-primary-foreground" />}
              trend={{ value: 12, isPositive: true }}
              variant="primary"
              className="animate-fade-in"
            />
            <StatCard
              title="Today's Production"
              value="42.3"
              unit="kWh"
              subtitle="Total energy generated"
              icon={<Sun className="h-6 w-6 text-accent-foreground" />}
              trend={{ value: 8, isPositive: true }}
              variant="accent"
              className="animate-fade-in"
              style={{ animationDelay: "0.1s" } as React.CSSProperties}
            />
            <StatCard
              title="Battery Storage"
              value="87"
              unit="%"
              subtitle="13.2 kWh available"
              icon={<Battery className="h-6 w-6 text-foreground" />}
              variant="default"
              className="animate-fade-in"
              style={{ animationDelay: "0.2s" } as React.CSSProperties}
            />
            <StatCard
              title="Self-Sufficiency"
              value="94"
              unit="%"
              subtitle="This month"
              icon={<TrendingUp className="h-6 w-6 text-foreground" />}
              trend={{ value: 5, isPositive: true }}
              variant="default"
              className="animate-fade-in"
              style={{ animationDelay: "0.3s" } as React.CSSProperties}
            />
          </div>

          {/* Charts and Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <EnergyChart />
            </div>
            <div className="space-y-6">
              <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <WeatherWidget />
              </div>
            </div>
          </div>

          {/* Panel Status and Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <PanelStatus />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.7s" }}>
              <QuickStats />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
