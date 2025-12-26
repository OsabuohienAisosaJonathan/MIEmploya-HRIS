import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => location === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/videos", label: "Videos" },
    { href: "/verified", label: "Top Verified" },
    { href: "/templates", label: "Books & Templates" },
    { href: "/jobs", label: "Jobs" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="border-b bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Miemploya" className="h-14" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive(link.href)
                  ? "text-primary bg-primary/10"
                  : "text-foreground/80 hover:text-foreground hover:bg-muted"
              }`}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background animate-fade-in">
          <nav className="container px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
