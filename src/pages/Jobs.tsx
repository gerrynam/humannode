import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFilters } from "@/components/jobs/JobFilters";
import { JobCallSheet } from "@/components/jobs/JobCallSheet";
import { mockJobs } from "@/data/mockJobs";
import { Job, RequestSource } from "@/types/job";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
  const navigate = useNavigate();
  const [selectedSource, setSelectedSource] = useState<RequestSource | "ALL">("ALL");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filteredJobs = mockJobs.filter((job) => {
    if (selectedSource === "ALL") return true;
    return job.request_source === selectedSource;
  });

  const handleJobClick = (job: Job) => {
    if (job.status === "POSTED") {
      setSelectedJob(job);
      setSheetOpen(true);
    }
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
    <AppLayout title="요청">
      <div className="container px-4 py-4">
        {/* Filters */}
        <div className="mb-4">
          <JobFilters
            selectedSource={selectedSource}
            onSourceChange={setSelectedSource}
          />
        </div>

        {/* Job count */}
        <div className="mb-3 text-sm text-muted-foreground">
          실시간 요청 {filteredJobs.length}건
        </div>

        {/* Job List */}
        <div className="space-y-3">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSelect={handleJobClick}
              onAccept={handleAcceptJob}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredJobs.length === 0 && (
          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border">
            <div className="text-center text-muted-foreground">
              <p>해당 조건의 요청이 없습니다</p>
            </div>
          </div>
        )}

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
