import { Badge } from "@/components/ui/badge";
import { Bot, CheckCircle, CreditCard, FileText, Send, UserCheck } from "lucide-react";

const steps = [
  {
    icon: Bot,
    title: "AI가 Job 생성",
    description: "AI Agent가 API를 통해 오프라인 작업 요청을 생성합니다.",
    badge: "AI_AGENT",
    badgeVariant: "ai" as const,
  },
  {
    icon: FileText,
    title: "자동 분류",
    description: "정형 요청은 파트너로, 비정형 요청은 Human Node로 라우팅됩니다.",
    badge: "ROUTING",
    badgeVariant: "secondary" as const,
  },
  {
    icon: UserCheck,
    title: "Worker 수락",
    description: "가까운 Worker가 Job을 확인하고 수락합니다.",
    badge: "CLAIMED",
    badgeVariant: "warning" as const,
  },
  {
    icon: Send,
    title: "수행 & 증빙",
    description: "Worker가 현장에서 업무를 수행하고 결과를 제출합니다.",
    badge: "SUBMITTED",
    badgeVariant: "pending" as const,
  },
  {
    icon: CheckCircle,
    title: "승인",
    description: "AI 또는 요청자가 결과를 검토하고 승인합니다.",
    badge: "APPROVED",
    badgeVariant: "success" as const,
  },
  {
    icon: CreditCard,
    title: "정산",
    description: "에스크로에서 Worker에게 보수가 지급됩니다.",
    badge: "PAID",
    badgeVariant: "success" as const,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-t border-border bg-secondary/30 py-24">
      <div className="container">
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4">
            프로세스
          </Badge>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            어떻게 작동하나요?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            AI Agent의 요청부터 Worker 정산까지, 
            모든 과정이 자동화되어 있습니다.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-ai via-accent to-success lg:block" />

          <div className="grid gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                  <Badge variant={step.badgeVariant} className="mb-2 font-mono text-xs">
                    {step.badge}
                  </Badge>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-card shadow-lg">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>

                <div className="hidden flex-1 lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
