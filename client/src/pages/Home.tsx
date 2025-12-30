import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { 
  ArrowRight, 
  Play, 
  Shield, 
  Building2, 
  TrendingUp, 
  Users,
  CheckCircle2,
  Sparkles,
  MapPin,
  Percent,
  Clock,
  Award,
  ChevronDown,
  Star,
  Wallet,
  FileCheck,
  Scale
} from "lucide-react";

export default function Home() {
  const { language, t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  
  const { data: properties } = trpc.properties.list.useQuery({});
  const featuredProperties = properties?.slice(0, 3) || [];

  const stats = [
    { value: "PKR 500M+", label: language === "ur" ? "کل پراپرٹی ویلیو" : "Total Property Value", icon: Building2 },
    { value: "2,500+", label: language === "ur" ? "فعال سرمایہ کار" : "Active Investors", icon: Users },
    { value: "8-12%", label: language === "ur" ? "سالانہ منافع" : "Annual Returns", icon: TrendingUp },
    { value: "15+", label: language === "ur" ? "درج پراپرٹیز" : "Properties Listed", icon: MapPin },
  ];

  const features = [
    {
      icon: Shield,
      title: language === "ur" ? "قانونی ملکیت" : "SECP Registered SPV",
      description: language === "ur" 
        ? "SECP رجسٹرڈ SPV کے ذریعے مکمل قانونی تحفظ"
        : "Complete legal protection through SECP registered Special Purpose Vehicle structure",
    },
    {
      icon: TrendingUp,
      title: language === "ur" ? "دوہری آمدنی" : "Dual Income Streams",
      description: language === "ur"
        ? "ماہانہ کرایہ + سرمایہ میں اضافہ"
        : "Monthly rental income (4-6%) plus capital appreciation (8-15% annually)",
    },
    {
      icon: Scale,
      title: language === "ur" ? "شریعہ مطابق" : "100% Shariah Compliant",
      description: language === "ur"
        ? "Diminishing Musharaka ماڈل - کوئی سود نہیں"
        : "Diminishing Musharaka model - no riba, profit from real assets only",
    },
    {
      icon: Wallet,
      title: language === "ur" ? "کم سرمایہ کاری" : "Start from PKR 50,000",
      description: language === "ur"
        ? "صرف 50,000 روپے سے پریمیم پراپرٹی کے مالک بنیں"
        : "Own shares in premium properties without needing crores of rupees",
    },
  ];

  const steps = [
    {
      step: 1,
      title: language === "ur" ? "اکاؤنٹ بنائیں" : "Create Account",
      description: language === "ur" 
        ? "سائن اپ کریں اور KYC مکمل کریں (CNIC/پاسپورٹ)"
        : "Sign up and complete KYC verification (CNIC/Passport)",
      icon: FileCheck,
    },
    {
      step: 2,
      title: language === "ur" ? "پراپرٹی منتخب کریں" : "Choose Property",
      description: language === "ur"
        ? "تصدیق شدہ پراپرٹیز میں سے منتخب کریں"
        : "Browse verified properties in DHA, Bahria Town & more",
      icon: Building2,
    },
    {
      step: 3,
      title: language === "ur" ? "سرمایہ کاری کریں" : "Purchase Shares",
      description: language === "ur"
        ? "50,000 روپے سے شروع کریں"
        : "Buy fractional shares starting from PKR 50,000",
      icon: Wallet,
    },
    {
      step: 4,
      title: language === "ur" ? "منافع کمائیں" : "Earn Returns",
      description: language === "ur"
        ? "ماہانہ کرایہ + سرمایہ میں اضافہ"
        : "Receive monthly rental income + capital appreciation",
      icon: TrendingUp,
    },
  ];

  const testimonials = [
    {
      name: "Ahmed K.",
      role: language === "ur" ? "سافٹ ویئر انجینئر، لاہور" : "Software Engineer, Lahore",
      quote: language === "ur" 
        ? "میں نے DHA اپارٹمنٹ میں 2 لاکھ روپے لگائے۔ 18 ماہ میں 28,000 کرایہ ملا اور شیئرز کی قیمت 2.4 لاکھ ہو گئی۔"
        : "I invested PKR 2 Lakh in a DHA apartment. After 18 months, I've received PKR 28,000 in rental income and my shares are now worth PKR 2.4 Lakh.",
      returns: "+20%",
    },
    {
      name: "Fatima S.",
      role: language === "ur" ? "ہیلتھ کیئر پروفیشنل، دبئی" : "Healthcare Professional, Dubai",
      quote: language === "ur"
        ? "بیرون ملک پاکستانی کے طور پر، میں کبھی پراپرٹی مینج نہیں کر سکتی تھی۔ PropertyPool سب کچھ سنبھالتا ہے۔"
        : "As an overseas Pakistani, I could never manage property back home. PropertyPool handles everything - I just receive my monthly income.",
      returns: "Hassle-Free",
    },
    {
      name: "Hassan M.",
      role: language === "ur" ? "بزنس اونر، کراچی" : "Business Owner, Karachi",
      quote: language === "ur"
        ? "آخرکار رئیل اسٹیٹ میں حلال سرمایہ کاری کا طریقہ۔ شریعہ مطابقت نے مجھے سکون دیا۔"
        : "Finally a halal way to invest in real estate. The Shariah compliance gave me peace of mind.",
      returns: "100% Halal",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section - Premium Navy/Gold */}
      <section className="hero-section pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="hero-pattern"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-white animate-fade-in-up">
              <Badge className="mb-6 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-500/30 backdrop-blur-sm px-5 py-2.5 text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                {language === "ur" ? "پاکستان کا پہلا فریکشنل پراپرٹی پلیٹ فارم" : "Pakistan's First Fractional Property Platform"}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight tracking-tight">
                {language === "ur" ? (
                  <>
                    اپنی پراپرٹی کے
                    <br />
                    <span className="gradient-text">مالک بنیں</span>
                  </>
                ) : (
                  <>
                    Own Property,
                    <br />
                    <span className="gradient-text">Together</span>
                  </>
                )}
              </h1>
              
              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl leading-relaxed">
                {language === "ur"
                  ? "صرف 50,000 روپے سے پریمیم پاکستانی رئیل اسٹیٹ میں سرمایہ کاری کریں۔ شریعہ مطابق، شفاف، اور پیشہ ورانہ انتظام۔"
                  : "Invest in premium Pakistani real estate starting from just PKR 50,000. Shariah-compliant, transparent, and professionally managed."}
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/properties">
                  <button className="btn-premium">
                    {language === "ur" ? "پراپرٹیز دیکھیں" : "Explore Properties"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </Link>
                <Link href="/education">
                  <button className="btn-secondary-premium">
                    <Play className="w-5 h-5 mr-2" />
                    {language === "ur" ? "کیسے کام کرتا ہے" : "How It Works"}
                  </button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                <div className="trust-badge">
                  <Shield className="w-4 h-4" />
                  <span>SECP Registered</span>
                </div>
                <div className="trust-badge">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Shariah Certified</span>
                </div>
                <div className="trust-badge">
                  <Award className="w-4 h-4" />
                  <span>FBR Compliant</span>
                </div>
              </div>
            </div>

            {/* Right - Stats Grid */}
            <div className="grid grid-cols-2 gap-5 animate-fade-in-up animate-delay-200">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <stat.icon className="w-8 h-8 text-amber-400/60 mx-auto mb-3" />
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center mt-16 lg:mt-20">
            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 text-amber-400/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 section-light">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 trust-badge-light">
              {language === "ur" ? "ہم کیوں؟" : "Why Choose PropertyPool"}
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
              {language === "ur" ? (
                <>
                  روایتی طریقوں سے <span className="gradient-text-dark">بہتر</span>
                </>
              ) : (
                <>
                  Better Than <span className="gradient-text-dark">Traditional Methods</span>
                </>
              )}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              {language === "ur"
                ? "فائل سسٹم کے خطرات اور روایتی پراپرٹی خریداری کی پریشانیوں سے آزادی"
                : "Freedom from file system risks and hassles of traditional property buying"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="icon-wrapper">
                  <feature.icon className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 section-white">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 trust-badge-light">
              {language === "ur" ? "آسان عمل" : "Simple 4-Step Process"}
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
              {language === "ur" ? (
                <>
                  <span className="gradient-text-dark">4 آسان</span> مراحل میں شروع کریں
                </>
              ) : (
                <>
                  From Registration to <span className="gradient-text-dark">Returns</span>
                </>
              )}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.step}</div>
                <step.icon className="w-8 h-8 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-slate-900">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={isAuthenticated ? "/dashboard" : "/properties"}>
              <button className="btn-premium">
                {language === "ur" ? "ابھی شروع کریں" : "Start Investing Now"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {featuredProperties.length > 0 && (
        <section className="py-20 md:py-28 section-light">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <Badge className="mb-4 trust-badge-light">
                  {language === "ur" ? "نمایاں پراپرٹیز" : "Featured Opportunities"}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  {language === "ur" ? "سرمایہ کاری کے مواقع" : "Investment Opportunities"}
                </h2>
              </div>
              <Link href="/properties">
                <Button variant="outline" className="hidden md:flex btn-outline">
                  {language === "ur" ? "سب دیکھیں" : "View All Properties"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property: any) => (
                <Link key={property.id} href={`/properties/${property.id}`}>
                  <div className="property-card cursor-pointer">
                    <div className="image-wrapper">
                      <img 
                        src={property.images?.[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"} 
                        alt={property.title}
                      />
                      <span className="property-badge">{property.propertyType}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-slate-900">{property.title}</h3>
                      <div className="flex items-center text-slate-500 mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.location}, {property.city}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-slate-600">
                          <Percent className="w-4 h-4 mr-2 text-amber-500" />
                          <span className="text-sm font-medium">{property.expectedYield}% Yield</span>
                        </div>
                        <div className="flex items-center text-slate-600">
                          <Clock className="w-4 h-4 mr-2 text-amber-500" />
                          <span className="text-sm font-medium">{property.holdingPeriod} Years</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Min. Investment</p>
                          <p className="font-bold text-slate-900">PKR {(property.sharePrice || 50000).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500 mb-1">Funded</p>
                          <p className="font-bold text-emerald-600">{property.fundingProgress || 0}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <Link href="/properties">
                <Button variant="outline" className="btn-outline">
                  {language === "ur" ? "سب دیکھیں" : "View All Properties"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-20 md:py-28 section-white">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 trust-badge-light">
              {language === "ur" ? "سرمایہ کاروں کی آراء" : "Investor Testimonials"}
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
              {language === "ur" ? (
                <>
                  <span className="gradient-text-dark">2,500+</span> سرمایہ کار ہمارے ساتھ
                </>
              ) : (
                <>
                  Join <span className="gradient-text-dark">2,500+</span> Investors
                </>
              )}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="feature-card">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                    {testimonial.returns}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 section-gold-accent">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              {language === "ur" ? (
                <>
                  آج ہی اپنی پراپرٹی کا <span className="gradient-text">سفر شروع کریں</span>
                </>
              ) : (
                <>
                  Start Your Property Journey <span className="gradient-text">Today</span>
                </>
              )}
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              {language === "ur"
                ? "صرف PKR 50,000 سے پریمیم رئیل اسٹیٹ کے مالک بنیں۔ ماہانہ آمدنی + سرمایہ میں اضافہ۔"
                : "Own premium real estate from just PKR 50,000. Monthly rental income + capital appreciation."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/properties">
                <button className="btn-premium">
                  {language === "ur" ? "پراپرٹیز دیکھیں" : "Browse Properties"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </Link>
              <Link href="/education">
                <button className="btn-secondary-premium">
                  {language === "ur" ? "مزید جانیں" : "Learn More"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
