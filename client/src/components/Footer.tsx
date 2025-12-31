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
  ArrowRight
} from "lucide-react";

export default function Footer() {
  const { language } = useLanguage();

  const footerLinks = {
    properties: [
      { label: language === "ur" ? "تمام پراپرٹیز" : "All Properties", href: "/properties" },
      { label: language === "ur" ? "اپارٹمنٹس" : "Apartments", href: "/properties?type=apartment" },
      { label: language === "ur" ? "کمرشل" : "Commercial", href: "/properties?type=commercial" },
      { label: language === "ur" ? "پلاٹس" : "Plots", href: "/properties?type=plot" },
    ],
    resources: [
      { label: language === "ur" ? "سیکھیں" : "Learn", href: "/education" },
      { label: language === "ur" ? "علاقہ گائیڈز" : "Area Guides", href: "/area-guides" },
      { label: language === "ur" ? "قیمت انڈیکس" : "Price Index", href: "/price-index" },
      { label: language === "ur" ? "کیلکولیٹر" : "Calculator", href: "/calculator" },
    ],
    company: [
      { label: language === "ur" ? "ہمارے بارے میں" : "About Us", href: "/about" },
      { label: language === "ur" ? "رابطہ کریں" : "Contact", href: "/about#contact" },
      { label: language === "ur" ? "کیریئرز" : "Careers", href: "/careers" },
      { label: language === "ur" ? "پریس" : "Press", href: "/press" },
    ],
    legal: [
      { label: language === "ur" ? "رازداری پالیسی" : "Privacy Policy", href: "/privacy" },
      { label: language === "ur" ? "شرائط و ضوابط" : "Terms of Service", href: "/terms" },
      { label: language === "ur" ? "رسک ڈسکلوژر" : "Risk Disclosure", href: "/risk-disclosure" },
      { label: language === "ur" ? "شریعت سرٹیفیکیشن" : "Shariah Certification", href: "/shariah" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">
                {language === "ur" ? "اپ ڈیٹ رہیں" : "Stay Updated"}
              </h3>
              <p className="text-gray-400">
                {language === "ur" 
                  ? "نئی پراپرٹیز اور سرمایہ کاری کے مواقع کے بارے میں جانیں"
                  : "Get notified about new properties and investment opportunities"
                }
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder={language === "ur" ? "آپ کا ای میل" : "Enter your email"}
                className="flex-1 md:w-72 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition-colors flex items-center gap-2">
                {language === "ur" ? "سبسکرائب" : "Subscribe"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">
                Property<span className="text-purple-400">Pool</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              {language === "ur" 
                ? "پاکستان کا پہلا فریکشنل پراپرٹی انویسٹمنٹ پلیٹ فارم۔ صرف PKR 50,000 سے پریمیم رئیل اسٹیٹ میں سرمایہ کاری کریں۔"
                : "Pakistan's first fractional property investment platform. Invest in premium real estate starting from just PKR 50,000."
              }
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <a href="mailto:info@propertypool.pk" className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors">
                <Mail className="w-4 h-4" />
                info@propertypool.pk
              </a>
              <a href="tel:+923001234567" className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors">
                <Phone className="w-4 h-4" />
                +92 300 123 4567
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>DHA Phase 5, Lahore, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Properties */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              {language === "ur" ? "پراپرٹیز" : "Properties"}
            </h4>
            <ul className="space-y-3">
              {footerLinks.properties.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              {language === "ur" ? "وسائل" : "Resources"}
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              {language === "ur" ? "کمپنی" : "Company"}
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              {language === "ur" ? "قانونی" : "Legal"}
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} PropertyPool. {language === "ur" ? "جملہ حقوق محفوظ ہیں" : "All rights reserved"}.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
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
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            
            {/* Badges */}
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="px-3 py-1 bg-gray-800 rounded-full">SECP Registered</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full">Shariah Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
