import { useState, useMemo } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Building2, 
  MapPin, 
  TrendingUp, 
  Users, 
  Search,
  ArrowRight,
  Sparkles,
  Target,
  Clock,
  CheckCircle2,
  Percent,
  Home,
  Building,
  Store as StoreIcon,
  Landmark,
  X,
  SlidersHorizontal,
  Grid3X3,
  List
} from "lucide-react";

export default function Properties() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState<string>("all");
  const [city, setCity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: properties, isLoading } = trpc.properties.list.useQuery({ status: "active" });

  const filteredProperties = useMemo(() => {
    if (!properties) return [];
    
    let filtered = [...properties];
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.area?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (propertyType !== "all") {
      filtered = filtered.filter(p => p.propertyType === propertyType);
    }
    
    if (city !== "all") {
      filtered = filtered.filter(p => p.city.toLowerCase() === city.toLowerCase());
    }
    
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => Number(a.sharePrice) - Number(b.sharePrice));
        break;
      case "price-high":
        filtered.sort((a, b) => Number(b.sharePrice) - Number(a.sharePrice));
        break;
      case "yield-high":
        filtered.sort((a, b) => Number(b.expectedRentalYield || 0) - Number(a.expectedRentalYield || 0));
        break;
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    return filtered;
  }, [properties, searchTerm, propertyType, city, sortBy]);

  const cities = useMemo(() => {
    if (!properties) return [];
    return Array.from(new Set(properties.map(p => p.city)));
  }, [properties]);

  const clearFilters = () => {
    setSearchTerm("");
    setPropertyType("all");
    setCity("all");
  };

  const hasActiveFilters = searchTerm || propertyType !== "all" || city !== "all";

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/properties-bg.png')" }}
        />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(251, 191, 36, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Floating Elements */}
        <div className="absolute top-40 left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">
                {language === "ur" ? "تصدیق شدہ پراپرٹیز" : "Verified Properties"}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {language === "ur" ? "سرمایہ کاری کے" : "Investment"}
              <span className="block bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                {language === "ur" ? "مواقع" : "Opportunities"}
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-8">
              {language === "ur"
                ? "پاکستان کی بہترین پراپرٹیز میں سے اپنی پسند کی منتخب کریں۔"
                : "Browse verified properties across Pakistan. Start investing with as little as PKR 50,000."}
            </p>

            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  placeholder={language === "ur" ? "پراپرٹی تلاش کریں..." : "Search properties..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 rounded-xl focus:border-amber-500"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-14 px-6 bg-slate-800/50 border-slate-700 text-white hover:bg-slate-800 rounded-xl"
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                {language === "ur" ? "فلٹرز" : "Filters"}
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{properties?.length || 0}+ Properties</p>
                  <p className="text-slate-400 text-sm">Verified & Listed</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Percent className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">8-15% Returns</p>
                  <p className="text-slate-400 text-sm">Expected Annually</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Panel */}
      {showFilters && (
        <section className="py-6 bg-slate-900/80 border-y border-slate-800">
          <div className="container">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium text-slate-400 mb-2 block">
                  {language === "ur" ? "شہر" : "City"}
                </label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="h-12 bg-slate-800 border-slate-700 text-white rounded-xl">
                    <SelectValue placeholder={language === "ur" ? "شہر منتخب کریں" : "Select city"} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all" className="text-white">{language === "ur" ? "تمام شہر" : "All Cities"}</SelectItem>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c.toLowerCase()} className="text-white">{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium text-slate-400 mb-2 block">
                  {language === "ur" ? "قسم" : "Property Type"}
                </label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="h-12 bg-slate-800 border-slate-700 text-white rounded-xl">
                    <SelectValue placeholder={language === "ur" ? "قسم منتخب کریں" : "Select type"} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all" className="text-white">{language === "ur" ? "تمام اقسام" : "All Types"}</SelectItem>
                    <SelectItem value="residential" className="text-white">{language === "ur" ? "رہائشی" : "Residential"}</SelectItem>
                    <SelectItem value="commercial" className="text-white">{language === "ur" ? "تجارتی" : "Commercial"}</SelectItem>
                    <SelectItem value="mixed_use" className="text-white">{language === "ur" ? "مخلوط" : "Mixed Use"}</SelectItem>
                    <SelectItem value="vacation_rental" className="text-white">{language === "ur" ? "ایئر بی این بی" : "Vacation Rental"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium text-slate-400 mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-12 bg-slate-800 border-slate-700 text-white rounded-xl">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="newest" className="text-white">Newest First</SelectItem>
                    <SelectItem value="price-low" className="text-white">Price: Low to High</SelectItem>
                    <SelectItem value="price-high" className="text-white">Price: High to Low</SelectItem>
                    <SelectItem value="yield-high" className="text-white">Highest Yield</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  onClick={clearFilters} 
                  className="h-12 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <X className="w-4 h-4 mr-2" />
                  {language === "ur" ? "صاف کریں" : "Clear All"}
                </Button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Properties Grid */}
      <section className="py-16">
        <div className="container">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-slate-400">
              Showing <span className="text-white font-semibold">{filteredProperties?.length || 0}</span> properties
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className={`h-10 w-10 ${viewMode === "grid" ? "bg-amber-500 text-slate-900" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className={`h-10 w-10 ${viewMode === "list" ? "bg-amber-500 text-slate-900" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden animate-pulse">
                  <div className="h-48 bg-slate-700" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-slate-700 rounded w-3/4" />
                    <div className="h-4 bg-slate-700 rounded w-1/2" />
                    <div className="h-4 bg-slate-700 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProperties && filteredProperties.length > 0 ? (
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
              {filteredProperties.map((property) => {
                const fundingProgress = ((property.totalShares - property.availableShares) / property.totalShares) * 100;
                
                return viewMode === "grid" ? (
                  <Link key={property.id} href={`/properties/${property.id}`}>
                    <div className="group rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 overflow-hidden hover:border-amber-500/30 transition-all duration-300 cursor-pointer">
                      {/* Image */}
                      <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                        {property.images && property.images[0] ? (
                          <img 
                            src={property.images[0]} 
                            alt={property.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Building2 className="w-16 h-16 text-slate-600" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className="bg-amber-500/90 text-slate-900 font-semibold capitalize">
                            {property.propertyType.replace("_", " ")}
                          </Badge>
                          {property.rentalType === "short_term" && (
                            <Badge className="bg-emerald-500/90 text-white">
                              Airbnb Ready
                            </Badge>
                          )}
                        </div>
                        
                        {/* Yield Badge */}
                        <div className="absolute top-4 right-4">
                          <div className="px-3 py-1 rounded-full bg-emerald-500/90 text-white text-sm font-semibold flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {property.expectedRentalYield}% Yield
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-slate-400 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{property.city}, {property.area}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors line-clamp-1">
                          {property.title}
                        </h3>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="p-3 rounded-xl bg-slate-800/50">
                            <p className="text-slate-400 text-xs mb-1">Share Price</p>
                            <p className="text-white font-bold">PKR {Number(property.sharePrice).toLocaleString()}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-800/50">
                            <p className="text-slate-400 text-xs mb-1">Total Value</p>
                            <p className="text-white font-bold">PKR {(Number(property.totalValue) / 1000000).toFixed(1)}M</p>
                          </div>
                        </div>
                        
                        {/* Funding Progress */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-slate-400">Funding Progress</span>
                            <span className="text-white font-semibold">{fundingProgress.toFixed(0)}%</span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(fundingProgress, 100)}%` }}
                            />
                          </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                          <div className="flex items-center gap-2 text-slate-400">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{property.totalShares - property.availableShares} investors</span>
                          </div>
                          <span className="text-amber-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            View Details
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link key={property.id} href={`/properties/${property.id}`}>
                    <div className="group flex flex-col md:flex-row rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 overflow-hidden hover:border-amber-500/30 transition-all duration-300 cursor-pointer">
                      {/* Image */}
                      <div className="relative w-full md:w-80 h-56 md:h-auto bg-gradient-to-br from-slate-700 to-slate-800 flex-shrink-0 overflow-hidden">
                        {property.images && property.images[0] ? (
                          <img 
                            src={property.images[0]} 
                            alt={property.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Building2 className="w-16 h-16 text-slate-600" />
                          </div>
                        )}
                        <Badge className="absolute top-4 left-4 bg-amber-500/90 text-slate-900 font-semibold capitalize">
                          {property.propertyType.replace("_", " ")}
                        </Badge>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex items-center gap-2 text-slate-400 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{property.city}, {property.area}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                          {property.title}
                        </h3>
                        
                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                          {property.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 mb-4">
                          <div>
                            <p className="text-slate-400 text-xs">Share Price</p>
                            <p className="text-white font-bold">PKR {Number(property.sharePrice).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs">Expected Yield</p>
                            <p className="text-emerald-400 font-bold flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {property.expectedRentalYield}% p.a.
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs">Total Value</p>
                            <p className="text-white font-bold">PKR {(Number(property.totalValue) / 1000000).toFixed(1)}M</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-slate-400">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{property.totalShares - property.availableShares} investors</span>
                          </div>
                          <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold rounded-xl">
                            View Details
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-slate-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Properties Found</h3>
              <p className="text-slate-400 mb-6">
                Try adjusting your filters or search term
              </p>
              <Button 
                onClick={clearFilters}
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-800"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-500/10 via-slate-900 to-emerald-500/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
              <Target className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Can't Find What You're Looking For?</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Get Notified About New Properties
            </h2>
            <p className="text-slate-400 mb-8">
              Sign up to receive alerts when new investment opportunities matching your criteria become available.
            </p>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-amber-500/25">
                <Sparkles className="mr-2 w-5 h-5" />
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
