import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Briefcase, MapPin, Clock, Users, Heart, Zap, Globe, GraduationCap, Coffee, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Careers() {
  const { language } = useLanguage();

  const benefits = [
    { icon: Heart, title: "Health Insurance", description: "Comprehensive medical coverage for you and your family" },
    { icon: GraduationCap, title: "Learning Budget", description: "PKR 100,000 annual budget for courses and conferences" },
    { icon: Coffee, title: "Free Meals", description: "Daily lunch and unlimited snacks at the office" },
    { icon: Plane, title: "Paid Time Off", description: "25 days annual leave plus public holidays" },
    { icon: Zap, title: "Stock Options", description: "Equity participation for all full-time employees" },
    { icon: Globe, title: "Remote Friendly", description: "Flexible work-from-home policy" },
  ];

  const openings = [
    {
      title: "Senior Full-Stack Developer",
      department: "Engineering",
      location: "Lahore (Hybrid)",
      type: "Full-time",
      description: "Build and scale our investment platform using React, Node.js, and PostgreSQL.",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Lahore",
      type: "Full-time",
      description: "Define product strategy and roadmap for our investor and property management tools.",
    },
    {
      title: "Investment Analyst",
      department: "Investments",
      location: "Lahore / Karachi",
      type: "Full-time",
      description: "Evaluate properties, conduct due diligence, and prepare investment memos.",
    },
    {
      title: "Customer Success Manager",
      department: "Operations",
      location: "Lahore",
      type: "Full-time",
      description: "Help investors succeed by providing exceptional support and guidance.",
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Lahore (Hybrid)",
      type: "Full-time",
      description: "Drive user acquisition and brand awareness through digital and offline channels.",
    },
    {
      title: "Legal Counsel",
      department: "Legal",
      location: "Lahore",
      type: "Full-time",
      description: "Handle regulatory compliance, contracts, and SPV documentation.",
    },
  ];

  const values = [
    { title: "Investor First", description: "Every decision starts with what's best for our investors" },
    { title: "Transparency", description: "We communicate openly and honestly, always" },
    { title: "Innovation", description: "We challenge the status quo and embrace new ideas" },
    { title: "Integrity", description: "We do the right thing, even when no one is watching" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 pt-24 pb-20">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-purple-300 mb-4">
              <Briefcase className="w-5 h-5" />
              <span className="text-sm font-medium">Join Our Team</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === "ur" ? "ہماری ٹیم میں شامل ہوں" : "Build the Future of Real Estate Investment"}
            </h1>
            <p className="text-xl text-purple-200 mb-8">
              {language === "ur" 
                ? "پاکستان کے پہلے فریکشنل پراپرٹی پلیٹ فارم کو بنانے میں مدد کریں"
                : "Join a passionate team democratizing property investment for millions of Pakistanis"
              }
            </p>
            <a href="#openings">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50">
                View Open Positions
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "50+", label: "Team Members" },
            { value: "PKR 2B+", label: "Assets Under Management" },
            { value: "10,000+", label: "Active Investors" },
            { value: "4.8★", label: "Glassdoor Rating" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
              <p className="text-3xl font-bold text-purple-600">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Our Values</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
            These principles guide everything we do at PropertyPool
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">{index + 1}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Why Join Us?</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
            We offer competitive compensation and benefits to help you thrive
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div id="openings">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Open Positions</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
            Find your next opportunity at PropertyPool
          </p>
          <div className="space-y-4 max-w-3xl mx-auto">
            {openings.map((job, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">
                      {job.department}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">{job.title}</h3>
                    <p className="text-gray-600 mt-2">{job.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Button className="flex-shrink-0">Apply Now</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No Suitable Role */}
        <div className="mt-12 bg-purple-50 rounded-2xl p-8 border border-purple-200 text-center max-w-3xl mx-auto">
          <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Don't See a Suitable Role?</h2>
          <p className="text-purple-800 mb-6">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <a href="mailto:careers@propertypool.pk">
            <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100">
              Send Your Resume
            </Button>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
