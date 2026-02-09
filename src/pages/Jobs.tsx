import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFilters } from "@/components/jobs/JobFilters";
import { JobDetailModal } from "@/components/jobs/JobDetailModal";
import { mockJobs } from "@/data/mockJobs";
import { Job, RequestSource } from "@/types/job";
import { toast } from "sonner";

export default function Jobs() {
  const [selectedSource, setSelectedSource] = useState<RequestSource | "ALL">("ALL");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredJobs = mockJobs.filter((job) => {
    if (selectedSource === "ALL") return true;
    return job.request_source === selectedSource;
  });

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleAcceptJob = (job: Job) => {
    toast.success(`"${job.title}" Job을 수락했습니다!`);
    setModalOpen(false);
  };

  return (
    <AppLayout title="Jobs">
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
          {filteredJobs.length}개의 Job
        </div>

        {/* Job List */}
        <div className="space-y-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onSelect={() => handleJobClick(job)} />
          ))}
        </div>

        {/* Empty state */}
        {filteredJobs.length === 0 && (
          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border">
            <div className="text-center text-muted-foreground">
              <p>해당 조건의 Job이 없습니다</p>
            </div>
          </div>
        )}

        {/* Job Detail Modal */}
        <JobDetailModal
          job={selectedJob}
          open={modalOpen}
          onOpenChange={setModalOpen}
          onAccept={handleAcceptJob}
        />
      </div>
    </AppLayout>
  );
}
