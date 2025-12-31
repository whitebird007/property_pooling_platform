import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Building2, 
  Users, 
  Shield, 
  Target,
  Award,
  CheckCircle2,
  ArrowRight,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Clock,
  TrendingUp,
  Heart,
  Eye,
  Globe,
  Sparkles
} from "lucide-react";

export default function About() {
  const { language } = useLanguage();

  const stats = [
    { value: "PKR 500M+", label: "Total Property Value" },
    { value: "2,500+", label: "Active Investors" },
    { value: "15+", label: "Properties Listed" },
    { value: "8-12%", label: "Average Returns" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Transparency",
      description: "Complete visibility into every investment, from property documents to financial reports.",
      color: "purple"
    },
    {
      icon: CheckCircle2,
      title: "Shariah Compliance",
      description: "All investments follow Diminishing Musharaka model, certified by our Shariah board.",
      color: "green"
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building wealth together through collective ownership and shared success.",
      color: "blue"
    },
    {
      icon: Target,
      title: "Accessibility",
      description: "Making property investment accessible to everyone, starting from PKR 50,000.",
      color: "amber"
    },
  ];

  const team = [
    {
      name: "Ahmed Khan",
      role: "CEO & Co-Founder",
      bio: "15+ years in real estate development and investment banking.",
      image: null
    },
    {
      name: "Sara Malik",
      role: "COO & Co-Founder",
      bio: "Former McKinsey consultant with expertise in fintech operations.",
      image: null
    },
    {
      name: "Usman Ali",
      role: "CTO",
      bio: "Tech veteran with experience at Google and local startups.",
      image: null
    },
    {
      name: "Fatima Zahra",
      role: "Head of Compliance",
      bio: "Legal expert specializing in SECP regulations and Shariah finance.",
      image: null
    },
  ];

  const milestones = [
    { year: "2023", title: "Founded", description: "PropertyPool was born with a vision to democratize real estate" },
    { year: "2023", title: "SECP Registration", description: "Received regulatory approval to operate" },
    { year: "2024", title: "First Property", description: "Successfully funded our first property with 150+ investors" },
    { year: "2024", title: "Shariah Certified", description: "Obtained Shariah compliance certification" },
    { year: "2025", title: "PKR 500M+", description: "Crossed half a billion in total investments" },
  ];

  const problems = [
    { title: "High Entry Barriers", description: "Buying property requires millions of rupees, excluding most Pakistanis." },
    { title: "Fraud & Title Issues", description: "The informal 'file system' is rife with fraud and disputed titles." },
    { title: "Illiquidity", description: "Traditional property investments are hard to exit quickly." },
    { title: "No Passive Income", description: "Plot files generate no income until sold." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 text-sm font-medium">About PropertyPool</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === "ur" ? "پراپرٹی کی ملکیت کو" : "Making Property Ownership"}
              <span className="block text-purple-600">
                {language === "ur" ? "سب کے لیے ممکن بنانا" : "Accessible to Everyone"}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {language === "ur"
                ? "ہم پاکستان میں رئیل اسٹیٹ سرمایہ کاری کو جمہوری بنا رہے ہیں، ایک وقت میں ایک شیئر۔"
                : "We're democratizing real estate investment in Pakistan, one share at a time."
              }
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-3xl font-bold text-purple-600 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-purple-50 border border-purple-100">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To transform how Pakistanis invest in real estate by providing a transparent, 
                secure, and accessible platform that enables anyone to build wealth through 
                property ownership, regardless of their financial background.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-green-50 border border-green-100">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600">
                A Pakistan where every citizen has the opportunity to participate in real estate 
                investment, where property transactions are transparent and fraud-free, and where 
                wealth creation through property is no longer limited to the privileged few.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 border border-red-200 mb-6">
              <Globe className="w-4 h-4 text-red-600" />
              <span className="text-red-700 text-sm font-medium">The Challenge</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Problem We Solve</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pakistan's real estate market has long been plagued by issues that keep ordinary citizens from participating
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {problems.map((problem, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-500 font-bold">✗</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{problem.title}</h3>
                    <p className="text-gray-600">{problem.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-green-50 border border-green-200 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">PropertyPool Solves All These Problems</h3>
                <p className="text-gray-600">
                  Through fractional ownership, rigorous due diligence, professional management, and a secondary marketplace for liquidity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <Heart className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 text-sm font-medium">Our Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "ur" ? "ہماری اقدار" : "What We Stand For"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values guide everything we do, from selecting properties to serving our investors.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  value.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  value.color === 'green' ? 'bg-green-100 text-green-600' :
                  value.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-6">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-700 text-sm font-medium">Our Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Milestones</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From idea to Pakistan's leading fractional property platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-green-500 to-gray-300" />
              
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex gap-6 mb-8 last:mb-0">
                  <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg z-10">
                    <span className="text-white font-bold text-sm">{milestone.year}</span>
                  </div>
                  <div className="flex-1 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 text-sm font-medium">Our Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "ur" ? "ہماری ٹیم" : "Meet the Team"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to transforming property investment in Pakistan.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-purple-600 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <a href="#" className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 text-gray-500 hover:bg-purple-100 hover:text-purple-600 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
                <Mail className="w-4 h-4 text-purple-600" />
                <span className="text-purple-700 text-sm font-medium">Contact Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {language === "ur" ? "ہم سے رابطہ کریں" : "Get in Touch"}
              </h2>
              <p className="text-gray-600 mb-8">
                Have questions about investing? Our team is here to help you start your property investment journey.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Office Address</h4>
                    <p className="text-gray-600">Office 501, Emerald Tower, Gulberg III, Lahore, Pakistan</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <a href="mailto:info@propertypool.pk" className="text-purple-600 hover:underline">info@propertypool.pk</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <a href="tel:+923001234567" className="text-purple-600 hover:underline">+92 300 123 4567</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                    <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Sat: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                    placeholder="+92 300 1234567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  Send Message
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "ur" ? "آج ہی اپنی سرمایہ کاری کا سفر شروع کریں" : "Ready to Start Investing?"}
          </h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Pakistanis who are building wealth through fractional property ownership.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/properties">
              <a className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-all shadow-lg">
                Explore Properties
                <ArrowRight className="w-5 h-5" />
              </a>
            </Link>
            <Link href="/calculator">
              <a className="inline-flex items-center gap-2 px-8 py-4 bg-purple-500/30 text-white font-semibold rounded-xl border border-white/30 hover:bg-purple-500/50 transition-all">
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
