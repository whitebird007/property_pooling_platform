import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  MapPin,
  Search,
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
  Sparkles
} from "lucide-react";

// Sample area data - in production this would come from the database
const areasData = [
  {
    id: "dha-lahore",
    name: "DHA Lahore",
    city: "Lahore",
    description: "Defence Housing Authority Lahore is one of the most prestigious and well-planned residential areas in Pakistan, known for its excellent infrastructure, security, and high-end amenities.",
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
  {
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
  {
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
  {
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
  {
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
  {
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
];

const formatPrice = (price: number) => {
  if (price >= 10000000) {
    return `PKR ${(price / 10000000).toFixed(2)} Crore`;
  } else if (price >= 100000) {
    return `PKR ${(price / 100000).toFixed(2)} Lac`;
  }
  return `PKR ${price.toLocaleString()}`;
};

export default function AreaGuides() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const cities = Array.from(new Set(areasData.map(a => a.city)));

  const filteredAreas = areasData
    .filter(area => {
      const matchesSearch = area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           area.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = selectedCity === "all" || area.city === selectedCity;
      return matchesSearch && matchesCity;
    })
    .sort((a, b) => {
      if (sortBy === "price-high") return b.avgHousePrice - a.avgHousePrice;
      if (sortBy === "price-low") return a.avgHousePrice - b.avgHousePrice;
      if (sortBy === "yield") return b.rentalYield - a.rentalYield;
      if (sortBy === "growth") return b.priceChange - a.priceChange;
      return b.totalProperties - a.totalProperties; // popular
    });

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-10" />
        
        {/* Animated shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Area Guides</span>
          </div>

          <div className="max-w-3xl mb-10">
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 mb-4">
              <MapPin className="w-3 h-3 mr-1" />
              {language === "ur" ? "علاقہ گائیڈز" : "Area Guides"}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === "ur" ? "پاکستان کے بہترین علاقے" : "Explore Pakistan's"}
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"> Premium Areas</span>
            </h1>
            <p className="text-lg text-slate-400">
              {language === "ur" 
                ? "ہر علاقے کی قیمتیں، کرایہ کی آمدنی، سہولیات اور سرمایہ کاری کی صلاحیت دریافت کریں"
                : "Discover property prices, rental yields, amenities, and investment potential for each neighborhood"}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder={language === "ur" ? "علاقہ یا شہر تلاش کریں..." : "Search area or city..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full md:w-48 bg-slate-900/50 border-slate-600 text-white">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all" className="text-white hover:bg-slate-700">All Cities</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city} className="text-white hover:bg-slate-700">{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-slate-900/50 border-slate-600 text-white">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="popular" className="text-white hover:bg-slate-700">Most Popular</SelectItem>
                <SelectItem value="price-high" className="text-white hover:bg-slate-700">Price: High to Low</SelectItem>
                <SelectItem value="price-low" className="text-white hover:bg-slate-700">Price: Low to High</SelectItem>
                <SelectItem value="yield" className="text-white hover:bg-slate-700">Highest Yield</SelectItem>
                <SelectItem value="growth" className="text-white hover:bg-slate-700">Highest Growth</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Stats Summary */}
      <section className="py-8 border-y border-slate-800">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-400">{areasData.length}</p>
              <p className="text-slate-400 text-sm">Areas Covered</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-400">{areasData.reduce((sum, a) => sum + a.totalProperties, 0)}</p>
              <p className="text-slate-400 text-sm">Properties Listed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">{cities.length}</p>
              <p className="text-slate-400 text-sm">Cities</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-400">{(areasData.reduce((sum, a) => sum + a.rentalYield, 0) / areasData.length).toFixed(1)}%</p>
              <p className="text-slate-400 text-sm">Avg. Rental Yield</p>
            </div>
          </div>
        </div>
      </section>

      {/* Area Cards */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAreas.map((area) => (
              <Link key={area.id} href={`/area/${area.id}`}>
                <div className="group h-full rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10">
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                    <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-30 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-slate-900/80 text-white border-slate-700">
                        <MapPin className="w-3 h-3 mr-1" />
                        {area.city}
                      </Badge>
                      <Badge className={`${area.priceChange >= 0 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                        {area.priceChange >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {area.priceChange}% YoY
                      </Badge>
                    </div>

                    {/* Area Name */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">{area.name}</h3>
                      <p className="text-sm text-slate-400">{area.totalProperties} properties available</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Price Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-3 rounded-xl bg-slate-800/50">
                        <Home className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                        <p className="text-xs text-slate-400">Houses</p>
                        <p className="text-sm font-semibold text-white">{formatPrice(area.avgHousePrice)}</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-slate-800/50">
                        <Building2 className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                        <p className="text-xs text-slate-400">Apartments</p>
                        <p className="text-sm font-semibold text-white">{formatPrice(area.avgApartmentPrice)}</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-slate-800/50">
                        <Landmark className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                        <p className="text-xs text-slate-400">Plots</p>
                        <p className="text-sm font-semibold text-white">{formatPrice(area.avgPlotPrice)}</p>
                      </div>
                    </div>

                    {/* Rental Yield */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 mb-4">
                      <div>
                        <p className="text-xs text-slate-400">Rental Yield</p>
                        <p className="text-lg font-bold text-amber-400">{area.rentalYield}% p.a.</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">Avg. Rent</p>
                        <p className="text-lg font-bold text-white">{formatPrice(area.avgRent)}/mo</p>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3 h-3" /> {area.amenities.schools}
                      </span>
                      <span className="flex items-center gap-1">
                        <Hospital className="w-3 h-3" /> {area.amenities.hospitals}
                      </span>
                      <span className="flex items-center gap-1">
                        <ShoppingBag className="w-3 h-3" /> {area.amenities.shopping}
                      </span>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {area.highlights.slice(0, 3).map((highlight, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-slate-600 text-slate-300">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredAreas.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No areas found</h3>
              <p className="text-slate-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-slate-800">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Start Investing Today
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Own Property in These Premium Areas?
            </h2>
            <p className="text-slate-400 mb-8">
              Start with just PKR 50,000 and become a fractional owner in Pakistan's most sought-after neighborhoods.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties">
                <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold px-8">
                  Browse Properties
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/education">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                  Learn How It Works
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
