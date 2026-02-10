import { Home, Briefcase, ClipboardList, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

function NavItem({ to, icon, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center justify-center gap-1 py-2 px-3 min-w-[64px] transition-colors",
          isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        )
      }
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </NavLink>
  );
}

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm pb-safe">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        <NavItem to="/" icon={<Home className="h-5 w-5" />} label="홈" />
        <NavItem to="/jobs" icon={<Briefcase className="h-5 w-5" />} label="요청" />
        <NavItem to="/activity" icon={<ClipboardList className="h-5 w-5" />} label="활동" />
        <NavItem to="/mypage" icon={<User className="h-5 w-5" />} label="마이" />
      </div>
    </nav>
  );
}
