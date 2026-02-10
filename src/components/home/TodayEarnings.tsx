import { Progress } from "@/components/ui/progress";

interface TodayEarningsProps {
  earnings: number;
  completedJobs: number;
  goal: number;
}

export function TodayEarnings({ earnings, completedJobs, goal }: TodayEarningsProps) {
  const progress = Math.min((earnings / goal) * 100, 100);

  return (
    <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-muted-foreground">오늘 수익</span>
        <span className="text-xs text-muted-foreground">{completedJobs}건 완료</span>
      </div>
      <div className="text-3xl font-bold text-foreground mb-3">
        ₩ {earnings.toLocaleString()}
      </div>
      <Progress value={progress} className="h-2 mb-2" />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>목표 {goal.toLocaleString()}원</span>
        <span className="font-medium text-primary">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}
