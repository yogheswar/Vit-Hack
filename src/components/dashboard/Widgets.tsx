import { Leaf, DollarSign, CloudSun, Battery } from "lucide-react";

export const WeatherWidget = () => {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-xl font-semibold text-foreground">
          Weather & Forecast
        </h3>
        <div className="flex flex-col items-end gap-1">
          <span className="text-sm text-muted-foreground">San Francisco, CA</span>
          <button
            className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/30 hover:bg-primary/30 transition-colors"
            title="Backend will be done by my friend"
          >
            Weather API
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-16 w-16 gradient-sun rounded-2xl flex items-center justify-center glow-accent">
            <CloudSun className="h-8 w-8 text-accent-foreground" />
          </div>
          <div>
            <div className="font-display text-4xl font-bold text-foreground">24°</div>
            <div className="text-sm text-muted-foreground">Partly Cloudy</div>
          </div>
        </div>

        <div className="h-16 w-px bg-border" />

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Solar Irradiance:</span>
            <span className="text-primary font-medium">850 W/m²</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">UV Index:</span>
            <span className="text-accent font-medium">6 (High)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { day: "Tomorrow", temp: "26°", icon: "☀️", production: "+12%" },
          { day: "Wednesday", temp: "22°", icon: "⛅", production: "-5%" },
          { day: "Thursday", temp: "25°", icon: "☀️", production: "+8%" },
        ].map((forecast) => (
          <div
            key={forecast.day}
            className="bg-secondary/50 rounded-xl p-3 text-center"
          >
            <div className="text-xs text-muted-foreground mb-1">{forecast.day}</div>
            <div className="text-2xl mb-1">{forecast.icon}</div>
            <div className="text-sm font-medium text-foreground">{forecast.temp}</div>
            <div className={`text-xs ${forecast.production.startsWith("+") ? "text-primary" : "text-accent"}`}>
              {forecast.production}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const QuickStats = () => {
  const stats = [
    {
      icon: DollarSign,
      label: "Savings This Month",
      value: "$342",
      change: "+15%",
      positive: true,
    },
    {
      icon: Leaf,
      label: "CO₂ Offset",
      value: "1.2t",
      change: "+8%",
      positive: true,
    },
    {
      icon: Battery,
      label: "Battery Level",
      value: "87%",
      change: "Charging",
      positive: true,
    },
  ];

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-display text-xl font-semibold text-foreground mb-4">
        Quick Stats
      </h3>

      <div className="space-y-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg gradient-solar flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="font-display text-lg font-bold text-foreground">
                  {stat.value}
                </div>
              </div>
            </div>
            <div className={`text-sm font-medium ${stat.positive ? "text-primary" : "text-destructive"}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
