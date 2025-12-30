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
  BookOpen,
  Sparkles
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
  
  const navLinks = [
    { href: "/properties", label: language === "ur" ? "پراپرٹیز" : "Properties", icon: Building2 },
    { href: "/education", label: language === "ur" ? "سیکھیں" : "Learn", icon: GraduationCap },
    { href: "/about", label: language === "ur" ? "ہمارے بارے میں" : "About", icon: Info },
    { href: "/marketplace", label: language === "ur" ? "مارکیٹ پلیس" : "Marketplace", icon: Store },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-slate-900/95 backdrop-blur-lg shadow-lg shadow-black/20 border-b border-slate-800" 
        : "bg-slate-900/80 backdrop-blur-sm"
    }`}>
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-lg shadow-amber-500/25">
                <Building2 className="w-6 h-6 text-slate-900" />
              </div>
              <span className="text-xl font-bold text-white">
                PropertyPool
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  location === link.href 
                    ? "text-amber-400 bg-amber-500/10" 
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
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
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-slate-800 text-slate-300 hover:text-white"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === "en" ? "اردو" : "English"}</span>
            </button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                      <User className="w-4 h-4 text-slate-900" />
                    </div>
                    <span className="font-medium">{user?.name || "User"}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 bg-slate-800 border-slate-700">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 cursor-pointer text-slate-200 hover:text-white hover:bg-slate-700 rounded-lg">
                      <LayoutDashboard className="w-4 h-4" />
                      {language === "ur" ? "ڈیش بورڈ" : "Dashboard"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/portfolio" className="flex items-center gap-3 px-3 py-2 cursor-pointer text-slate-200 hover:text-white hover:bg-slate-700 rounded-lg">
                      <Building2 className="w-4 h-4" />
                      {language === "ur" ? "پورٹ فولیو" : "Portfolio"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wallet" className="flex items-center gap-3 px-3 py-2 cursor-pointer text-slate-200 hover:text-white hover:bg-slate-700 rounded-lg">
                      <Wallet className="w-4 h-4" />
                      {language === "ur" ? "والیٹ" : "Wallet"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/kyc" className="flex items-center gap-3 px-3 py-2 cursor-pointer text-slate-200 hover:text-white hover:bg-slate-700 rounded-lg">
                      <FileCheck className="w-4 h-4" />
                      {language === "ur" ? "KYC تصدیق" : "KYC Verification"}
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === "admin" && (
                    <>
                      <DropdownMenuSeparator className="bg-slate-700" />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center gap-3 px-3 py-2 cursor-pointer text-amber-400 hover:text-amber-300 hover:bg-slate-700 rounded-lg">
                          <Shield className="w-4 h-4" />
                          {language === "ur" ? "ایڈمن پینل" : "Admin Panel"}
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user?.role === "sales" && (
                    <>
                      <DropdownMenuSeparator className="bg-slate-700" />
                      <DropdownMenuItem asChild>
                        <Link href="/admin/sales-training" className="flex items-center gap-3 px-3 py-2 cursor-pointer text-slate-200 hover:text-white hover:bg-slate-700 rounded-lg">
                          <BookOpen className="w-4 h-4" />
                          Sales Training
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem 
                    onClick={() => logout()}
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    {language === "ur" ? "لاگ آؤٹ" : "Logout"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold px-6 rounded-xl shadow-lg shadow-amber-500/25">
                    <Sparkles className="mr-2 w-4 h-4" />
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors hover:bg-slate-800 text-white"
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
          <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-900 shadow-xl border-t border-slate-800">
            <div className="container py-6 space-y-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      location === link.href 
                        ? "bg-amber-500/10 text-amber-400" 
                        : "hover:bg-slate-800 text-slate-300"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </div>
                </Link>
              ))}
              
              <div className="border-t border-slate-800 pt-4 mt-4">
                <button
                  onClick={() => setLanguage(language === "en" ? "ur" : "en")}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-300 w-full"
                >
                  <Globe className="w-5 h-5" />
                  <span className="font-medium">{language === "en" ? "اردو میں دیکھیں" : "View in English"}</span>
                </button>
              </div>

              {isAuthenticated ? (
                <div className="border-t border-slate-800 pt-4 mt-4 space-y-2">
                  <Link href="/dashboard">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-300">
                      <LayoutDashboard className="w-5 h-5" />
                      <span className="font-medium">{language === "ur" ? "ڈیش بورڈ" : "Dashboard"}</span>
                    </div>
                  </Link>
                  <button 
                    onClick={() => logout()}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">{language === "ur" ? "لاگ آؤٹ" : "Logout"}</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-slate-800 pt-4 mt-4 space-y-3">
                  <Link href="/login">
                    <Button variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold">
                      <Sparkles className="mr-2 w-4 h-4" />
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
