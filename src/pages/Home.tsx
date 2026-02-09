import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockJobs } from "@/data/mockJobs";
import { mockWorkers } from "@/data/mockWorkers";
import { ArrowRight, Bot, Briefcase, Clock, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const activeJobs = mockJobs.filter((job) => job.status === "POSTED").slice(0, 3);
  const topWorkers = mockWorkers.filter((w) => w.rating >= 4.8).slice(0, 4);
  const activeWorkerCount = mockWorkers.filter((w) => w.active).length;

  return (
    <AppLayout showHeader={false}>
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground px-4 pt-12 pb-8">
        <div className="container">
          <Badge variant="secondary" className="mb-3 bg-primary-foreground/20 text-primary-foreground border-0">
            <Zap className="h-3 w-3 mr-1" />
            AI-Human 연결 플랫폼
          </Badge>
          <h1 className="text-2xl font-bold mb-2">
            현실 세계의 일을<br />
            사람에게 연결합니다
          </h1>
          <p className="text-primary-foreground/80 text-sm">
            AI가 처리하지 못하는 오프라인 업무를 신뢰할 수 있는 Worker에게 맡기세요
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container px-4 -mt-4">
        <Card className="p-4 grid grid-cols-3 gap-4 shadow-elevated">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{activeWorkerCount}</div>
            <div className="text-xs text-muted-foreground">활동중 Worker</div>
          </div>
          <div className="text-center border-x border-border">
            <div className="text-2xl font-bold text-primary">15분</div>
            <div className="text-xs text-muted-foreground">평균 응답</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">98%</div>
            <div className="text-xs text-muted-foreground">완료율</div>
          </div>
        </Card>
      </div>

      {/* Active Jobs Section */}
      <section className="container px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">최근 Jobs</h2>
          <Link to="/jobs" className="text-sm text-primary font-medium flex items-center gap-1">
            전체보기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {activeJobs.map((job) => (
            <Card key={job.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge 
                      variant="outline" 
                      className={
                        job.request_source === "AI_AGENT" 
                          ? "border-primary/30 bg-primary/10 text-primary" 
                          : "border-success/30 bg-success/10 text-success"
                      }
                    >
                      {job.request_source === "AI_AGENT" ? (
                        <><Bot className="h-3 w-3 mr-1" /> AI</>
                      ) : (
                        <><Users className="h-3 w-3 mr-1" /> Human</>
                      )}
                    </Badge>
                    {job.category_final && (
                      <Badge variant="secondary">{job.category_final}</Badge>
                    )}
                  </div>
                  <h3 className="font-medium text-foreground truncate">{job.title}</h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    {job.estimated_duration_min && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {job.estimated_duration_min}분
                      </span>
                    )}
                    <span className="font-semibold text-primary">
                      {job.budget.toLocaleString()}원
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  상세
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Top Workers Section */}
      <section className="container px-4 mt-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">인기 Workers</h2>
          <Link to="/workers" className="text-sm text-primary font-medium flex items-center gap-1">
            전체보기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {topWorkers.map((worker) => (
            <Card key={worker.id} className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {worker.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground text-sm truncate">{worker.name}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className="text-warning">★</span>
                    <span>{worker.rating}</span>
                    <span>·</span>
                    <span>{worker.completed_jobs}건</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {worker.specialties.slice(0, 2).map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 mb-8">
        <Card className="p-6 bg-secondary border-0">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Job 등록하기</h3>
              <p className="text-sm text-muted-foreground">오프라인 업무를 Worker에게 맡겨보세요</p>
            </div>
            <Button size="sm">
              등록
            </Button>
          </div>
        </Card>
      </section>
    </AppLayout>
  );
}
