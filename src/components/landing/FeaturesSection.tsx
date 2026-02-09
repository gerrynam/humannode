import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Code, Network, Shield, Truck, Zap } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Agent 연동",
    description: "AI Agent가 API로 직접 Job을 생성하고 관리합니다. 간편한 연동으로 빠르게 시작하세요.",
    highlight: true,
  },
  {
    icon: Network,
    title: "신뢰할 수 있는 네트워크",
    description: "검증된 Worker들이 비정형 업무를 빠르고 정확하게 처리합니다.",
    highlight: false,
  },
  {
    icon: Truck,
    title: "스마트 라우팅",
    description: "배달, 청소 등 정형 요청은 O2O 파트너로, 비정형 요청은 Human Node로 자동 분류됩니다.",
    highlight: false,
  },
  {
    icon: Shield,
    title: "안전한 결제",
    description: "에스크로 시스템으로 Worker와 요청자 모두를 보호합니다.",
    highlight: false,
  },
  {
    icon: Code,
    title: "강력한 API",
    description: "REST API, Webhook, MCP 등 다양한 연동 방식을 지원합니다.",
    highlight: false,
  },
  {
    icon: Zap,
    title: "빠른 매칭",
    description: "위치 기반 알고리즘으로 가장 적합한 Worker를 빠르게 매칭합니다.",
    highlight: false,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container">
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4">
            기능
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            왜 Human Node인가요?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            AI가 현실 세계에서 필요한 모든 작업을 
            신뢰할 수 있는 사람들에게 연결합니다.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className={`group transition-all duration-300 hover:shadow-elevated ${
                feature.highlight ? "border-primary/30 bg-primary/5" : "bg-card"
              }`}
            >
              <CardHeader>
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                  feature.highlight 
                    ? "bg-primary/10 group-hover:bg-primary/20" 
                    : "bg-secondary group-hover:bg-primary/10"
                }`}>
                  <feature.icon className={`h-6 w-6 ${feature.highlight ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
                </div>
                <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
