import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Wallet, 
  FileCheck,
  Globe,
  ChevronDown,
  Building2,
  GraduationCap,
  Store,
  Info,
  Shield,
  BookOpen
} from "lucide-react";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHeroPage = location === "/" || location === "/about";
  
  const navLinks = [
    { href: "/properties", label: language === "ur" ? "پراپرٹیز" : "Properties", icon: Building2 },
    { href: "/education", label: language === "ur" ? "سیکھیں" : "Learn", icon: GraduationCap },
    { href: "/about", label: language === "ur" ? "ہمارے بارے میں" : "About", icon: Info },
    { href: "/marketplace", label: language === "ur" ? "مارکیٹ پلیس" : "Marketplace", icon: Store },
  ];

  return (
    <nav className={`nav-premium ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isScrolled || !isHeroPage 
                  ? "bg-gradient-to-br from-amber-500 to-yellow-600" 
                  : "bg-gradient-to-br from-amber-500/20 to-yellow-600/20 backdrop-blur-sm border border-amber-500/30"
              } group-hover:scale-105`}>
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled || !isHeroPage ? "text-slate-900" : "text-white"
              }`}>
                PropertyPool
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`nav-link flex items-center gap-2 ${
                  isScrolled || !isHeroPage 
                    ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100" 
                    : "text-white/80 hover:text-white hover:bg-white/10"
                } ${location === link.href 
                    ? (isScrolled || !isHeroPage ? "text-slate-900 bg-slate-100" : "text-white bg-white/10") 
                    : ""
                }`}>
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "ur" : "en")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isScrolled || !isHeroPage 
                  ? "hover:bg-slate-100 text-slate-600" 
                  : "hover:bg-white/10 text-white/80"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === "en" ? "اردو" : "English"}</span>
            </button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isScrolled || !isHeroPage 
                      ? "bg-slate-100 hover:bg-slate-200 text-slate-800" 
                      : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20"
                  }`}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">{user?.name || "User"}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 cursor-pointer">
                      <LayoutDashboard className="w-4 h-4" />
                      {language === "ur" ? "ڈیش بورڈ" : "Dashboard"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/portfolio" className="flex items-center gap-3 px-3 py-2 cursor-pointer">
                      <Building2 className="w-4 h-4" />
                      {language === "ur" ? "پورٹ فولیو" : "Portfolio"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wallet" className="flex items-center gap-3 px-3 py-2 cursor-pointer">
                      <Wallet className="w-4 h-4" />
                      {language === "ur" ? "والیٹ" : "Wallet"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/kyc" className="flex items-center gap-3 px-3 py-2 cursor-pointer">
                      <FileCheck className="w-4 h-4" />
                      {language === "ur" ? "KYC تصدیق" : "KYC Verification"}
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center gap-3 px-3 py-2 cursor-pointer text-amber-600">
                          <Shield className="w-4 h-4" />
                          {language === "ur" ? "ایڈمن پینل" : "Admin Panel"}
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user?.role === "sales" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin/sales-training" className="flex items-center gap-3 px-3 py-2 cursor-pointer">
                          <BookOpen className="w-4 h-4" />
                          Sales Training
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => logout()}
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    {language === "ur" ? "لاگ آؤٹ" : "Logout"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <a href={getLoginUrl()}>
                <button className="btn-premium px-6 py-2.5 text-sm">
                  {language === "ur" ? "لاگ ان / سائن اپ" : "Login / Sign Up"}
                </button>
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled || !isHeroPage ? "hover:bg-slate-100 text-slate-700" : "hover:bg-white/10 text-white"
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-200">
            <div className="container py-6 space-y-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      location === link.href 
                        ? "bg-amber-50 text-amber-700" 
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </div>
                </Link>
              ))}
              
              <div className="border-t border-slate-100 pt-4 mt-4">
                <button
                  onClick={() => setLanguage(language === "en" ? "ur" : "en")}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 w-full"
                >
                  <Globe className="w-5 h-5" />
                  <span className="font-medium">{language === "en" ? "اردو میں دیکھیں" : "View in English"}</span>
                </button>
              </div>

              {isAuthenticated ? (
                <div className="border-t border-slate-100 pt-4 mt-4 space-y-2">
                  <Link href="/dashboard">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700">
                      <LayoutDashboard className="w-5 h-5" />
                      <span className="font-medium">{language === "ur" ? "ڈیش بورڈ" : "Dashboard"}</span>
                    </div>
                  </Link>
                  <button 
                    onClick={() => logout()}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">{language === "ur" ? "لاگ آؤٹ" : "Logout"}</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-slate-100 pt-4 mt-4">
                  <a href={getLoginUrl()} className="block">
                    <button className="w-full btn-premium">
                      {language === "ur" ? "لاگ ان / سائن اپ" : "Login / Sign Up"}
                    </button>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
