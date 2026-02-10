import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { HomeMap } from "@/components/home/HomeMap";
import { StatusToggle } from "@/components/home/StatusToggle";
import { TodayEarnings } from "@/components/home/TodayEarnings";
import { WeeklyChart } from "@/components/home/WeeklyChart";
import { mockJobs } from "@/data/mockJobs";

export default function Home() {
  const [isOnline, setIsOnline] = useState(false);
  const postedJobs = mockJobs.filter((j) => j.status === "POSTED");

  return (
    <AppLayout showHeader={false}>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Map area */}
        <div className="relative flex-1 min-h-[280px]">
          <HomeMap jobs={postedJobs} />

          {/* Status toggle overlay on map */}
          <div className="absolute bottom-4 left-4 right-4 z-[500]">
            <StatusToggle isOnline={isOnline} onToggle={() => setIsOnline(!isOnline)} />
          </div>
        </div>

        {/* Bottom dashboard */}
        <div className="bg-background px-4 pt-5 pb-2 space-y-4 overflow-y-auto max-h-[45vh]">
          <TodayEarnings earnings={75000} completedJobs={3} goal={100000} />
          <WeeklyChart />
        </div>
      </div>
    </AppLayout>
  );
}
