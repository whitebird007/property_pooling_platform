import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Newspaper, Download, Mail, ExternalLink, Calendar, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Press() {
  const { language } = useLanguage();

  const pressReleases = [
    {
      date: "December 15, 2024",
      title: "PropertyPool Raises PKR 500 Million in Series A Funding",
      summary: "Leading Pakistani fractional property platform secures funding to expand operations nationwide.",
      link: "#",
    },
    {
      date: "November 1, 2024",
      title: "PropertyPool Launches Secondary Marketplace for Property Shares",
      summary: "Investors can now trade property shares on Pakistan's first real estate secondary market.",
      link: "#",
    },
    {
      date: "September 20, 2024",
      title: "PropertyPool Reaches PKR 1 Billion in Assets Under Management",
      summary: "Milestone achievement demonstrates growing investor confidence in fractional property ownership.",
      link: "#",
    },
    {
      date: "July 5, 2024",
      title: "PropertyPool Partners with Major Pakistani Banks for Seamless Payments",
      summary: "Integration with HBL, UBL, and MCB enables instant deposits and withdrawals.",
      link: "#",
    },
    {
      date: "May 15, 2024",
      title: "PropertyPool Receives SECP Approval for Fractional Property Operations",
      summary: "Regulatory milestone paves the way for compliant fractional real estate investment in Pakistan.",
      link: "#",
    },
  ];

  const mediaFeatures = [
    { outlet: "Dawn", title: "How PropertyPool is Democratizing Real Estate Investment", date: "Dec 2024" },
    { outlet: "The News", title: "Fractional Property: The Future of Pakistani Real Estate", date: "Nov 2024" },
    { outlet: "Express Tribune", title: "Startup Spotlight: PropertyPool's Journey to PKR 1B AUM", date: "Oct 2024" },
    { outlet: "Business Recorder", title: "SECP's New Framework for Fractional Property Platforms", date: "Sep 2024" },
    { outlet: "Profit by Pakistan Today", title: "Interview: PropertyPool CEO on Disrupting Real Estate", date: "Aug 2024" },
  ];

  const stats = [
    { value: "PKR 2B+", label: "Assets Under Management" },
    { value: "10,000+", label: "Active Investors" },
    { value: "25+", label: "Properties Listed" },
    { value: "PKR 50K", label: "Minimum Investment" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 pt-24 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-purple-300 mb-4">
              <Newspaper className="w-5 h-5" />
              <span className="text-sm font-medium">Press & Media</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === "ur" ? "پریس اور میڈیا" : "Press & Media"}
            </h1>
            <p className="text-xl text-purple-200">
              {language === "ur" 
                ? "PropertyPool کے بارے میں تازہ ترین خبریں اور میڈیا وسائل"
                : "Latest news, press releases, and media resources about PropertyPool"
              }
            </p>
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-purple-600">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Press Releases */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Press Releases</h2>
              <div className="space-y-4">
                {pressReleases.map((release, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Calendar className="w-4 h-4" />
                      {release.date}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{release.title}</h3>
                    <p className="text-gray-600 mb-4">{release.summary}</p>
                    <a href={release.link} className="text-purple-600 font-medium hover:underline flex items-center gap-1">
                      Read More <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Coverage */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Media Coverage</h2>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {mediaFeatures.map((feature, index) => (
                  <div key={index} className={`p-4 flex items-center justify-between ${index !== mediaFeatures.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div>
                      <span className="text-sm font-medium text-purple-600">{feature.outlet}</span>
                      <p className="text-gray-900 font-medium">{feature.title}</p>
                    </div>
                    <span className="text-sm text-gray-500">{feature.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Media Kit */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Media Kit</h3>
              <p className="text-gray-600 mb-4">
                Download our press kit including logos, brand guidelines, and company information.
              </p>
              <Button className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Media Kit
              </Button>
            </div>

            {/* Brand Assets */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Brand Assets</h3>
              <div className="space-y-3">
                <button className="w-full p-3 rounded-lg border border-gray-200 hover:border-purple-300 flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Logo Pack</p>
                    <p className="text-sm text-gray-500">PNG, SVG, EPS formats</p>
                  </div>
                </button>
                <button className="w-full p-3 rounded-lg border border-gray-200 hover:border-purple-300 flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Newspaper className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Brand Guidelines</p>
                    <p className="text-sm text-gray-500">PDF document</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Company Facts */}
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h3 className="font-bold text-purple-900 mb-4">Company Facts</h3>
              <ul className="space-y-2 text-purple-800">
                <li><strong>Founded:</strong> 2023</li>
                <li><strong>Headquarters:</strong> Lahore, Pakistan</li>
                <li><strong>Employees:</strong> 50+</li>
                <li><strong>Investors:</strong> 10,000+</li>
                <li><strong>Properties:</strong> 25+</li>
                <li><strong>Registration:</strong> SECP Licensed</li>
              </ul>
            </div>

            {/* Press Contact */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Press Contact</h3>
              <p className="text-gray-600 mb-4">
                For media inquiries, interviews, or press information, please contact our communications team.
              </p>
              <div className="space-y-2">
                <a href="mailto:press@propertypool.pk" className="flex items-center gap-2 text-purple-600 hover:underline">
                  <Mail className="w-4 h-4" />
                  press@propertypool.pk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
