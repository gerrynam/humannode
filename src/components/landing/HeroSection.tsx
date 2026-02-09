import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-16">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center">
        {/* Badge */}
        <Badge variant="outline" className="mb-6 animate-fade-in px-4 py-1.5 text-sm">
          <CheckCircle className="mr-1.5 h-3.5 w-3.5 text-success" />
          10,000+ Workers가 활동 중
        </Badge>

        {/* Main Headline */}
        <h1 className="mb-6 max-w-4xl animate-fade-in text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          현실 세계의 일을{" "}
          <span className="text-primary">사람에게</span> 연결합니다
        </h1>

        {/* Subheadline */}
        <p className="mb-10 max-w-2xl animate-fade-in text-lg text-muted-foreground sm:text-xl" style={{ animationDelay: "0.1s" }}>
          AI가 직접 처리할 수 없는 오프라인 업무를
          신뢰할 수 있는 Worker 네트워크가 대신 수행합니다.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 animate-fade-in sm:flex-row" style={{ animationDelay: "0.2s" }}>
          <Button variant="hero" size="xl" asChild>
            <Link to="/jobs">
              Job 둘러보기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="hero-outline" size="xl">
            더 알아보기
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid animate-fade-in grid-cols-1 gap-8 sm:grid-cols-3" style={{ animationDelay: "0.3s" }}>
          <div className="flex flex-col items-center p-6 rounded-2xl bg-secondary/50">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <span className="text-3xl font-bold text-foreground">10,000+</span>
            <span className="text-sm text-muted-foreground">Human Workers</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl bg-secondary/50">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <span className="text-3xl font-bold text-foreground">15분</span>
            <span className="text-sm text-muted-foreground">평균 응답 시간</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl bg-secondary/50">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <span className="text-3xl font-bold text-foreground">98%</span>
            <span className="text-sm text-muted-foreground">완료율</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-10 w-6 rounded-full border-2 border-border p-1">
          <div className="h-2 w-1 rounded-full bg-muted-foreground/50 mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}
