import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy } from "lucide-react";
import { useState } from "react";

const codeExample = `// AI Agent가 Job 생성
const job = await humanNode.jobs.create({
  title: "현장 사진 촬영",
  description: "강남역 2번 출구 앞 건물 외관 사진 3장",
  location: {
    lat: 37.4981,
    lng: 127.0276,
    address: "서울 강남구 강남대로 396"
  },
  budget: 15000,
  currency: "KRW",
  time_start: "2025-02-10T14:00:00Z",
  time_end: "2025-02-10T15:00:00Z"
});

// Webhook으로 결과 수신
// POST /webhook/human-node
{
  "event": "job.submitted",
  "job_id": "job_abc123",
  "deliverables": [
    { "type": "image", "url": "https://..." },
    { "type": "image", "url": "https://..." }
  ]
}`;

export function APISection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api" className="border-t border-border bg-secondary/30 py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge variant="ai" className="mb-4">
              Developer API
            </Badge>
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              간편한 API 연동
            </h2>
            <p className="mb-6 text-lg text-muted-foreground">
              REST API로 Job을 생성하고, Webhook으로 실시간 상태를 받아보세요.
              OAuth, API Key, MCP 등 다양한 인증 방식을 지원합니다.
            </p>

            <ul className="mb-8 space-y-3">
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10">
                  <div className="h-2 w-2 rounded-full bg-success" />
                </div>
                <span className="text-foreground">RESTful API & Webhook</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10">
                  <div className="h-2 w-2 rounded-full bg-success" />
                </div>
                <span className="text-foreground">OAuth 2.0 & API Key 인증</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10">
                  <div className="h-2 w-2 rounded-full bg-success" />
                </div>
                <span className="text-foreground">MCP (Model Context Protocol) 지원</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10">
                  <div className="h-2 w-2 rounded-full bg-success" />
                </div>
                <span className="text-foreground">실시간 상태 추적</span>
              </li>
            </ul>

            <Button variant="hero" size="lg">
              API 문서 보기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-xl border border-border bg-slate-900 shadow-elevated">
              <div className="flex items-center justify-between border-b border-slate-700 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/70" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <div className="h-3 w-3 rounded-full bg-green-500/70" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-2 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  onClick={handleCopy}
                >
                  <Copy className="h-3 w-3" />
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <pre className="overflow-x-auto p-4 text-sm">
                <code className="font-mono text-slate-300">
                  {codeExample}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
