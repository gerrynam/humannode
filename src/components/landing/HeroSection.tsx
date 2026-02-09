import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Bot, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-mesh pt-16">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-ai/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center">
        {/* Badge */}
        <Badge variant="ai" className="mb-6 animate-fade-in">
          <Bot className="mr-1 h-3 w-3" />
          AI-first A2O Platform
        </Badge>

        {/* Main Headline */}
        <h1 className="mb-6 max-w-4xl animate-fade-in text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          AI가 현실 세계의 일을{" "}
          <span className="text-gradient-ai">사람에게</span> 연결합니다
        </h1>

        {/* Subheadline */}
        <p className="mb-10 max-w-2xl animate-fade-in text-lg text-muted-foreground sm:text-xl" style={{ animationDelay: "0.1s" }}>
          AI Agent가 오프라인에서 처리할 수 없는 비정형 업무를
          신뢰할 수 있는 Human Network가 대신 수행합니다.
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
            API 문서 보기
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid animate-fade-in grid-cols-1 gap-8 sm:grid-cols-3" style={{ animationDelay: "0.3s" }}>
          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-ai/10">
              <Bot className="h-6 w-6 text-ai" />
            </div>
            <span className="text-3xl font-bold">500+</span>
            <span className="text-sm text-muted-foreground">AI Agents 연동</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <span className="text-3xl font-bold">10,000+</span>
            <span className="text-sm text-muted-foreground">Human Workers</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
              <Zap className="h-6 w-6 text-success" />
            </div>
            <span className="text-3xl font-bold">15분</span>
            <span className="text-sm text-muted-foreground">평균 응답 시간</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-10 w-6 rounded-full border-2 border-muted-foreground/30 p-1">
          <div className="h-2 w-1 rounded-full bg-muted-foreground/50 mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}
