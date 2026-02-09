import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Job, RequestSource } from "@/types/job";
import { Bot, Clock, MapPin, User, Puzzle } from "lucide-react";

interface JobCardProps {
  job: Job;
  onSelect?: (job: Job) => void;
}

const requestSourceConfig: Record<RequestSource, { icon: typeof Bot; label: string; className: string }> = {
  AI_AGENT: { icon: Bot, label: "AI", className: "border-primary/30 bg-primary/10 text-primary" },
  HUMAN_WEB: { icon: User, label: "사람", className: "border-success/30 bg-success/10 text-success" },
  PARTNER_ROUTED: { icon: Puzzle, label: "파트너", className: "border-partner/30 bg-partner/10 text-partner" },
};

export function JobCard({ job, onSelect }: JobCardProps) {
  const sourceConfig = requestSourceConfig[job.request_source];
  const SourceIcon = sourceConfig.icon;

  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-elevated transition-shadow"
      onClick={() => onSelect?.(job)}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          {/* Source & Category */}
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={sourceConfig.className}>
              <SourceIcon className="h-3 w-3 mr-1" />
              {sourceConfig.label}
            </Badge>
            {job.category_final && (
              <Badge variant="secondary">{job.category_final}</Badge>
            )}
            {job.status === "POSTED" && (
              <Badge variant="outline" className="border-success/30 bg-success/10 text-success">
                모집중
              </Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="font-medium text-foreground mb-1 line-clamp-1">{job.title}</h3>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {job.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {job.distance_km && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {job.distance_km.toFixed(1)}km
              </span>
            )}
            {job.estimated_duration_min && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {job.estimated_duration_min}분
              </span>
            )}
          </div>
        </div>

        {/* Budget */}
        <div className="text-right shrink-0">
          <div className="text-lg font-bold text-primary">
            {job.budget.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">{job.currency}</div>
        </div>
      </div>
    </Card>
  );
}
