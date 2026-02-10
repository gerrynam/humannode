import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Job } from "@/types/job";
import { CheckCircle2 } from "lucide-react";

interface JobCompleteSheetProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function JobCompleteSheet({ job, open, onOpenChange, onConfirm }: JobCompleteSheetProps) {
  if (!job) return null;

  const baseFee = Math.round(job.budget * 0.8);
  const extraFee = job.budget - baseFee;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <div className="px-5 pt-6 pb-8 space-y-6">
          {/* Success icon */}
          <div className="text-center space-y-3">
            <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-lg font-bold text-foreground">{job.title} 완료</h2>
            <div className="text-3xl font-bold text-primary">
              {job.budget.toLocaleString()}원
            </div>
          </div>

          <Separator />

          {/* Fee breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">기본 수수료</span>
              <span className="font-medium text-foreground">{baseFee.toLocaleString()}원</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">추가 수수료</span>
              <span className="font-medium text-primary">+{extraFee.toLocaleString()}원</span>
            </div>
          </div>

          <Separator />

          {/* Mission progress */}
          <div className="bg-secondary rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground">진행한 미션</span>
                <p className="text-sm font-semibold text-foreground mt-0.5">
                  9건 더 하면 1만원 보너스
                </p>
              </div>
              <Badge variant="outline" className="text-primary border-primary/30">
                3/10
              </Badge>
            </div>
          </div>

          <Button
            className="w-full h-14 text-base font-semibold"
            onClick={onConfirm}
          >
            확인
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
