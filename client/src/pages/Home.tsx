import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  MapPin,
  Shield,
  CheckCircle2,
  ArrowRight,
  Play,
  Calculator,
  BookOpen,
  Landmark,
  PiggyBank,
  BarChart3,
  Clock,
  BadgeCheck,
  Star,
  ChevronRight
} from "lucide-react";

export default function Home() {
  const { language } = useLanguage();
  const { data: properties } = trpc.properties.list.useQuery({});
  
  const featuredProperties = properties?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section relative pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 mb-6">
                <Star className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">
                  {language === "ur" ? "پاکستان کا پہلا فریکشنل پراپرٹی پلیٹ فارم" : "Pakistan's First Fractional Property Platform"}
                </span>
              </div>
              
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                {language === "ur" ? "پراپرٹی میں سرمایہ کاری،" : "Own Property,"}
                <br />
                <span className="gradient-text">
                  {language === "ur" ? "مل کر" : "Together"}
                </span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
                {language === "ur" 
                  ? "صرف PKR 50,000 سے پاکستان کی پریمیم رئیل اسٹیٹ میں سرمایہ کاری کریں۔ شریعت کے مطابق، شفاف، اور پیشہ ورانہ طور پر منظم۔"
                  : "Invest in premium Pakistani real estate starting from just PKR 50,000. Shariah-compliant, transparent, and professionally managed."
                }
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/properties">
                  <a className="btn-primary">
                    {language === "ur" ? "پراپرٹیز دیکھیں" : "Explore Properties"}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Link>
                <Link href="/education">
                  <a className="btn-secondary">
                    <Play className="w-5 h-5" />
                    {language === "ur" ? "یہ کیسے کام کرتا ہے" : "How It Works"}
                  </a>
                </Link>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                <div className="trust-badge">
                  <Shield className="w-4 h-4" />
                  <span>SECP Registered</span>
                </div>
                <div className="trust-badge green">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Shariah Certified</span>
                </div>
                <div className="trust-badge">
                  <Landmark className="w-4 h-4" />
                  <span>FBR Compliant</span>
                </div>
              </div>
            </div>
            
            {/* Right - Stats Grid */}
            <div className="grid grid-cols-2 gap-4 animate-slide-in-right">
              <div className="stat-card">
                <div className="icon-box purple mx-auto mb-3">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="stat-value">PKR 500M+</div>
                <div className="stat-label">Total Property Value</div>
              </div>
              
              <div className="stat-card">
                <div className="icon-box blue mx-auto mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <div className="stat-value">2,500+</div>
                <div className="stat-label">Active Investors</div>
              </div>
              
              <div className="stat-card">
                <div className="icon-box green mx-auto mb-3">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="stat-value">8-12%</div>
                <div className="stat-label">Annual Returns</div>
              </div>
              
              <div className="stat-card">
                <div className="icon-box amber mx-auto mb-3">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="stat-value">15+</div>
                <div className="stat-label">Properties Listed</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="section-gray py-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge-purple mb-4 inline-block">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "ur" ? "یہ کیسے کام کرتا ہے" : "How It Works"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start your property investment journey in just 4 simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, icon: BookOpen, title: "Browse Properties", desc: "Explore verified properties with detailed financials" },
              { step: 2, icon: Calculator, title: "Calculate Returns", desc: "Use our calculator to project your earnings" },
              { step: 3, icon: PiggyBank, title: "Invest Your Share", desc: "Start with as little as PKR 50,000" },
              { step: 4, icon: BarChart3, title: "Earn Returns", desc: "Receive monthly rental income & capital gains" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="step-number mx-auto mb-4">{item.step}</div>
                <div className="feature-card">
                  <div className="icon-wrapper mx-auto">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Properties Section */}
      <section className="section-white py-20">
        <div className="container">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="badge-purple mb-4 inline-block">Featured</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {language === "ur" ? "نمایاں پراپرٹیز" : "Featured Properties"}
              </h2>
            </div>
            <Link href="/properties">
              <a className="text-purple-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                View All <ChevronRight className="w-5 h-5" />
              </a>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProperties.length > 0 ? featuredProperties.map((property: any) => (
              <Link key={property.id} href={`/property/${property.id}`}>
                <a className="property-card block">
                  <div className="image-wrapper">
                    <img 
                      src={property.images?.[0] || "/hero-bg.png"} 
                      alt={property.title}
                    />
                    <span className="badge">{property.propertyType}</span>
                  </div>
                  <div className="content">
                    <h3 className="font-semibold text-gray-900 mb-1">{property.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
                      <MapPin className="w-4 h-4" />
                      {property.location}, {property.city}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="price">PKR {(Number(property.totalValue) / 1000000).toFixed(1)}M</div>
                      <div className="text-sm text-gray-500">
                        {property.expectedYield}% yield
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="progress-bar">
                        <div 
                          className="fill" 
                          style={{ width: `${property.fundingProgress || 45}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {property.fundingProgress || 45}% funded
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            )) : (
              // Placeholder cards
              [1, 2, 3].map((i) => (
                <div key={i} className="property-card">
                  <div className="image-wrapper bg-gray-200">
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 className="w-12 h-12 text-gray-400" />
                    </div>
                    <span className="badge">Apartment</span>
                  </div>
                  <div className="content">
                    <h3 className="font-semibold text-gray-900 mb-1">Premium Property {i}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
                      <MapPin className="w-4 h-4" />
                      DHA Phase {i}, Lahore
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="price">PKR {(15 + i * 5).toFixed(1)}M</div>
                      <div className="text-sm text-gray-500">8-10% yield</div>
                    </div>
                    <div className="mt-3">
                      <div className="progress-bar">
                        <div className="fill" style={{ width: `${40 + i * 15}%` }} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{40 + i * 15}% funded</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Why PropertyPool Section */}
      <section className="section-purple-light py-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge-purple mb-4 inline-block">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "ur" ? "پراپرٹی پول کیوں؟" : "Why PropertyPool?"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're transforming how Pakistanis invest in real estate
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: Shield, 
                title: "Shariah Compliant", 
                desc: "All investments follow Diminishing Musharaka model approved by our Shariah board",
                color: "purple"
              },
              { 
                icon: BadgeCheck, 
                title: "Verified Properties", 
                desc: "Every property undergoes rigorous due diligence and legal verification",
                color: "green"
              },
              { 
                icon: Clock, 
                title: "Passive Income", 
                desc: "Receive monthly rental distributions directly to your wallet",
                color: "blue"
              },
              { 
                icon: Users, 
                title: "Community Ownership", 
                desc: "Vote on major property decisions alongside other investors",
                color: "amber"
              },
              { 
                icon: TrendingUp, 
                title: "Capital Appreciation", 
                desc: "Benefit from property value growth in Pakistan's booming market",
                color: "purple"
              },
              { 
                icon: Landmark, 
                title: "Regulatory Compliance", 
                desc: "Fully registered with SECP and compliant with FBR regulations",
                color: "green"
              },
            ].map((item, index) => (
              <div key={index} className="feature-card">
                <div className={`icon-wrapper ${item.color === 'purple' ? 'bg-purple-100 text-purple-600' : item.color === 'green' ? 'bg-green-100 text-green-600' : item.color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "ur" ? "آج ہی اپنی سرمایہ کاری کا سفر شروع کریں" : "Start Your Investment Journey Today"}
          </h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Pakistanis who are building wealth through fractional property ownership
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <a className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-all shadow-lg">
                Create Free Account
                <ArrowRight className="w-5 h-5" />
              </a>
            </Link>
            <Link href="/calculator">
              <a className="inline-flex items-center gap-2 px-8 py-4 bg-purple-500/30 text-white font-semibold rounded-xl border border-white/30 hover:bg-purple-500/50 transition-all">
                <Calculator className="w-5 h-5" />
                Calculate Returns
              </a>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
