import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Shield,
  CheckCircle2,
  Landmark,
  ArrowRight
} from "lucide-react";

export default function Footer() {
  const { language } = useLanguage();

  const quickLinks = [
    { href: "/properties", label: language === "ur" ? "پراپرٹیز" : "Properties" },
    { href: "/education", label: language === "ur" ? "سیکھیں" : "Learn" },
    { href: "/about", label: language === "ur" ? "ہمارے بارے میں" : "About Us" },
    { href: "/marketplace", label: language === "ur" ? "مارکیٹ پلیس" : "Marketplace" },
  ];

  const investorLinks = [
    { href: "/dashboard", label: language === "ur" ? "ڈیش بورڈ" : "Dashboard" },
    { href: "/portfolio", label: language === "ur" ? "پورٹ فولیو" : "Portfolio" },
    { href: "/wallet", label: language === "ur" ? "والیٹ" : "Wallet" },
    { href: "/kyc", label: language === "ur" ? "KYC تصدیق" : "KYC Verification" },
  ];

  const legalLinks = [
    { href: "#", label: language === "ur" ? "رازداری کی پالیسی" : "Privacy Policy" },
    { href: "#", label: language === "ur" ? "شرائط و ضوابط" : "Terms of Service" },
    { href: "#", label: language === "ur" ? "رسک ڈسکلوژر" : "Risk Disclosure" },
    { href: "#", label: language === "ur" ? "شریعہ سرٹیفکیٹ" : "Shariah Certificate" },
  ];

  return (
    <footer className="footer-premium text-white pt-20 pb-8">
      {/* Main Footer Content */}
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/">
              <div className="flex items-center gap-3 mb-6 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold">PropertyPool</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {language === "ur" 
                ? "پاکستان کا پہلا شریعہ مطابق فریکشنل پراپرٹی انویسٹمنٹ پلیٹ فارم۔ صرف 50,000 روپے سے پریمیم رئیل اسٹیٹ میں سرمایہ کاری شروع کریں۔"
                : "Pakistan's first Shariah-compliant fractional property investment platform. Start investing in premium real estate from just PKR 50,000."}
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span className="text-gray-300">SECP</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span className="text-gray-300">Shariah</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
                <Landmark className="w-3.5 h-3.5 text-primary" />
                <span className="text-gray-300">FBR</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary to-emerald-600 rounded-full"></div>
              {language === "ur" ? "فوری لنکس" : "Quick Links"}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer">
                      <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Investor Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary to-emerald-600 rounded-full"></div>
              {language === "ur" ? "سرمایہ کاروں کے لیے" : "For Investors"}
            </h4>
            <ul className="space-y-3">
              {investorLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer">
                      <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary to-emerald-600 rounded-full"></div>
              {language === "ur" ? "رابطہ کریں" : "Contact Us"}
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@propertypool.pk" className="flex items-start gap-3 text-gray-400 hover:text-primary transition-colors">
                  <Mail className="w-5 h-5 mt-0.5 text-primary" />
                  <span>info@propertypool.pk</span>
                </a>
              </li>
              <li>
                <a href="tel:+923001234567" className="flex items-start gap-3 text-gray-400 hover:text-primary transition-colors">
                  <Phone className="w-5 h-5 mt-0.5 text-primary" />
                  <span>+92 300 1234567</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                <span>
                  {language === "ur" 
                    ? "آفس 501، ایمرالڈ ٹاور، گلبرگ III، لاہور"
                    : "Office 501, Emerald Tower, Gulberg III, Lahore"}
                </span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Youtube, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white/10 hover:border-primary/30 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10 pt-12 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-semibold mb-3">
              {language === "ur" ? "نیوز لیٹر سبسکرائب کریں" : "Subscribe to Our Newsletter"}
            </h4>
            <p className="text-gray-400 mb-6">
              {language === "ur" 
                ? "نئی پراپرٹیز اور سرمایہ کاری کے مواقع کے بارے میں سب سے پہلے جانیں"
                : "Be the first to know about new properties and investment opportunities"}
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={language === "ur" ? "اپنا ای میل درج کریں" : "Enter your email"}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button className="btn-premium px-6 py-3">
                {language === "ur" ? "سبسکرائب" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} PropertyPool. {language === "ur" ? "جملہ حقوق محفوظ ہیں" : "All rights reserved."}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-500 hover:text-primary text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
