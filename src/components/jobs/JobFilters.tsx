import { Button } from "@/components/ui/button";
import { RequestSource } from "@/types/job";
import { Bot, User, Puzzle } from "lucide-react";

interface JobFiltersProps {
  selectedSource: RequestSource | "ALL";
  onSourceChange: (source: RequestSource | "ALL") => void;
}

const sourceFilters: { value: RequestSource | "ALL"; label: string; icon?: typeof Bot }[] = [
  { value: "ALL", label: "전체" },
  { value: "AI_AGENT", label: "AI", icon: Bot },
  { value: "HUMAN_WEB", label: "사람", icon: User },
  { value: "PARTNER_ROUTED", label: "파트너", icon: Puzzle },
];

export function JobFilters({ selectedSource, onSourceChange }: JobFiltersProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {sourceFilters.map((filter) => (
        <Button
          key={filter.value}
          variant={selectedSource === filter.value ? "default" : "outline"}
          size="sm"
          className="gap-1.5 shrink-0"
          onClick={() => onSourceChange(filter.value)}
        >
          {filter.icon && <filter.icon className="h-3.5 w-3.5" />}
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
