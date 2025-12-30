import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building2, 
  Target, 
  Eye, 
  Users, 
  Shield,
  Award,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Every transaction, document, and fee is fully transparent. No hidden costs, no surprises."
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "Making premium real estate investment accessible to everyone, not just the wealthy."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We only list properties that meet our rigorous due diligence standards."
    },
    {
      icon: CheckCircle,
      title: "Shariah Compliance",
      description: "All investments structured according to Islamic finance principles."
    }
  ];

  const team = [
    {
      name: "Muhammad Ali",
      role: "CEO & Founder",
      bio: "Former investment banker with 15 years in real estate finance."
    },
    {
      name: "Fatima Khan",
      role: "Chief Legal Officer",
      bio: "Property law expert specializing in SPV structures and SECP compliance."
    },
    {
      name: "Ahmed Hassan",
      role: "Head of Property Sourcing",
      bio: "20+ years experience in Pakistani real estate market."
    },
    {
      name: "Dr. Usman Qureshi",
      role: "Shariah Advisor",
      bio: "Islamic finance scholar and former advisor to major Islamic banks."
    }
  ];

  const milestones = [
    { year: "2023", event: "PropertyPool founded with vision to democratize real estate" },
    { year: "2023", event: "SECP registration completed" },
    { year: "2024", event: "First property listed and fully funded" },
    { year: "2024", event: "Shariah compliance certification obtained" },
    { year: "2024", event: "Secondary marketplace launched" },
    { year: "2025", event: "Expanded to 15+ properties across Pakistan" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("nav.about")}</h1>
            <p className="text-lg text-muted-foreground">
              PropertyPool is Pakistan's first Shariah-compliant fractional property ownership platform. 
              We're on a mission to democratize real estate investment and make property ownership 
              accessible to every Pakistani.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To transform how Pakistanis invest in real estate by providing a transparent, 
                secure, and accessible platform that enables anyone to build wealth through 
                property ownership, regardless of their financial background.
              </p>
            </Card>
            
            <Card className="p-8">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground">
                A Pakistan where every citizen has the opportunity to participate in real estate 
                investment, where property transactions are transparent and fraud-free, and where 
                wealth creation through property is no longer limited to the privileged few.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">The Problem We Solve</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-muted-foreground">
              Pakistan's real estate market has long been plagued by issues that keep ordinary 
              citizens from participating:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-destructive font-bold">✗</span>
                <span><strong>High Entry Barriers:</strong> Buying property requires millions of rupees, 
                excluding most Pakistanis from the market.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-destructive font-bold">✗</span>
                <span><strong>Fraud & Title Issues:</strong> The informal "file system" is rife with 
                fraud, disputed titles, and Patwari corruption.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-destructive font-bold">✗</span>
                <span><strong>Illiquidity:</strong> Traditional property investments are hard to exit, 
                often taking months or years to sell.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-destructive font-bold">✗</span>
                <span><strong>No Passive Income:</strong> Plot files generate no income until sold, 
                and rental properties require active management.</span>
              </li>
            </ul>
            <p className="text-muted-foreground">
              PropertyPool solves all these problems through fractional ownership, rigorous due 
              diligence, professional management, and a secondary marketplace for liquidity.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-16 text-sm font-semibold text-primary shrink-0">
                    {milestone.year}
                  </div>
                  <div className="flex-1 pb-4 border-b last:border-0">
                    <p>{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-6">
                <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Regulatory Compliance</h2>
            <p className="text-muted-foreground mb-8">
              PropertyPool operates with full regulatory compliance and transparency.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">SECP Registered</h3>
                <p className="text-sm text-muted-foreground">
                  All SPVs registered with Securities and Exchange Commission of Pakistan
                </p>
              </Card>
              <Card className="p-6">
                <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Shariah Certified</h3>
                <p className="text-sm text-muted-foreground">
                  Investment structure approved by qualified Islamic scholars
                </p>
              </Card>
              <Card className="p-6">
                <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">FBR Compliant</h3>
                <p className="text-sm text-muted-foreground">
                  Full tax compliance with proper documentation and reporting
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join the Property Revolution</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Be part of Pakistan's first fractional property ownership platform. 
            Start building your real estate portfolio today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/properties">
                Explore Properties
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
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
