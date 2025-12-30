import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Building2, 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard,
  Wallet,
  BookOpen,
  Globe,
  ChevronDown
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/properties", label: t("nav.properties") },
    { href: "/education", label: t("nav.education") },
    { href: "/about", label: t("nav.about") },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl hidden sm:block">PropertyPool</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {isAuthenticated && (
              <>
                <Link
                  href="/marketplace"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/marketplace") ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {t("nav.marketplace")}
                </Link>
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "ur" : "en")}
              className="gap-1"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs">{language === "en" ? "اردو" : "EN"}</span>
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span className="hidden sm:block text-sm">{user?.name || "User"}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                      <LayoutDashboard className="w-4 h-4" />
                      {t("nav.dashboard")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/portfolio" className="flex items-center gap-2 cursor-pointer">
                      <Building2 className="w-4 h-4" />
                      {t("nav.portfolio")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wallet" className="flex items-center gap-2 cursor-pointer">
                      <Wallet className="w-4 h-4" />
                      {t("nav.wallet")}
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center gap-2 cursor-pointer">
                          <LayoutDashboard className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user?.role === "sales" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin/sales-training" className="flex items-center gap-2 cursor-pointer">
                          <BookOpen className="w-4 h-4" />
                          Sales Training
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="text-destructive cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <a href={getLoginUrl()}>{t("nav.login")}</a>
                </Button>
                <Button size="sm" asChild>
                  <a href={getLoginUrl()}>{t("nav.signup")}</a>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated && (
                <>
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("nav.dashboard")}
                  </Link>
                  <Link
                    href="/marketplace"
                    className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("nav.marketplace")}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
