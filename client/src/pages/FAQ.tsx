import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, HelpCircle, Search, Building2, CreditCard, Shield, Users, Scale, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function FAQ() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    { icon: Building2, name: "Getting Started", count: 6 },
    { icon: CreditCard, name: "Investments", count: 8 },
    { icon: Shield, name: "Security & KYC", count: 5 },
    { icon: Users, name: "Account", count: 4 },
    { icon: Scale, name: "Legal & Compliance", count: 5 },
    { icon: TrendingUp, name: "Returns & Payouts", count: 6 },
  ];

  const faqs = [
    {
      category: "Getting Started",
      question: "What is PropertyPool?",
      answer: "PropertyPool is Pakistan's first fractional property investment platform. We enable investors to own shares in premium real estate properties starting from just PKR 50,000. Through our platform, you can diversify your portfolio across multiple properties, earn rental income, and benefit from capital appreciation - all without the hassle of property management."
    },
    {
      category: "Getting Started",
      question: "How does fractional property investment work?",
      answer: "Fractional property investment allows multiple investors to collectively own a property. Each investor owns shares proportional to their investment. For example, if you invest PKR 500,000 in a property worth PKR 50,000,000, you own 1% of that property. You receive 1% of the rental income and 1% of any capital gains when the property is sold."
    },
    {
      category: "Getting Started",
      question: "What is the minimum investment amount?",
      answer: "The minimum investment amount is PKR 50,000 per property. This allows you to start building your real estate portfolio with a relatively small amount and diversify across multiple properties over time."
    },
    {
      category: "Getting Started",
      question: "Who can invest on PropertyPool?",
      answer: "Any Pakistani citizen or resident who is 18 years or older can invest on PropertyPool. You'll need to complete our KYC (Know Your Customer) verification process, which includes providing your CNIC, proof of address, and bank account details."
    },
    {
      category: "Getting Started",
      question: "Is PropertyPool regulated?",
      answer: "Yes, PropertyPool is registered with the Securities and Exchange Commission of Pakistan (SECP). We operate in compliance with all applicable laws and regulations. Each property is held in a Special Purpose Vehicle (SPV) registered with SECP, ensuring proper legal structure and investor protection."
    },
    {
      category: "Getting Started",
      question: "Is PropertyPool Shariah-compliant?",
      answer: "Yes, all investments on PropertyPool are Shariah-compliant. We have a dedicated Shariah Advisory Board that reviews and certifies each property. Our investment structure is based on Musharakah (partnership) principles, with no interest-based financing involved."
    },
    {
      category: "Investments",
      question: "How do I make an investment?",
      answer: "To invest: 1) Browse available properties on our platform, 2) Select a property and choose the number of shares you want to buy, 3) Complete the payment through your wallet or bank transfer, 4) Once the funding goal is met, you'll receive your share certificates. The entire process can be completed online."
    },
    {
      category: "Investments",
      question: "What types of properties are available?",
      answer: "We offer a diverse range of properties including residential apartments, commercial offices, retail spaces, and land plots. All properties are located in prime areas of major Pakistani cities like Lahore, Karachi, and Islamabad. Each property undergoes thorough due diligence before listing."
    },
    {
      category: "Investments",
      question: "How are properties selected?",
      answer: "Our team conducts extensive due diligence on each property, including: legal title verification, independent valuation by SECP-approved valuers, rental yield analysis, location assessment, tenant quality review (for rented properties), and Shariah compliance certification."
    },
    {
      category: "Investments",
      question: "Can I sell my shares before the property is sold?",
      answer: "Yes, after a minimum holding period of 6 months, you can list your shares for sale on our secondary marketplace. The price is determined by market supply and demand. A 1% transaction fee applies to marketplace trades. Note that liquidity is not guaranteed and depends on buyer interest."
    },
    {
      category: "Investments",
      question: "What fees does PropertyPool charge?",
      answer: "We charge a 2% platform fee on all investments at the time of purchase. For secondary market trades, a 1% transaction fee applies. There are no annual management fees. Property-related expenses (maintenance, insurance, property tax) are deducted from rental income before distribution."
    },
    {
      category: "Investments",
      question: "What happens if a property doesn't reach its funding goal?",
      answer: "If a property doesn't reach its funding goal within the specified period, all invested funds are returned to investors' wallets within 14 business days. The platform fee is also refunded in such cases."
    },
    {
      category: "Security & KYC",
      question: "What documents are required for KYC?",
      answer: "For KYC verification, you need to provide: 1) Valid CNIC (front and back), 2) Proof of address (utility bill or bank statement), 3) Bank account details, 4) A selfie for identity verification. The process typically takes 24-48 hours for approval."
    },
    {
      category: "Security & KYC",
      question: "How is my data protected?",
      answer: "We use bank-grade security measures including: 256-bit SSL encryption for all data transmission, multi-factor authentication for account access, encrypted storage for sensitive documents, regular security audits by third-party firms, and compliance with international data protection standards."
    },
    {
      category: "Security & KYC",
      question: "What happens if I fail KYC verification?",
      answer: "If your KYC is rejected, we'll notify you of the reason and provide guidance on how to resubmit. Common reasons include unclear document images or mismatched information. You can resubmit your documents through your account dashboard."
    },
    {
      category: "Returns & Payouts",
      question: "How often are rental income distributions made?",
      answer: "Rental income is distributed quarterly (every 3 months) to all investors. Distributions are made within 15 days after the end of each quarter. You can view your expected payout dates in your portfolio dashboard."
    },
    {
      category: "Returns & Payouts",
      question: "What returns can I expect?",
      answer: "Returns vary by property and consist of two components: 1) Rental yield: typically 5-8% annually, paid quarterly, 2) Capital appreciation: realized when the property is sold, historically 10-15% annually in prime Pakistani locations. Note: Past performance doesn't guarantee future results."
    },
    {
      category: "Returns & Payouts",
      question: "How do I withdraw my earnings?",
      answer: "Rental income and sale proceeds are credited to your PropertyPool wallet. You can withdraw to your registered bank account at any time. Withdrawals are processed within 3-5 business days. Minimum withdrawal amount is PKR 1,000."
    },
    {
      category: "Returns & Payouts",
      question: "Are there any taxes on my investment returns?",
      answer: "Rental income may be subject to withholding tax as per Pakistani tax laws. Capital gains tax applies when shares are sold at a profit. PropertyPool provides annual tax statements to help with your tax filing. We recommend consulting a tax advisor for personalized guidance."
    },
    {
      category: "Account",
      question: "How do I deposit funds?",
      answer: "You can deposit funds through: 1) Bank transfer (all major Pakistani banks), 2) JazzCash, 3) Easypaisa, 4) Debit/Credit card. Deposits are typically credited within 1-24 hours depending on the payment method."
    },
    {
      category: "Account",
      question: "Can I have multiple accounts?",
      answer: "No, each person can only have one PropertyPool account. Multiple accounts are prohibited and may result in account suspension. If you need to change your account details, please contact our support team."
    },
    {
      category: "Legal & Compliance",
      question: "What is an SPV and why is it used?",
      answer: "SPV (Special Purpose Vehicle) is a legal entity created specifically to hold a property. Each property on PropertyPool is owned by a separate SPV registered with SECP. This structure provides: legal protection for investors, clear ownership documentation, tax efficiency, and separation of assets between properties."
    },
    {
      category: "Legal & Compliance",
      question: "What happens if PropertyPool shuts down?",
      answer: "Your investments are protected because each property is held in a separate SPV, not by PropertyPool directly. If PropertyPool ceases operations, the SPVs and your ownership rights remain intact. A third-party administrator would be appointed to manage the properties and investor interests."
    },
  ];

  const filteredFaqs = faqs.filter(
    faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 pt-24 pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-purple-300 mb-4">
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Help Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === "ur" ? "اکثر پوچھے گئے سوالات" : "Frequently Asked Questions"}
            </h1>
            <p className="text-xl text-purple-200 mb-8">
              {language === "ur" 
                ? "اپنے سوالات کے جوابات یہاں تلاش کریں"
                : "Find answers to common questions about PropertyPool"
              }
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for answers..."
                className="pl-12 py-6 text-lg bg-white/10 border-white/20 text-white placeholder-purple-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(cat.name)}
                className="p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all text-left"
              >
                <cat.icon className="w-6 h-6 text-purple-600 mb-2" />
                <p className="font-medium text-gray-900">{cat.name}</p>
                <p className="text-sm text-gray-500">{cat.count} questions</p>
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <div>
                    <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">
                      {faq.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 mt-1">{faq.question}</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No questions found matching your search.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-purple-600 hover:underline mt-2"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Still Have Questions */}
          <div className="mt-12 bg-purple-50 rounded-2xl p-8 border border-purple-200 text-center">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Still Have Questions?</h2>
            <p className="text-purple-800 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="mailto:support@propertypool.pk"
                className="px-6 py-3 bg-white text-purple-600 rounded-xl font-medium border border-purple-200 hover:bg-purple-50 transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
