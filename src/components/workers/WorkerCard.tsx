import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Worker } from "@/types/worker";
import { Star, MapPin, CheckCircle2, Clock, TrendingUp, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface WorkerCardProps {
  worker: Worker;
  onSelect?: (worker: Worker) => void;
}

export function WorkerCard({ worker, onSelect }: WorkerCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
      {/* Active indicator */}
      <div className={`absolute right-4 top-4 h-3 w-3 rounded-full ${
        worker.active ? "bg-success animate-pulse" : "bg-muted"
      }`} />

      <CardHeader className="pb-3">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-border">
            <AvatarImage src={worker.avatar_url || undefined} alt={worker.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {getInitials(worker.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{worker.name}</h3>
              {worker.verified && (
                <CheckCircle2 className="h-4 w-4 text-primary" />
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{worker.location_text}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-secondary/50">
            <div className="flex items-center justify-center gap-1 text-primary">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-bold">{worker.rating.toFixed(1)}</span>
            </div>
            <p className="text-xs text-muted-foreground">평점</p>
          </div>
          <div className="p-2 rounded-lg bg-secondary/50">
            <div className="font-bold text-foreground">{worker.completed_jobs}</div>
            <p className="text-xs text-muted-foreground">완료</p>
          </div>
          <div className="p-2 rounded-lg bg-secondary/50">
            <div className="font-bold text-foreground">{worker.completion_rate}%</div>
            <p className="text-xs text-muted-foreground">완료율</p>
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1.5">
          {worker.specialties.slice(0, 3).map((specialty) => (
            <Badge key={specialty} variant="outline" className="text-xs">
              {specialty}
            </Badge>
          ))}
          {worker.specialties.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{worker.specialties.length - 3}
            </Badge>
          )}
        </div>

        {/* Response rate */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>응답률 {worker.response_rate}%</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          className="w-full group-hover:border-primary/50 group-hover:bg-primary/5"
          onClick={() => onSelect?.(worker)}
        >
          프로필 보기
        </Button>
      </CardFooter>
    </Card>
  );
}
