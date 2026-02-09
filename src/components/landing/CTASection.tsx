import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="border-t border-border bg-background py-24">
      <div className="container">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-elevated sm:p-12">
          <div className="relative text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              지금 시작하세요
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
              AI Agent를 연동하거나, Worker로 수익을 창출하세요.
              Human Node가 가능성을 연결합니다.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button variant="hero" size="xl" className="group">
                API 연동하기
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
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
