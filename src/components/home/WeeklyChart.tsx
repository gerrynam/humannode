import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";

const weekData = [
  { day: "월", amount: 45000 },
  { day: "화", amount: 62000 },
  { day: "수", amount: 75000 },
  { day: "목", amount: 30000 },
  { day: "금", amount: 0 },
  { day: "토", amount: 0 },
  { day: "일", amount: 0 },
];

export function WeeklyChart() {
  const today = 3; // Thursday index (0-based)

  return (
    <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-foreground">이번 주 수익</span>
        <span className="text-sm font-bold text-primary">
          ₩ {weekData.reduce((s, d) => s + d.amount, 0).toLocaleString()}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={100}>
        <BarChart data={weekData} barSize={24}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }}
          />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
            {weekData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  index <= today
                    ? "hsl(224, 64%, 33%)"
                    : "hsl(220, 14%, 96%)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
