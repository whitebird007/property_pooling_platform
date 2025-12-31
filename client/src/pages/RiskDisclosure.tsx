import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertTriangle, TrendingDown, Building2, Scale, Globe, Clock, Users, ShieldAlert } from "lucide-react";

export default function RiskDisclosure() {
  const { language } = useLanguage();

  const risks = [
    {
      icon: TrendingDown,
      title: "Market Risk",
      severity: "High",
      description: "Real estate values can fluctuate based on economic conditions, interest rates, and market sentiment.",
      details: [
        "Property values may decrease, resulting in loss of capital",
        "Economic downturns can significantly impact real estate markets",
        "Interest rate changes affect property valuations and rental yields",
        "Local market conditions may differ from national trends",
        "Past performance does not guarantee future results",
      ]
    },
    {
      icon: Clock,
      title: "Liquidity Risk",
      severity: "High",
      description: "Real estate is inherently illiquid. Your ability to sell shares depends on market demand.",
      details: [
        "Shares may not be immediately sellable on the secondary market",
        "You may have to sell at a discount if urgent liquidity is needed",
        "Minimum holding period of 6 months applies before shares can be traded",
        "Low trading volume may result in difficulty finding buyers",
        "Full property sales may take 6-24 months to complete",
      ]
    },
    {
      icon: Building2,
      title: "Property-Specific Risk",
      severity: "Medium",
      description: "Individual properties face unique risks that can affect their value and income potential.",
      details: [
        "Tenant defaults or vacancies can reduce rental income",
        "Unexpected maintenance or repair costs may arise",
        "Natural disasters or property damage (despite insurance)",
        "Changes in neighborhood or area desirability",
        "Regulatory changes affecting property use or zoning",
        "Environmental issues or contamination discovery",
      ]
    },
    {
      icon: Scale,
      title: "Regulatory Risk",
      severity: "Medium",
      description: "Changes in laws and regulations can impact property investments and platform operations.",
      details: [
        "Tax law changes may affect investment returns",
        "New regulations may impose additional compliance costs",
        "Changes to real estate ownership laws",
        "SECP regulatory changes affecting fractional ownership",
        "Foreign investment restrictions (for non-resident investors)",
      ]
    },
    {
      icon: Globe,
      title: "Economic Risk",
      severity: "Medium",
      description: "Broader economic factors can significantly impact real estate investments.",
      details: [
        "Inflation may erode real returns on investment",
        "Currency fluctuations (for international investors)",
        "Economic recession impacting property demand",
        "Rising construction costs affecting new developments",
        "Changes in employment affecting rental demand",
      ]
    },
    {
      icon: Users,
      title: "Operational Risk",
      severity: "Low",
      description: "Risks related to the management and operation of properties and the platform.",
      details: [
        "Property management company performance",
        "Platform technical failures or security breaches",
        "Disputes between co-investors",
        "SPV management and governance issues",
        "Key personnel changes affecting operations",
      ]
    },
    {
      icon: ShieldAlert,
      title: "Concentration Risk",
      severity: "Medium",
      description: "Investing heavily in a single property or sector increases risk exposure.",
      details: [
        "Single property investments lack diversification",
        "Sector-specific downturns (residential, commercial, retail)",
        "Geographic concentration in specific cities or areas",
        "Over-reliance on single tenant or tenant type",
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-900 via-red-800 to-orange-900 pt-24 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-red-300 mb-4">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-medium">Important Legal Document</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === "ur" ? "رسک ڈسکلوژر" : "Risk Disclosure"}
            </h1>
            <p className="text-xl text-red-200">
              {language === "ur" 
                ? "سرمایہ کاری سے پہلے تمام خطرات کو سمجھنا ضروری ہے"
                : "Understanding all risks before investing is essential"
              }
            </p>
            <p className="text-red-300 mt-4 text-sm">
              Last updated: December 31, 2024
            </p>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-red-600 text-white py-4">
        <div className="container">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <p className="font-medium">
              <strong>WARNING:</strong> Real estate investments carry significant risks. You may lose some or all of your invested capital. 
              Only invest money you can afford to lose.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Important Notice</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This Risk Disclosure Statement is provided to help you understand the risks associated with investing 
              through PropertyPool. Before making any investment decision, you should carefully consider whether 
              investing in real estate is suitable for you in light of your financial circumstances, investment 
              objectives, and risk tolerance.
            </p>
            <p className="text-gray-700 leading-relaxed">
              PropertyPool is registered with the Securities and Exchange Commission of Pakistan (SECP) and operates 
              in compliance with applicable laws. However, registration does not imply endorsement or guarantee of 
              investment returns. We strongly recommend consulting with a qualified financial advisor before investing.
            </p>
          </div>

          {/* Risk Categories */}
          <div className="space-y-6">
            {risks.map((risk, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      risk.severity === 'High' ? 'bg-red-100' :
                      risk.severity === 'Medium' ? 'bg-amber-100' : 'bg-green-100'
                    }`}>
                      <risk.icon className={`w-6 h-6 ${
                        risk.severity === 'High' ? 'text-red-600' :
                        risk.severity === 'Medium' ? 'text-amber-600' : 'text-green-600'
                      }`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{risk.title}</h2>
                      <span className={`text-sm font-medium px-2 py-0.5 rounded ${
                        risk.severity === 'High' ? 'bg-red-100 text-red-700' :
                        risk.severity === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {risk.severity} Risk
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{risk.description}</p>
                <ul className="space-y-2">
                  {risk.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                        risk.severity === 'High' ? 'bg-red-500' :
                        risk.severity === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
                      }`} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* No Guarantee */}
          <div className="bg-red-50 rounded-2xl p-8 border border-red-200 mt-8">
            <h2 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              No Guarantee of Returns
            </h2>
            <p className="text-red-900 leading-relaxed mb-4">
              PropertyPool does not guarantee any returns on your investment. The projected returns, rental yields, 
              and capital appreciation estimates provided on our platform are based on historical data and market 
              analysis, but actual results may vary significantly.
            </p>
            <ul className="space-y-2 text-red-900">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span>Rental income depends on tenant occupancy and payment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span>Capital appreciation is not guaranteed and depends on market conditions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span>You may receive less than your original investment upon exit</span>
              </li>
            </ul>
          </div>

          {/* Investor Suitability */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Investor Suitability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Real estate investment through PropertyPool may be suitable for you if:
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <span>You have a long-term investment horizon (5+ years)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <span>You can afford to lose some or all of your investment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <span>You understand and accept the illiquidity of real estate</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <span>You seek portfolio diversification beyond stocks and bonds</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Real estate investment may NOT be suitable if you need quick access to your funds, cannot tolerate 
              investment losses, or are seeking guaranteed returns.
            </p>
          </div>

          {/* Acknowledgment */}
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200 mt-8">
            <h2 className="text-xl font-bold text-amber-800 mb-4">Investor Acknowledgment</h2>
            <p className="text-amber-900 leading-relaxed">
              By investing through PropertyPool, you acknowledge that you have read and understood this Risk 
              Disclosure Statement, that you are making an informed investment decision, and that you accept 
              all risks associated with real estate investment. You further acknowledge that PropertyPool has 
              not provided you with investment advice and that you have made your own independent assessment 
              of the suitability of this investment.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200 mt-8">
            <h2 className="text-xl font-bold text-purple-900 mb-4">Questions About Risks?</h2>
            <p className="text-purple-800 leading-relaxed mb-4">
              If you have questions about the risks involved in real estate investment, please contact us:
            </p>
            <div className="space-y-2 text-purple-800">
              <p><strong>Email:</strong> investor-relations@propertypool.pk</p>
              <p><strong>Phone:</strong> +92 300 123 4567</p>
              <p><strong>Office Hours:</strong> Monday - Saturday, 9 AM - 6 PM PKT</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
