import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { JobProgressMap } from "@/components/jobs/JobProgressMap";
import { JobLocationInfo } from "@/components/jobs/JobLocationInfo";
import { EvidenceUpload } from "@/components/jobs/EvidenceUpload";
import { JobCompleteSheet } from "@/components/jobs/JobCompleteSheet";
import { mockJobs } from "@/data/mockJobs";
import { ArrowLeft, Phone, MessageSquare } from "lucide-react";
import { toast } from "sonner";

type ProgressStage = "NAVIGATE" | "IN_PROGRESS" | "EVIDENCE" | "COMPLETE";

export default function JobProgress() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = mockJobs.find((j) => j.id === jobId);
  const [stage, setStage] = useState<ProgressStage>("NAVIGATE");
  const [completeOpen, setCompleteOpen] = useState(false);

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Job을 찾을 수 없습니다</p>
      </div>
    );
  }

  const stageLabels: Record<ProgressStage, string> = {
    NAVIGATE: job.category_final || "수행",
    IN_PROGRESS: "수행중",
    EVIDENCE: "증빙 촬영",
    COMPLETE: "완료",
  };

  const handleArrive = () => {
    toast.success("현장 도착을 확인했습니다");
    setStage("IN_PROGRESS");
  };

  const handleSubmitEvidence = () => {
    toast.success("증빙이 제출되었습니다");
    setStage("COMPLETE");
    setCompleteOpen(true);
  };

  const handleComplete = () => {
    setCompleteOpen(false);
    navigate("/");
  };

  const handleCancel = () => {
    toast("배정이 취소되었습니다");
    navigate("/jobs");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <div>
              <span className="font-semibold text-foreground text-sm">{stageLabels[stage]}</span>
              <span className="text-xs text-muted-foreground ml-2">{job.id.toUpperCase()}</span>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-secondary">
            <Phone className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Map */}
      {stage !== "EVIDENCE" && (
        <div className="h-48 relative">
          <JobProgressMap lat={job.lat} lng={job.lng} label={job.location_text} />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 px-4 py-5 space-y-5">
        {stage === "NAVIGATE" && (
          <>
            <JobLocationInfo job={job} />
            <Separator />
            <div className="space-y-3 text-center">
              <button
                onClick={handleCancel}
                className="text-sm text-destructive font-medium"
              >
                배정 취소하기
              </button>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                지원센터에 전화
              </div>
            </div>
            <Button
              className="w-full h-14 text-base font-semibold"
              onClick={handleArrive}
            >
              현장 도착
            </Button>
          </>
        )}

        {stage === "IN_PROGRESS" && (
          <>
            <JobLocationInfo job={job} />

            {/* Requester note */}
            {job.requester_note && (
              <div className="bg-secondary rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">요청자 메모</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "{job.requester_note}"
                </p>
              </div>
            )}

            <Separator />

            {/* Deliverables */}
            {job.deliverables && job.deliverables.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">수행 내역</h4>
                <div className="space-y-2">
                  {job.deliverables.map((d, i) => (
                    <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{d}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between text-sm py-2 font-semibold">
                    <span className="text-foreground">보수</span>
                    <span className="text-primary">{job.budget.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-secondary rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground">
                완료 후 증빙 사진을 꼭 찍어주세요
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                현장 사진을 촬영하면 증빙이 됩니다
              </p>
            </div>

            <Button
              className="w-full h-14 text-base font-semibold"
              onClick={() => setStage("EVIDENCE")}
            >
              증빙 촬영
            </Button>
          </>
        )}

        {stage === "EVIDENCE" && (
          <EvidenceUpload onSubmit={handleSubmitEvidence} />
        )}
      </div>

      {/* Complete Sheet */}
      <JobCompleteSheet
        job={job}
        open={completeOpen}
        onOpenChange={setCompleteOpen}
        onConfirm={handleComplete}
      />
    </div>
  );
}
