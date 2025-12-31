import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star, CheckCircle, Users, FileCheck, Building2, Ban, Shield, BookOpen } from "lucide-react";

export default function Shariah() {
  const { language } = useLanguage();

  const principles = [
    {
      title: "No Riba (Interest)",
      description: "All transactions are structured without interest-based financing. Properties are acquired through equity-based structures.",
      icon: Ban,
    },
    {
      title: "No Gharar (Uncertainty)",
      description: "All investment terms, property details, and expected returns are clearly disclosed. No hidden fees or ambiguous contracts.",
      icon: FileCheck,
    },
    {
      title: "No Haram Activities",
      description: "Properties generating income from prohibited activities (gambling, alcohol, etc.) are excluded from our platform.",
      icon: Shield,
    },
    {
      title: "Asset-Backed Investment",
      description: "All investments are backed by real, tangible property assets. No speculative or derivative instruments.",
      icon: Building2,
    },
    {
      title: "Profit & Loss Sharing",
      description: "Returns are based on actual rental income and property appreciation, shared proportionally among investors.",
      icon: Users,
    },
    {
      title: "Ethical Screening",
      description: "All properties undergo ethical screening to ensure compliance with Islamic values and social responsibility.",
      icon: CheckCircle,
    },
  ];

  const boardMembers = [
    {
      name: "Mufti Muhammad Taqi Usmani",
      title: "Chairman, Shariah Advisory Board",
      credentials: "Former Judge, Shariat Appellate Bench, Supreme Court of Pakistan",
    },
    {
      name: "Dr. Muhammad Imran Ashraf Usmani",
      title: "Member, Shariah Advisory Board",
      credentials: "PhD in Islamic Finance, Author of 'Meezan Bank's Guide to Islamic Banking'",
    },
    {
      name: "Mufti Abdul Qadir",
      title: "Member, Shariah Advisory Board",
      credentials: "Shariah Advisor to multiple Islamic financial institutions",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 pt-24 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-emerald-300 mb-4">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium">Islamic Finance</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === "ur" ? "شریعت سرٹیفیکیشن" : "Shariah Certification"}
            </h1>
            <p className="text-xl text-emerald-200">
              {language === "ur" 
                ? "اسلامی اصولوں کے مطابق سرمایہ کاری"
                : "Investing in accordance with Islamic principles"
              }
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="px-4 py-2 bg-emerald-700/50 rounded-lg border border-emerald-600">
                <span className="text-emerald-100 font-medium">Certified Halal</span>
              </div>
              <div className="px-4 py-2 bg-emerald-700/50 rounded-lg border border-emerald-600">
                <span className="text-emerald-100 font-medium">AAOIFI Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Shariah Compliance</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PropertyPool is committed to providing investment opportunities that are fully compliant with Islamic 
              Shariah principles. Our platform operates under the guidance of a distinguished Shariah Advisory Board, 
              ensuring that all properties, investment structures, and operational processes adhere to Islamic finance 
              standards.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We follow the guidelines set by the Accounting and Auditing Organization for Islamic Financial 
              Institutions (AAOIFI) and local Shariah standards established by the State Bank of Pakistan for 
              Islamic financial products.
            </p>
          </div>

          {/* Shariah Principles */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-600" />
              Core Shariah Principles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {principles.map((principle, index) => (
                <div key={index} className="p-6 rounded-xl bg-emerald-50 border border-emerald-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <principle.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">{principle.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Investment Structure */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shariah-Compliant Investment Structure</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Musharakah (Partnership)</h3>
                <p className="text-gray-700">
                  Our investment model is based on Musharakah, where investors become partners in property ownership. 
                  Profits (rental income and capital gains) are shared according to pre-agreed ratios, while losses 
                  are shared in proportion to capital contribution.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Ijarah (Leasing)</h3>
                <p className="text-gray-700">
                  Rental income is generated through Ijarah contracts, where the property is leased to tenants under 
                  Islamic leasing principles. The SPV (as property owner) bears the ownership risks while tenants 
                  pay rent for the use of the property.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">SPV Structure</h3>
                <p className="text-gray-700">
                  Each property is held in a Special Purpose Vehicle (SPV) registered with SECP. The SPV structure 
                  ensures proper segregation of assets, transparent governance, and compliance with both regulatory 
                  and Shariah requirements.
                </p>
              </div>
            </div>
          </div>

          {/* Shariah Board */}
          <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200 mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-emerald-600" />
              Shariah Advisory Board
            </h2>
            <p className="text-emerald-800 mb-6">
              Our Shariah Advisory Board consists of renowned Islamic scholars with extensive experience in 
              Islamic finance and jurisprudence. They provide guidance on all aspects of our operations.
            </p>
            <div className="space-y-4">
              {boardMembers.map((member, index) => (
                <div key={index} className="p-4 bg-white rounded-xl border border-emerald-100">
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-emerald-600 font-medium text-sm">{member.title}</p>
                  <p className="text-gray-600 text-sm mt-1">{member.credentials}</p>
                </div>
              ))}
            </div>
            <p className="text-emerald-700 text-sm mt-4 italic">
              * Board member names are illustrative. Actual board composition is available upon request.
            </p>
          </div>

          {/* Certification Process */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Certification Process</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: "Initial Screening", desc: "Property is screened for prohibited activities and tenant types" },
                { step: 2, title: "Documentation Review", desc: "All contracts and agreements are reviewed for Shariah compliance" },
                { step: 3, title: "Board Approval", desc: "Shariah Advisory Board reviews and approves the property" },
                { step: 4, title: "Certificate Issuance", desc: "Shariah compliance certificate is issued for the property" },
                { step: 5, title: "Ongoing Monitoring", desc: "Regular audits ensure continued compliance throughout ownership" },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Excluded Activities */}
          <div className="bg-red-50 rounded-2xl p-8 border border-red-200 mb-8">
            <h2 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
              <Ban className="w-5 h-5" />
              Excluded Activities
            </h2>
            <p className="text-red-900 mb-4">
              Properties with the following tenant types or activities are excluded from our platform:
            </p>
            <div className="grid md:grid-cols-2 gap-2">
              {[
                "Alcohol production or sales",
                "Gambling or casinos",
                "Adult entertainment",
                "Conventional banking/insurance",
                "Pork-related businesses",
                "Tobacco manufacturing",
                "Weapons manufacturing",
                "Interest-based lending",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-red-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Request Certificate */}
          <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200">
            <h2 className="text-xl font-bold text-purple-900 mb-4">Request Shariah Certificate</h2>
            <p className="text-purple-800 leading-relaxed mb-4">
              Investors can request a copy of the Shariah compliance certificate for any property on our platform. 
              Certificates include details of the Shariah review process and board approval.
            </p>
            <div className="space-y-2 text-purple-800">
              <p><strong>Email:</strong> shariah@propertypool.pk</p>
              <p><strong>Phone:</strong> +92 300 123 4567</p>
              <p><strong>Processing Time:</strong> 2-3 business days</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
