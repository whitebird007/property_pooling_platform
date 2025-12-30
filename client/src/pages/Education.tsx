import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { trpc } from "@/lib/trpc";
import { 
  BookOpen, 
  Scale, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  HelpCircle,
  CheckCircle,
  ArrowRight,
  Play,
  FileText
} from "lucide-react";

export default function Education() {
  const { t } = useLanguage();
  const { data: content } = trpc.education.getContent.useQuery();

  const categories = [
    {
      id: "shariah_compliance",
      icon: Scale,
      title: t("education.shariah.title"),
      description: t("education.shariah.desc"),
    },
    {
      id: "platform_guide",
      icon: BookOpen,
      title: "Platform Guide",
      description: "Step-by-step guide to investing through PropertyPool",
    },
    {
      id: "market_comparison",
      icon: TrendingUp,
      title: t("education.vs.title"),
      description: t("education.vs.desc"),
    },
    {
      id: "risk_disclosure",
      icon: AlertTriangle,
      title: t("education.risk.title"),
      description: t("education.risk.desc"),
    },
  ];

  const shariahContent = {
    title: "Shariah-Compliant Property Investment",
    sections: [
      {
        title: "What is Diminishing Musharaka?",
        content: `Diminishing Musharaka (شراکت متناقصہ) is an Islamic financing structure where two or more parties jointly own an asset. Over time, one party gradually buys out the other's share until they become the sole owner.

In our platform:
• The SPV (representing all investors) and individual investors jointly own the property
• Rental income is distributed proportionally to ownership shares
• Investors can buy more shares or sell their existing shares through the secondary market
• The structure is approved by our Shariah Advisory Board`
      },
      {
        title: "Why is this Halal?",
        content: `Our investment structure is Shariah-compliant because:

1. **No Riba (Interest)**: Returns come from actual rental income and property appreciation, not interest
2. **Asset-Backed**: Every investment is backed by real, tangible property
3. **Shared Risk**: Investors share both profits and risks proportionally
4. **Transparent Pricing**: No hidden fees or deceptive practices
5. **Halal Activities**: Properties are not used for haram activities (no bars, casinos, etc.)`
      },
      {
        title: "Shariah Board Certification",
        content: `Our investment structure has been reviewed and approved by qualified Islamic scholars. Key certifications:

• Shariah Compliance Certificate from [Shariah Board Name]
• Annual Shariah Audit conducted by independent auditors
• All property acquisitions reviewed for Shariah compliance
• Continuous monitoring of tenant activities`
      }
    ]
  };

  const platformGuide = {
    title: "How to Invest with PropertyPool",
    steps: [
      {
        step: 1,
        title: "Create Your Account",
        description: "Sign up with your email and basic information. It takes less than 2 minutes."
      },
      {
        step: 2,
        title: "Complete KYC Verification",
        description: "Upload your CNIC (front and back) and proof of address. Verification typically takes 24-48 hours."
      },
      {
        step: 3,
        title: "Fund Your Wallet",
        description: "Add funds via bank transfer, JazzCash, or Easypaisa. Minimum deposit is PKR 10,000."
      },
      {
        step: 4,
        title: "Browse Properties",
        description: "Explore our curated selection of verified properties. Review documents, financials, and projections."
      },
      {
        step: 5,
        title: "Make Your Investment",
        description: "Select the number of shares you want to purchase. Sign the digital investment agreement."
      },
      {
        step: 6,
        title: "Receive Returns",
        description: "Get monthly rental income credited to your wallet. Track your portfolio performance in real-time."
      }
    ]
  };

  const comparisonData = {
    title: "PropertyPool vs Traditional Methods",
    comparisons: [
      {
        aspect: "Minimum Investment",
        traditional: "PKR 50 Lakh+ for a plot file",
        propertyPool: "Starting from PKR 50,000"
      },
      {
        aspect: "Title Verification",
        traditional: "Buyer's responsibility, high fraud risk",
        propertyPool: "100% verified by legal team"
      },
      {
        aspect: "Liquidity",
        traditional: "Months to years to sell",
        propertyPool: "Secondary market for quick exit"
      },
      {
        aspect: "Passive Income",
        traditional: "None until property is sold",
        propertyPool: "Monthly rental income"
      },
      {
        aspect: "Management",
        traditional: "Self-managed, time-consuming",
        propertyPool: "Professional management included"
      },
      {
        aspect: "Legal Protection",
        traditional: "Informal agreements, weak protection",
        propertyPool: "SECP-registered SPV structure"
      },
      {
        aspect: "Transparency",
        traditional: "Hidden 'own money', unclear pricing",
        propertyPool: "Fully transparent pricing and fees"
      },
      {
        aspect: "Diversification",
        traditional: "All eggs in one basket",
        propertyPool: "Invest in multiple properties"
      }
    ]
  };

  const riskDisclosure = {
    title: "Understanding Investment Risks",
    risks: [
      {
        title: "Market Risk",
        description: "Property values can go down as well as up. Economic conditions, interest rates, and local market dynamics affect property prices.",
        mitigation: "We conduct thorough market research and only list properties in high-demand areas with strong fundamentals."
      },
      {
        title: "Liquidity Risk",
        description: "While we offer a secondary market, there's no guarantee you can sell your shares immediately at your desired price.",
        mitigation: "Our secondary market provides better liquidity than traditional property investment, but investors should plan for a minimum 3-5 year holding period."
      },
      {
        title: "Rental Income Risk",
        description: "Rental income may vary due to vacancies, tenant defaults, or market rent changes.",
        mitigation: "We maintain reserve funds and work with professional property managers to minimize vacancies and ensure timely rent collection."
      },
      {
        title: "Regulatory Risk",
        description: "Changes in tax laws, property regulations, or investment rules could affect returns.",
        mitigation: "We work with legal experts to ensure compliance and adapt our structure to regulatory changes."
      }
    ]
  };

  const faqs = [
    {
      question: "What is the minimum investment amount?",
      answer: "The minimum investment varies by property but typically starts from PKR 50,000. This allows small and medium investors to participate in premium real estate."
    },
    {
      question: "How do I receive my rental income?",
      answer: "Rental income is distributed monthly to your PropertyPool wallet. You can withdraw to your bank account anytime or reinvest in other properties."
    },
    {
      question: "Can I sell my shares before the property is sold?",
      answer: "Yes! Our secondary marketplace allows you to list your shares for sale. Other verified investors can purchase them, providing liquidity for your investment."
    },
    {
      question: "What documents do I need for KYC?",
      answer: "You need: 1) CNIC (front and back), 2) Proof of address (utility bill or bank statement), 3) Bank account details for withdrawals."
    },
    {
      question: "Is my investment insured?",
      answer: "Properties are insured against damage and natural disasters. However, investment returns are not guaranteed and depend on market performance."
    },
    {
      question: "How are properties selected?",
      answer: "Our team conducts extensive due diligence including title verification, market analysis, rental yield assessment, and physical inspection. Only properties meeting our strict criteria are listed."
    },
    {
      question: "What happens if I want to exit my investment?",
      answer: "You have two options: 1) Sell your shares on the secondary market, or 2) Wait for the property to be sold at the end of the holding period and receive your share of proceeds."
    },
    {
      question: "Are there any hidden fees?",
      answer: "No hidden fees. We charge a transparent 2% platform fee on investments and 10% of rental income for property management. All fees are clearly disclosed before you invest."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="bg-muted/30 py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("nav.education")}</h1>
          <p className="text-muted-foreground max-w-2xl">
            Everything you need to know about fractional property investment, Shariah compliance, 
            and how PropertyPool is transforming real estate investment in Pakistan.
          </p>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-12">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="card-hover cursor-pointer">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <Tabs defaultValue="shariah" className="w-full">
            <TabsList className="w-full justify-start flex-wrap h-auto gap-2 bg-transparent">
              <TabsTrigger value="shariah" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Shariah Compliance
              </TabsTrigger>
              <TabsTrigger value="guide" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                How It Works
              </TabsTrigger>
              <TabsTrigger value="comparison" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Platform vs Traditional
              </TabsTrigger>
              <TabsTrigger value="risks" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Risk Disclosure
              </TabsTrigger>
              <TabsTrigger value="faq" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                FAQs
              </TabsTrigger>
            </TabsList>
            
            {/* Shariah Compliance */}
            <TabsContent value="shariah" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="w-6 h-6 text-primary" />
                    {shariahContent.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {shariahContent.sections.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
                      <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                        {section.content}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Platform Guide */}
            <TabsContent value="guide" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                    {platformGuide.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {platformGuide.steps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                          {step.step}
                        </div>
                        <div className="flex-1 pb-6 border-b last:border-0">
                          <h4 className="font-semibold mb-1">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <Button size="lg" asChild>
                      <Link href="/properties">
                        Start Investing Now
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Comparison */}
            <TabsContent value="comparison" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    {comparisonData.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Aspect</th>
                          <th className="text-left py-3 px-4 font-semibold text-destructive">Traditional File System</th>
                          <th className="text-left py-3 px-4 font-semibold text-primary">PropertyPool</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonData.comparisons.map((row, index) => (
                          <tr key={index} className="border-b last:border-0">
                            <td className="py-3 px-4 font-medium">{row.aspect}</td>
                            <td className="py-3 px-4 text-muted-foreground">{row.traditional}</td>
                            <td className="py-3 px-4">
                              <span className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                {row.propertyPool}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Risk Disclosure */}
            <TabsContent value="risks" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-primary" />
                    {riskDisclosure.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {riskDisclosure.risks.map((risk, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        {risk.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">{risk.description}</p>
                      <div className="bg-primary/5 p-3 rounded">
                        <p className="text-sm">
                          <strong>Our Mitigation:</strong> {risk.mitigation}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <strong>Important:</strong> Past performance is not indicative of future results. 
                      All investments carry risk, and you may lose some or all of your invested capital. 
                      Please invest only what you can afford to lose and consider seeking independent financial advice.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* FAQs */}
            <TabsContent value="faq" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-primary" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Join thousands of Pakistanis who are building wealth through fractional property ownership.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/properties">
                Browse Properties
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">
                About Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
