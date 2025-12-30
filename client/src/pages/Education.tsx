import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Sparkles,
  Play,
  Star,
  ChevronDown,
  ChevronUp,
  Target
} from "lucide-react";

export default function Education() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("how-it-works");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/education-bg.png')" }}
        />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(251, 191, 36, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Floating Elements */}
        <div className="absolute top-40 left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">
                {language === "ur" ? "سیکھیں اور سمجھیں" : "Learn & Understand"}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {language === "ur" ? "فریکشنل پراپرٹی" : "Fractional Property"}
              <span className="block bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                {language === "ur" ? "انویسٹمنٹ" : "Investment"}
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-8">
              {language === "ur"
                ? "جانیں کہ PropertyPool کیسے کام کرتا ہے، شریعہ مطابقت، اور روایتی طریقوں سے کیسے بہتر ہے۔"
                : "Learn how PropertyPool works, understand Shariah compliance, and see how it compares to traditional methods."}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-amber-500/25">
                <Play className="mr-2 w-5 h-5" />
                {language === "ur" ? "ویڈیو دیکھیں" : "Watch Video Guide"}
              </Button>
              <Link href="/properties">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-8 py-6 text-lg rounded-xl">
                  {language === "ur" ? "پراپرٹیز دیکھیں" : "Browse Properties"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-16">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 h-14 p-1 bg-slate-800/50 border border-slate-700 rounded-xl">
              <TabsTrigger 
                value="how-it-works" 
                className="rounded-lg text-slate-400 data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900 data-[state=active]:font-semibold"
              >
                <Zap className="w-4 h-4 mr-2 hidden sm:inline" />
                {language === "ur" ? "طریقہ کار" : "How It Works"}
              </TabsTrigger>
              <TabsTrigger 
                value="shariah" 
                className="rounded-lg text-slate-400 data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900 data-[state=active]:font-semibold"
              >
                <Shield className="w-4 h-4 mr-2 hidden sm:inline" />
                {language === "ur" ? "شریعہ" : "Shariah"}
              </TabsTrigger>
              <TabsTrigger 
                value="comparison" 
                className="rounded-lg text-slate-400 data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900 data-[state=active]:font-semibold"
              >
                <Scale className="w-4 h-4 mr-2 hidden sm:inline" />
                {language === "ur" ? "موازنہ" : "Comparison"}
              </TabsTrigger>
              <TabsTrigger 
                value="faq" 
                className="rounded-lg text-slate-400 data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900 data-[state=active]:font-semibold"
              >
                <HelpCircle className="w-4 h-4 mr-2 hidden sm:inline" />
                {language === "ur" ? "سوالات" : "FAQ"}
              </TabsTrigger>
            </TabsList>

            {/* How It Works Tab */}
            <TabsContent value="how-it-works" className="space-y-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {howItWorksSteps.map((step, index) => (
                  <div key={index} className="relative group">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300 h-full">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="text-slate-900 font-bold text-xl">{step.step}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-slate-400 text-sm">{step.description}</p>
                    </div>
                    {index < howItWorksSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-amber-500 to-transparent" />
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link href="/properties">
                  <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-amber-500/25">
                    {language === "ur" ? "پراپرٹیز دیکھیں" : "Browse Properties"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            {/* Shariah Tab */}
            <TabsContent value="shariah" className="space-y-12">
              <div className="max-w-4xl mx-auto">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {language === "ur" ? "مشارکہ متناقصہ ماڈل" : "Diminishing Musharaka Model"}
                      </h2>
                      <Badge className="mt-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        {language === "ur" ? "شریعہ سرٹیفائیڈ" : "Shariah Certified"}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    {language === "ur"
                      ? "ہمارا پلیٹ فارم مشارکہ متناقصہ کے اصول پر کام کرتا ہے جو کہ اسلامی فقہ کے مطابق ایک جائز شراکت داری کا طریقہ ہے۔"
                      : "Our platform operates on the Diminishing Musharaka principle, which is a legitimate partnership method according to Islamic jurisprudence."}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {shariahPrinciples.map((principle, index) => (
                    <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-white mb-2">{principle.title}</h3>
                          <p className="text-slate-400">{principle.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Comparison Tab */}
            <TabsContent value="comparison" className="space-y-8">
              <div className="max-w-5xl mx-auto">
                <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-amber-500 to-amber-600">
                          <th className="px-6 py-4 text-left font-semibold text-slate-900">
                            {language === "ur" ? "خصوصیت" : "Feature"}
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-slate-900">PropertyPool</th>
                          <th className="px-6 py-4 text-center font-semibold text-slate-900">
                            {language === "ur" ? "فائل سسٹم" : "File System"}
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-slate-900">
                            {language === "ur" ? "روایتی" : "Traditional"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonData.map((row, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-slate-800/30" : "bg-slate-800/10"}>
                            <td className="px-6 py-4 font-medium text-white">{row.feature}</td>
                            <td className="px-6 py-4 text-center">
                              {typeof row.propertyPool === "boolean" ? (
                                row.propertyPool ? (
                                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                                ) : (
                                  <AlertTriangle className="w-6 h-6 text-red-400 mx-auto" />
                                )
                              ) : (
                                <span className="font-semibold text-amber-400">{row.propertyPool}</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {typeof row.fileSystem === "boolean" ? (
                                row.fileSystem ? (
                                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                                ) : (
                                  <AlertTriangle className="w-6 h-6 text-red-400 mx-auto" />
                                )
                              ) : (
                                <span className="text-slate-400">{row.fileSystem}</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {typeof row.traditional === "boolean" ? (
                                row.traditional ? (
                                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                                ) : (
                                  <AlertTriangle className="w-6 h-6 text-red-400 mx-auto" />
                                )
                              ) : (
                                <span className="text-slate-400">{row.traditional}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-8">
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index}
                    className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span className="font-semibold text-white pr-4">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-slate-400">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Risk Disclosure */}
      <section className="py-20 bg-slate-900/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-sm font-medium">
                  {language === "ur" ? "رسک انکشاف" : "Risk Disclosure"}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                {language === "ur" ? "سرمایہ کاری کے خطرات" : "Investment Risks"}
              </h2>
              <p className="text-slate-400">
                {language === "ur"
                  ? "ہر سرمایہ کاری میں خطرات شامل ہیں۔ سرمایہ کاری سے پہلے ان کو سمجھنا ضروری ہے۔"
                  : "All investments carry risks. It's important to understand these before investing."}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {risks.map((risk, index) => (
                <div key={index} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{risk.title}</h3>
                  <p className="text-slate-400 text-sm">{risk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-500/10 via-slate-900 to-emerald-500/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
              <Target className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">
                {language === "ur" ? "شروع کریں" : "Get Started"}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {language === "ur" ? "آج ہی سرمایہ کاری شروع کریں" : "Start Investing Today"}
            </h2>
            <p className="text-slate-400 mb-8">
              {language === "ur"
                ? "صرف PKR 50,000 سے پراپرٹی کے مالک بنیں۔ مفت اکاؤنٹ بنائیں۔"
                : "Own property with just PKR 50,000. Create your free account and start building wealth."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-amber-500/25">
                  <Sparkles className="mr-2 w-5 h-5" />
                  {language === "ur" ? "مفت اکاؤنٹ بنائیں" : "Create Free Account"}
                </Button>
              </Link>
              <Link href="/properties">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-8 py-6 text-lg rounded-xl">
                  {language === "ur" ? "پراپرٹیز دیکھیں" : "Browse Properties"}
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
