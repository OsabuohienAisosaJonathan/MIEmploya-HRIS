import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function Header() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <header className="border-b bg-white dark:bg-slate-950 sticky top-0 z-40">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center gap-2 hover-elevate">
          <img src="/logo.png" alt="Miemploya" className="h-10" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className={`text-sm font-medium ${isActive("/") ? "text-blue-600" : "text-foreground"}`}>
            Home
          </Link>
          <Link href="/about" className={`text-sm font-medium ${isActive("/about") ? "text-blue-600" : "text-foreground"}`}>
            About
          </Link>
          <Link href="/services" className={`text-sm font-medium ${isActive("/services") ? "text-blue-600" : "text-foreground"}`}>
            Services
          </Link>
          <Link href="/verified" className={`text-sm font-medium ${isActive("/verified") ? "text-blue-600" : "text-foreground"}`}>
            Top Verified
          </Link>
          <Link href="/templates" className={`text-sm font-medium ${isActive("/templates") ? "text-blue-600" : "text-foreground"}`}>
            Books & Templates
          </Link>
          <Link href="/jobs" className={`text-sm font-medium ${isActive("/jobs") ? "text-blue-600" : "text-foreground"}`}>
            Jobs
          </Link>
          <Link href="/contact" className={`text-sm font-medium ${isActive("/contact") ? "text-blue-600" : "text-foreground"}`}>
            Contact
          </Link>
        </nav>

        <Link href="/admin/login">
          <Button variant="outline" size="sm">
            Admin
          </Button>
        </Link>
      </div>
    </header>
  );
}
