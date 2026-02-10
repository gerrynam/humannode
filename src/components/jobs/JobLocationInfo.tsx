import { Copy, Navigation, ParkingCircle } from "lucide-react";
import { toast } from "sonner";
import { Job } from "@/types/job";

interface JobLocationInfoProps {
  job: Job;
}

export function JobLocationInfo({ job }: JobLocationInfoProps) {
  const copyAddress = () => {
    navigator.clipboard.writeText(job.location_text);
    toast.success("주소가 복사되었습니다");
  };

  return (
    <div className="space-y-4">
      {/* Address */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-base">{job.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{job.location_text}</p>
        </div>
        <button
          onClick={copyAddress}
          className="shrink-0 p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground"
        >
          <Copy className="h-4 w-4" />
        </button>
      </div>

      {/* Finding tip */}
      {job.finding_tip && (
        <div className="bg-secondary rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Navigation className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">현장 찾기 팁</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{job.finding_tip}</p>
        </div>
      )}

      {/* Parking tip */}
      {job.parking_tip && (
        <div className="bg-secondary rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <ParkingCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">주차/접근 팁</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{job.parking_tip}</p>
        </div>
      )}
    </div>
  );
}
