import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Job, RequestSource } from "@/types/job";
import { Bot, Clock, MapPin, User, Puzzle } from "lucide-react";

interface JobCardProps {
  job: Job;
  onSelect?: (job: Job) => void;
  onAccept?: (job: Job) => void;
}

const requestSourceConfig: Record<RequestSource, { icon: typeof Bot; label: string; className: string }> = {
  AI_AGENT: { icon: Bot, label: "AI", className: "border-primary/30 bg-primary/10 text-primary" },
  HUMAN_WEB: { icon: User, label: "사람", className: "border-success/30 bg-success/10 text-success" },
  PARTNER_ROUTED: { icon: Puzzle, label: "파트너", className: "border-partner/30 bg-partner/10 text-partner" },
};

export function JobCard({ job, onSelect, onAccept }: JobCardProps) {
  const sourceConfig = requestSourceConfig[job.request_source];
  const SourceIcon = sourceConfig.icon;

  return (
    <Card
      className="p-4 cursor-pointer hover:shadow-elevated transition-shadow active:scale-[0.99]"
      onClick={() => onSelect?.(job)}
    >
      {/* Source & Category */}
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="outline" className={sourceConfig.className}>
          <SourceIcon className="h-3 w-3 mr-1" />
          {sourceConfig.label}
        </Badge>
        {job.category_final && (
          <Badge variant="secondary">{job.category_final}</Badge>
        )}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{job.title}</h3>

      {/* Location */}
      <p className="text-sm text-muted-foreground line-clamp-1 mb-3">{job.location_text}</p>

      {/* Meta + Accept button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {job.distance_km != null && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {job.distance_km.toFixed(1)}km
            </span>
          )}
          {job.estimated_duration_min != null && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {job.estimated_duration_min}분
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-primary">
            {job.budget.toLocaleString()}원
          </span>
          {job.status === "POSTED" && onAccept && (
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onAccept(job);
              }}
            >
              수락하기
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
