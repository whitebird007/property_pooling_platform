import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { 
  Building2, 
  TrendingUp, 
  Shield, 
  Users, 
  ArrowRight,
  CheckCircle,
  Percent,
  Banknote,
  Scale,
  FileCheck,
  ChevronRight
} from "lucide-react";

export default function Home() {
  const { t } = useLanguage();
  const { data: properties, isLoading } = trpc.properties.list.useQuery({ status: "active" });

  const features = [
    {
      icon: Shield,
      title: "Verified Titles",
      description: "Every property undergoes rigorous legal due diligence. No more Patwari risks.",
    },
    {
      icon: Scale,
      title: "Shariah-Compliant",
      description: "Diminishing Musharaka structure approved by our Shariah board.",
    },
    {
      icon: Users,
      title: "Fractional Ownership",
      description: "Own a piece of premium properties starting from just PKR 50,000.",
    },
    {
      icon: TrendingUp,
      title: "Passive Income",
      description: "Earn monthly rental income without the hassle of property management.",
    },
  ];

  const steps = [
    { step: 1, title: "Browse Properties", description: "Explore our curated selection of verified properties" },
    { step: 2, title: "Complete KYC", description: "Quick identity verification with CNIC or Passport" },
    { step: 3, title: "Invest", description: "Purchase fractional shares in your chosen property" },
    { step: 4, title: "Earn Returns", description: "Receive monthly rental income and capital appreciation" },
  ];

  const stats = [
    { value: "PKR 500M+", label: "Total Property Value" },
    { value: "2,500+", label: "Active Investors" },
    { value: "8-12%", label: "Average Annual Yield" },
    { value: "15+", label: "Properties Listed" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 lg:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="text-sm">
                🇵🇰 Pakistan's First Fractional Property Platform
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {t("hero.title")}
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/properties">
                    {t("hero.cta.explore")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/education">
                    {t("hero.cta.learn")}
                  </Link>
                </Button>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  SECP Registered
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Shariah Certified
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  FBR Compliant
                </div>
              </div>
            </div>
            
            {/* Hero Image/Stats */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="text-center p-6 card-hover">
                    <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose PropertyPool?</h2>
            <p className="text-muted-foreground">
              We're transforming how Pakistanis invest in real estate. No more informal file systems, 
              no more Patwari headaches. Just transparent, secure, and profitable property investment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 card-hover">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
              <p className="text-muted-foreground">Invest in verified, income-generating real estate</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/properties">
                View All
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </Button>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg" />
                  <CardContent className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties?.slice(0, 6).map((property) => (
                <Card key={property.id} className="overflow-hidden card-hover">
                  <div className="relative h-48 bg-muted">
                    {property.images && property.images[0] ? (
                      <img 
                        src={property.images[0]} 
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    <Badge className="absolute top-3 left-3">
                      {property.propertyType.replace("_", " ")}
                    </Badge>
                    {property.rentalType === "short_term" && (
                      <Badge variant="secondary" className="absolute top-3 right-3">
                        Airbnb Ready
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{property.city}, {property.area}</p>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Percent className="w-4 h-4 text-primary" />
                        <span>{property.expectedRentalYield}% yield</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span>{property.expectedAppreciation}% growth</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t flex justify-between items-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Min. Investment</p>
                        <p className="font-semibold">PKR {Number(property.minInvestment).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{property.availableShares} {t("property.shares")}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full" asChild>
                      <Link href={`/properties/${property.id}`}>
                        {t("property.details")}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          {(!properties || properties.length === 0) && !isLoading && (
            <Card className="p-12 text-center">
              <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">No Properties Available Yet</h3>
              <p className="text-muted-foreground mb-4">
                We're currently sourcing premium properties for our platform. Check back soon!
              </p>
              <Button variant="outline" asChild>
                <Link href="/education">Learn How It Works</Link>
              </Button>
            </Card>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              Start your property investment journey in just 4 simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">PropertyPool vs Traditional Methods</h2>
            <p className="text-muted-foreground">
              See why smart investors are choosing our platform over informal file systems
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-destructive/20 bg-destructive/5">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <span className="text-destructive">✗</span>
                  Traditional File System
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    High risk of fraud and disputed titles
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    No legal protection for investors
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    Opaque pricing and hidden "own" money
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    Illiquid - hard to sell quickly
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    No passive income until sale
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 border-primary/20 bg-primary/5">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  PropertyPool Platform
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    100% verified titles with legal due diligence
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    SECP-registered SPV structure
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Transparent pricing, no hidden fees
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Secondary market for easy exit
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Monthly rental income from day one
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Building Wealth?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Join thousands of Pakistanis who are already investing in premium real estate 
            through our secure, Shariah-compliant platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/properties">
                Start Investing
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <Link href="/education">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
