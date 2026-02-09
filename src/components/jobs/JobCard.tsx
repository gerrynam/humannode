import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Job, RequestSource, JobStatus } from "@/types/job";
import { Bot, Clock, MapPin, User, Puzzle, ArrowRight, Wallet } from "lucide-react";

interface JobCardProps {
  job: Job;
  onSelect?: (job: Job) => void;
}

const requestSourceConfig: Record<RequestSource, { icon: typeof Bot; label: string; variant: "ai" | "human" | "partner" }> = {
  AI_AGENT: { icon: Bot, label: "AI 요청", variant: "ai" },
  HUMAN_WEB: { icon: User, label: "사람 요청", variant: "human" },
  PARTNER_ROUTED: { icon: Puzzle, label: "파트너 처리", variant: "partner" },
};

const statusConfig: Record<JobStatus, { label: string; variant: "success" | "warning" | "pending" | "destructive" | "secondary" }> = {
  POSTED: { label: "모집중", variant: "success" },
  CLAIMED: { label: "수락됨", variant: "warning" },
  IN_PROGRESS: { label: "진행중", variant: "warning" },
  SUBMITTED: { label: "제출됨", variant: "pending" },
  APPROVED: { label: "승인됨", variant: "success" },
  PAID: { label: "정산완료", variant: "success" },
  CANCELED: { label: "취소됨", variant: "destructive" },
  DISPUTED: { label: "분쟁중", variant: "destructive" },
  REFUNDED: { label: "환불됨", variant: "secondary" },
  EXPIRED: { label: "만료됨", variant: "secondary" },
};

export function JobCard({ job, onSelect }: JobCardProps) {
  const sourceConfig = requestSourceConfig[job.request_source];
  const SourceIcon = sourceConfig.icon;
  const statusInfo = statusConfig[job.status];

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatTimeRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" };
    return `${startDate.toLocaleDateString("ko-KR", { month: "short", day: "numeric" })} ${startDate.toLocaleTimeString("ko-KR", options)} - ${endDate.toLocaleTimeString("ko-KR", options)}`;
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
      {/* Request source indicator line */}
      <div className={`absolute left-0 top-0 h-full w-1 ${
        sourceConfig.variant === "ai" ? "bg-ai" : 
        sourceConfig.variant === "human" ? "bg-accent" : "bg-partner"
      }`} />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <Badge variant={sourceConfig.variant} className="gap-1">
              <SourceIcon className="h-3 w-3" />
              {sourceConfig.label}
            </Badge>
            <Badge variant={statusInfo.variant}>
              {statusInfo.label}
            </Badge>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-primary">
              {formatCurrency(job.budget, job.currency)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <h3 className="mb-1 font-semibold leading-tight group-hover:text-primary transition-colors">
            {job.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {job.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span>{job.distance_km?.toFixed(1)}km</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>~{job.estimated_duration_min}분</span>
          </div>
          {job.category_final && (
            <Badge variant="outline" className="font-normal">
              {job.category_final}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{formatTimeRange(job.time_start, job.time_end)}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          className="w-full group-hover:border-primary/50 group-hover:bg-primary/5"
          onClick={() => onSelect?.(job)}
          disabled={job.status !== "POSTED"}
        >
          {job.status === "POSTED" ? (
            <>
              상세 보기
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          ) : (
            statusInfo.label
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
