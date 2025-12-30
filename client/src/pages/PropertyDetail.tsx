import { useState, useMemo } from "react";
import { Link, useParams } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Building2, 
  TrendingUp, 
  Percent,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Calendar,
  FileCheck,
  Shield,
  Calculator,
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  Play,
  ChevronRight,
  Star,
  Users,
  Sparkles,
  ArrowRight,
  Download,
  Heart,
  Share2,
  Target,
  AlertTriangle,
  Image as ImageIcon
} from "lucide-react";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  
  const { data, isLoading, error } = trpc.properties.getById.useQuery({ id: Number(id) });
  
  const [investmentShares, setInvestmentShares] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const property = data?.property;
  const documents = data?.documents || [];
  const spv = data?.spv;
  const dueDiligence = data?.dueDiligence || [];

  // Sample property images
  const propertyImages = [
    "/hero-bg.png",
    "/properties-bg.png",
    "/about-bg.png",
    "/education-bg.png"
  ];

  // Investment Calculator
  const calculations = useMemo(() => {
    if (!property) return null;
    
    const sharePrice = Number(property.sharePrice);
    const totalInvestment = investmentShares * sharePrice;
    const rentalYield = Number(property.expectedRentalYield) / 100;
    const appreciation = Number(property.expectedAppreciation) / 100;
    
    const monthlyIncome = (totalInvestment * rentalYield) / 12;
    const annualIncome = totalInvestment * rentalYield;
    const fiveYearIncome = annualIncome * 5;
    const fiveYearAppreciation = totalInvestment * Math.pow(1 + appreciation, 5) - totalInvestment;
    const fiveYearTotal = totalInvestment + fiveYearIncome + fiveYearAppreciation;
    
    return {
      totalInvestment,
      monthlyIncome,
      annualIncome,
      fiveYearIncome,
      fiveYearAppreciation,
      fiveYearTotal,
      roi: ((fiveYearTotal - totalInvestment) / totalInvestment) * 100,
    };
  }, [property, investmentShares]);

  const fundingProgress = property 
    ? ((property.totalShares - property.availableShares) / property.totalShares) * 100 
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-32">
          <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 text-center max-w-md">
            <AlertCircle className="w-12 h-12 mx-auto text-red-400 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Property Not Found</h2>
            <p className="text-slate-400 mb-6">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/properties">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold">
                Browse Properties
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section with Property Images */}
      <section className="relative pt-24 pb-8">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/properties" className="hover:text-amber-400 transition-colors">Properties</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{property.title}</span>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden aspect-video">
              {property.images && property.images[0] ? (
                <img 
                  src={property.images[0]} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={propertyImages[activeImageIndex]} 
                  alt="Property"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                {property.virtualTourUrl && (
                  <Button 
                    size="sm" 
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                    onClick={() => window.open(property.virtualTourUrl!, '_blank')}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Virtual Tour
                  </Button>
                )}
                <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  {propertyImages.length} Photos
                </Button>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="icon" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="icon" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-slate-900/80 text-white border-0">
                  {property.propertyType.replace("_", " ")}
                </Badge>
                {property.rentalType === "short_term" && (
                  <Badge className="bg-amber-500/80 text-slate-900 border-0">Airbnb Ready</Badge>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {propertyImages.slice(1, 4).map((img, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveImageIndex(index + 1)}
                  className={`relative rounded-xl overflow-hidden aspect-video cursor-pointer border-2 transition-all ${
                    activeImageIndex === index + 1 ? 'border-amber-500' : 'border-transparent hover:border-amber-500/50'
                  }`}
                >
                  <img src={img} alt={`Property ${index + 2}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/30" />
                </div>
              ))}
            </div>
          </div>

          {/* Property Header */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {language === "ur" ? "تصدیق شدہ" : "Verified"}
                </Badge>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {property.expectedRentalYield}% Yield
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  <Shield className="w-3 h-3 mr-1" />
                  {language === "ur" ? "شریعہ کمپلائنٹ" : "Shariah Compliant"}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {property.title}
              </h1>

              <div className="flex items-center gap-2 text-slate-400 mb-6">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>{property.address}, {property.city}</span>
              </div>

              <div className="flex flex-wrap gap-6 text-slate-300">
                {property.bedrooms && (
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-amber-400" />
                    <span>{property.bedrooms} {language === "ur" ? "بیڈ" : "Beds"}</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-amber-400" />
                    <span>{property.bathrooms} {language === "ur" ? "باتھ" : "Baths"}</span>
                  </div>
                )}
                {property.sizeSqFt && (
                  <div className="flex items-center gap-2">
                    <Maximize className="w-5 h-5 text-amber-400" />
                    <span>{property.sizeSqFt.toLocaleString()} sq ft</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-400" />
                  <span>{property.propertyType.replace("_", " ")}</span>
                </div>
              </div>
            </div>

            {/* Investment Summary Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50">
              <div className="text-center mb-6">
                <p className="text-slate-400 text-sm mb-1">{language === "ur" ? "پراپرٹی ویلیو" : "Property Value"}</p>
                <p className="text-3xl font-bold text-white">
                  PKR {(Number(property.totalValue) / 10000000).toFixed(1)} Cr
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{language === "ur" ? "شیئر پرائس" : "Share Price"}</span>
                  <span className="text-white font-semibold">PKR {Number(property.sharePrice).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{language === "ur" ? "دستیاب شیئرز" : "Available Shares"}</span>
                  <span className="text-white font-semibold">{property.availableShares} / {property.totalShares}</span>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400">{language === "ur" ? "فنڈنگ پروگریس" : "Funding Progress"}</span>
                    <span className="text-amber-400 font-semibold">{fundingProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={fundingProgress} className="h-2 bg-slate-700" />
                </div>
              </div>

              <Link href={isAuthenticated ? `/invest/${id}` : "/signup"}>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold py-6 text-lg rounded-xl shadow-lg shadow-amber-500/25">
                  <Sparkles className="mr-2 w-5 h-5" />
                  {language === "ur" ? "ابھی سرمایہ کاری کریں" : "Invest Now"}
                </Button>
              </Link>

              <p className="text-center text-slate-500 text-sm mt-4">
                {language === "ur" ? "کم از کم سرمایہ کاری" : "Minimum Investment"}: PKR {Number(property.sharePrice).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-12">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="flex flex-wrap w-full max-w-4xl h-auto p-1 bg-slate-800/50 border border-slate-700 rounded-xl gap-1">
              <TabsTrigger 
                value="overview" 
                className="flex-1 min-w-[100px] rounded-lg text-slate-400 data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900 data-[state=active]:font-semibold py-3"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="calculator" 
                className="flex-1 min-w-[100px] rounded-lg text-slate-400 data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900 data-[state=active]:font-semibold py-3"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculator
              </TabsTrigger>
              <TabsTrigger 
                value="documents" 
                className="flex-1 min-w-[100px] rounded-lg text-slate-400 data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900 data-[state=active]:font-semibold py-3"
              >
                <FileCheck className="w-4 h-4 mr-2" />
                Documents
              </TabsTrigger>
              <TabsTrigger 
                value="spv" 
                className="flex-1 min-w-[100px] rounded-lg text-slate-400 data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900 data-[state=active]:font-semibold py-3"
              >
                <Shield className="w-4 h-4 mr-2" />
                SPV
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Description */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-amber-400" />
                      Property Description
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {property.description || 
                        "This premium property offers an excellent investment opportunity with verified title and professional management. Located in a prime area with high rental demand and strong appreciation potential."}
                    </p>
                  </div>

                  {/* Investment Highlights */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-400" />
                      Investment Highlights
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        "100% verified title with comprehensive legal due diligence",
                        "Professional property management included",
                        "Shariah-compliant Diminishing Musharaka structure",
                        "Monthly rental income distribution",
                        "Secondary market liquidity for easy exit",
                        "FBR registered valuation"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                          <span className="text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Returns Summary */}
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                      Expected Returns
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Rental Yield</span>
                        <span className="text-emerald-400 font-bold text-lg">{property.expectedRentalYield}% p.a.</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Capital Appreciation</span>
                        <span className="text-emerald-400 font-bold text-lg">{property.expectedAppreciation}% p.a.</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Holding Period</span>
                        <span className="text-white font-semibold">{property.holdingPeriod || 60} months</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/30">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-amber-400" />
                      Investors
                    </h3>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 border-2 border-slate-800 flex items-center justify-center text-xs font-bold text-slate-900">
                            {i}
                          </div>
                        ))}
                      </div>
                      <span className="text-slate-400">+{property.totalShares - property.availableShares} shares sold</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Calculator Tab */}
            <TabsContent value="calculator" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-amber-400" />
                    Investment Calculator
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-slate-400 mb-2">
                        Number of Shares
                      </label>
                      <Input
                        type="number"
                        value={investmentShares}
                        onChange={(e) => setInvestmentShares(parseInt(e.target.value) || 1)}
                        className="bg-slate-700/50 border-slate-600 text-white text-lg"
                        min={1}
                        max={property.availableShares}
                      />
                      <Slider
                        value={[investmentShares]}
                        onValueChange={(value) => setInvestmentShares(value[0])}
                        min={1}
                        max={Math.min(100, property.availableShares)}
                        step={1}
                        className="mt-4"
                      />
                      <div className="flex justify-between text-sm text-slate-500 mt-2">
                        <span>1 share</span>
                        <span>{Math.min(100, property.availableShares)} shares</span>
                      </div>
                    </div>

                    {calculations && (
                      <div className="p-4 rounded-xl bg-slate-700/30 border border-slate-600/50">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-400">Total Investment</span>
                          <span className="text-white font-semibold">PKR {calculations.totalInvestment.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Ownership</span>
                          <span className="text-amber-400 font-semibold">
                            {((investmentShares / property.totalShares) * 100).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Results Section */}
                {calculations && (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-emerald-400" />
                        Projected Returns (5 Years)
                      </h3>

                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-slate-800/50">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-slate-400">Monthly Rental Income</span>
                            <span className="text-emerald-400 font-bold">PKR {calculations.monthlyIncome.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-800/50">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-slate-400">Total Rental Income (5Y)</span>
                            <span className="text-emerald-400 font-bold">PKR {calculations.fiveYearIncome.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-800/50">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-slate-400">Capital Appreciation (5Y)</span>
                            <span className="text-emerald-400 font-bold">PKR {calculations.fiveYearAppreciation.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white font-semibold">Total Value (5Y)</span>
                            <span className="text-amber-400 font-bold text-xl">PKR {calculations.fiveYearTotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-sm">ROI</span>
                            <span className="text-amber-400 font-semibold">{calculations.roi.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-400 text-sm">
                          These projections are based on historical performance. Actual returns may vary.
                        </p>
                      </div>
                    </div>

                    <Link href={isAuthenticated ? `/invest/${id}` : "/signup"}>
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold py-6 text-lg rounded-xl shadow-lg shadow-amber-500/25">
                        <Sparkles className="mr-2 w-5 h-5" />
                        Invest Now
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <div className="max-w-3xl mx-auto">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-amber-400" />
                    Verification Documents
                  </h3>

                  {documents.length > 0 ? (
                    <div className="space-y-4">
                      {documents.map((doc) => (
                        <div 
                          key={doc.id}
                          className="flex items-center justify-between p-4 rounded-xl bg-slate-700/30 border border-slate-600/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              doc.verificationStatus === 'verified' 
                                ? 'bg-emerald-500/20' 
                                : 'bg-amber-500/20'
                            }`}>
                              {doc.verificationStatus === 'verified' 
                                ? <CheckCircle className="w-5 h-5 text-emerald-400" />
                                : <Clock className="w-5 h-5 text-amber-400" />
                              }
                            </div>
                            <div>
                              <p className="text-white font-medium">{doc.title}</p>
                              <p className="text-sm text-slate-400 capitalize">
                                {doc.documentType.replace("_", " ")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={
                              doc.verificationStatus === 'verified'
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                            }>
                              {doc.verificationStatus}
                            </Badge>
                            {doc.documentUrl && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-slate-600 text-slate-300 hover:bg-slate-700"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileCheck className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">
                        Document verification in progress. Check back soon.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* SPV Tab */}
            <TabsContent value="spv" className="space-y-6">
              <div className="max-w-3xl mx-auto">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-400" />
                    SPV Structure
                  </h3>

                  {spv ? (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-slate-700/30 border border-slate-600/50">
                          <p className="text-slate-400 text-sm mb-1">SPV Name</p>
                          <p className="text-white font-semibold">{spv.spvName}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-700/30 border border-slate-600/50">
                          <p className="text-slate-400 text-sm mb-1">Registration Number</p>
                          <p className="text-white font-semibold">{spv.registrationNumber || "Pending"}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-700/30 border border-slate-600/50">
                          <p className="text-slate-400 text-sm mb-1">Status</p>
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                            {spv.status}
                          </Badge>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-700/30 border border-slate-600/50">
                          <p className="text-slate-400 text-sm mb-1">Legal Structure</p>
                          <p className="text-white font-semibold">{spv.legalStructure || "Private Limited"}</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-medium mb-1">Your Investment is Protected</p>
                            <p className="text-slate-400 text-sm">
                              The SPV structure ensures your ownership is legally protected and registered with SECP.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Shield className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">
                        SPV structure is being established. Details will be available soon.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-amber-500/10 via-slate-900 to-emerald-500/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {language === "ur" ? "اس پراپرٹی میں سرمایہ کاری کریں" : "Invest in This Property"}
            </h2>
            <p className="text-slate-400 mb-8">
              Start with just PKR {Number(property.sharePrice).toLocaleString()} and earn {property.expectedRentalYield}% annual rental yield
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={isAuthenticated ? `/invest/${id}` : "/signup"}>
                <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-amber-500/25">
                  <Sparkles className="mr-2 w-5 h-5" />
                  Invest Now
                </Button>
              </Link>
              <Link href="/properties">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-8 py-6 text-lg rounded-xl">
                  More Properties
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
