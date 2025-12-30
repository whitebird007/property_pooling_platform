import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  BookOpen, 
  Scale, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  Users,
  Building2,
  Wallet,
  Zap,
  Sparkles
} from "lucide-react";

export default function Education() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("how-it-works");

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <BookOpen className="w-4 h-4 mr-2" />
              {language === "ur" ? "سیکھیں اور سمجھیں" : "Learn & Understand"}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {language === "ur" ? (
                <>
                  <span className="gradient-text">فریکشنل</span> پراپرٹی انویسٹمنٹ
                </>
              ) : (
                <>
                  <span className="gradient-text">Fractional</span> Property Investment
                </>
              )}
            </h1>
            <p className="text-xl text-white/70 mb-8">
              {language === "ur"
                ? "جانیں کہ PropertyPool کیسے کام کرتا ہے، شریعہ مطابقت، اور روایتی طریقوں سے کیسے بہتر ہے۔"
                : "Learn how PropertyPool works, understand Shariah compliance, and see how it compares to traditional methods."}
            </p>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-16">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 h-14 p-1 bg-white shadow-sm rounded-xl">
              <TabsTrigger value="how-it-works" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
                <Zap className="w-4 h-4 mr-2 hidden sm:inline" />
                {language === "ur" ? "طریقہ کار" : "How It Works"}
              </TabsTrigger>
              <TabsTrigger value="shariah" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
                <Shield className="w-4 h-4 mr-2 hidden sm:inline" />
                {language === "ur" ? "شریعہ" : "Shariah"}
              </TabsTrigger>
              <TabsTrigger value="comparison" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
                <Scale className="w-4 h-4 mr-2 hidden sm:inline" />
                {language === "ur" ? "موازنہ" : "Comparison"}
              </TabsTrigger>
              <TabsTrigger value="faq" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
                <HelpCircle className="w-4 h-4 mr-2 hidden sm:inline" />
                {language === "ur" ? "سوالات" : "FAQ"}
              </TabsTrigger>
            </TabsList>

            {/* How It Works Tab */}
            <TabsContent value="how-it-works" className="space-y-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {howItWorksSteps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="feature-card text-center h-full">
                      <div className="process-step">
                        <div className="step-number mx-auto">{step.step}</div>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    {index < howItWorksSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link href="/properties">
                  <Button className="btn-premium">
                    {language === "ur" ? "پراپرٹیز دیکھیں" : "Browse Properties"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            {/* Shariah Tab */}
            <TabsContent value="shariah" className="space-y-12">
              <div className="max-w-4xl mx-auto">
                <div className="glass-card rounded-2xl p-8 mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        {language === "ur" ? "مشارکہ متناقصہ ماڈل" : "Diminishing Musharaka Model"}
                      </h2>
                      <Badge className="mt-2 bg-emerald-100 text-emerald-700">
                        {language === "ur" ? "شریعہ سرٹیفائیڈ" : "Shariah Certified"}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {language === "ur"
                      ? "ہمارا پلیٹ فارم مشارکہ متناقصہ کے اصول پر کام کرتا ہے جو کہ اسلامی فقہ کے مطابق ایک جائز شراکت داری کا طریقہ ہے۔"
                      : "Our platform operates on the Diminishing Musharaka principle, which is a legitimate partnership method according to Islamic jurisprudence."}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {shariahPrinciples.map((principle, index) => (
                    <div key={index} className="feature-card">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">{principle.title}</h3>
                          <p className="text-gray-600">{principle.description}</p>
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
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-primary to-emerald-600 text-white">
                          <th className="px-6 py-4 text-left font-semibold">
                            {language === "ur" ? "خصوصیت" : "Feature"}
                          </th>
                          <th className="px-6 py-4 text-center font-semibold">PropertyPool</th>
                          <th className="px-6 py-4 text-center font-semibold">
                            {language === "ur" ? "فائل سسٹم" : "File System"}
                          </th>
                          <th className="px-6 py-4 text-center font-semibold">
                            {language === "ur" ? "روایتی" : "Traditional"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonData.map((row, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                            <td className="px-6 py-4 font-medium">{row.feature}</td>
                            <td className="px-6 py-4 text-center">
                              {typeof row.propertyPool === "boolean" ? (
                                row.propertyPool ? (
                                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
                                ) : (
                                  <AlertTriangle className="w-6 h-6 text-red-500 mx-auto" />
                                )
                              ) : (
                                <span className="font-semibold text-primary">{row.propertyPool}</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {typeof row.fileSystem === "boolean" ? (
                                row.fileSystem ? (
                                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
                                ) : (
                                  <AlertTriangle className="w-6 h-6 text-red-500 mx-auto" />
                                )
                              ) : (
                                <span className="text-gray-600">{row.fileSystem}</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {typeof row.traditional === "boolean" ? (
                                row.traditional ? (
                                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
                                ) : (
                                  <AlertTriangle className="w-6 h-6 text-red-500 mx-auto" />
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
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-8">
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="bg-white rounded-xl px-6 border shadow-sm">
                      <AccordionTrigger className="text-left font-semibold py-5 hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Risk Disclosure Section */}
      <section className="py-16 bg-amber-50 border-y border-amber-200">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold">
                {language === "ur" ? "رسک ڈسکلوژر" : "Risk Disclosure"}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {risks.map((risk, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-amber-200">
                  <h3 className="font-bold mb-2">{risk.title}</h3>
                  <p className="text-gray-600 text-sm">{risk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 section-dark relative overflow-hidden">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {language === "ur" ? (
                <>
                  سرمایہ کاری کے لیے <span className="gradient-text">تیار ہیں؟</span>
                </>
              ) : (
                <>
                  Ready to <span className="gradient-text">Start Investing?</span>
                </>
              )}
            </h2>
            <p className="text-xl text-white/70 mb-8">
              {language === "ur"
                ? "آج ہی اپنا اکاؤنٹ بنائیں اور پریمیم پراپرٹیز میں سرمایہ کاری شروع کریں۔"
                : "Create your account today and start investing in premium properties."}
            </p>
            <Link href="/properties">
              <Button className="btn-premium">
                {language === "ur" ? "پراپرٹیز دیکھیں" : "Browse Properties"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
