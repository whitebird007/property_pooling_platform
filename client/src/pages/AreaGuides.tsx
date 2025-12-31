import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapView } from "@/components/Map";
import { 
  MapPin, 
  TrendingUp, 
  Home, 
  Building2, 
  Search,
  ArrowRight,
  Star,
  Users,
  Car,
  GraduationCap,
  ShoppingBag,
  Stethoscope,
  ChevronRight
} from "lucide-react";

// Area data for Pakistani cities
const areasData = [
  { id: "dha-lahore", name: "DHA Lahore", city: "Lahore", avgPrice: 80900000, pricePerSqft: 22000, rentalYield: 4.5, growth: 12, rating: 4.8, properties: 45, lat: 31.4697, lng: 74.4063 },
  { id: "bahria-town-lahore", name: "Bahria Town Lahore", city: "Lahore", avgPrice: 37700000, pricePerSqft: 18000, rentalYield: 5.2, growth: 15, rating: 4.6, properties: 38, lat: 31.3685, lng: 74.1802 },
  { id: "park-view-city", name: "Park View City", city: "Lahore", avgPrice: 21500000, pricePerSqft: 10000, rentalYield: 6.5, growth: 18, rating: 4.4, properties: 22, lat: 31.4234, lng: 74.2876 },
  { id: "gulberg-lahore", name: "Gulberg", city: "Lahore", avgPrice: 120000000, pricePerSqft: 28000, rentalYield: 3.8, growth: 8, rating: 4.7, properties: 15, lat: 31.5204, lng: 74.3587 },
  { id: "johar-town", name: "Johar Town", city: "Lahore", avgPrice: 32000000, pricePerSqft: 16000, rentalYield: 4.5, growth: 10, rating: 4.4, properties: 32, lat: 31.4697, lng: 74.2728 },
  { id: "model-town", name: "Model Town", city: "Lahore", avgPrice: 48000000, pricePerSqft: 24000, rentalYield: 3.9, growth: 7, rating: 4.5, properties: 22, lat: 31.4833, lng: 74.3167 },
  { id: "dha-karachi", name: "DHA Karachi", city: "Karachi", avgPrice: 194400000, pricePerSqft: 26000, rentalYield: 4.0, growth: 10, rating: 4.7, properties: 28, lat: 24.8138, lng: 67.0644 },
  { id: "clifton", name: "Clifton", city: "Karachi", avgPrice: 65000000, pricePerSqft: 32000, rentalYield: 3.5, growth: 8, rating: 4.8, properties: 35, lat: 24.8093, lng: 67.0311 },
  { id: "bahria-town-karachi", name: "Bahria Town Karachi", city: "Karachi", avgPrice: 28000000, pricePerSqft: 14000, rentalYield: 5.5, growth: 18, rating: 4.5, properties: 48, lat: 24.9342, lng: 67.2346 },
  { id: "dha-islamabad", name: "DHA Islamabad", city: "Islamabad", avgPrice: 42000000, pricePerSqft: 21000, rentalYield: 4.3, growth: 14, rating: 4.6, properties: 40, lat: 33.5651, lng: 73.1234 },
  { id: "bahria-town-islamabad", name: "Bahria Town Islamabad", city: "Islamabad", avgPrice: 40200000, pricePerSqft: 15000, rentalYield: 5.5, growth: 16, rating: 4.5, properties: 32, lat: 33.5156, lng: 73.0892 },
  { id: "f-sectors", name: "F-Sectors", city: "Islamabad", avgPrice: 75000000, pricePerSqft: 38000, rentalYield: 3.2, growth: 6, rating: 4.9, properties: 18, lat: 33.7294, lng: 73.0931 },
];

export default function AreaGuides() {
  const { language } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState({ lat: 31.5204, lng: 74.3587 });
  const [mapZoom, setMapZoom] = useState(6);

  const cities = ["all", ...Array.from(new Set(areasData.map(a => a.city)))];

  const filteredAreas = areasData.filter(area => {
    const matchesCity = selectedCity === "all" || area.city === selectedCity;
    const matchesSearch = area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         area.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    if (city === "Lahore") {
      setMapCenter({ lat: 31.5204, lng: 74.3587 });
      setMapZoom(11);
    } else if (city === "Karachi") {
      setMapCenter({ lat: 24.8607, lng: 67.0011 });
      setMapZoom(11);
    } else if (city === "Islamabad") {
      setMapCenter({ lat: 33.6844, lng: 73.0479 });
      setMapZoom(11);
    } else {
      setMapCenter({ lat: 30.3753, lng: 69.3451 });
      setMapZoom(6);
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `${(price / 100000).toFixed(1)} Lac`;
    return price.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-purple-50 to-white">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Area Guides</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <MapPin className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 text-sm font-medium">
                {language === "ur" ? "علاقہ گائیڈز" : "Area Guides"}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === "ur" ? "پاکستان کے بہترین علاقے" : "Explore Pakistan's"}
              <span className="block text-purple-600">
                {language === "ur" ? "سرمایہ کاری کے لیے" : "Best Investment Areas"}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600">
              {language === "ur"
                ? "تفصیلی علاقہ گائیڈز، قیمتوں کے رجحانات، اور سرمایہ کاری کے مواقع دریافت کریں۔"
                : "Discover detailed area guides, price trends, and investment opportunities across major cities."}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={language === "ur" ? "علاقہ تلاش کریں..." : "Search areas..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 outline-none transition-all bg-white"
              />
            </div>
            
            {/* City Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleCityChange(city)}
                  className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                    selectedCity === city
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {city === "all" ? (language === "ur" ? "تمام شہر" : "All Cities") : city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map and Areas Grid */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="h-[500px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <MapView
                onMapReady={(map) => {
                  map.setCenter(mapCenter);
                  map.setZoom(mapZoom);
                  
                  filteredAreas.forEach(area => {
                    const marker = new google.maps.Marker({
                      position: { lat: area.lat, lng: area.lng },
                      map: map,
                      title: area.name,
                    });
                    
                    const infoWindow = new google.maps.InfoWindow({
                      content: `
                        <div style="padding: 8px;">
                          <h3 style="font-weight: bold; margin-bottom: 4px;">${area.name}</h3>
                          <p style="color: #666; font-size: 14px;">Avg: PKR ${formatPrice(area.avgPrice)}</p>
                          <p style="color: #22c55e; font-size: 14px;">+${area.growth}% YoY</p>
                        </div>
                      `
                    });
                    
                    marker.addListener('click', () => {
                      infoWindow.open(map, marker);
                    });
                  });
                }}
              />
            </div>

            {/* Areas List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {filteredAreas.map((area) => (
                <Link key={area.id} href={`/area/${area.id}`}>
                  <a className="block p-5 rounded-2xl bg-white border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{area.name}</h3>
                        <p className="text-gray-500 text-sm">{area.city}</p>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-100 text-amber-700">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold text-sm">{area.rating}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Avg Price</p>
                        <p className="font-bold text-gray-900">PKR {formatPrice(area.avgPrice)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Rental Yield</p>
                        <p className="font-bold text-purple-600">{area.rentalYield}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">YoY Growth</p>
                        <p className="font-bold text-green-600">+{area.growth}%</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-sm text-gray-500">{area.properties} properties available</span>
                      <ArrowRight className="w-5 h-5 text-purple-600" />
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-gray-100 text-center">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">12+</p>
              <p className="text-gray-600">Areas Covered</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 text-center">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">400+</p>
              <p className="text-gray-600">Properties Listed</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">12%</p>
              <p className="text-gray-600">Avg. Annual Growth</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">2,500+</p>
              <p className="text-gray-600">Active Investors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Guide */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === "ur" ? "علاقے کی سہولیات" : "What We Evaluate"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our area guides consider all factors that affect property value and livability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-purple-50 border border-purple-100">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Education</h3>
              <p className="text-gray-600 text-sm">Schools, colleges, and universities nearby</p>
            </div>
            <div className="p-6 rounded-2xl bg-green-50 border border-green-100">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <Stethoscope className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Healthcare</h3>
              <p className="text-gray-600 text-sm">Hospitals and medical facilities access</p>
            </div>
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Shopping</h3>
              <p className="text-gray-600 text-sm">Malls, markets, and retail options</p>
            </div>
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                <Car className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Transport</h3>
              <p className="text-gray-600 text-sm">Road connectivity and public transport</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "ur" ? "اپنا مثالی علاقہ تلاش کریں" : "Find Your Ideal Investment Area"}
          </h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Use our investment calculator to compare returns across different areas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/calculator">
              <a className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-all shadow-lg">
                Investment Calculator
                <ArrowRight className="w-5 h-5" />
              </a>
            </Link>
            <Link href="/properties">
              <a className="inline-flex items-center gap-2 px-8 py-4 bg-purple-500/30 text-white font-semibold rounded-xl border border-white/30 hover:bg-purple-500/50 transition-all">
                Browse Properties
              </a>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
