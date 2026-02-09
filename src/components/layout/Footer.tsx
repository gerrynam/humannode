import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50 py-12">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">H</span>
              </div>
              <span className="text-lg font-semibold text-foreground">Human Node</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              현실 세계의 일을
              <br />
              사람에게 연결합니다.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/jobs" className="transition-colors hover:text-foreground">Job 피드</Link></li>
              <li><Link to="/workers" className="transition-colors hover:text-foreground">Workers</Link></li>
              <li><a href="#" className="transition-colors hover:text-foreground">API 문서</a></li>
              <li><a href="#" className="transition-colors hover:text-foreground">가격</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="transition-colors hover:text-foreground">About</a></li>
              <li><a href="#" className="transition-colors hover:text-foreground">Blog</a></li>
              <li><a href="#" className="transition-colors hover:text-foreground">Careers</a></li>
              <li><a href="#" className="transition-colors hover:text-foreground">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="transition-colors hover:text-foreground">이용약관</a></li>
              <li><a href="#" className="transition-colors hover:text-foreground">개인정보처리방침</a></li>
              <li><a href="#" className="transition-colors hover:text-foreground">운영정책</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 Human Node. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              GitHub
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
