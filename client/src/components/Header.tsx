import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const LOGO_URL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 565 310'%3E%3C/svg%3E";

export function Header() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <header className="border-b bg-white dark:bg-slate-950">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-blue-600">Miemploya</span>
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
