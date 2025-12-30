import { useState, useMemo } from "react";
import { Link, useParams } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { 
  MapPin,
  TrendingUp,
  TrendingDown,
  Home,
  Building2,
  Car,
  GraduationCap,
  ShoppingBag,
  Hospital,
  Landmark,
  ChevronRight,
  ArrowUpRight,
  Clock,
  Shield,
  Sparkles,
  Calculator,
  PiggyBank,
  Percent,
  Calendar,
  Users,
  TreePine,
  Utensils,
  Bus,
  Plane,
  Train,
  CheckCircle
} from "lucide-react";

// Sample area data - same as AreaGuides
const areasData: Record<string, {
  id: string;
  name: string;
  city: string;
  description: string;
  image: string;
  avgHousePrice: number;
  avgApartmentPrice: number;
  avgPlotPrice: number;
  priceChange: number;
  rentalYield: number;
  avgRent: number;
  totalProperties: number;
  coordinates: { lat: number; lng: number };
  phases: string[];
  amenities: {
    schools: number;
    hospitals: number;
    shopping: number;
    parks: number;
    restaurants: number;
  };
  accessibility: { name: string; time: string }[];
  nearbyAreas: string[];
  highlights: string[];
}> = {
  "dha-lahore": {
    id: "dha-lahore",
    name: "DHA Lahore",
    city: "Lahore",
    description: "Defence Housing Authority Lahore is one of the most prestigious and well-planned residential areas in Pakistan, known for its excellent infrastructure, security, and high-end amenities. The society spans across multiple phases, each offering unique features and investment opportunities.",
    image: "/hero-bg.png",
    avgHousePrice: 80900000,
    avgApartmentPrice: 25000000,
    avgPlotPrice: 45000000,
    priceChange: 2,
    rentalYield: 4.5,
    avgRent: 150000,
    totalProperties: 45,
    coordinates: { lat: 31.4697, lng: 74.4063 },
    phases: ["Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5", "Phase 6", "Phase 7", "Phase 8", "Phase 9"],
    amenities: {
      schools: 25,
      hospitals: 8,
      shopping: 15,
      parks: 12,
      restaurants: 50
    },
    accessibility: [
      { name: "Lahore Airport", time: "25 min" },
      { name: "Ring Road", time: "10 min" },
      { name: "Motorway M2", time: "15 min" },
      { name: "Gulberg", time: "20 min" }
    ],
    nearbyAreas: ["Bahria Town", "Johar Town", "Model Town", "Cantt"],
    highlights: ["24/7 Security", "Gated Community", "Premium Infrastructure", "International Schools"]
  },
  "bahria-town-lahore": {
    id: "bahria-town-lahore",
    name: "Bahria Town Lahore",
    city: "Lahore",
    description: "Bahria Town Lahore is a master-planned community offering modern living with world-class amenities, including the iconic Grand Jamia Mosque and Eiffel Tower replica.",
    image: "/hero-bg.png",
    avgHousePrice: 37700000,
    avgApartmentPrice: 15000000,
    avgPlotPrice: 25000000,
    priceChange: 3,
    rentalYield: 5.2,
    avgRent: 85000,
    totalProperties: 38,
    coordinates: { lat: 31.3685, lng: 74.1826 },
    phases: ["Sector A", "Sector B", "Sector C", "Sector D", "Sector E", "Sector F", "Janiper Block", "Tulip Block"],
    amenities: {
      schools: 18,
      hospitals: 5,
      shopping: 20,
      parks: 15,
      restaurants: 40
    },
    accessibility: [
      { name: "Lahore Airport", time: "35 min" },
      { name: "Ring Road", time: "5 min" },
      { name: "Motorway M2", time: "20 min" },
      { name: "DHA", time: "15 min" }
    ],
    nearbyAreas: ["DHA Lahore", "Lake City", "Paragon City"],
    highlights: ["Grand Jamia Mosque", "Theme Park", "Golf Course", "24/7 Security"]
  },
  "park-view-city": {
    id: "park-view-city",
    name: "Park View City",
    city: "Lahore",
    description: "Park View City is a premium housing project spreading over 7,000 Kanals, offering affordable luxury with villas and farmhouses in a secure, family-friendly environment.",
    image: "/hero-bg.png",
    avgHousePrice: 21500000,
    avgApartmentPrice: 12000000,
    avgPlotPrice: 10000000,
    priceChange: 7,
    rentalYield: 6.5,
    avgRent: 65000,
    totalProperties: 22,
    coordinates: { lat: 31.4234, lng: 74.2876 },
    phases: ["Golf Estate", "Pearl Block", "Overseas Block", "Diamond Block", "Executive Block", "Crystal Block"],
    amenities: {
      schools: 8,
      hospitals: 3,
      shopping: 10,
      parks: 8,
      restaurants: 25
    },
    accessibility: [
      { name: "Lahore Ring Road", time: "18 min" },
      { name: "M2 Motorway", time: "10 min" },
      { name: "Defence Road", time: "19 min" },
      { name: "Thokar Niaz Baig", time: "3 min" }
    ],
    nearbyAreas: ["DHA EME", "Johar Town", "Wapda Town", "Canal Road"],
    highlights: ["Affordable Housing", "24/7 Security", "Family-Friendly", "Growing Community"]
  },
  "gulberg-lahore": {
    id: "gulberg-lahore",
    name: "Gulberg",
    city: "Lahore",
    description: "Gulberg is Lahore's premier commercial and residential hub, home to MM Alam Road, Liberty Market, and some of the city's finest restaurants and shopping destinations.",
    image: "/hero-bg.png",
    avgHousePrice: 120000000,
    avgApartmentPrice: 35000000,
    avgPlotPrice: 80000000,
    priceChange: 5,
    rentalYield: 3.8,
    avgRent: 200000,
    totalProperties: 15,
    coordinates: { lat: 31.5204, lng: 74.3587 },
    phases: ["Gulberg I", "Gulberg II", "Gulberg III", "Gulberg IV", "Gulberg V"],
    amenities: {
      schools: 30,
      hospitals: 12,
      shopping: 50,
      parks: 5,
      restaurants: 100
    },
    accessibility: [
      { name: "Lahore Airport", time: "30 min" },
      { name: "Railway Station", time: "15 min" },
      { name: "Mall Road", time: "10 min" },
      { name: "DHA", time: "15 min" }
    ],
    nearbyAreas: ["Model Town", "Garden Town", "Faisal Town", "Muslim Town"],
    highlights: ["Commercial Hub", "MM Alam Road", "Liberty Market", "Premium Location"]
  },
  "dha-karachi": {
    id: "dha-karachi",
    name: "DHA Karachi",
    city: "Karachi",
    description: "DHA Karachi is the most sought-after residential area in Pakistan's largest city, offering beachfront living, premium security, and world-class infrastructure.",
    image: "/hero-bg.png",
    avgHousePrice: 194400000,
    avgApartmentPrice: 45000000,
    avgPlotPrice: 120000000,
    priceChange: 12,
    rentalYield: 4.0,
    avgRent: 350000,
    totalProperties: 28,
    coordinates: { lat: 24.8138, lng: 67.0300 },
    phases: ["Phase 1", "Phase 2", "Phase 4", "Phase 5", "Phase 6", "Phase 7", "Phase 8"],
    amenities: {
      schools: 35,
      hospitals: 15,
      shopping: 25,
      parks: 10,
      restaurants: 80
    },
    accessibility: [
      { name: "Jinnah Airport", time: "20 min" },
      { name: "Clifton Beach", time: "10 min" },
      { name: "Port Grand", time: "25 min" },
      { name: "Saddar", time: "30 min" }
    ],
    nearbyAreas: ["Clifton", "Sea View", "Bahria Town Karachi"],
    highlights: ["Beachfront Living", "Premium Security", "International Schools", "Golf Courses"]
  },
  "bahria-town-islamabad": {
    id: "bahria-town-islamabad",
    name: "Bahria Town Islamabad",
    city: "Islamabad",
    description: "Bahria Town Islamabad is a sprawling gated community near the capital, featuring modern infrastructure, beautiful landscapes, and excellent investment potential.",
    image: "/hero-bg.png",
    avgHousePrice: 40200000,
    avgApartmentPrice: 18000000,
    avgPlotPrice: 30000000,
    priceChange: 3,
    rentalYield: 5.5,
    avgRent: 95000,
    totalProperties: 32,
    coordinates: { lat: 33.5156, lng: 73.0892 },
    phases: ["Phase 1-6", "Phase 7", "Phase 8", "Bahria Enclave", "Bahria Garden City"],
    amenities: {
      schools: 20,
      hospitals: 6,
      shopping: 18,
      parks: 20,
      restaurants: 45
    },
    accessibility: [
      { name: "Islamabad Airport", time: "25 min" },
      { name: "Rawalpindi", time: "15 min" },
      { name: "Islamabad City", time: "20 min" },
      { name: "Motorway M2", time: "10 min" }
    ],
    nearbyAreas: ["DHA Islamabad", "Gulberg Islamabad", "Park View City Islamabad"],
    highlights: ["Near Capital", "Modern Infrastructure", "Investment Hub", "Family Community"]
  }
};

const formatPrice = (price: number) => {
  if (price >= 10000000) {
    return `PKR ${(price / 10000000).toFixed(2)} Crore`;
  } else if (price >= 100000) {
    return `PKR ${(price / 100000).toFixed(2)} Lac`;
  }
  return `PKR ${price.toLocaleString()}`;
};

export default function AreaDetail() {
  const { language } = useLanguage();
  const params = useParams();
  const areaId = params.id as string;
  
  const area = areasData[areaId];
  
  // Investment calculator state
  const [investmentAmount, setInvestmentAmount] = useState([500000]);
  
  // Calculate investment projections
  const projections = useMemo(() => {
    const amount = investmentAmount[0];
    const yield_ = area?.rentalYield || 5;
    const appreciation = area?.priceChange || 5;
    
    const monthlyRental = (amount * (yield_ / 100)) / 12;
    const annualRental = amount * (yield_ / 100);
    const year1Value = amount * (1 + appreciation / 100);
    const year3Value = amount * Math.pow(1 + appreciation / 100, 3);
    const year5Value = amount * Math.pow(1 + appreciation / 100, 5);
    const totalReturn5Years = year5Value + (annualRental * 5) - amount;
    const roi5Years = (totalReturn5Years / amount) * 100;
    
    return {
      monthlyRental,
      annualRental,
      year1Value,
      year3Value,
      year5Value,
      totalReturn5Years,
      roi5Years
    };
  }, [investmentAmount, area]);

  if (!area) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Area Not Found</h2>
          <p className="text-slate-400 mb-6">The area you're looking for doesn't exist.</p>
          <Link href="/area-guides">
            <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900">
              Browse All Areas
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-15" />
        
        {/* Animated shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/area-guides" className="hover:text-amber-400 transition-colors">Area Guides</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{area.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-slate-800 text-white border-slate-700">
                  <MapPin className="w-3 h-3 mr-1" />
                  {area.city}
                </Badge>
                <Badge className={`${area.priceChange >= 0 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                  {area.priceChange >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {area.priceChange}% YoY Growth
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {area.name}
              </h1>
              
              <p className="text-lg text-slate-400 mb-6">
                {area.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-8">
                {area.highlights.map((highlight, idx) => (
                  <Badge key={idx} className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {highlight}
                  </Badge>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <p className="text-sm text-slate-400 mb-1">Rental Yield</p>
                  <p className="text-2xl font-bold text-emerald-400">{area.rentalYield}% p.a.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <p className="text-sm text-slate-400 mb-1">Avg. Monthly Rent</p>
                  <p className="text-2xl font-bold text-white">{formatPrice(area.avgRent)}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <p className="text-sm text-slate-400 mb-1">Properties Available</p>
                  <p className="text-2xl font-bold text-amber-400">{area.totalProperties}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <p className="text-sm text-slate-400 mb-1">Phases/Blocks</p>
                  <p className="text-2xl font-bold text-white">{area.phases.length}</p>
                </div>
              </div>
            </div>

            {/* Right - Map Placeholder */}
            <div className="rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-800/50">
              <div className="aspect-video relative">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(area.name + ', ' + area.city + ', Pakistan')}&zoom=13`}
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-4 border-t border-slate-700/50">
                <p className="text-sm text-slate-400">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {area.name}, {area.city}, Pakistan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Index Section */}
      <section className="py-12 border-y border-slate-800">
        <div className="container">
          <h2 className="text-2xl font-bold text-white mb-6">Property Prices in {area.name}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Home className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Houses</p>
                  <p className="text-xl font-bold text-white">{formatPrice(area.avgHousePrice)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {area.priceChange >= 0 ? (
                  <span className="text-emerald-400 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" /> +{area.priceChange}%
                  </span>
                ) : (
                  <span className="text-red-400 flex items-center">
                    <TrendingDown className="w-4 h-4 mr-1" /> {area.priceChange}%
                  </span>
                )}
                <span className="text-slate-500">since last year</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Apartments</p>
                  <p className="text-xl font-bold text-white">{formatPrice(area.avgApartmentPrice)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-emerald-400 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" /> +{Math.max(1, area.priceChange - 1)}%
                </span>
                <span className="text-slate-500">since last year</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Landmark className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Plots</p>
                  <p className="text-xl font-bold text-white">{formatPrice(area.avgPlotPrice)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-emerald-400 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" /> +{area.priceChange + 2}%
                </span>
                <span className="text-slate-500">since last year</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Calculator Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Calculator */}
            <div>
              <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 mb-4">
                <Calculator className="w-3 h-3 mr-1" />
                Investment Calculator
              </Badge>
              <h2 className="text-3xl font-bold text-white mb-2">
                Calculate Your Returns in {area.name}
              </h2>
              <p className="text-slate-400 mb-8">
                See how much you can earn by investing in properties in this area through PropertyPool.
              </p>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                <label className="block text-sm text-slate-400 mb-2">Investment Amount</label>
                <div className="text-3xl font-bold text-amber-400 mb-4">
                  {formatPrice(investmentAmount[0])}
                </div>
                <Slider
                  value={investmentAmount}
                  onValueChange={setInvestmentAmount}
                  min={50000}
                  max={10000000}
                  step={50000}
                  className="mb-6"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>PKR 50,000</span>
                  <span>PKR 1 Crore</span>
                </div>
              </div>
            </div>

            {/* Projections */}
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <PiggyBank className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Monthly Rental Income</p>
                    <p className="text-2xl font-bold text-emerald-400">{formatPrice(projections.monthlyRental)}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500">Based on {area.rentalYield}% annual rental yield</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center">
                  <p className="text-xs text-slate-400 mb-1">1 Year Value</p>
                  <p className="text-lg font-bold text-white">{formatPrice(projections.year1Value)}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center">
                  <p className="text-xs text-slate-400 mb-1">3 Year Value</p>
                  <p className="text-lg font-bold text-white">{formatPrice(projections.year3Value)}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center">
                  <p className="text-xs text-slate-400 mb-1">5 Year Value</p>
                  <p className="text-lg font-bold text-amber-400">{formatPrice(projections.year5Value)}</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400">Total 5-Year Return</span>
                  <span className="text-2xl font-bold text-amber-400">{formatPrice(projections.totalReturn5Years)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">ROI (5 Years)</span>
                  <span className="text-xl font-bold text-emerald-400">{projections.roi5Years.toFixed(1)}%</span>
                </div>
              </div>

              <Link href="/properties">
                <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold">
                  <Sparkles className="mr-2 w-4 h-4" />
                  Invest in {area.name} Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities & Accessibility */}
      <section className="py-16 border-t border-slate-800">
        <div className="container">
          <Tabs defaultValue="amenities" className="w-full">
            <TabsList className="bg-slate-800/50 border border-slate-700/50 mb-8">
              <TabsTrigger value="amenities" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                Amenities
              </TabsTrigger>
              <TabsTrigger value="accessibility" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                Accessibility
              </TabsTrigger>
              <TabsTrigger value="phases" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                Phases/Blocks
              </TabsTrigger>
              <TabsTrigger value="nearby" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                Nearby Areas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="amenities">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
                  <GraduationCap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white">{area.amenities.schools}</p>
                  <p className="text-sm text-slate-400">Schools</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
                  <Hospital className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white">{area.amenities.hospitals}</p>
                  <p className="text-sm text-slate-400">Hospitals</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
                  <ShoppingBag className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white">{area.amenities.shopping}</p>
                  <p className="text-sm text-slate-400">Shopping Centers</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
                  <TreePine className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white">{area.amenities.parks}</p>
                  <p className="text-sm text-slate-400">Parks</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
                  <Utensils className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white">{area.amenities.restaurants}</p>
                  <p className="text-sm text-slate-400">Restaurants</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="accessibility">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {area.accessibility.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                      {item.name.includes("Airport") ? <Plane className="w-5 h-5 text-amber-400" /> :
                       item.name.includes("Motorway") || item.name.includes("Road") ? <Car className="w-5 h-5 text-amber-400" /> :
                       item.name.includes("Station") || item.name.includes("Metro") ? <Train className="w-5 h-5 text-amber-400" /> :
                       <MapPin className="w-5 h-5 text-amber-400" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-sm text-slate-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" /> {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="phases">
              <div className="flex flex-wrap gap-3">
                {area.phases.map((phase, idx) => (
                  <Badge key={idx} className="px-4 py-2 text-base bg-slate-800 text-white border-slate-700 hover:bg-slate-700 cursor-pointer">
                    {phase}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nearby">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {area.nearbyAreas.map((nearby, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center gap-3 hover:border-amber-500/50 transition-colors cursor-pointer">
                    <MapPin className="w-5 h-5 text-amber-400" />
                    <span className="text-white">{nearby}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-slate-800">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Invest in {area.name}?
            </h2>
            <p className="text-slate-400 mb-8">
              Browse available properties in this area and start building your real estate portfolio today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties">
                <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold px-8">
                  View Properties in {area.name}
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/area-guides">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                  Explore Other Areas
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
