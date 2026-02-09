import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WorkerCard } from "@/components/workers/WorkerCard";
import { WorkerFilters } from "@/components/workers/WorkerFilters";
import { Badge } from "@/components/ui/badge";
import { mockWorkers } from "@/data/mockWorkers";
import { Worker } from "@/types/worker";
import { Users, Shield } from "lucide-react";

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
    // TODO: Navigate to worker detail or open modal
  };

  const activeCount = mockWorkers.filter((w) => w.active).length;
  const verifiedCount = mockWorkers.filter((w) => w.verified).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container pb-20 pt-24">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-primary" />
            <Badge variant="outline">Human Network</Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Worker 네트워크</h1>
          <p className="text-muted-foreground">
            신뢰할 수 있는 Worker들이 오프라인 업무를 수행합니다.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/20">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-foreground">{activeCount}명 활동중</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{verifiedCount}명 인증됨</span>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <WorkerFilters
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </div>

        {/* Worker count */}
        <div className="mb-4 text-sm text-muted-foreground">
          {filteredWorkers.length}명의 Worker
        </div>

        {/* Worker Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} onSelect={handleSelectWorker} />
          ))}
        </div>

        {/* Empty state */}
        {filteredWorkers.length === 0 && (
          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border">
            <div className="text-center text-muted-foreground">
              <Users className="mx-auto mb-2 h-8 w-8" />
              <p>해당 조건의 Worker가 없습니다</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
