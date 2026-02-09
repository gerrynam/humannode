import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Bell, 
  ChevronRight, 
  CreditCard, 
  FileText, 
  HelpCircle, 
  LogOut, 
  Settings, 
  Shield, 
  User 
} from "lucide-react";

export default function MyPage() {
  return (
    <AppLayout title="마이페이지">
      <div className="container px-4 py-6">
        {/* Profile Section */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground">로그인이 필요합니다</h2>
              <p className="text-sm text-muted-foreground">로그인하고 서비스를 이용해보세요</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button className="flex-1">로그인</Button>
            <Button variant="outline" className="flex-1">회원가입</Button>
          </div>
        </Card>

        {/* Worker Status Card */}
        <Card className="p-4 mb-6 bg-secondary border-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground">Worker로 활동하기</div>
                <div className="text-xs text-muted-foreground">오프라인 업무를 수행하고 수익을 얻으세요</div>
              </div>
            </div>
            <Badge variant="outline">신청</Badge>
          </div>
        </Card>

        {/* Menu List */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">내 활동</h3>
          
          <MenuItem icon={<FileText className="h-5 w-5" />} label="내 Job 내역" badge="3" />
          <MenuItem icon={<CreditCard className="h-5 w-5" />} label="결제/정산" />
          <MenuItem icon={<Bell className="h-5 w-5" />} label="알림 설정" />
        </div>

        <div className="space-y-2 mt-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">고객지원</h3>
          
          <MenuItem icon={<HelpCircle className="h-5 w-5" />} label="자주 묻는 질문" />
          <MenuItem icon={<Settings className="h-5 w-5" />} label="설정" />
        </div>

        <div className="mt-6">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <LogOut className="h-5 w-5 mr-3" />
            로그아웃
          </Button>
        </div>

        {/* Version Info */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          Human Node v1.0.0
        </div>
      </div>
    </AppLayout>
  );
}

function MenuItem({ 
  icon, 
  label, 
  badge 
}: { 
  icon: React.ReactNode; 
  label: string; 
  badge?: string;
}) {
  return (
    <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-secondary transition-colors">
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground">{icon}</span>
        <span className="font-medium text-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {badge}
          </Badge>
        )}
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </button>
  );
}
