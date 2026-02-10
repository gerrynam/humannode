import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Job } from "@/types/job";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ActivityCardProps {
  job: Job;
}

export function ActivityCard({ job }: ActivityCardProps) {
  const navigate = useNavigate();
  const isInProgress = job.status === "CLAIMED" || job.status === "IN_PROGRESS";
  const isCanceled = job.status === "CANCELED";
  const isComplete = job.status === "APPROVED" || job.status === "PAID" || job.status === "SUBMITTED";

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {isInProgress && <Clock className="h-5 w-5 text-warning" />}
          {isComplete && <CheckCircle2 className="h-5 w-5 text-success" />}
          {isCanceled && <XCircle className="h-5 w-5 text-destructive" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-foreground text-sm truncate">{job.title}</h3>
            {isInProgress && (
              <Badge variant="outline" className="border-warning/30 bg-warning/10 text-warning text-xs shrink-0">
                수행중
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{job.location_text}</p>
          {isInProgress && (
            <Button
              size="sm"
              className="mt-3 w-full"
              onClick={() => navigate(`/jobs/${job.id}/progress`)}
            >
              증빙 제출하기
            </Button>
          )}
        </div>
        <div className="text-right shrink-0">
          {(isComplete || isCanceled) && (
            <>
              <span className="text-sm font-bold text-foreground">
                {isComplete ? `₩${job.budget.toLocaleString()}` : "취소"}
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isComplete ? `완료 ${formatTime(job.time_end)}` : ""}
              </p>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
