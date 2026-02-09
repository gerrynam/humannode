import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { WorkerCard } from "@/components/workers/WorkerCard";
import { WorkerFilters } from "@/components/workers/WorkerFilters";
import { Badge } from "@/components/ui/badge";
import { mockWorkers } from "@/data/mockWorkers";
import { Worker } from "@/types/worker";
import { Shield } from "lucide-react";

export default function WorkersPage() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "verified" | "top_rated" | "active">("all");

  const filteredWorkers = mockWorkers.filter((worker) => {
    switch (selectedFilter) {
      case "verified":
        return worker.verified;
      case "top_rated":
        return worker.rating >= 4.8;
      case "active":
        return worker.active;
      default:
        return true;
    }
  });

  const handleSelectWorker = (worker: Worker) => {
    console.log("Selected worker:", worker);
  };

  const activeCount = mockWorkers.filter((w) => w.active).length;
  const verifiedCount = mockWorkers.filter((w) => w.verified).length;

  return (
    <AppLayout title="Workers">
      <div className="container px-4 py-4">
        {/* Stats */}
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-success/10 border-success/20 text-success">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse mr-1.5" />
            {activeCount}명 활동중
          </Badge>
          <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">
            <Shield className="h-3 w-3 mr-1" />
            {verifiedCount}명 인증됨
          </Badge>
        </div>

        {/* Filters */}
        <div className="mb-4">
          <WorkerFilters
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </div>

        {/* Worker count */}
        <div className="mb-3 text-sm text-muted-foreground">
          {filteredWorkers.length}명의 Worker
        </div>

        {/* Worker Grid */}
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
          {filteredWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} onSelect={handleSelectWorker} />
          ))}
        </div>

        {/* Empty state */}
        {filteredWorkers.length === 0 && (
          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border">
            <div className="text-center text-muted-foreground">
              <p>해당 조건의 Worker가 없습니다</p>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
