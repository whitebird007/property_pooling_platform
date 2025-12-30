import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Shield, 
  ArrowRight,
  CheckCircle2,
  Star,
  Wallet,
  BarChart3,
  FileCheck,
  Globe,
  Landmark,
  PieChart,
  ChevronDown,
  Play,
  Sparkles,
  Lock,
  Clock,
  Award,
  Heart,
  Target,
  Zap
} from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const { t, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  const { data: properties } = trpc.properties.list.useQuery({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { value: "PKR 500M+", label: language === "ur" ? "کل پراپرٹی ویلیو" : "Total Property Value" },
    { value: "2,500+", label: language === "ur" ? "سرمایہ کار" : "Active Investors" },
    { value: "8-12%", label: language === "ur" ? "سالانہ منافع" : "Average Annual Yield" },
    { value: "15+", label: language === "ur" ? "پراپرٹیز" : "Properties Listed" },
  ];

  const features = [
    {
      icon: Shield,
      title: language === "ur" ? "شریعہ مطابق" : "Shariah Compliant",
      description: language === "ur" 
        ? "مشارکہ متناقصہ ماڈل پر مبنی، مکمل طور پر حلال سرمایہ کاری"
        : "Built on Diminishing Musharaka model, 100% halal investment structure approved by Islamic scholars",
    },
    {
      icon: FileCheck,
      title: language === "ur" ? "قانونی تحفظ" : "Legal Protection",
      description: language === "ur"
        ? "SPV سٹرکچر کے ذریعے مکمل قانونی ملکیت اور دستاویزات"
        : "Full legal ownership through SPV structure with verified title documents and FBR compliance",
    },
    {
      icon: PieChart,
      title: language === "ur" ? "جزوی ملکیت" : "Fractional Ownership",
      description: language === "ur"
        ? "صرف 50,000 روپے سے پریمیم پراپرٹی میں سرمایہ کاری شروع کریں"
        : "Start investing in premium properties from just PKR 50,000 with transparent share ownership",
    },
    {
      icon: TrendingUp,
      title: language === "ur" ? "دوہرا منافع" : "Dual Returns",
      description: language === "ur"
        ? "ماہانہ کرایہ کی آمدنی اور پراپرٹی کی قدر میں اضافہ"
        : "Earn monthly rental income plus capital appreciation as property values increase over time",
    },
    {
      icon: Wallet,
      title: language === "ur" ? "آسان لیکویڈیٹی" : "Easy Liquidity",
      description: language === "ur"
        ? "سیکنڈری مارکیٹ پر کسی بھی وقت اپنے حصص فروخت کریں"
        : "Sell your shares anytime on our secondary marketplace to other verified investors",
    },
    {
      icon: BarChart3,
      title: language === "ur" ? "شفاف رپورٹنگ" : "Transparent Reporting",
      description: language === "ur"
        ? "ریئل ٹائم ڈیش بورڈ سے اپنی سرمایہ کاری کی کارکردگی دیکھیں"
        : "Real-time dashboard showing property performance, rental collection, and your returns",
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: language === "ur" ? "اکاؤنٹ بنائیں" : "Create Account",
      description: language === "ur" 
        ? "سائن اپ کریں اور KYC تصدیق مکمل کریں"
        : "Sign up and complete KYC verification with your CNIC",
    },
    {
      step: 2,
      title: language === "ur" ? "پراپرٹی منتخب کریں" : "Choose Property",
      description: language === "ur"
        ? "تصدیق شدہ پراپرٹیز میں سے اپنی پسند کی منتخب کریں"
        : "Browse verified properties and select based on your goals",
    },
    {
      step: 3,
      title: language === "ur" ? "سرمایہ کاری کریں" : "Invest",
      description: language === "ur"
        ? "اپنے بجٹ کے مطابق حصص خریدیں"
        : "Purchase shares according to your budget from PKR 50,000",
    },
    {
      step: 4,
      title: language === "ur" ? "منافع کمائیں" : "Earn Returns",
      description: language === "ur"
        ? "ماہانہ کرایہ اور سرمائے میں اضافہ سے فائدہ اٹھائیں"
        : "Receive monthly rental income and benefit from appreciation",
    },
  ];

  const testimonials = [
    {
      name: "Ahmed Khan",
      role: language === "ur" ? "کاروباری شخص، لاہور" : "Businessman, Lahore",
      content: language === "ur"
        ? "PropertyPool نے میری زندگی بدل دی۔ میں نے صرف 2 لاکھ روپے سے شروع کیا اور اب میرے پاس 3 مختلف پراپرٹیز میں حصص ہیں۔"
        : "PropertyPool changed my life. I started with just PKR 200,000 and now I own shares in 3 different premium properties.",
      rating: 5,
    },
    {
      name: "Fatima Malik",
      role: language === "ur" ? "ڈاکٹر، کراچی" : "Doctor, Karachi",
      content: language === "ur"
        ? "شریعہ مطابق ہونے کی وجہ سے میں بے فکر ہو کر سرمایہ کاری کر سکتی ہوں۔ ہر ماہ کرایہ کی آمدنی ملتی ہے۔"
        : "Being Shariah-compliant gives me peace of mind. I receive rental income every month without any interest involvement.",
      rating: 5,
    },
    {
      name: "Usman Ali",
      role: language === "ur" ? "سافٹ ویئر انجینئر، اسلام آباد" : "Software Engineer, Islamabad",
      content: language === "ur"
        ? "فائل سسٹم سے بہت بہتر! یہاں قانونی ملکیت ملتی ہے اور سب کچھ شفاف ہے۔"
        : "Much better than the file system! Here I get legal ownership and everything is transparent and documented.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center">
        {/* Floating Shapes */}
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        
        <div className="container relative z-10 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white animate-fade-up">
              <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                {language === "ur" ? "پاکستان کا پہلا فریکشنل پراپرٹی پلیٹ فارم" : "Pakistan's First Fractional Property Platform"}
              </Badge>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                {language === "ur" ? (
                  <>
                    <span className="gradient-text-white">پراپرٹی کی ملکیت</span>
                    <br />
                    <span className="text-white/90">اب سب کے لیے</span>
                  </>
                ) : (
                  <>
                    <span className="gradient-text-white">Own Property,</span>
                    <br />
                    <span className="text-white/90">Together</span>
                  </>
                )}
              </h1>
              
              <p className="text-xl text-white/70 mb-8 max-w-xl leading-relaxed">
                {language === "ur" 
                  ? "صرف 50,000 روپے سے پریمیم پاکستانی رئیل اسٹیٹ میں سرمایہ کاری کریں۔ شریعہ مطابق، شفاف، اور پیشہ ورانہ انتظام۔"
                  : "Invest in premium Pakistani real estate starting from just PKR 50,000. Shariah-compliant, transparent, and professionally managed."}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/properties">
                  <button className="btn-premium flex items-center gap-2">
                    {language === "ur" ? "پراپرٹیز دیکھیں" : "Explore Properties"}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/education">
                  <button className="btn-secondary-premium flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    {language === "ur" ? "کیسے کام کرتا ہے" : "How It Works"}
                  </button>
                </Link>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4">
                <div className="trust-badge-light">
                  <Shield className="w-4 h-4" />
                  {language === "ur" ? "SECP رجسٹرڈ" : "SECP Registered"}
                </div>
                <div className="trust-badge-light">
                  <CheckCircle2 className="w-4 h-4" />
                  {language === "ur" ? "شریعہ سرٹیفائیڈ" : "Shariah Certified"}
                </div>
                <div className="trust-badge-light">
                  <Landmark className="w-4 h-4" />
                  {language === "ur" ? "FBR مطابق" : "FBR Compliant"}
                </div>
              </div>
            </div>
            
            {/* Right - Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="stat-card animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator z-10">
          <ChevronDown className="w-8 h-8 text-white/50" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 section-pattern">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              {language === "ur" ? "ہم کیوں مختلف ہیں" : "Why Choose Us"}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === "ur" ? (
                <>
                  <span className="gradient-text">سرمایہ کاری</span> کا نیا طریقہ
                </>
              ) : (
                <>
                  A <span className="gradient-text">Smarter Way</span> to Invest
                </>
              )}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === "ur"
                ? "روایتی فائل سسٹم کے برعکس، ہم آپ کو قانونی ملکیت، شفافیت، اور لیکویڈیٹی فراہم کرتے ہیں"
                : "Unlike the traditional file system, we provide legal ownership, complete transparency, and liquidity"}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
              >
                <div className="icon-wrapper">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              {language === "ur" ? "آسان عمل" : "Simple Process"}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === "ur" ? (
                <>
                  <span className="gradient-text">چار آسان</span> مراحل
                </>
              ) : (
                <>
                  <span className="gradient-text">Four Simple</span> Steps
                </>
              )}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === "ur"
                ? "منٹوں میں اپنی سرمایہ کاری کا سفر شروع کریں"
                : "Start your investment journey in minutes"}
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.step}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href={isAuthenticated ? "/kyc" : "/properties"}>
              <button className="btn-premium">
                {language === "ur" ? "ابھی شروع کریں" : "Get Started Now"}
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24 section-gradient">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                {language === "ur" ? "نمایاں پراپرٹیز" : "Featured Properties"}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold">
                {language === "ur" ? (
                  <>
                    <span className="gradient-text">سرمایہ کاری</span> کے مواقع
                  </>
                ) : (
                  <>
                    Investment <span className="gradient-text">Opportunities</span>
                  </>
                )}
              </h2>
            </div>
            <Link href="/properties">
              <Button variant="outline" className="mt-4 md:mt-0 group">
                {language === "ur" ? "سب دیکھیں" : "View All"}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties?.slice(0, 3).map((property: any) => (
              <Link key={property.id} href={`/properties/${property.id}`}>
                <div className="property-card">
                  <div className="image-wrapper">
                    <img 
                      src={property.images?.[0] || "/city-skyline.jpg"} 
                      alt={property.title}
                    />
                    <div className="badge">
                      {property.status === "active" 
                        ? (language === "ur" ? "فعال" : "Active")
                        : property.status}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Building2 className="w-4 h-4" />
                      {property.city} • {property.propertyType === "residential" 
                        ? (language === "ur" ? "رہائشی" : "Residential")
                        : (language === "ur" ? "تجارتی" : "Commercial")}
                    </div>
                    <h3 className="text-xl font-bold mb-3 line-clamp-1">{property.title}</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {language === "ur" ? "فی حصہ قیمت" : "Share Price"}
                        </p>
                        <p className="font-bold text-primary">
                          PKR {Number(property.sharePrice).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {language === "ur" ? "متوقع منافع" : "Expected Yield"}
                        </p>
                        <p className="font-bold text-emerald-600">
                          {property.expectedRentalYield}% p.a.
                        </p>
                      </div>
                    </div>
                    
                    <div className="investment-progress mb-2">
                      <div 
                        className="bar" 
                        style={{ 
                          width: `${((property.totalShares - property.availableShares) / property.totalShares) * 100}%` 
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {property.totalShares - property.availableShares} / {property.totalShares} {language === "ur" ? "حصص فروخت" : "shares sold"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            
            {/* Placeholder cards if no properties */}
            {(!properties || properties.length === 0) && [1, 2, 3].map((i) => (
              <div key={i} className="property-card">
                <div className="image-wrapper">
                  <img src="/city-skyline.jpg" alt="Property" />
                  <div className="badge">{language === "ur" ? "جلد آرہا ہے" : "Coming Soon"}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Building2 className="w-4 h-4" />
                    {language === "ur" ? "لاہور • رہائشی" : "Lahore • Residential"}
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {language === "ur" ? "پریمیم اپارٹمنٹ DHA" : "Premium Apartment DHA"}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {language === "ur" ? "فی حصہ قیمت" : "Share Price"}
                      </p>
                      <p className="font-bold text-primary">PKR 50,000</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {language === "ur" ? "متوقع منافع" : "Expected Yield"}
                      </p>
                      <p className="font-bold text-emerald-600">10% p.a.</p>
                    </div>
                  </div>
                  <div className="investment-progress mb-2">
                    <div className="bar" style={{ width: "35%" }} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    350 / 1000 {language === "ur" ? "حصص فروخت" : "shares sold"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              {language === "ur" ? "سرمایہ کاروں کی رائے" : "Investor Stories"}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === "ur" ? (
                <>
                  ہمارے <span className="gradient-text">سرمایہ کار</span> کیا کہتے ہیں
                </>
              ) : (
                <>
                  What Our <span className="gradient-text">Investors</span> Say
                </>
              )}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 section-dark relative overflow-hidden">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-white/10 text-white border-white/20">
              <Zap className="w-4 h-4 mr-2" />
              {language === "ur" ? "آج ہی شروع کریں" : "Start Today"}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === "ur" ? (
                <>
                  اپنی <span className="gradient-text">پراپرٹی ملکیت</span> کا سفر شروع کریں
                </>
              ) : (
                <>
                  Begin Your <span className="gradient-text">Property Ownership</span> Journey
                </>
              )}
            </h2>
            <p className="text-xl text-white/70 mb-10">
              {language === "ur"
                ? "2,500+ سرمایہ کاروں کے ساتھ شامل ہوں جو پہلے سے ہی PropertyPool کے ذریعے پریمیم پراپرٹیز میں سرمایہ کاری کر رہے ہیں"
                : "Join 2,500+ investors who are already building wealth through premium property investments with PropertyPool"}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/properties">
                <button className="btn-premium">
                  {language === "ur" ? "پراپرٹیز دیکھیں" : "Explore Properties"}
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
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
