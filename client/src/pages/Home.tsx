import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  MapPin, 
  Shield, 
  CheckCircle2, 
  ArrowRight, 
  Play,
  Wallet,
  PieChart,
  Clock,
  Star,
  BadgeCheck,
  Landmark,
  FileCheck,
  Globe,
  Sparkles,
  ChevronRight,
  BarChart3,
  Lock,
  Banknote,
  Home as HomeIcon,
  Building,
  Percent
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const { t } = useLanguage();
  const { data: properties } = trpc.properties.list.useQuery({});

  const featuredProperties = properties?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Glowing orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="container relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 text-sm font-medium">Pakistan's First Fractional Property Platform</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Own Property,
                  <span className="block bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                    Together
                  </span>
                </h1>
                <p className="text-xl text-slate-300 max-w-xl leading-relaxed">
                  Invest in premium Pakistani real estate starting from just 
                  <span className="text-amber-400 font-semibold"> PKR 50,000</span>. 
                  Shariah-compliant, transparent, and professionally managed.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/properties">
                  <Button size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:shadow-amber-500/40 hover:scale-105">
                    Explore Properties
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/education">
                  <Button size="lg" variant="outline" className="border-2 border-slate-600 text-white hover:bg-slate-800 px-8 py-6 text-lg rounded-xl backdrop-blur-sm">
                    <Play className="mr-2 w-5 h-5" />
                    How It Works
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-sm font-medium">SECP Registered</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-sm font-medium">Shariah Certified</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <Landmark className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-sm font-medium">FBR Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Content - Premium Stats Cards */}
            <div className="relative">
              {/* Decorative glow behind cards */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-3xl" />
              
              <div className="relative grid grid-cols-2 gap-5">
                {/* Card 1 - Total Property Value */}
                <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-xl hover:border-amber-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center border border-amber-500/30">
                      <Building2 className="w-7 h-7 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">PKR 500M+</p>
                      <p className="text-slate-400 text-sm mt-1">Total Property Value</p>
                    </div>
                  </div>
                </div>

                {/* Card 2 - Active Investors */}
                <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center border border-emerald-500/30">
                      <Users className="w-7 h-7 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">2,500+</p>
                      <p className="text-slate-400 text-sm mt-1">Active Investors</p>
                    </div>
                  </div>
                </div>

                {/* Card 3 - Annual Returns */}
                <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-xl hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-500/30">
                      <TrendingUp className="w-7 h-7 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">8-12%</p>
                      <p className="text-slate-400 text-sm mt-1">Annual Returns</p>
                    </div>
                  </div>
                </div>

                {/* Card 4 - Properties Listed */}
                <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/30">
                      <MapPin className="w-7 h-7 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">15+</p>
                      <p className="text-slate-400 text-sm mt-1">Properties Listed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 bg-slate-900">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(251, 191, 36, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Simple Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Start your property investment journey in just 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                step: "01", 
                icon: FileCheck, 
                title: "Create Account", 
                desc: "Sign up and complete KYC verification with your CNIC",
                color: "amber"
              },
              { 
                step: "02", 
                icon: Building, 
                title: "Browse Properties", 
                desc: "Explore verified properties with detailed financials",
                color: "emerald"
              },
              { 
                step: "03", 
                icon: Wallet, 
                title: "Invest", 
                desc: "Buy shares starting from just PKR 50,000",
                color: "blue"
              },
              { 
                step: "04", 
                icon: Banknote, 
                title: "Earn Returns", 
                desc: "Receive monthly rental income + capital appreciation",
                color: "purple"
              }
            ].map((item, index) => (
              <div key={index} className="group relative">
                {/* Connector line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-slate-700 to-transparent" />
                )}
                
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-300 group-hover:transform group-hover:-translate-y-2">
                  {/* Step number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-900 font-bold text-lg shadow-lg shadow-amber-500/30">
                    {item.step}
                  </div>
                  
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${item.color}-500/20 to-${item.color}-600/20 flex items-center justify-center border border-${item.color}-500/30 mb-6`}>
                    <item.icon className={`w-8 h-8 text-${item.color}-400`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-24 bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent" />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                <BadgeCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-sm font-medium">Why PropertyPool</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                The Smarter Way to
                <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Invest in Property
                </span>
              </h2>
              
              <p className="text-slate-400 text-lg">
                Unlike traditional property investment or informal "file" systems, PropertyPool offers a secure, transparent, and Shariah-compliant way to build wealth through real estate.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Lock, text: "100% Legal & SECP Registered SPV Structure" },
                  { icon: Shield, text: "Shariah-Compliant Diminishing Musharaka Model" },
                  { icon: Globe, text: "Invest from Anywhere - Perfect for Overseas Pakistanis" },
                  { icon: BarChart3, text: "Real-time Portfolio Tracking & Analytics" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-white font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-3xl blur-3xl" />
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-xl">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">PropertyPool vs Traditional</h3>
                
                <div className="space-y-4">
                  {[
                    { feature: "Minimum Investment", traditional: "PKR 50 Lakh+", propertypool: "PKR 50,000", winner: "propertypool" },
                    { feature: "Legal Protection", traditional: "Limited", propertypool: "Full SPV", winner: "propertypool" },
                    { feature: "Liquidity", traditional: "Months/Years", propertypool: "Days", winner: "propertypool" },
                    { feature: "Management", traditional: "Self-managed", propertypool: "Professional", winner: "propertypool" },
                    { feature: "Transparency", traditional: "Opaque", propertypool: "Real-time", winner: "propertypool" }
                  ].map((row, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/50">
                      <span className="text-slate-400 font-medium">{row.feature}</span>
                      <span className="text-center text-slate-500">{row.traditional}</span>
                      <span className="text-center text-emerald-400 font-semibold">{row.propertypool}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="relative py-24 bg-slate-900">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
        
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 text-sm font-medium">Investment Opportunities</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Featured <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">Properties</span>
              </h2>
            </div>
            <Link href="/properties">
              <Button variant="outline" className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10">
                View All Properties
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "DHA Phase 6 Apartment",
                location: "DHA Lahore",
                price: "PKR 2.5 Cr",
                minInvest: "PKR 50,000",
                returns: "12%",
                funded: 75,
                image: "/hero-bg.png"
              },
              {
                name: "Bahria Town Villa",
                location: "Bahria Town Lahore",
                price: "PKR 4.2 Cr",
                minInvest: "PKR 100,000",
                returns: "10%",
                funded: 60,
                image: "/hero-bg.png"
              },
              {
                name: "Commercial Plaza",
                location: "Gulberg III Lahore",
                price: "PKR 8.5 Cr",
                minInvest: "PKR 200,000",
                returns: "15%",
                funded: 45,
                image: "/hero-bg.png"
              }
            ].map((property, index) => (
              <div key={index} className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url('${property.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/90 text-white text-sm font-medium">
                    {property.returns} Returns
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{property.name}</h3>
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-4 h-4" />
                      <span>{property.location}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-500 text-sm">Property Value</p>
                      <p className="text-amber-400 font-bold">{property.price}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">Min. Investment</p>
                      <p className="text-white font-bold">{property.minInvest}</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Funded</span>
                      <span className="text-amber-400 font-medium">{property.funded}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                        style={{ width: `${property.funded}%` }}
                      />
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold">
                    View Details
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Ready to Start Your
              <span className="block bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Property Investment Journey?
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Join 2,500+ investors who are already building wealth through fractional property ownership. Start with just PKR 50,000.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold px-10 py-6 text-lg rounded-xl shadow-lg shadow-amber-500/25">
                  Create Free Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/properties">
                <Button size="lg" variant="outline" className="border-2 border-slate-600 text-white hover:bg-slate-800 px-10 py-6 text-lg rounded-xl">
                  Browse Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
