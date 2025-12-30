import { Link } from "wouter";
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">PropertyPool</span>
            </div>
            <p className="text-sm text-background/70">
              Pakistan's first Shariah-compliant fractional property ownership platform. 
              Own premium real estate starting from PKR 50,000.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="/properties" className="hover:text-background transition-colors">Browse Properties</Link></li>
              <li><Link href="/education" className="hover:text-background transition-colors">How It Works</Link></li>
              <li><Link href="/marketplace" className="hover:text-background transition-colors">Secondary Market</Link></li>
              <li><Link href="/about" className="hover:text-background transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="/terms" className="hover:text-background transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-background transition-colors">Privacy Policy</Link></li>
              <li><Link href="/risk-disclosure" className="hover:text-background transition-colors">Risk Disclosure</Link></li>
              <li><Link href="/shariah-compliance" className="hover:text-background transition-colors">Shariah Compliance</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Office 501, Business Bay, Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+92 51 1234567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>info@propertypool.pk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/50">
          <p>© 2024 PropertyPool. All rights reserved.</p>
          <p>Regulated by SECP | Licensed Real Estate Platform</p>
        </div>
      </div>
    </footer>
  );
}
