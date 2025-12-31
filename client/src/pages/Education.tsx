import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BookOpen,
  Shield,
  Scale,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  Users,
  Building2,
  Wallet,
  Zap,
  Play,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Sparkles
} from "lucide-react";

export default function Education() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("how-it-works");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const tabs = [
    { id: "how-it-works", label: language === "ur" ? "طریقہ کار" : "How It Works", icon: Zap },
    { id: "shariah", label: language === "ur" ? "شریعہ" : "Shariah", icon: Shield },
    { id: "comparison", label: language === "ur" ? "موازنہ" : "Comparison", icon: Scale },
    { id: "faq", label: language === "ur" ? "سوالات" : "FAQ", icon: HelpCircle },
  ];

  const howItWorksSteps = [
    {
      step: 1,
      icon: Users,
      title: language === "ur" ? "اکاؤنٹ بنائیں" : "Create Account",
      description: language === "ur"
        ? "سائن اپ کریں اور اپنا CNIC یا پاسپورٹ استعمال کرتے ہوئے KYC تصدیق مکمل کریں۔"
        : "Sign up and complete KYC verification using your CNIC or passport.",
    },
    {
      step: 2,
      icon: Building2,
      title: language === "ur" ? "پراپرٹی منتخب کریں" : "Choose Property",
      description: language === "ur"
        ? "ہماری تصدیق شدہ پراپرٹیز کی فہرست دیکھیں۔ مکمل تفصیلات اور دستاویزات دستیاب ہیں۔"
        : "Browse our verified property listings with complete details and documentation.",
    },
    {
      step: 3,
      icon: Wallet,
      title: language === "ur" ? "سرمایہ کاری کریں" : "Invest",
      description: language === "ur"
        ? "اپنے بجٹ کے مطابق حصص خریدیں۔ کم از کم سرمایہ کاری صرف 50,000 روپے۔"
        : "Purchase shares according to your budget. Minimum investment just PKR 50,000.",
    },
    {
      step: 4,
      icon: TrendingUp,
      title: language === "ur" ? "منافع کمائیں" : "Earn Returns",
      description: language === "ur"
        ? "ماہانہ کرایہ کی آمدنی حاصل کریں۔ پراپرٹی کی قدر میں اضافے سے بھی فائدہ اٹھائیں۔"
        : "Receive monthly rental income and benefit from property appreciation.",
    },
  ];

  const shariahPrinciples = [
    {
      title: language === "ur" ? "حقیقی ملکیت" : "Real Ownership",
      description: language === "ur"
        ? "ہر سرمایہ کار پراپرٹی کا حقیقی مالک ہے۔ SPV سٹرکچر کے ذریعے قانونی ملکیت یقینی بنائی جاتی ہے۔"
        : "Every investor is a real owner of the property. Legal ownership is ensured through SPV structure.",
    },
    {
      title: language === "ur" ? "نفع و نقصان میں شراکت" : "Profit & Loss Sharing",
      description: language === "ur"
        ? "تمام سرمایہ کار اپنے حصص کے تناسب سے نفع اور نقصان میں شریک ہیں۔"
        : "All investors share profits and losses in proportion to their shares.",
    },
    {
      title: language === "ur" ? "حلال آمدنی" : "Halal Income",
      description: language === "ur"
        ? "کرایہ کی آمدنی حلال ہے کیونکہ یہ حقیقی اثاثے کے استعمال کا معاوضہ ہے۔"
        : "Rental income is halal because it is compensation for the use of a real asset.",
    },
    {
      title: language === "ur" ? "شفاف لین دین" : "Transparent Transactions",
      description: language === "ur"
        ? "تمام لین دین شفاف ہیں۔ کوئی پوشیدہ فیس یا غیر واضح شرائط نہیں۔"
        : "All transactions are transparent. No hidden fees or unclear terms.",
    },
  ];

  const comparisonData = [
    {
      feature: language === "ur" ? "کم از کم سرمایہ کاری" : "Minimum Investment",
      propertyPool: "PKR 50,000",
      fileSystem: "PKR 500,000+",
      traditional: "PKR 5,000,000+",
    },
    {
      feature: language === "ur" ? "قانونی ملکیت" : "Legal Ownership",
      propertyPool: true,
      fileSystem: false,
      traditional: true,
    },
    {
      feature: language === "ur" ? "لیکویڈیٹی" : "Liquidity",
      propertyPool: language === "ur" ? "آسان" : "Easy",
      fileSystem: language === "ur" ? "مشکل" : "Difficult",
      traditional: language === "ur" ? "بہت مشکل" : "Very Difficult",
    },
    {
      feature: language === "ur" ? "شفافیت" : "Transparency",
      propertyPool: language === "ur" ? "مکمل" : "Complete",
      fileSystem: language === "ur" ? "کم" : "Low",
      traditional: language === "ur" ? "درمیانی" : "Medium",
    },
    {
      feature: language === "ur" ? "پیشہ ورانہ انتظام" : "Professional Management",
      propertyPool: true,
      fileSystem: false,
      traditional: false,
    },
  ];

  const faqs = [
    {
      question: language === "ur" ? "کم از کم سرمایہ کاری کتنی ہے؟" : "What is the minimum investment?",
      answer: language === "ur"
        ? "کم از کم سرمایہ کاری صرف 50,000 روپے ہے۔"
        : "The minimum investment is just PKR 50,000.",
    },
    {
      question: language === "ur" ? "میرا پیسہ کیسے محفوظ ہے؟" : "How is my money protected?",
      answer: language === "ur"
        ? "آپ کی سرمایہ کاری SPV کے ذریعے محفوظ ہے۔ تمام دستاویزات SECP کے ساتھ رجسٹرڈ ہیں۔"
        : "Your investment is protected through an SPV. All documents are registered with SECP.",
    },
    {
      question: language === "ur" ? "کرایہ کی آمدنی کب ملتی ہے؟" : "When do I receive rental income?",
      answer: language === "ur"
        ? "کرایہ کی آمدنی ہر ماہ آپ کے والیٹ میں جمع ہوتی ہے۔"
        : "Rental income is deposited in your wallet every month.",
    },
    {
      question: language === "ur" ? "کیا میں اپنے حصص بیچ سکتا ہوں؟" : "Can I sell my shares?",
      answer: language === "ur"
        ? "جی ہاں! آپ کسی بھی وقت اپنے حصص سیکنڈری مارکیٹ پر بیچ سکتے ہیں۔"
        : "Yes! You can sell your shares anytime on our secondary marketplace.",
    },
    {
      question: language === "ur" ? "کیا یہ شریعہ مطابق ہے؟" : "Is this Shariah-compliant?",
      answer: language === "ur"
        ? "جی ہاں! ہمارا ماڈل مشارکہ متناقصہ پر مبنی ہے جو کہ اسلامی فقہ کے مطابق جائز ہے۔"
        : "Yes! Our model is based on Diminishing Musharaka which is permissible according to Islamic jurisprudence.",
    },
  ];

  const risks = [
    {
      title: language === "ur" ? "مارکیٹ رسک" : "Market Risk",
      description: language === "ur"
        ? "پراپرٹی کی قیمتیں مارکیٹ کے حالات کے مطابق اوپر نیچے ہو سکتی ہیں۔"
        : "Property prices can fluctuate based on market conditions.",
    },
    {
      title: language === "ur" ? "کرایہ داری رسک" : "Tenancy Risk",
      description: language === "ur"
        ? "کرایہ دار نہ ملنے کی صورت میں آمدنی متاثر ہو سکتی ہے۔"
        : "Income may be affected if tenants are not found.",
    },
    {
      title: language === "ur" ? "لیکویڈیٹی رسک" : "Liquidity Risk",
      description: language === "ur"
        ? "سیکنڈری مارکیٹ پر خریدار نہ ملنے کی صورت میں فوری فروخت مشکل ہو سکتی ہے۔"
        : "Immediate sale may be difficult if buyers are not available.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-purple-50 to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 text-sm font-medium">
                {language === "ur" ? "سیکھیں اور سمجھیں" : "Learn & Understand"}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {language === "ur" ? "فریکشنل پراپرٹی" : "Fractional Property"}
              <span className="block text-purple-600">
                {language === "ur" ? "انویسٹمنٹ" : "Investment"}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {language === "ur"
                ? "جانیں کہ PropertyPool کیسے کام کرتا ہے، شریعہ مطابقت، اور روایتی طریقوں سے کیسے بہتر ہے۔"
                : "Learn how PropertyPool works, understand Shariah compliance, and see how it compares to traditional methods."}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-6 text-lg rounded-xl">
                <Play className="mr-2 w-5 h-5" />
                {language === "ur" ? "ویڈیو دیکھیں" : "Watch Video Guide"}
              </Button>
              <Link href="/properties">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg rounded-xl">
                  {language === "ur" ? "پراپرٹیز دیکھیں" : "Browse Properties"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-4 bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12">
        <div className="container">
          {/* How It Works Tab */}
          {activeTab === "how-it-works" && (
            <div className="space-y-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {howItWorksSteps.map((step, index) => (
                  <div key={index} className="relative group">
                    <div className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 h-full">
                      <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="text-white font-bold text-xl">{step.step}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link href="/properties">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-6 text-lg rounded-xl">
                    {language === "ur" ? "پراپرٹیز دیکھیں" : "Browse Properties"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Shariah Tab */}
          {activeTab === "shariah" && (
            <div className="space-y-12">
              <div className="max-w-4xl mx-auto">
                <div className="p-8 rounded-2xl bg-green-50 border border-green-200 mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {language === "ur" ? "مشارکہ متناقصہ ماڈل" : "Diminishing Musharaka Model"}
                      </h2>
                      <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                        {language === "ur" ? "شریعہ سرٹیفائیڈ" : "Shariah Certified"}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {language === "ur"
                      ? "ہمارا پلیٹ فارم مشارکہ متناقصہ کے اصول پر کام کرتا ہے جو کہ اسلامی فقہ کے مطابق ایک جائز شراکت داری کا طریقہ ہے۔"
                      : "Our platform operates on the Diminishing Musharaka principle, which is a legitimate partnership method according to Islamic jurisprudence."}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {shariahPrinciples.map((principle, index) => (
                    <div key={index} className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 mb-2">{principle.title}</h3>
                          <p className="text-gray-600">{principle.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Comparison Tab */}
          {activeTab === "comparison" && (
            <div className="space-y-8">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {language === "ur" ? "موازنہ" : "Compare Investment Methods"}
                  </h2>
                  <p className="text-gray-600">
                    {language === "ur"
                      ? "دیکھیں کہ PropertyPool روایتی طریقوں سے کیسے بہتر ہے۔"
                      : "See how PropertyPool compares to traditional investment methods."}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">
                          {language === "ur" ? "خصوصیت" : "Feature"}
                        </th>
                        <th className="text-center py-4 px-6">
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-100 text-purple-700 font-semibold">
                            <Sparkles className="w-4 h-4" />
                            PropertyPool
                          </div>
                        </th>
                        <th className="text-center py-4 px-6 font-semibold text-gray-600">
                          {language === "ur" ? "فائل سسٹم" : "File System"}
                        </th>
                        <th className="text-center py-4 px-6 font-semibold text-gray-600">
                          {language === "ur" ? "روایتی" : "Traditional"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData.map((row, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-6 font-medium text-gray-900">{row.feature}</td>
                          <td className="py-4 px-6 text-center">
                            {typeof row.propertyPool === "boolean" ? (
                              row.propertyPool ? (
                                <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto" />
                              ) : (
                                <span className="text-red-500">✗</span>
                              )
                            ) : (
                              <span className="font-semibold text-purple-600">{row.propertyPool}</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center">
                            {typeof row.fileSystem === "boolean" ? (
                              row.fileSystem ? (
                                <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto" />
                              ) : (
                                <span className="text-red-500">✗</span>
                              )
                            ) : (
                              <span className="text-gray-600">{row.fileSystem}</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center">
                            {typeof row.traditional === "boolean" ? (
                              row.traditional ? (
                                <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto" />
                              ) : (
                                <span className="text-red-500">✗</span>
                              )
                            ) : (
                              <span className="text-gray-600">{row.traditional}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Risk Disclosure */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200 mb-4">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-amber-700 text-sm font-medium">
                  {language === "ur" ? "خطرات کا انکشاف" : "Risk Disclosure"}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {language === "ur" ? "سرمایہ کاری کے خطرات" : "Investment Risks"}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {risks.map((risk, index) => (
                <div key={index} className="p-6 rounded-2xl bg-white border border-amber-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{risk.title}</h3>
                  <p className="text-gray-600 text-sm">{risk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "ur" ? "سرمایہ کاری شروع کرنے کے لیے تیار ہیں؟" : "Ready to Start Investing?"}
          </h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            {language === "ur"
              ? "ہزاروں پاکستانیوں کے ساتھ شامل ہوں جو فریکشنل پراپرٹی کے ذریعے دولت بنا رہے ہیں۔"
              : "Join thousands of Pakistanis building wealth through fractional property ownership."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/properties">
              <a className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-all shadow-lg">
                {language === "ur" ? "پراپرٹیز دیکھیں" : "Browse Properties"}
                <ArrowRight className="w-5 h-5" />
              </a>
            </Link>
            <Link href="/calculator">
              <a className="inline-flex items-center gap-2 px-8 py-4 bg-purple-500/30 text-white font-semibold rounded-xl border border-white/30 hover:bg-purple-500/50 transition-all">
                {language === "ur" ? "منافع کیلکولیٹ کریں" : "Calculate Returns"}
              </a>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
