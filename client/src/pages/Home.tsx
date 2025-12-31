import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ArrowRight, 
  Play,
  Building2, 
  Users, 
  TrendingUp, 
  MapPin,
  Shield,
  CheckCircle2,
  Star,
  Sparkles
} from "lucide-react";

export default function Home() {
  const [, navigate] = useLocation();
  const { language } = useLanguage();
  const { data: properties } = trpc.properties.list.useQuery();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <section 
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: `url('/hero-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Subtle Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a3e]/40 via-transparent to-transparent" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-24 h-24 opacity-20">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white rounded-full" />
            ))}
          </div>
        </div>
        <div className="absolute bottom-40 right-10 w-24 h-24 opacity-20">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white rounded-full" />
            ))}
          </div>
        </div>
        
        <div className="container relative z-10 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-white/90">
                  {language === "ur" ? "پاکستان کا پہلا فریکشنل پراپرٹی پلیٹ فارم" : "Pakistan's First Fractional Property Platform"}
                </span>
              </div>
              
              {/* Heading */}
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Own Property,
                </h1>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight">
                  Together
                </h1>
              </div>
              
              {/* Description */}
              <p className="text-lg text-white/70 max-w-lg leading-relaxed">
                {language === "ur" 
                  ? "صرف PKR 50,000 سے پاکستانی رئیل اسٹیٹ میں سرمایہ کاری کریں۔ شریعہ کے مطابق، شفاف، اور پیشہ ورانہ طور پر منظم۔"
                  : "Invest in premium Pakistani real estate starting from just PKR 50,000. Shariah-compliant, transparent, and professionally managed."}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => navigate("/properties")}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-purple-500/30 transition-all hover:shadow-purple-500/50"
                >
                  {language === "ur" ? "پراپرٹیز دیکھیں" : "Explore Properties"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/education")}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {language === "ur" ? "کیسے کام کرتا ہے" : "How It Works"}
                </Button>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-white/90">SECP Registered</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-white/90">Shariah Certified</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-white/90">FBR Compliant</span>
                </div>
              </div>
            </div>
            
            {/* Right Content - Stats Cards */}
            <div className="relative">
              {/* Decorative dots top right */}
              <div className="absolute -top-8 -right-8 w-20 h-20 opacity-30">
                <div className="grid grid-cols-4 gap-1.5">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
                  ))}
                </div>
              </div>
              
              {/* Stats Grid - Enhanced 3D Glassmorphism Cards */}
              <div className="grid grid-cols-2 gap-6">
                {/* Card 1 - Total Property Value */}
                <div className="group relative overflow-hidden rounded-[28px] p-8 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.18)'
                  }}
                >
                  {/* Glass reflection effect */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-[28px]" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 via-purple-500 to-purple-700 flex items-center justify-center mb-5 shadow-xl shadow-purple-500/40 transform group-hover:scale-110 transition-transform duration-300">
                      <Building2 className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-2 drop-shadow-lg">PKR 500M+</div>
                    <div className="text-base text-white/70 font-medium">Total Property Value</div>
                  </div>
                </div>
                
                {/* Card 2 - Active Investors */}
                <div className="group relative overflow-hidden rounded-[28px] p-8 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.18)'
                  }}
                >
                  {/* Glass reflection effect */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-[28px]" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 flex items-center justify-center mb-5 shadow-xl shadow-blue-500/40 transform group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-2 drop-shadow-lg">2,500+</div>
                    <div className="text-base text-white/70 font-medium">Active Investors</div>
                  </div>
                </div>
                
                {/* Card 3 - Annual Returns */}
                <div className="group relative overflow-hidden rounded-[28px] p-8 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.18)'
                  }}
                >
                  {/* Glass reflection effect */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-[28px]" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 flex items-center justify-center mb-5 shadow-xl shadow-green-500/40 transform group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-2 drop-shadow-lg">8-12%</div>
                    <div className="text-base text-white/70 font-medium">Annual Returns</div>
                  </div>
                </div>
                
                {/* Card 4 - Properties Listed */}
                <div className="group relative overflow-hidden rounded-[28px] p-8 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.18)'
                  }}
                >
                  {/* Glass reflection effect */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-[28px]" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 via-amber-500 to-orange-600 flex items-center justify-center mb-5 shadow-xl shadow-orange-500/40 transform group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-2 drop-shadow-lg">15+</div>
                    <div className="text-base text-white/70 font-medium">Properties Listed</div>
                  </div>
                </div>
              </div>
              
              {/* Decorative dots bottom left */}
              <div className="absolute -bottom-8 -left-8 w-20 h-20 opacity-30">
                <div className="grid grid-cols-4 gap-1.5">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              {language === "ur" ? "سادہ عمل" : "Simple Process"}
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === "ur" ? "یہ کیسے کام کرتا ہے" : "How It Works"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === "ur" 
                ? "چار آسان مراحل میں پراپرٹی کے مالک بنیں"
                : "Become a property owner in four simple steps"}
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: language === "ur" ? "سائن اپ کریں" : "Sign Up", desc: language === "ur" ? "اپنا اکاؤنٹ بنائیں اور KYC مکمل کریں" : "Create your account and complete KYC verification" },
              { step: "02", title: language === "ur" ? "پراپرٹی منتخب کریں" : "Choose Property", desc: language === "ur" ? "ہماری تصدیق شدہ پراپرٹیز میں سے انتخاب کریں" : "Browse and select from our verified properties" },
              { step: "03", title: language === "ur" ? "سرمایہ کاری کریں" : "Invest", desc: language === "ur" ? "PKR 50,000 سے شروع کریں" : "Start investing from as low as PKR 50,000" },
              { step: "04", title: language === "ur" ? "کمائی کریں" : "Earn Returns", desc: language === "ur" ? "ماہانہ کرایہ اور سرمائے میں اضافہ" : "Receive monthly rental income and capital appreciation" }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow h-full">
                  <div className="text-5xl font-bold text-purple-100 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-purple-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                {language === "ur" ? "نمایاں پراپرٹیز" : "Featured Properties"}
              </span>
              <h2 className="text-4xl font-bold text-gray-900">
                {language === "ur" ? "سرمایہ کاری کے مواقع" : "Investment Opportunities"}
              </h2>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate("/properties")}
              className="hidden md:flex border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              {language === "ur" ? "سب دیکھیں" : "View All"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {properties && properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.slice(0, 3).map((property) => (
                <div
                  key={property.id}
                  onClick={() => navigate(`/property/${property.id}`)}
                  className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100"
                >
                  <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center relative overflow-hidden">
                    <Building2 className="w-16 h-16 text-purple-300" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                      {language === "ur" ? "فعال" : "Active"}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {property.address}
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div>
                        <div className="text-xs text-gray-500">{language === "ur" ? "کل قیمت" : "Total Value"}</div>
                        <div className="text-lg font-bold text-purple-600">
                          PKR {((Number(property.totalValue) || 0) / 1000000).toFixed(1)}M
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{language === "ur" ? "متوقع منافع" : "Expected Return"}</div>
                        <div className="text-lg font-bold text-green-600">8-12%</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "DHA Phase 6 Apartment", location: "DHA, Lahore", price: "25M", returns: "10%" },
                { title: "Bahria Town Commercial", location: "Bahria Town, Islamabad", price: "45M", returns: "12%" },
                { title: "Clifton Sea View", location: "Clifton, Karachi", price: "35M", returns: "9%" }
              ].map((property, index) => (
                <div
                  key={index}
                  onClick={() => navigate("/properties")}
                  className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100"
                >
                  <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center relative overflow-hidden">
                    <Building2 className="w-16 h-16 text-purple-300" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                      Active
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {property.location}
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div>
                        <div className="text-xs text-gray-500">Total Value</div>
                        <div className="text-lg font-bold text-purple-600">PKR {property.price}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Expected Return</div>
                        <div className="text-lg font-bold text-green-600">{property.returns}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Button 
              variant="outline" 
              onClick={() => navigate("/properties")}
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              {language === "ur" ? "سب دیکھیں" : "View All Properties"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
              {language === "ur" ? "ہمیں کیوں منتخب کریں" : "Why Choose Us"}
            </span>
            <h2 className="text-4xl font-bold mb-4">
              {language === "ur" ? "PropertyPool کا فائدہ" : "The PropertyPool Advantage"}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: language === "ur" ? "محفوظ سرمایہ کاری" : "Secure Investment", desc: language === "ur" ? "SECP ریگولیٹڈ اور شریعہ کے مطابق" : "SECP regulated and Shariah-compliant investment structure" },
              { icon: TrendingUp, title: language === "ur" ? "زیادہ منافع" : "Higher Returns", desc: language === "ur" ? "بینک ڈپازٹ سے 3 گنا زیادہ منافع" : "Earn 3x higher returns compared to traditional bank deposits" },
              { icon: Users, title: language === "ur" ? "پیشہ ورانہ انتظام" : "Professional Management", desc: language === "ur" ? "ماہر ٹیم کی طرف سے پراپرٹی کا انتظام" : "Properties managed by experienced real estate professionals" }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              {language === "ur" ? "سرمایہ کاروں کی رائے" : "Investor Testimonials"}
            </span>
            <h2 className="text-4xl font-bold text-gray-900">
              {language === "ur" ? "ہمارے سرمایہ کار کیا کہتے ہیں" : "What Our Investors Say"}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Ahmed Khan", role: language === "ur" ? "سرمایہ کار" : "Investor", quote: language === "ur" ? "PropertyPool نے مجھے صرف 1 لاکھ سے پراپرٹی کا مالک بنا دیا۔" : "PropertyPool made me a property owner with just PKR 100,000. The returns have been consistent." },
              { name: "Sara Malik", role: language === "ur" ? "سرمایہ کار" : "Investor", quote: language === "ur" ? "شریعہ کے مطابق سرمایہ کاری کا بہترین پلیٹ فارم۔" : "The best Shariah-compliant investment platform. Transparent and professional." },
              { name: "Usman Ali", role: language === "ur" ? "سرمایہ کار" : "Investor", quote: language === "ur" ? "ہر ماہ باقاعدہ کرایہ ملتا ہے۔ بہت مطمئن ہوں۔" : "I receive regular monthly rental income. Very satisfied with the platform." }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">
                {language === "ur" ? "آج ہی سرمایہ کاری شروع کریں" : "Start Investing Today"}
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                {language === "ur" 
                  ? "صرف PKR 50,000 سے پراپرٹی کے مالک بنیں اور ماہانہ کرایہ کمائیں"
                  : "Become a property owner with just PKR 50,000 and start earning monthly rental income"}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  onClick={() => navigate("/properties")}
                  className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl"
                >
                  {language === "ur" ? "پراپرٹیز دیکھیں" : "Explore Properties"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/calculator")}
                  className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
                >
                  {language === "ur" ? "منافع کیلکولیٹر" : "Calculate Returns"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
