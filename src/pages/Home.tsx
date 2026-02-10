import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { HomeMap } from "@/components/home/HomeMap";
import { StatusToggle } from "@/components/home/StatusToggle";
import { JobCard } from "@/components/jobs/JobCard";
import { JobCallSheet } from "@/components/jobs/JobCallSheet";
import { mockJobs } from "@/data/mockJobs";
import { Job } from "@/types/job";
import { toast } from "sonner";
import { GripHorizontal } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const postedJobs = mockJobs.filter((j) => j.status === "POSTED");

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setSheetOpen(true);
  };

  const handleAcceptJob = (job: Job) => {
    toast.success(`"${job.title}" 요청을 수락했습니다!`);
    setSheetOpen(false);
    navigate(`/jobs/${job.id}/progress`);
  };

  const handleReject = () => {
    setSheetOpen(false);
    setSelectedJob(null);
  };

  return (
    <AppLayout showHeader={false}>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Map area - fills remaining space */}
        <div className="relative flex-1 min-h-0">
          <HomeMap jobs={postedJobs} />

          {/* Status toggle overlay on map */}
          <div className="absolute bottom-4 left-4 right-4 z-[500]">
            <StatusToggle isOnline={isOnline} onToggle={() => setIsOnline(!isOnline)} />
          </div>
        </div>

        {/* Bottom draggable job list panel */}
        <div className="bg-background rounded-t-2xl -mt-4 relative z-[501] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex flex-col max-h-[55vh] min-h-[140px]">
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-2 cursor-grab">
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>

          {/* Header */}
          <div className="px-4 pb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">
              근처 요청 <span className="text-primary">{postedJobs.length}건</span>
            </h2>
          </div>

          {/* Scrollable job list */}
          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
            {postedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onSelect={handleJobClick}
                onAccept={handleAcceptJob}
              />
            ))}
            {postedJobs.length === 0 && (
              <div className="flex h-24 items-center justify-center">
                <p className="text-sm text-muted-foreground">주변에 요청이 없습니다</p>
              </div>
            )}
          </div>
        </div>

        {/* Job Call Bottom Sheet */}
        <JobCallSheet
          job={selectedJob}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          onAccept={handleAcceptJob}
          onReject={handleReject}
        />
      </div>
    </AppLayout>
  );
}
