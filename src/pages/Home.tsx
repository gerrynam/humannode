import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { HomeMap } from "@/components/home/HomeMap";
import { StatusToggle } from "@/components/home/StatusToggle";
import { JobCard } from "@/components/jobs/JobCard";
import { JobCallSheet } from "@/components/jobs/JobCallSheet";
import { mockJobs } from "@/data/mockJobs";
import { Job } from "@/types/job";
import { toast } from "sonner";

type SheetState = "minimized" | "partial" | "full";

const MINIMIZED_H = 48;  // just handle bar
const PARTIAL_H = 280;   // ~2 cards
const HEADER_H = 56;     // top status toggle area
const BOTTOM_NAV = 64;   // bottom nav height

export default function Home() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const postedJobs = mockJobs.filter((j) => j.status === "POSTED");

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Sheet state
  const [sheetState, setSheetState] = useState<SheetState>("partial");
  const [sheetHeight, setSheetHeight] = useState(PARTIAL_H);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ y: 0, height: 0 });
  const sheetRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const maxHeight = typeof window !== "undefined"
    ? window.innerHeight - BOTTOM_NAV - HEADER_H
    : 600;

  const snapToState = useCallback((state: SheetState) => {
    setSheetState(state);
    switch (state) {
      case "minimized": setSheetHeight(MINIMIZED_H); break;
      case "partial": setSheetHeight(PARTIAL_H); break;
      case "full": setSheetHeight(maxHeight); break;
    }
  }, [maxHeight]);

  // Handle touch drag on the handle bar
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartRef.current = { y: e.touches[0].clientY, height: sheetHeight };
    setIsDragging(true);
  }, [sheetHeight]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const dy = dragStartRef.current.y - e.touches[0].clientY;
    const newH = Math.max(MINIMIZED_H, Math.min(maxHeight, dragStartRef.current.height + dy));
    setSheetHeight(newH);
  }, [isDragging, maxHeight]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    // Snap to nearest state
    const thresholdLow = (MINIMIZED_H + PARTIAL_H) / 2;
    const thresholdHigh = (PARTIAL_H + maxHeight) / 2;
    if (sheetHeight < thresholdLow) {
      snapToState("minimized");
    } else if (sheetHeight < thresholdHigh) {
      snapToState("partial");
    } else {
      snapToState("full");
    }
  }, [sheetHeight, snapToState, maxHeight]);

  // Handle scroll inside list to transition between states
  const handleListScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (sheetState === "partial" && el.scrollTop > 0) {
      // User scrolling up in partial → go full
      el.scrollTop = 0;
      snapToState("full");
    }
  }, [sheetState, snapToState]);

  // Handle wheel on list for transitions
  const handleListWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const el = e.currentTarget;

    if (sheetState === "partial" && e.deltaY < 0) {
      // Scroll up in partial → full
      e.preventDefault();
      snapToState("full");
    } else if (sheetState === "full" && el.scrollTop <= 0 && e.deltaY > 0) {
      // At top of full, scroll down → partial
      e.preventDefault();
      snapToState("partial");
    } else if (sheetState === "partial" && e.deltaY > 0) {
      // Scroll down in partial → minimized
      e.preventDefault();
      snapToState("minimized");
    }
  }, [sheetState, snapToState]);

  // Map interaction → minimize sheet
  const handleMapInteraction = useCallback(() => {
    if (sheetState !== "minimized") {
      snapToState("minimized");
    }
  }, [sheetState, snapToState]);

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
      <div className="flex flex-col h-[calc(100vh-4rem)] relative">
        {/* Top status toggle */}
        <div className="absolute top-4 left-4 right-4 z-[500]">
          <StatusToggle isOnline={isOnline} onToggle={() => setIsOnline(!isOnline)} />
        </div>

        {/* Map area - fills everything */}
        <div className="flex-1 min-h-0">
          <HomeMap jobs={postedJobs} onMapInteraction={handleMapInteraction} />
        </div>

        {/* Draggable bottom sheet */}
        <div
          ref={sheetRef}
          className="absolute bottom-0 left-0 right-0 z-[501] bg-background rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] flex flex-col"
          style={{
            height: sheetHeight,
            transition: isDragging ? "none" : "height 0.3s cubic-bezier(0.25,1,0.5,1)",
          }}
        >
          {/* Drag handle */}
          <div
            className="flex justify-center pt-3 pb-2 cursor-grab shrink-0"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={(e) => {
              dragStartRef.current = { y: e.clientY, height: sheetHeight };
              setIsDragging(true);
              const onMove = (ev: MouseEvent) => {
                const dy = dragStartRef.current.y - ev.clientY;
                const newH = Math.max(MINIMIZED_H, Math.min(maxHeight, dragStartRef.current.height + dy));
                setSheetHeight(newH);
              };
              const onUp = () => {
                setIsDragging(false);
                const h = sheetHeight;
                const thresholdLow = (MINIMIZED_H + PARTIAL_H) / 2;
                const thresholdHigh = (PARTIAL_H + maxHeight) / 2;
                if (h < thresholdLow) snapToState("minimized");
                else if (h < thresholdHigh) snapToState("partial");
                else snapToState("full");
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
              };
              window.addEventListener("mousemove", onMove);
              window.addEventListener("mouseup", onUp);
            }}
            onClick={() => {
              if (sheetState === "minimized") snapToState("partial");
            }}
          >
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>

          {/* Header - shown when not minimized */}
          {sheetHeight > MINIMIZED_H && (
            <div className="px-4 pb-2 shrink-0">
              <h2 className="text-sm font-semibold text-foreground">
                근처 요청 <span className="text-primary">{postedJobs.length}건</span>
              </h2>
            </div>
          )}

          {/* Scrollable job list */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 min-h-0"
            onScroll={handleListScroll}
            onWheel={handleListWheel}
            style={{
              overflowY: sheetState === "full" ? "auto" : "hidden",
            }}
          >
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
