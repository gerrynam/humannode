import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">H</span>
          </div>
          <span className="text-lg font-semibold">Human Node</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/jobs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Jobs
          </Link>
          <Link to="/workers" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Workers
          </Link>
          <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            How It Works
          </a>
          <a href="#api" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            API
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button variant="hero" size="sm">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container flex flex-col gap-4 py-4">
            <Link 
              to="/jobs" 
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link 
              to="/workers" 
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Workers
            </Link>
            <a 
              href="#how-it-works" 
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#api" 
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              API
            </a>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="ghost" className="justify-start">
                Sign In
              </Button>
              <Button variant="hero">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
