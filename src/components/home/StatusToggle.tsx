import { cn } from "@/lib/utils";

interface StatusToggleProps {
  isOnline: boolean;
  onToggle: () => void;
}

export function StatusToggle({ isOnline, onToggle }: StatusToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all shadow-elevated",
        isOnline
          ? "bg-primary text-primary-foreground"
          : "bg-card text-foreground border border-border"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-3 h-3 rounded-full",
            isOnline ? "bg-green-400 animate-pulse-subtle" : "bg-muted-foreground/40"
          )}
        />
        <span className="font-semibold text-[15px]">
          {isOnline ? "일감을 찾고 있어요" : "오프라인 상태"}
        </span>
      </div>
      <div
        className={cn(
          "w-12 h-7 rounded-full relative transition-colors",
          isOnline ? "bg-primary-foreground/20" : "bg-muted"
        )}
      >
        <div
          className={cn(
            "absolute top-0.5 w-6 h-6 rounded-full transition-all shadow-sm",
            isOnline
              ? "right-0.5 bg-primary-foreground"
              : "left-0.5 bg-muted-foreground/50"
          )}
        />
      </div>
    </button>
  );
}
