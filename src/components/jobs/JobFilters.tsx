import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RequestSource } from "@/types/job";
import { Bot, Filter, ListFilter, Map, User, Puzzle } from "lucide-react";

interface JobFiltersProps {
  selectedSource: RequestSource | "ALL";
  onSourceChange: (source: RequestSource | "ALL") => void;
  viewMode: "list" | "map";
  onViewModeChange: (mode: "list" | "map") => void;
}

const sourceFilters: { value: RequestSource | "ALL"; label: string; icon?: typeof Bot }[] = [
  { value: "ALL", label: "전체" },
  { value: "AI_AGENT", label: "AI 요청", icon: Bot },
  { value: "HUMAN_WEB", label: "사람 요청", icon: User },
  { value: "PARTNER_ROUTED", label: "파트너", icon: Puzzle },
];

export function JobFilters({ selectedSource, onSourceChange, viewMode, onViewModeChange }: JobFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {sourceFilters.map((filter) => (
          <Button
            key={filter.value}
            variant={selectedSource === filter.value ? "default" : "outline"}
            size="sm"
            className="gap-1.5"
            onClick={() => onSourceChange(filter.value)}
          >
            {filter.icon && <filter.icon className="h-3.5 w-3.5" />}
            {filter.label}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewModeChange("list")}
        >
          <ListFilter className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "map" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewModeChange("map")}
        >
          <Map className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
