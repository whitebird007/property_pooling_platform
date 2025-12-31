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
  MapPin,
  Calculator,
  Store,
  BookOpen
} from "lucide-react";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navLinks = [
    { href: "/properties", label: language === "ur" ? "پراپرٹیز" : "Properties", icon: Building2 },
    { href: "/area-guides", label: language === "ur" ? "علاقہ گائیڈز" : "Area Guides", icon: MapPin },
    { href: "/calculator", label: language === "ur" ? "کیلکولیٹر" : "Calculator", icon: Calculator },
    { href: "/marketplace", label: language === "ur" ? "مارکیٹ پلیس" : "Marketplace", icon: Store },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/98 backdrop-blur-md shadow-sm border-b border-gray-100" 
        : "bg-white/95 backdrop-blur-sm"
    }`}>
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Property<span className="text-purple-600">Pool</span>
              </span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className={`nav-link ${isActive(link.href) ? 'active' : ''}`}>
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </a>
              </Link>
            ))}
            
            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="nav-link">
                  <BookOpen className="w-4 h-4" />
                  {language === "ur" ? "مزید" : "More"}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200 shadow-lg rounded-xl p-1">
                <DropdownMenuItem asChild>
                  <Link href="/education">
                    <a className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg cursor-pointer w-full">
                      <BookOpen className="w-4 h-4" />
                      {language === "ur" ? "سیکھیں" : "Learn"}
                    </a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/price-index">
                    <a className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg cursor-pointer w-full">
                      <Calculator className="w-4 h-4" />
                      {language === "ur" ? "قیمت انڈیکس" : "Price Index"}
                    </a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about">
                    <a className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg cursor-pointer w-full">
                      <User className="w-4 h-4" />
                      {language === "ur" ? "ہمارے بارے میں" : "About Us"}
                    </a>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "ur" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Globe className="w-4 h-4" />
              {language === "ur" ? "EN" : "اردو"}
            </button>

            {/* Auth Section */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
                      {user.name || "Investor"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg rounded-xl p-1">
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <p className="text-sm font-medium text-gray-900">{user.name || "Investor"}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <a className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg cursor-pointer w-full">
                        <LayoutDashboard className="w-4 h-4" />
                        {language === "ur" ? "ڈیش بورڈ" : "Dashboard"}
                      </a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wallet">
                      <a className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg cursor-pointer w-full">
                        <Wallet className="w-4 h-4" />
                        {language === "ur" ? "والیٹ" : "Wallet"}
                      </a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/kyc">
                      <a className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg cursor-pointer w-full">
                        <FileCheck className="w-4 h-4" />
                        {language === "ur" ? "KYC تصدیق" : "KYC Verification"}
                      </a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 bg-gray-100" />
                  <DropdownMenuItem 
                    onClick={() => logout()}
                    className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    {language === "ur" ? "لاگ آؤٹ" : "Logout"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <a className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                    {language === "ur" ? "لاگ ان" : "Login"}
                  </a>
                </Link>
                <a 
                  href={getLoginUrl()}
                  className="btn-primary text-sm px-4 py-2"
                >
                  {language === "ur" ? "شروع کریں" : "Get Started"}
                </a>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive(link.href) 
                        ? 'bg-purple-50 text-purple-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </a>
                </Link>
              ))}
              <Link href="/education">
                <a 
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BookOpen className="w-5 h-5" />
                  {language === "ur" ? "سیکھیں" : "Learn"}
                </a>
              </Link>
              <Link href="/about">
                <a 
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  {language === "ur" ? "ہمارے بارے میں" : "About Us"}
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
