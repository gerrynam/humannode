import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, RotateCcw, ImageIcon } from "lucide-react";

interface EvidenceUploadProps {
  onSubmit: () => void;
}

export function EvidenceUpload({ onSubmit }: EvidenceUploadProps) {
  const [photos, setPhotos] = useState<string[]>([]);

  const handleCapture = () => {
    // Mock photo capture
    const mockPhotos = [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    ];
    setPhotos(mockPhotos);
  };

  const handleRetake = () => {
    setPhotos([]);
  };

  return (
    <div className="space-y-5">
      {photos.length === 0 ? (
        <button
          onClick={handleCapture}
          className="w-full h-64 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
        >
          <Camera className="h-10 w-10" />
          <span className="text-sm font-medium">탭하여 증빙 촬영</span>
        </button>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {photos.map((photo, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img src={photo} alt={`증빙 ${i + 1}`} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-foreground/70 text-background text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                  <ImageIcon className="h-3 w-3" />
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleCapture}
            className="w-full h-20 border-2 border-dashed border-border rounded-xl flex items-center justify-center gap-2 text-muted-foreground hover:border-primary/50"
          >
            <Camera className="h-5 w-5" />
            <span className="text-sm">사진 추가</span>
          </button>
        </div>
      )}

      <div className="bg-secondary rounded-xl p-4 text-sm text-muted-foreground text-center space-y-1">
        <p>완료 사진은 요청자에게 전달됩니다.</p>
        <p>문제 발생 시 증빙으로 사용됩니다.</p>
      </div>

      {photos.length > 0 && (
        <button
          onClick={handleRetake}
          className="flex items-center justify-center gap-2 w-full py-3 text-sm text-muted-foreground"
        >
          <RotateCcw className="h-4 w-4" />
          사진 다시 촬영
        </button>
      )}

      <Button
        className="w-full h-14 text-base font-semibold"
        disabled={photos.length === 0}
        onClick={onSubmit}
      >
        수행 완료
      </Button>
    </div>
  );
}
