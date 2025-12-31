import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Eye, Database, Lock, Share2, Cookie, UserCheck, Mail } from "lucide-react";

export default function Privacy() {
  const { language } = useLanguage();

  const sections = [
    {
      icon: Database,
      title: "1. Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Full name, date of birth, and gender",
            "National Identity Card (CNIC) number and copy",
            "Contact information including email address and phone number",
            "Residential address and proof of address documents",
            "Bank account details for transactions",
            "Employment and income information for KYC purposes",
          ]
        },
        {
          subtitle: "Financial Information",
          items: [
            "Investment history and portfolio details",
            "Transaction records and payment information",
            "Bank statements (when required for verification)",
            "Tax identification numbers",
          ]
        },
        {
          subtitle: "Technical Information",
          items: [
            "IP address and device identifiers",
            "Browser type and operating system",
            "Usage patterns and interaction data",
            "Cookies and similar tracking technologies",
          ]
        }
      ]
    },
    {
      icon: Eye,
      title: "2. How We Use Your Information",
      items: [
        "To verify your identity and complete KYC requirements as mandated by SECP",
        "To process your investments and manage your portfolio",
        "To communicate important updates about your investments and the platform",
        "To comply with legal and regulatory obligations",
        "To detect and prevent fraud, money laundering, and other illegal activities",
        "To improve our services and develop new features",
        "To send marketing communications (with your consent)",
        "To respond to your inquiries and provide customer support",
      ]
    },
    {
      icon: Share2,
      title: "3. Information Sharing",
      items: [
        "With regulatory authorities (SECP, FBR, SBP) as required by law",
        "With our Shariah Advisory Board for compliance verification",
        "With property management companies for rental operations",
        "With payment processors to facilitate transactions",
        "With legal counsel when necessary to protect our rights",
        "With auditors for financial and compliance audits",
        "With service providers who assist in platform operations (under strict confidentiality)",
        "We never sell your personal information to third parties for marketing purposes",
      ]
    },
    {
      icon: Lock,
      title: "4. Data Security",
      items: [
        "All data is encrypted in transit using TLS 1.3 and at rest using AES-256",
        "Multi-factor authentication is required for all account access",
        "Regular security audits and penetration testing are conducted",
        "Access to personal data is restricted to authorized personnel only",
        "We maintain comprehensive logs of all data access and modifications",
        "Our servers are hosted in secure, certified data centers",
        "We have incident response procedures for potential data breaches",
      ]
    },
    {
      icon: Cookie,
      title: "5. Cookies & Tracking",
      items: [
        "Essential cookies: Required for platform functionality (cannot be disabled)",
        "Analytics cookies: Help us understand how you use our platform",
        "Marketing cookies: Used to deliver relevant advertisements (optional)",
        "You can manage cookie preferences through your browser settings",
        "Disabling certain cookies may affect platform functionality",
        "We use Google Analytics for website traffic analysis",
      ]
    },
    {
      icon: UserCheck,
      title: "6. Your Rights",
      items: [
        "Access: Request a copy of all personal data we hold about you",
        "Correction: Request correction of inaccurate or incomplete data",
        "Deletion: Request deletion of your data (subject to legal retention requirements)",
        "Portability: Receive your data in a structured, machine-readable format",
        "Objection: Object to processing of your data for marketing purposes",
        "Withdrawal: Withdraw consent for optional data processing at any time",
        "To exercise these rights, contact us at privacy@propertypool.pk",
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
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Legal Document</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === "ur" ? "رازداری پالیسی" : "Privacy Policy"}
            </h1>
            <p className="text-xl text-purple-200">
              {language === "ur" 
                ? "ہم آپ کی رازداری کا احترام کرتے ہیں اور آپ کے ڈیٹا کی حفاظت کے لیے پرعزم ہیں"
                : "We respect your privacy and are committed to protecting your personal data"
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
              PropertyPool Technologies (Private) Limited ("PropertyPool", "we", "us", or "our") is committed to 
              protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard 
              your information when you use our platform. We comply with the Personal Data Protection Bill of Pakistan 
              and international best practices for data protection.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              By using PropertyPool, you consent to the data practices described in this policy. If you do not agree 
              with our policies and practices, please do not use our services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
                
                {'content' in section && section.content ? (
                  <div className="space-y-6">
                    {section.content.map((group, i) => (
                      <div key={i}>
                        <h3 className="font-semibold text-gray-800 mb-3">{group.subtitle}</h3>
                        <ul className="space-y-2">
                          {group.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-3 text-gray-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {section.items?.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Data Retention */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy, 
              unless a longer retention period is required by law. Specifically:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                <span><strong>Account data:</strong> Retained for the duration of your account plus 7 years after closure</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                <span><strong>Transaction records:</strong> Retained for 10 years as required by tax and financial regulations</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                <span><strong>KYC documents:</strong> Retained for 5 years after the end of the business relationship</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                <span><strong>Marketing preferences:</strong> Retained until you withdraw consent</span>
              </li>
            </ul>
          </div>

          {/* Children's Privacy */}
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200 mt-8">
            <h2 className="text-xl font-bold text-amber-800 mb-4">8. Children's Privacy</h2>
            <p className="text-amber-900 leading-relaxed">
              PropertyPool is not intended for use by individuals under the age of 18. We do not knowingly collect 
              personal information from children. If we become aware that we have collected personal data from a 
              child without parental consent, we will take steps to delete that information immediately.
            </p>
          </div>

          {/* International Transfers */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              Your data is primarily stored and processed in Pakistan. However, some of our service providers may 
              process data in other countries. When we transfer data internationally, we ensure appropriate safeguards 
              are in place, including standard contractual clauses and data processing agreements that meet international 
              data protection standards.
            </p>
          </div>

          {/* Updates */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">10. Policy Updates</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by 
              posting the new policy on this page and updating the "Last updated" date. For significant changes, 
              we will also send you an email notification. We encourage you to review this policy periodically.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200 mt-8">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-purple-900">Contact Our Privacy Team</h2>
            </div>
            <p className="text-purple-800 leading-relaxed mb-4">
              If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us:
            </p>
            <div className="space-y-2 text-purple-800">
              <p><strong>Data Protection Officer:</strong> privacy@propertypool.pk</p>
              <p><strong>Address:</strong> PropertyPool Technologies (Pvt) Ltd, DHA Phase 5, Lahore, Pakistan</p>
              <p><strong>Phone:</strong> +92 300 123 4567</p>
              <p><strong>Response Time:</strong> We aim to respond to all requests within 30 days</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
