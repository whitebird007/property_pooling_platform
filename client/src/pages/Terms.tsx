import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, Shield, Scale, AlertTriangle, Users, CreditCard, Ban, RefreshCw } from "lucide-react";

export default function Terms() {
  const { language } = useLanguage();

  const sections = [
    {
      icon: Users,
      title: "1. Account Registration & Eligibility",
      content: [
        "You must be at least 18 years old and a Pakistani citizen or resident to use PropertyPool.",
        "You must provide accurate, complete, and current information during registration.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You must complete KYC (Know Your Customer) verification before making any investments.",
        "One person may only maintain one account. Multiple accounts are prohibited.",
        "PropertyPool reserves the right to refuse service to anyone for any reason.",
      ]
    },
    {
      icon: CreditCard,
      title: "2. Investment Terms",
      content: [
        "All investments are made through Special Purpose Vehicles (SPVs) registered with SECP.",
        "Minimum investment amount is PKR 50,000 per property share.",
        "Investment returns are not guaranteed and are subject to market conditions.",
        "Property valuations are conducted by independent, SECP-approved valuers.",
        "Rental income distributions are made quarterly, subject to actual rental collection.",
        "Capital appreciation is realized only upon property sale or share transfer.",
        "A 2% platform fee is charged on all investments at the time of purchase.",
      ]
    },
    {
      icon: Scale,
      title: "3. Secondary Market Trading",
      content: [
        "Share trading on the secondary marketplace is subject to availability and market demand.",
        "PropertyPool does not guarantee liquidity or the ability to sell shares at any given time.",
        "A 1% transaction fee applies to all secondary market trades.",
        "Minimum holding period of 6 months applies before shares can be listed for sale.",
        "All trades are final and cannot be reversed once executed.",
        "Price discovery is based on market supply and demand; PropertyPool does not set prices.",
      ]
    },
    {
      icon: Shield,
      title: "4. Shariah Compliance",
      content: [
        "All properties listed on PropertyPool are certified Shariah-compliant by our Shariah Advisory Board.",
        "Properties generating income from prohibited activities (gambling, alcohol, etc.) are excluded.",
        "Rental agreements follow Islamic finance principles with no interest-based components.",
        "Shariah compliance certificates are available for each property upon request.",
        "Any changes to Shariah compliance status will be communicated to investors immediately.",
      ]
    },
    {
      icon: AlertTriangle,
      title: "5. Risk Disclosure",
      content: [
        "Real estate investments carry inherent risks including market volatility and illiquidity.",
        "Property values may decrease, and you may lose part or all of your investment.",
        "Rental income is not guaranteed and depends on tenant occupancy and payment.",
        "Economic, political, and regulatory changes may adversely affect property values.",
        "Past performance is not indicative of future results.",
        "You should only invest funds that you can afford to lose.",
        "We strongly recommend consulting with a financial advisor before investing.",
      ]
    },
    {
      icon: Ban,
      title: "6. Prohibited Activities",
      content: [
        "Using the platform for money laundering or terrorist financing.",
        "Providing false or misleading information during registration or KYC.",
        "Attempting to manipulate market prices or engage in fraudulent trading.",
        "Accessing the platform using automated bots or scripts without authorization.",
        "Sharing account credentials or allowing unauthorized access to your account.",
        "Engaging in any activity that violates Pakistani law or regulations.",
      ]
    },
    {
      icon: RefreshCw,
      title: "7. Refund & Cancellation Policy",
      content: [
        "Investment commitments cannot be cancelled once the funding period closes.",
        "Wallet deposits can be withdrawn within 7 days if no investments have been made.",
        "Processing fees for failed transactions are non-refundable.",
        "In case of property acquisition failure, invested funds will be returned within 30 business days.",
        "Refunds are processed to the original payment method used for deposit.",
        "For detailed refund terms, please refer to our Refund Policy page.",
      ]
    },
    {
      icon: FileText,
      title: "8. Intellectual Property",
      content: [
        "All content on PropertyPool, including logos, text, and images, is our intellectual property.",
        "You may not reproduce, distribute, or create derivative works without written permission.",
        "User-generated content remains your property, but you grant us a license to use it.",
        "Trademarks and service marks displayed on the platform are our registered property.",
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 pt-24 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-purple-300 mb-4">
              <FileText className="w-5 h-5" />
              <span className="text-sm font-medium">Legal Document</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === "ur" ? "شرائط و ضوابط" : "Terms of Service"}
            </h1>
            <p className="text-xl text-purple-200">
              {language === "ur" 
                ? "PropertyPool استعمال کرنے سے پہلے براہ کرم ان شرائط کو غور سے پڑھیں"
                : "Please read these terms carefully before using PropertyPool"
              }
            </p>
            <p className="text-purple-300 mt-4 text-sm">
              Last updated: December 31, 2024
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
            <p className="text-gray-700 leading-relaxed">
              Welcome to PropertyPool. These Terms of Service ("Terms") govern your access to and use of the PropertyPool 
              platform, including our website, mobile applications, and all related services (collectively, the "Service"). 
              By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, 
              you may not access or use the Service.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              PropertyPool is operated by PropertyPool Technologies (Private) Limited, a company registered in Pakistan 
              under the Securities and Exchange Commission of Pakistan (SECP). Our platform enables fractional ownership 
              of real estate properties through Shariah-compliant investment structures.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Limitation of Liability */}
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200 mt-8">
            <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Limitation of Liability
            </h2>
            <p className="text-amber-900 leading-relaxed">
              To the maximum extent permitted by law, PropertyPool and its affiliates, officers, directors, employees, 
              and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
              including but not limited to loss of profits, data, or other intangible losses, resulting from your access 
              to or use of (or inability to access or use) the Service.
            </p>
          </div>

          {/* Governing Law */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Governing Law & Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Pakistan. Any disputes 
              arising out of or relating to these Terms or the Service shall be resolved through binding arbitration 
              in Lahore, Pakistan, in accordance with the Arbitration Act, 1940.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Before initiating arbitration, parties agree to attempt resolution through mediation. The language of 
              arbitration shall be English, and the decision of the arbitrator shall be final and binding.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200 mt-8">
            <h2 className="text-xl font-bold text-purple-900 mb-4">Contact Us</h2>
            <p className="text-purple-800 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="space-y-2 text-purple-800">
              <p><strong>Email:</strong> legal@propertypool.pk</p>
              <p><strong>Address:</strong> PropertyPool Technologies (Pvt) Ltd, DHA Phase 5, Lahore, Pakistan</p>
              <p><strong>Phone:</strong> +92 300 123 4567</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
