import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "6AM", production: 0.2, consumption: 0.8 },
  { time: "8AM", production: 1.5, consumption: 1.2 },
  { time: "10AM", production: 4.2, consumption: 1.5 },
  { time: "12PM", production: 6.8, consumption: 2.1 },
  { time: "2PM", production: 7.2, consumption: 1.8 },
  { time: "4PM", production: 5.5, consumption: 2.4 },
  { time: "6PM", production: 2.8, consumption: 3.2 },
  { time: "8PM", production: 0.3, consumption: 2.5 },
];

export const EnergyChart = () => {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground">
            Energy Flow
          </h3>
          <p className="text-sm text-muted-foreground">Today's production vs consumption</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full gradient-solar" />
            <span className="text-sm text-muted-foreground">Production</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full gradient-sun" />
            <span className="text-sm text-muted-foreground">Consumption</span>
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(160, 84%, 45%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(160, 84%, 45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
            <XAxis
              dataKey="time"
              stroke="hsl(215, 20%, 55%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(215, 20%, 55%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}kW`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 8%)",
                border: "1px solid hsl(222, 30%, 18%)",
                borderRadius: "12px",
                boxShadow: "0 8px 32px hsl(0 0% 0% / 0.4)",
              }}
              labelStyle={{ color: "hsl(210, 40%, 98%)" }}
              itemStyle={{ color: "hsl(215, 20%, 55%)" }}
            />
            <Area
              type="monotone"
              dataKey="production"
              stroke="hsl(160, 84%, 45%)"
              strokeWidth={2}
              fill="url(#productionGradient)"
            />
            <Area
              type="monotone"
              dataKey="consumption"
              stroke="hsl(38, 92%, 55%)"
              strokeWidth={2}
              fill="url(#consumptionGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
