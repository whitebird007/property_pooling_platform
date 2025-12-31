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
import { MapView } from "@/components/Map";
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

  const propertyImages = [
    "/hero-bg.png",
    "/properties-bg.png",
    "/about-bg.png",
    "/education-bg.png"
  ];

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-32">
          <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm text-center max-w-md">
            <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Property Not Found</h2>
            <p className="text-gray-600 mb-6">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/properties">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-purple-50 to-white">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/properties" className="hover:text-purple-600 transition-colors">Properties</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{property.title}</span>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden aspect-video bg-gray-200">
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
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                {property.virtualTourUrl && (
                  <Button 
                    size="sm" 
                    className="bg-white/90 hover:bg-white text-gray-900"
                    onClick={() => window.open(property.virtualTourUrl!, '_blank')}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Virtual Tour
                  </Button>
                )}
                <Button size="sm" className="bg-white/90 hover:bg-white text-gray-900">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  {propertyImages.length} Photos
                </Button>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="icon" className="bg-white/90 hover:bg-white text-gray-700 rounded-full">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="icon" className="bg-white/90 hover:bg-white text-gray-700 rounded-full">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-purple-600 text-white border-0">
                  {property.propertyType.replace("_", " ")}
                </Badge>
                {property.rentalType === "short_term" && (
                  <Badge className="bg-amber-500 text-white border-0">Airbnb Ready</Badge>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {propertyImages.slice(1, 4).map((img, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveImageIndex(index + 1)}
                  className={`relative rounded-xl overflow-hidden aspect-video cursor-pointer border-2 transition-all ${
                    activeImageIndex === index + 1 ? 'border-purple-600' : 'border-transparent hover:border-purple-300'
                  }`}
                >
                  <img src={img} alt={`Property ${index + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Property Header */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {language === "ur" ? "تصدیق شدہ" : "Verified"}
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {property.expectedRentalYield}% Yield
                </Badge>
                <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                  <Shield className="w-3 h-3 mr-1" />
                  {language === "ur" ? "شریعہ کمپلائنٹ" : "Shariah Compliant"}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {property.title}
              </h1>

              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <MapPin className="w-5 h-5 text-purple-600" />
                <span>{property.address}, {property.city}</span>
              </div>

              <div className="flex flex-wrap gap-6 text-gray-700">
                {property.bedrooms && (
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-purple-600" />
                    <span>{property.bedrooms} {language === "ur" ? "بیڈ" : "Beds"}</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-purple-600" />
                    <span>{property.bathrooms} {language === "ur" ? "باتھ" : "Baths"}</span>
                  </div>
                )}
                {property.sizeSqFt && (
                  <div className="flex items-center gap-2">
                    <Maximize className="w-5 h-5 text-purple-600" />
                    <span>{property.sizeSqFt.toLocaleString()} sq ft</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-600" />
                  <span>{property.propertyType.replace("_", " ")}</span>
                </div>
              </div>
            </div>

            {/* Investment Summary Card */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <div className="text-center mb-6">
                <p className="text-gray-500 text-sm mb-1">{language === "ur" ? "پراپرٹی ویلیو" : "Property Value"}</p>
                <p className="text-3xl font-bold text-gray-900">
                  PKR {(Number(property.totalValue) / 10000000).toFixed(1)} Cr
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">{language === "ur" ? "شیئر پرائس" : "Share Price"}</span>
                  <span className="text-gray-900 font-semibold">PKR {Number(property.sharePrice).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">{language === "ur" ? "دستیاب شیئرز" : "Available Shares"}</span>
                  <span className="text-gray-900 font-semibold">{property.availableShares} / {property.totalShares}</span>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500">{language === "ur" ? "فنڈنگ پروگریس" : "Funding Progress"}</span>
                    <span className="text-purple-600 font-semibold">{fundingProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={fundingProgress} className="h-2 bg-gray-100" />
                </div>
              </div>

              <Link href={isAuthenticated ? `/invest/${id}` : "/signup"}>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6 text-lg rounded-xl">
                  <Sparkles className="mr-2 w-5 h-5" />
                  {language === "ur" ? "ابھی سرمایہ کاری کریں" : "Invest Now"}
                </Button>
              </Link>

              <p className="text-center text-gray-500 text-sm mt-4">
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
            <TabsList className="flex flex-wrap w-full max-w-4xl h-auto p-1 bg-white border border-gray-200 rounded-xl gap-1">
              <TabsTrigger 
                value="overview" 
                className="flex-1 min-w-[100px] rounded-lg text-gray-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:font-semibold py-3"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="calculator" 
                className="flex-1 min-w-[100px] rounded-lg text-gray-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:font-semibold py-3"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculator
              </TabsTrigger>
              <TabsTrigger 
                value="documents" 
                className="flex-1 min-w-[100px] rounded-lg text-gray-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:font-semibold py-3"
              >
                <FileCheck className="w-4 h-4 mr-2" />
                Documents
              </TabsTrigger>
              <TabsTrigger 
                value="spv" 
                className="flex-1 min-w-[100px] rounded-lg text-gray-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:font-semibold py-3"
              >
                <Shield className="w-4 h-4 mr-2" />
                SPV
              </TabsTrigger>
              <TabsTrigger 
                value="location" 
                className="flex-1 min-w-[100px] rounded-lg text-gray-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:font-semibold py-3"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Location
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Description */}
                  <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-purple-600" />
                      Property Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {property.description || 
                        "This premium property offers an excellent investment opportunity with verified title and professional management. Located in a prime area with high rental demand and strong appreciation potential."}
                    </p>
                  </div>

                  {/* Investment Highlights */}
                  <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-purple-600" />
                      Investment Highlights
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { icon: TrendingUp, label: "Expected Yield", value: `${property.expectedRentalYield}% p.a.`, color: "text-green-600 bg-green-100" },
                        { icon: Percent, label: "Appreciation", value: `${property.expectedAppreciation}% p.a.`, color: "text-purple-600 bg-purple-100" },
                        { icon: Users, label: "Investors", value: "Coming Soon", color: "text-blue-600 bg-blue-100" },
                        { icon: Calendar, label: "Holding Period", value: "3-5 Years", color: "text-amber-600 bg-amber-100" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color.split(' ')[1]}`}>
                            <item.icon className={`w-5 h-5 ${item.color.split(' ')[0]}`} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">{item.label}</p>
                            <p className="font-semibold text-gray-900">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Trust Badges */}
                  <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4">Trust & Security</h3>
                    <div className="space-y-3">
                      {[
                        { icon: Shield, label: "SECP Registered SPV", color: "text-green-600 bg-green-100" },
                        { icon: FileCheck, label: "Title Verified", color: "text-purple-600 bg-purple-100" },
                        { icon: CheckCircle, label: "FBR Valuation Done", color: "text-blue-600 bg-blue-100" },
                        { icon: Star, label: "Shariah Compliant", color: "text-amber-600 bg-amber-100" },
                      ].map((badge, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${badge.color.split(' ')[1]}`}>
                            <badge.icon className={`w-4 h-4 ${badge.color.split(' ')[0]}`} />
                          </div>
                          <span className="text-gray-700">{badge.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Contact */}
                  <div className="p-6 rounded-2xl bg-purple-50 border border-purple-200">
                    <h3 className="font-bold text-gray-900 mb-4">Need Help?</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Our investment advisors are here to help you make informed decisions.
                    </p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      Contact Advisor
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Calculator Tab */}
            <TabsContent value="calculator" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-purple-600" />
                    Investment Calculator
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Number of Shares: {investmentShares}
                      </label>
                      <Slider
                        value={[investmentShares]}
                        onValueChange={(value) => setInvestmentShares(value[0])}
                        min={1}
                        max={Math.min(property.availableShares, 100)}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>1 Share</span>
                        <span>{Math.min(property.availableShares, 100)} Shares</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-gray-500 text-sm">Total Investment</p>
                      <p className="text-2xl font-bold text-gray-900">
                        PKR {calculations?.totalInvestment.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {[1, 5, 10, 25, 50].map((shares) => (
                        <Button
                          key={shares}
                          variant="outline"
                          size="sm"
                          onClick={() => setInvestmentShares(shares)}
                          className={`border-gray-200 ${investmentShares === shares ? 'bg-purple-100 text-purple-700 border-purple-300' : 'text-gray-700 hover:bg-purple-50'}`}
                        >
                          {shares} {shares === 1 ? 'Share' : 'Shares'}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {calculations && (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                      <h4 className="font-bold text-gray-900 mb-4">Projected Returns</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
                          <span className="text-gray-600">Monthly Income</span>
                          <span className="font-bold text-green-600">
                            PKR {calculations.monthlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
                          <span className="text-gray-600">Annual Income</span>
                          <span className="font-bold text-green-600">
                            PKR {calculations.annualIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
                          <span className="text-gray-600">5-Year Rental Income</span>
                          <span className="font-bold text-gray-900">
                            PKR {calculations.fiveYearIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
                          <span className="text-gray-600">5-Year Appreciation</span>
                          <span className="font-bold text-gray-900">
                            PKR {calculations.fiveYearAppreciation.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 text-white">
                      <h4 className="font-bold mb-4">5-Year Total Value</h4>
                      <p className="text-3xl font-bold mb-2">
                        PKR {calculations.fiveYearTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-purple-200">
                        Total ROI: <span className="text-white font-bold">{calculations.roi.toFixed(1)}%</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-8">
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Legal Documents</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documents.length > 0 ? documents.map((doc, i) => (
                    <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-purple-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                          <FileCheck className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{doc.documentType}</p>
                          <p className="text-sm text-green-600">{doc.verificationStatus}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full text-center py-8">
                      <FileCheck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Documents will be available after KYC verification</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location" className="space-y-8">
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  Property Location
                </h3>
                
                {property.latitude && property.longitude ? (
                  <div className="space-y-4">
                    <div className="rounded-xl overflow-hidden border border-gray-200">
                      <MapView
                        className="h-[400px]"
                        initialCenter={{ 
                          lat: Number(property.latitude), 
                          lng: Number(property.longitude) 
                        }}
                        initialZoom={16}
                        onMapReady={(map) => {
                          // Add marker for property location
                          new google.maps.marker.AdvancedMarkerElement({
                            map,
                            position: { 
                              lat: Number(property.latitude), 
                              lng: Number(property.longitude) 
                            },
                            title: property.title,
                          });
                        }}
                      />
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-gray-50">
                        <p className="text-sm text-gray-500">Full Address</p>
                        <p className="font-semibold text-gray-900">{property.address}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50">
                        <p className="text-sm text-gray-500">City / Area</p>
                        <p className="font-semibold text-gray-900">{property.city}{property.area ? `, ${property.area}` : ''}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50">
                        <p className="text-sm text-gray-500">Coordinates</p>
                        <p className="font-semibold text-gray-900">{property.latitude}, {property.longitude}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50">
                        <p className="text-sm text-gray-500">View on Google Maps</p>
                        <a 
                          href={`https://www.google.com/maps?q=${property.latitude},${property.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1"
                        >
                          Open in Google Maps
                          <ChevronRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">Location coordinates not available</p>
                    <p className="text-gray-400 text-sm">Address: {property.address}, {property.city}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* SPV Tab */}
            <TabsContent value="spv" className="space-y-8">
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  Special Purpose Vehicle (SPV)
                </h3>
                
                {spv ? (
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-gray-50">
                        <p className="text-sm text-gray-500">Company Name</p>
                        <p className="font-semibold text-gray-900">{spv.spvName}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50">
                        <p className="text-sm text-gray-500">Registration Number</p>
                        <p className="font-semibold text-gray-900">{spv.registrationNumber}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50">
                        <p className="text-sm text-gray-500">Status</p>
                        <Badge className="bg-green-100 text-green-700">{spv.status}</Badge>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50">
                        <p className="text-sm text-gray-500">Registered Date</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(spv.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                      <h4 className="font-semibold text-gray-900 mb-2">What is an SPV?</h4>
                      <p className="text-gray-600 text-sm">
                        A Special Purpose Vehicle (SPV) is a legal entity created specifically to hold this property. 
                        Your investment gives you shares in this SPV, providing legal ownership rights and protection.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">SPV details will be available once the property is fully funded</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
