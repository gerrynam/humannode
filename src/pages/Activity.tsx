import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ActivityCard } from "@/components/activity/ActivityCard";
import { Button } from "@/components/ui/button";
import { mockJobs } from "@/data/mockJobs";

type ActivityTab = "in_progress" | "completed" | "canceled";

export default function Activity() {
  const [tab, setTab] = useState<ActivityTab>("in_progress");

  const inProgress = mockJobs.filter(
    (j) => j.status === "CLAIMED" || j.status === "IN_PROGRESS"
  );
  const completed = mockJobs.filter(
    (j) => j.status === "APPROVED" || j.status === "PAID" || j.status === "SUBMITTED"
  );
  const canceled = mockJobs.filter((j) => j.status === "CANCELED");

  const tabs: { key: ActivityTab; label: string; count: number }[] = [
    { key: "in_progress", label: "진행중", count: inProgress.length },
    { key: "completed", label: "완료", count: completed.length },
    { key: "canceled", label: "취소", count: canceled.length },
  ];

  const currentList =
    tab === "in_progress" ? inProgress : tab === "completed" ? completed : canceled;

  return (
    <AppLayout title="활동 내역">
      <div className="container px-4 py-4">
        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {tabs.map((t) => (
            <Button
              key={t.key}
              variant={tab === t.key ? "default" : "outline"}
              size="sm"
              onClick={() => setTab(t.key)}
              className="gap-1"
            >
              {t.label}
              {t.count > 0 && (
                <span className="text-xs opacity-80">{t.count}</span>
              )}
            </Button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-3">
          {currentList.map((job) => (
            <ActivityCard key={job.id} job={job} />
          ))}
        </div>

        {currentList.length === 0 && (
          <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-border">
            <p className="text-sm text-muted-foreground">
              {tab === "in_progress" && "진행중인 Job이 없습니다"}
              {tab === "completed" && "완료된 Job이 없습니다"}
              {tab === "canceled" && "취소된 Job이 없습니다"}
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
