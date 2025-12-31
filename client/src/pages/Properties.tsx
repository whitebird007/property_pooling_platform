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
  CheckCircle2,
  Percent,
  X,
  SlidersHorizontal,
  Grid3X3,
  List,
  Heart
} from "lucide-react";

export default function Properties() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState<string>("all");
  const [city, setCity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Show properties that are in funding or active status (available for investment)
  const { data: properties, isLoading } = trpc.properties.list.useQuery({});

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-white border-b border-gray-100">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 mb-6">
              <Building2 className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 text-sm font-medium">
                {language === "ur" ? "تصدیق شدہ پراپرٹیز" : "Verified Properties"}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "ur" ? "سرمایہ کاری کے مواقع" : "Investment Opportunities"}
            </h1>
            
            <p className="text-gray-600 mb-8">
              {language === "ur"
                ? "پاکستان کی بہترین پراپرٹیز میں سے اپنی پسند کی منتخب کریں۔"
                : "Browse verified properties across Pakistan. Start investing with as little as PKR 50,000."}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">{properties?.length || 15}+ Properties</p>
                  <p className="text-gray-500 text-sm">Verified & Listed</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Percent className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">8-15% Returns</p>
                  <p className="text-gray-500 text-sm">Expected Annually</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder={language === "ur" ? "پراپرٹی تلاش کریں..." : "Search properties..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:border-purple-300"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="w-40 h-12 bg-gray-50 border-gray-200 rounded-xl">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((c) => (
                    <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="w-44 h-12 bg-gray-50 border-gray-200 rounded-xl">
                  <Building2 className="w-4 h-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="mixed_use">Mixed Use</SelectItem>
                  <SelectItem value="vacation_rental">Vacation Rental</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44 h-12 bg-gray-50 border-gray-200 rounded-xl">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="yield-high">Highest Yield</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  onClick={clearFilters} 
                  className="h-12 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              )}

              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white shadow-sm text-purple-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-white shadow-sm text-purple-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-8">
        <div className="container">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredProperties?.length || 0}</span> properties
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-6 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProperties && filteredProperties.length > 0 ? (
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProperties.map((property) => {
                const fundingProgress = ((property.totalShares - property.availableShares) / property.totalShares) * 100;
                
                return (
                  <Link key={property.id} href={`/properties/${property.id}`}>
                    <div className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all cursor-pointer ${viewMode === "list" ? "flex" : ""}`}>
                      {/* Image */}
                      <div className={`relative ${viewMode === "list" ? "w-72 flex-shrink-0" : ""}`}>
                        <div className={`${viewMode === "list" ? "h-full min-h-[200px]" : "h-48"} bg-gray-100`}>
                          {property.images && property.images[0] ? (
                            <img 
                              src={property.images[0]} 
                              alt={property.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
                              <Building2 className="w-16 h-16 text-purple-300" />
                            </div>
                          )}
                        </div>
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          <Badge className="bg-purple-600 text-white font-medium capitalize">
                            {property.propertyType.replace("_", " ")}
                          </Badge>
                          {property.rentalType === "short_term" && (
                            <Badge className="bg-green-500 text-white">
                              Airbnb
                            </Badge>
                          )}
                        </div>
                        
                        {/* Favorite */}
                        <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>
                        
                        {/* Yield Badge */}
                        <div className="absolute bottom-3 right-3">
                          <div className="px-3 py-1 rounded-full bg-green-500 text-white text-sm font-semibold flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {property.expectedRentalYield}% Yield
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-5 flex-1">
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{property.city}, {property.area}</span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-1">
                          {property.title}
                        </h3>
                        
                        {/* Price Info */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Share Price</p>
                            <p className="text-lg font-bold text-purple-600">
                              PKR {(Number(property.sharePrice) / 1000).toFixed(0)}K
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500 mb-1">Total Value</p>
                            <p className="text-lg font-bold text-gray-900">
                              PKR {(Number(property.totalValue) / 1000000).toFixed(1)}M
                            </p>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                            <span>{fundingProgress.toFixed(0)}% funded</span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5" />
                              {property.totalShares - property.availableShares} investors
                            </span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all"
                              style={{ width: `${fundingProgress}%` }}
                            />
                          </div>
                        </div>
                        
                        {/* CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div>
                            <p className="text-xs text-gray-500">Min. Investment</p>
                            <p className="font-semibold text-gray-900">PKR {(Number(property.sharePrice) / 1000).toFixed(0)}K</p>
                          </div>
                          <span className="text-purple-600 font-medium flex items-center gap-1 text-sm group-hover:gap-2 transition-all">
                            View Details <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
              <Button 
                onClick={clearFilters}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Sample Properties if no data */}
          {!isLoading && (!filteredProperties || filteredProperties.length === 0) && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Sample Properties</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { id: 1, title: "DHA Phase 5 Luxury Apartment", location: "DHA Phase 5", city: "Lahore", type: "Residential", price: 50, yield: 9, progress: 65 },
                  { id: 2, title: "Bahria Town Commercial Plaza", location: "Bahria Town", city: "Lahore", type: "Commercial", price: 75, yield: 12, progress: 82 },
                  { id: 3, title: "Gulberg III Residential Plot", location: "Gulberg III", city: "Lahore", type: "Mixed Use", price: 100, yield: 15, progress: 40 },
                ].map((property) => (
                  <div key={property.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all">
                    <div className="h-48 bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center relative">
                      <Building2 className="w-16 h-16 text-purple-300" />
                      <Badge className="absolute top-3 left-3 bg-purple-600 text-white">{property.type}</Badge>
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-green-500 text-white text-sm font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {property.yield}%
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                        <MapPin className="w-4 h-4" />
                        {property.location}, {property.city}
                      </p>
                      <h3 className="font-semibold text-gray-900 mb-4">{property.title}</h3>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-lg font-bold text-purple-600">PKR {property.price}K</p>
                        <p className="text-gray-500 text-sm">{property.progress}% funded</p>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                          style={{ width: `${property.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
