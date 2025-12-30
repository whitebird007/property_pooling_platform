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
  ChevronDown
} from "lucide-react";

export default function Home() {
  const { language, t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  
  const { data: properties } = trpc.properties.list.useQuery({});
  const featuredProperties = properties?.slice(0, 3) || [];

  const stats = [
    { value: "PKR 500M+", label: language === "ur" ? "کل پراپرٹی ویلیو" : "Total Property Value" },
    { value: "2,500+", label: language === "ur" ? "فعال سرمایہ کار" : "Active Investors" },
    { value: "8-12%", label: language === "ur" ? "سالانہ منافع" : "Average Annual Yield" },
    { value: "15+", label: language === "ur" ? "درج پراپرٹیز" : "Properties Listed" },
  ];

  const features = [
    {
      icon: Shield,
      title: language === "ur" ? "قانونی ملکیت" : "Legal Ownership",
      description: language === "ur" 
        ? "SECP رجسٹرڈ SPV کے ذریعے مکمل قانونی تحفظ"
        : "Complete legal protection through SECP registered SPV structure",
    },
    {
      icon: TrendingUp,
      title: language === "ur" ? "ماہانہ آمدنی" : "Monthly Income",
      description: language === "ur"
        ? "کرایہ کی آمدنی براہ راست آپ کے والیٹ میں"
        : "Rental income deposited directly to your wallet every month",
    },
    {
      icon: Users,
      title: language === "ur" ? "پیشہ ورانہ انتظام" : "Professional Management",
      description: language === "ur"
        ? "ہم سب کچھ سنبھالتے ہیں - کرایہ دار، دیکھ بھال، قانونی"
        : "We handle everything - tenants, maintenance, legal matters",
    },
    {
      icon: Building2,
      title: language === "ur" ? "پریمیم پراپرٹیز" : "Premium Properties",
      description: language === "ur"
        ? "DHA، بحریہ ٹاؤن اور دیگر پریمیم مقامات"
        : "DHA, Bahria Town, and other premium locations only",
    },
  ];

  const steps = [
    {
      step: 1,
      title: language === "ur" ? "اکاؤنٹ بنائیں" : "Create Account",
      description: language === "ur" 
        ? "سائن اپ کریں اور KYC مکمل کریں"
        : "Sign up and complete KYC verification",
    },
    {
      step: 2,
      title: language === "ur" ? "پراپرٹی منتخب کریں" : "Choose Property",
      description: language === "ur"
        ? "تصدیق شدہ پراپرٹیز میں سے منتخب کریں"
        : "Browse and select from verified properties",
    },
    {
      step: 3,
      title: language === "ur" ? "سرمایہ کاری کریں" : "Invest",
      description: language === "ur"
        ? "50,000 روپے سے شروع کریں"
        : "Start investing from just PKR 50,000",
    },
    {
      step: 4,
      title: language === "ur" ? "منافع کمائیں" : "Earn Returns",
      description: language === "ur"
        ? "ماہانہ کرایہ + سرمایہ میں اضافہ"
        : "Monthly rental income + capital appreciation",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                {language === "ur" ? "پاکستان کا پہلا فریکشنل پراپرٹی پلیٹ فارم" : "Pakistan's First Fractional Property Platform"}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
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
              
              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-lg">
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
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center mt-16">
            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 text-white/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 section-silver">
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 trust-badge-light">
              {language === "ur" ? "ہم کیوں؟" : "Why Choose Us"}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
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
            <p className="text-slate-600 max-w-2xl mx-auto">
              {language === "ur"
                ? "فائل سسٹم کے خطرات اور روایتی پراپرٹی خریداری کی پریشانیوں سے آزادی"
                : "Freedom from file system risks and hassles of traditional property buying"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="icon-wrapper">
                  <feature.icon className="w-6 h-6 text-slate-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 section-white">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 trust-badge-light">
              {language === "ur" ? "آسان عمل" : "Simple Process"}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              {language === "ur" ? (
                <>
                  <span className="gradient-text-dark">4 آسان</span> مراحل میں شروع کریں
                </>
              ) : (
                <>
                  Get Started in <span className="gradient-text-dark">4 Easy Steps</span>
                </>
              )}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.step}</div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">{step.title}</h3>
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
        <section className="py-20 section-silver">
          <div className="container relative z-10">
            <div className="flex justify-between items-end mb-12">
              <div>
                <Badge className="mb-4 trust-badge-light">
                  {language === "ur" ? "نمایاں پراپرٹیز" : "Featured Properties"}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  {language === "ur" ? "سرمایہ کاری کے مواقع" : "Investment Opportunities"}
                </h2>
              </div>
              <Link href="/properties">
                <Button variant="outline" className="hidden md:flex btn-outline">
                  {language === "ur" ? "سب دیکھیں" : "View All"}
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
                      <h3 className="text-xl font-semibold mb-2 text-slate-900">{property.title}</h3>
                      <div className="flex items-center text-slate-500 mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.location}, {property.city}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-slate-600">
                          <Percent className="w-4 h-4 mr-2 text-slate-400" />
                          <span className="text-sm">{property.expectedYield}% Yield</span>
                        </div>
                        <div className="flex items-center text-slate-600">
                          <Clock className="w-4 h-4 mr-2 text-slate-400" />
                          <span className="text-sm">{property.holdingPeriod} Years</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                        <div>
                          <p className="text-xs text-slate-500">Min. Investment</p>
                          <p className="font-bold text-slate-900">PKR {(property.sharePrice || 50000).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500">Funded</p>
                          <p className="font-bold text-slate-700">{property.fundingProgress || 0}%</p>
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

      {/* CTA Section */}
      <section className="py-20 section-slate">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
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
            <p className="text-xl text-white/70 mb-8">
              {language === "ur"
                ? "2,500+ سرمایہ کاروں کے ساتھ شامل ہوں جو پہلے سے ہی PropertyPool کے ذریعے کما رہے ہیں"
                : "Join 2,500+ investors who are already earning through PropertyPool"}
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
