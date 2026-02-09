import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFilters } from "@/components/jobs/JobFilters";
import { JobDetailModal } from "@/components/jobs/JobDetailModal";
import { Badge } from "@/components/ui/badge";
import { mockJobs } from "@/data/mockJobs";
import { RequestSource, Job } from "@/types/job";
import { Briefcase, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function JobsPage() {
  const [selectedSource, setSelectedSource] = useState<RequestSource | "ALL">("ALL");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredJobs = mockJobs.filter((job) => {
    if (selectedSource === "ALL") return true;
    return job.request_source === selectedSource;
  });

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleAcceptJob = (job: Job) => {
    toast.success(`"${job.title}" Job을 수락했습니다!`);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container pb-20 pt-24">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <Badge variant="outline">Worker</Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Job 피드</h1>
          <p className="text-muted-foreground">
            주변의 Job을 확인하고 수락하세요. AI 요청이 우선 표시됩니다.
          </p>
        </div>

        {/* Location indicator */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>서울 강남구 역삼동 기준</span>
          <button className="text-primary hover:underline">위치 변경</button>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <JobFilters
            selectedSource={selectedSource}
            onSourceChange={setSelectedSource}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        {/* Job count */}
        <div className="mb-4 text-sm text-muted-foreground">
          {filteredJobs.length}개의 Job
        </div>

        {/* Job List */}
        {viewMode === "list" ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} onSelect={handleSelectJob} />
            ))}
          </div>
        ) : (
          <div className="flex h-96 items-center justify-center rounded-xl border border-dashed border-border bg-secondary/30">
            <div className="text-center text-muted-foreground">
              <MapPin className="mx-auto mb-2 h-8 w-8" />
              <p>지도 뷰는 준비 중입니다</p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {filteredJobs.length === 0 && (
          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border">
            <div className="text-center text-muted-foreground">
              <Briefcase className="mx-auto mb-2 h-8 w-8" />
              <p>해당 조건의 Job이 없습니다</p>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Job Detail Modal */}
      <JobDetailModal
        job={selectedJob}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onAccept={handleAcceptJob}
      />
    </div>
  );
}
