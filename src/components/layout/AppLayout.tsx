import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
}

export function AppLayout({ children, title, showHeader = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background pb-20">
      {showHeader && title && (
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="container flex h-14 items-center">
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          </div>
        </header>
      )}
      <main>{children}</main>
      <BottomNav />
    </div>
  );
}
