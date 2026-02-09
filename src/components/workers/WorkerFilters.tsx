import { Button } from "@/components/ui/button";
import { CheckCircle2, Star, TrendingUp, Users } from "lucide-react";

interface WorkerFiltersProps {
  selectedFilter: "all" | "verified" | "top_rated" | "active";
  onFilterChange: (filter: "all" | "verified" | "top_rated" | "active") => void;
}

export function WorkerFilters({ selectedFilter, onFilterChange }: WorkerFiltersProps) {
  const filters = [
    { key: "all" as const, label: "전체", icon: Users },
    { key: "active" as const, label: "활동중", icon: TrendingUp },
    { key: "verified" as const, label: "인증됨", icon: CheckCircle2 },
    { key: "top_rated" as const, label: "평점 4.8+", icon: Star },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ key, label, icon: Icon }) => (
        <Button
          key={key}
          variant={selectedFilter === key ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(key)}
          className="gap-1.5"
        >
          <Icon className="h-4 w-4" />
          {label}
        </Button>
      ))}
    </div>
  );
}
