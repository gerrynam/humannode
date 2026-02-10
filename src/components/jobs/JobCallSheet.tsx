import { useState, useEffect, useCallback } from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job, RequestSource } from "@/types/job";
import { Bot, MapPin, Clock, User, Puzzle, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface JobCallSheetProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: (job: Job) => void;
  onReject: () => void;
}

const sourceConfig: Record<RequestSource, { icon: typeof Bot; label: string }> = {
  AI_AGENT: { icon: Bot, label: "AI 요청" },
  HUMAN_WEB: { icon: User, label: "사람 요청" },
  PARTNER_ROUTED: { icon: Puzzle, label: "파트너" },
};

export function JobCallSheet({ job, open, onOpenChange, onAccept, onReject }: JobCallSheetProps) {
  const [countdown, setCountdown] = useState(31);

  const resetTimer = useCallback(() => {
    setCountdown(31);
  }, []);

  useEffect(() => {
    if (!open) {
      resetTimer();
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onReject();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open, onReject, resetTimer]);

  if (!job) return null;

  const source = sourceConfig[job.request_source];
  const SourceIcon = source.icon;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <div className="px-5 pt-4 pb-6 space-y-5">
          {/* Header badges */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary gap-1">
              <SourceIcon className="h-3 w-3" />
              {source.label}
            </Badge>
            {job.category_final && (
              <Badge variant="secondary">{job.category_final}</Badge>
            )}
          </div>

          {/* Title + Budget */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-foreground">{job.title}</h2>
            <div className="text-3xl font-bold text-primary">
              {job.budget.toLocaleString()}원
            </div>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <span>거리혜택 · 추가 수수료 포함</span>
              <Info className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Location + Duration */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>현재 위치에서 {job.distance_km?.toFixed(1)}km</span>
              <Info className="h-3.5 w-3.5" />
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0" />
              <span>예상 소요 {job.estimated_duration_min}분</span>
            </div>
          </div>

          <Separator />

          {/* Mission card */}
          <div className="bg-secondary rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground">진행되는 미션</span>
                <p className="text-sm font-semibold text-foreground mt-0.5">
                  9건 더 하면 1만원 보너스
                </p>
              </div>
              <Badge variant="outline" className="text-primary border-primary/30">
                2/10
              </Badge>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 h-14 text-base font-semibold"
              onClick={onReject}
            >
              거절
            </Button>
            <Button
              className="flex-[2] h-14 text-base font-semibold gap-2"
              onClick={() => onAccept(job)}
            >
              수락
              <span className="bg-primary-foreground/20 px-2 py-0.5 rounded-md text-sm">
                {countdown}초
              </span>
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
