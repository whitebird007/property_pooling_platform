import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Target, 
  Eye, 
  Users, 
  Shield,
  Award,
  ArrowRight,
  CheckCircle2,
  Heart,
  TrendingUp,
  Sparkles,
  Linkedin,
  Twitter,
  Mail,
  Globe
} from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  const stats = [
    { value: "PKR 500M+", label: "Total Investments" },
    { value: "2,500+", label: "Active Investors" },
    { value: "15+", label: "Properties Listed" },
    { value: "12%", label: "Avg. Annual Returns" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Every transaction, document, and fee is fully transparent. No hidden costs, no surprises."
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "Making premium real estate investment accessible to everyone, not just the wealthy."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We only list properties that meet our rigorous due diligence standards."
    },
    {
      icon: Heart,
      title: "Shariah Compliance",
      description: "All investments structured according to Islamic finance principles."
    }
  ];

  const team = [
    {
      name: "Muhammad Ali",
      role: "CEO & Founder",
      bio: "Former investment banker with 15 years in real estate finance."
    },
    {
      name: "Fatima Khan",
      role: "Chief Legal Officer",
      bio: "Property law expert specializing in SPV structures and SECP compliance."
    },
    {
      name: "Ahmed Hassan",
      role: "Head of Property Sourcing",
      bio: "20+ years experience in Pakistani real estate market."
    },
    {
      name: "Dr. Usman Qureshi",
      role: "Shariah Advisor",
      bio: "Islamic finance scholar and former advisor to major Islamic banks."
    }
  ];

  const milestones = [
    { year: "2023", title: "Founded", description: "PropertyPool was born with a vision to democratize real estate" },
    { year: "2023", title: "SECP Registration", description: "Received regulatory approval to operate" },
    { year: "2024", title: "First Property", description: "Successfully funded our first property with 150+ investors" },
    { year: "2024", title: "Shariah Certified", description: "Obtained Shariah compliance certification" },
    { year: "2025", title: "PKR 500M+", description: "Crossed half a billion in total investments" },
  ];

  const problems = [
    { title: "High Entry Barriers", description: "Buying property requires millions of rupees, excluding most Pakistanis from the market." },
    { title: "Fraud & Title Issues", description: "The informal 'file system' is rife with fraud, disputed titles, and Patwari corruption." },
    { title: "Illiquidity", description: "Traditional property investments are hard to exit, often taking months or years to sell." },
    { title: "No Passive Income", description: "Plot files generate no income until sold, and rental properties require active management." },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/about-bg.png')" }}
        />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(251, 191, 36, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Floating Elements */}
        <div className="absolute top-40 left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Our Story</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Making Property Investment
              <span className="block bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Accessible to Everyone
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Pakistan's first Shariah-compliant fractional property ownership platform. We're on a mission to democratize real estate investment.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 backdrop-blur-sm">
                  <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-900/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-5 border border-amber-500/30">
                <Target className="w-7 h-7 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-slate-400">
                To transform how Pakistanis invest in real estate by providing a transparent, 
                secure, and accessible platform that enables anyone to build wealth through 
                property ownership, regardless of their financial background.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center mb-5 border border-emerald-500/30">
                <Eye className="w-7 h-7 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-slate-400">
                A Pakistan where every citizen has the opportunity to participate in real estate 
                investment, where property transactions are transparent and fraud-free, and where 
                wealth creation through property is no longer limited to the privileged few.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
              <Globe className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-medium">The Challenge</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">The Problem We Solve</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Pakistan's real estate market has long been plagued by issues that keep ordinary citizens from participating
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {problems.map((problem, index) => (
              <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 font-bold">✗</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{problem.title}</h3>
                    <p className="text-slate-400">{problem.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">PropertyPool Solves All These Problems</h3>
                <p className="text-slate-400">
                  Through fractional ownership, rigorous due diligence, professional management, and a secondary marketplace for liquidity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
              <Heart className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Our Values</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">What We Stand For</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Our values guide every decision we make and every property we list
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300 group text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-5 mx-auto group-hover:scale-110 transition-transform border border-amber-500/30">
                  <value.icon className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-slate-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Our Journey</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Milestones</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From idea to Pakistan's leading fractional property platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-emerald-500 to-slate-700" />
              
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex gap-8 mb-12 last:mb-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/25 z-10">
                    <span className="text-slate-900 font-bold text-sm">{milestone.year}</span>
                  </div>
                  <div className="flex-1 p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-slate-400">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
              <Users className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Our Team</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Leadership Team</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Experienced professionals committed to transforming property investment in Pakistan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="group text-center">
                <div className="relative rounded-2xl overflow-hidden mb-4">
                  <div className="w-full h-64 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center border border-amber-500/30">
                      <Users className="w-12 h-12 text-amber-400" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <div className="flex gap-3">
                      <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
                        <Linkedin className="w-5 h-5 text-white" />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
                        <Twitter className="w-5 h-5 text-white" />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
                        <Mail className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-amber-400 text-sm mb-2">{member.role}</p>
                <p className="text-slate-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Compliance */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Compliance</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Regulatory Compliance</h2>
            <p className="text-slate-400 text-lg mb-12">
              PropertyPool operates with full regulatory compliance and transparency
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center mb-5 mx-auto border border-emerald-500/30">
                  <Shield className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">SECP Registered</h3>
                <p className="text-slate-400 text-sm">
                  All SPVs registered with Securities and Exchange Commission of Pakistan
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-5 mx-auto border border-amber-500/30">
                  <Award className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Shariah Certified</h3>
                <p className="text-slate-400 text-sm">
                  Investment structure approved by qualified Islamic scholars
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-5 mx-auto border border-blue-500/30">
                  <CheckCircle2 className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">FBR Compliant</h3>
                <p className="text-slate-400 text-sm">
                  Full tax compliance with proper documentation and reporting
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-500/10 via-slate-900 to-emerald-500/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Join the Property Revolution
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Be part of Pakistan's first fractional property ownership platform. Start building your real estate portfolio today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-amber-500/25">
                  <Sparkles className="mr-2 w-5 h-5" />
                  Get Started Free
                </Button>
              </Link>
              <Link href="/properties">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-8 py-6 text-lg rounded-xl">
                  Explore Properties
                  <ArrowRight className="ml-2 w-5 h-5" />
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
