import { useState, useRef, useCallback } from "react";
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

const MINIMIZED_H = 48;
const PARTIAL_H = 280;
const BOTTOM_NAV = 64;

export default function Home() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const postedJobs = mockJobs.filter((j) => j.status === "POSTED");

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const [sheetState, setSheetState] = useState<SheetState>("partial");
  const [sheetHeight, setSheetHeight] = useState(PARTIAL_H);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ y: 0, height: 0 });
  const listRef = useRef<HTMLDivElement>(null);

  // Full height = entire viewport minus bottom nav (covers map completely)
  const fullHeight = typeof window !== "undefined"
    ? window.innerHeight - BOTTOM_NAV
    : 600;

  const snapToState = useCallback((state: SheetState) => {
    setSheetState(state);
    switch (state) {
      case "minimized": setSheetHeight(MINIMIZED_H); break;
      case "partial": setSheetHeight(PARTIAL_H); break;
      case "full": setSheetHeight(fullHeight); break;
    }
  }, [fullHeight]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartRef.current = { y: e.touches[0].clientY, height: sheetHeight };
    setIsDragging(true);
  }, [sheetHeight]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const dy = dragStartRef.current.y - e.touches[0].clientY;
    const newH = Math.max(MINIMIZED_H, Math.min(fullHeight, dragStartRef.current.height + dy));
    setSheetHeight(newH);
  }, [isDragging, fullHeight]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    const thresholdLow = (MINIMIZED_H + PARTIAL_H) / 2;
    const thresholdHigh = (PARTIAL_H + fullHeight) / 2;
    if (sheetHeight < thresholdLow) snapToState("minimized");
    else if (sheetHeight < thresholdHigh) snapToState("partial");
    else snapToState("full");
  }, [sheetHeight, snapToState, fullHeight]);

  const handleListTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    dragStartRef.current = { y: e.touches[0].clientY, height: sheetHeight };
  }, [sheetHeight]);

  const handleListTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const dy = dragStartRef.current.y - e.touches[0].clientY;

    if (sheetState === "minimized") {
      // Swipe up from minimized → partial
      if (dy > 30) {
        snapToState("partial");
        dragStartRef.current = { y: e.touches[0].clientY, height: PARTIAL_H };
      }
    } else if (sheetState === "partial") {
      if (dy > 30) {
        snapToState("full");
        dragStartRef.current = { y: e.touches[0].clientY, height: fullHeight };
      } else if (dy < -30) {
        snapToState("minimized");
        dragStartRef.current = { y: e.touches[0].clientY, height: MINIMIZED_H };
      }
    } else if (sheetState === "full") {
      // At top of scroll, swipe down → partial
      if (el.scrollTop <= 0 && dy < -30) {
        snapToState("partial");
        dragStartRef.current = { y: e.touches[0].clientY, height: PARTIAL_H };
      }
    }
  }, [sheetState, snapToState, fullHeight]);

  const handleListWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (sheetState === "minimized" && e.deltaY < 0) {
      e.preventDefault();
      snapToState("partial");
    } else if (sheetState === "partial" && e.deltaY < 0) {
      e.preventDefault();
      snapToState("full");
    } else if (sheetState === "partial" && e.deltaY > 0) {
      e.preventDefault();
      snapToState("minimized");
    } else if (sheetState === "full" && el.scrollTop <= 0 && e.deltaY > 0) {
      e.preventDefault();
      snapToState("partial");
    }
  }, [sheetState, snapToState]);

  const handleMapInteraction = useCallback(() => {
    if (sheetState !== "minimized") snapToState("minimized");
  }, [sheetState, snapToState]);

  const handleMarkerClick = useCallback((jobId: string) => {
    // Expand sheet so the list is visible, then scroll to the card
    if (sheetState !== "full") {
      snapToState("partial");
    }
    // Use rAF to wait for sheet expansion before scrolling
    requestAnimationFrame(() => {
      const container = listRef.current;
      if (!container) return;
      const cardEl = container.querySelector(`[data-job-id="${jobId}"]`) as HTMLElement | null;
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
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

  const isFull = sheetState === "full" || sheetHeight >= fullHeight - 10;

  return (
    <AppLayout showHeader={false}>
      <div className="flex flex-col h-[calc(100vh-4rem)] relative overflow-hidden">
        {/* Top status toggle */}
        <div className="absolute top-4 left-4 right-4 z-[500]">
          <StatusToggle isOnline={isOnline} onToggle={() => setIsOnline(!isOnline)} />
        </div>

        {/* Map area */}
        <div className="flex-1 min-h-0">
          <HomeMap jobs={postedJobs} onMapInteraction={handleMapInteraction} onMarkerClick={handleMarkerClick} />
        </div>

        {/* Search button - floats above the sheet */}
        {!isFull && (
          <div
            className="absolute left-1/2 -translate-x-1/2 z-[502]"
            style={{
              bottom: sheetHeight + 12,
              transition: isDragging ? "none" : "bottom 0.3s cubic-bezier(0.25,1,0.5,1)",
            }}
          >
            <button
              onClick={() => toast.info("이 지역에서 검색합니다")}
              className="bg-white border-2 border-primary text-primary text-sm font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
            >
              이 지역에서 검색
            </button>
          </div>
        )}

        {/* Draggable bottom sheet */}
        <div
          className={`absolute left-0 right-0 z-[501] bg-background flex flex-col shadow-[0_-4px_20px_rgba(0,0,0,0.1)] ${isFull ? "rounded-none" : "rounded-t-2xl"}`}
          style={{
            bottom: 0,
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
                const newH = Math.max(MINIMIZED_H, Math.min(fullHeight, dragStartRef.current.height + dy));
                setSheetHeight(newH);
              };
              const onUp = () => {
                setIsDragging(false);
                const h = sheetHeight;
                const thresholdLow = (MINIMIZED_H + PARTIAL_H) / 2;
                const thresholdHigh = (PARTIAL_H + fullHeight) / 2;
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

          {/* Header */}
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
            onTouchStart={handleListTouchStart}
            onTouchMove={handleListTouchMove}
            onWheel={handleListWheel}
            style={{
              overflowY: sheetState === "full" ? "auto" : "hidden",
              touchAction: sheetState === "full" ? "auto" : "none",
            }}
          >
            {postedJobs.map((job) => (
              <div key={job.id} data-job-id={job.id}>
                <JobCard
                  job={job}
                  onSelect={handleJobClick}
                  onAccept={handleAcceptJob}
                />
              </div>
            ))}
            {postedJobs.length === 0 && (
              <div className="flex h-24 items-center justify-center">
                <p className="text-sm text-muted-foreground">주변에 요청이 없습니다</p>
              </div>
            )}
          </div>
        </div>

        {/* Job Call Bottom Sheet - above everything */}
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
