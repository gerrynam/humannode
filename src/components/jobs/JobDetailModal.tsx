import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Job, RequestSource, JobStatus } from "@/types/job";
import { Bot, Clock, MapPin, User, Puzzle, Calendar, Wallet, CheckCircle2, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface JobDetailModalProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept?: (job: Job) => void;
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

export function JobDetailModal({ job, open, onOpenChange, onAccept }: JobDetailModalProps) {
  if (!job) return null;

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

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("ko-KR", {
      month: "long",
      day: "numeric",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={sourceConfig.variant} className="gap-1">
              <SourceIcon className="h-3 w-3" />
              {sourceConfig.label}
            </Badge>
            <Badge variant={statusInfo.variant}>
              {statusInfo.label}
            </Badge>
          </div>
          <DialogTitle className="text-xl">{job.title}</DialogTitle>
          <DialogDescription className="text-base">
            {job.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Budget Section */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">보수</span>
            </div>
            <span className="text-2xl font-bold text-primary">
              {formatCurrency(job.budget, job.currency)}
            </span>
          </div>

          <Separator />

          {/* Details Grid */}
          <div className="grid gap-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">위치</p>
                <p className="font-medium">{job.location_text}</p>
                {job.distance_km && (
                  <p className="text-sm text-muted-foreground">현재 위치에서 {job.distance_km.toFixed(1)}km</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">수행 시간</p>
                <p className="font-medium">{formatDateTime(job.time_start)}</p>
                <p className="text-sm text-muted-foreground">~ {formatDateTime(job.time_end)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">예상 소요 시간</p>
                <p className="font-medium">약 {job.estimated_duration_min}분</p>
              </div>
            </div>

            {job.category_final && (
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">카테고리</p>
                  <Badge variant="outline">{job.category_final}</Badge>
                </div>
              </div>
            )}
          </div>

          {/* Risk Warning for Human Web requests */}
          {job.request_source === "HUMAN_WEB" && job.risk_score && job.risk_score > 10 && (
            <>
              <Separator />
              <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/10 border border-warning/30">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <p className="font-medium text-warning">주의사항</p>
                  <p className="text-sm text-muted-foreground">
                    사람이 요청한 Job입니다. 수행 전 요청 내용을 꼼꼼히 확인하세요.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {job.status === "POSTED" ? (
            <>
              <Button 
                variant="ai" 
                className="w-full"
                onClick={() => onAccept?.(job)}
              >
                Job 수락하기
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onOpenChange(false)}
              >
                닫기
              </Button>
            </>
          ) : (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onOpenChange(false)}
            >
              닫기
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
