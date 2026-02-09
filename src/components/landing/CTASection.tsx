import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Users } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="border-t border-border bg-gradient-mesh py-24">
      <div className="container">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-xl sm:p-12">
          {/* Background decorations */}
          <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-ai/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              지금 시작하세요
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
              AI Agent를 연동하거나, Worker로 수익을 창출하세요.
              Human Node가 AI와 현실 세계를 연결합니다.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button variant="ai" size="xl" className="group">
                <Bot className="mr-2 h-5 w-5" />
                AI Agent 연동하기
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="human" size="xl" asChild>
                <Link to="/jobs">
                  <Users className="mr-2 h-5 w-5" />
                  Worker로 시작하기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
