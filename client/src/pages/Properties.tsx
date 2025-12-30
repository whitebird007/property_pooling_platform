import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  MapPin,
  TrendingUp,
  Search,
  Grid3X3,
  List,
  ArrowRight,
  Percent,
  Users,
  SlidersHorizontal,
  Sparkles,
  X
} from "lucide-react";

export default function Properties() {
  const { language, t } = useLanguage();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState<string>("all");
  const [city, setCity] = useState<string>("all");

  const { data: properties, isLoading } = trpc.properties.list.useQuery({ status: "active" });

  const cities = Array.from(new Set(properties?.map(p => p.city) || []));

  const filteredProperties = properties?.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (property.area?.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = propertyType === "all" || property.propertyType === propertyType;
    const matchesCity = city === "all" || property.city.toLowerCase() === city.toLowerCase();
    return matchesSearch && matchesType && matchesCity;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setPropertyType("all");
    setCity("all");
  };

  const hasActiveFilters = searchQuery || propertyType !== "all" || city !== "all";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              {language === "ur" ? "تصدیق شدہ پراپرٹیز" : "Verified Properties"}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {language === "ur" ? (
                <>
                  <span className="gradient-text">سرمایہ کاری</span> کے مواقع
                </>
              ) : (
                <>
                  Investment <span className="gradient-text">Opportunities</span>
                </>
              )}
            </h1>
            <p className="text-xl text-white/70 mb-8">
              {language === "ur"
                ? "پاکستان کی بہترین پراپرٹیز میں سے اپنی پسند کی منتخب کریں۔ ہر پراپرٹی قانونی طور پر تصدیق شدہ ہے۔"
                : "Choose from Pakistan's finest properties. Each property is legally verified with complete documentation."}
            </p>

            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder={language === "ur" ? "پراپرٹی تلاش کریں..." : "Search properties..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm rounded-xl focus:bg-white/20"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-14 px-6 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm rounded-xl"
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                {language === "ur" ? "فلٹرز" : "Filters"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b shadow-sm animate-fade-in">
          <div className="container py-6">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  {language === "ur" ? "شہر" : "City"}
                </label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={language === "ur" ? "شہر منتخب کریں" : "Select city"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === "ur" ? "تمام شہر" : "All Cities"}</SelectItem>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  {language === "ur" ? "قسم" : "Property Type"}
                </label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={language === "ur" ? "قسم منتخب کریں" : "Select type"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === "ur" ? "تمام اقسام" : "All Types"}</SelectItem>
                    <SelectItem value="residential">{language === "ur" ? "رہائشی" : "Residential"}</SelectItem>
                    <SelectItem value="commercial">{language === "ur" ? "تجارتی" : "Commercial"}</SelectItem>
                    <SelectItem value="mixed_use">{language === "ur" ? "مخلوط" : "Mixed Use"}</SelectItem>
                    <SelectItem value="vacation_rental">{language === "ur" ? "ایئر بی این بی" : "Vacation Rental"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {hasActiveFilters && (
                <Button variant="ghost" onClick={clearFilters} className="h-12 text-red-600 hover:text-red-700 hover:bg-red-50">
                  <X className="w-4 h-4 mr-2" />
                  {language === "ur" ? "صاف کریں" : "Clear All"}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Properties Grid */}
      <section className="py-12 flex-1">
        <div className="container">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-gray-600">
                {language === "ur" ? (
                  <><span className="font-semibold text-gray-900">{filteredProperties?.length || 0}</span> پراپرٹیز ملیں</>
                ) : (
                  <><span className="font-semibold text-gray-900">{filteredProperties?.length || 0}</span> properties found</>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="h-10 w-10"
              >
                <Grid3X3 className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="h-10 w-10"
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  <div className="h-56 skeleton"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 skeleton rounded w-1/3"></div>
                    <div className="h-6 skeleton rounded w-2/3"></div>
                    <div className="h-4 skeleton rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProperties && filteredProperties.length > 0 ? (
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
              {filteredProperties.map((property) => (
                viewMode === "grid" ? (
                  <Link key={property.id} href={`/properties/${property.id}`}>
                    <div className="property-card cursor-pointer group">
                      <div className="image-wrapper">
                        {property.images && property.images[0] ? (
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <Building2 className="w-16 h-16 text-gray-400" />
                          </div>
                        )}
                        <div className="badge">
                          {property.propertyType === "residential"
                            ? (language === "ur" ? "رہائشی" : "Residential")
                            : property.propertyType === "commercial"
                            ? (language === "ur" ? "تجارتی" : "Commercial")
                            : property.propertyType === "vacation_rental"
                            ? (language === "ur" ? "ایئر بی این بی" : "Airbnb")
                            : (language === "ur" ? "مخلوط" : "Mixed")}
                        </div>
                        {property.rentalType === "short_term" && (
                          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold">
                            Airbnb Ready
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <MapPin className="w-4 h-4" />
                          {property.city}, {property.area}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                          {property.title}
                        </h3>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs text-gray-500 mb-1">
                              {language === "ur" ? "فی حصہ قیمت" : "Share Price"}
                            </p>
                            <p className="font-bold text-primary">
                              PKR {Number(property.sharePrice).toLocaleString()}
                            </p>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs text-gray-500 mb-1">
                              {language === "ur" ? "متوقع منافع" : "Expected Yield"}
                            </p>
                            <p className="font-bold text-emerald-600 flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {property.expectedRentalYield}% p.a.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">{language === "ur" ? "فنڈنگ پیشرفت" : "Funding Progress"}</span>
                            <span className="font-medium">
                              {Math.round(((property.totalShares - property.availableShares) / property.totalShares) * 100)}%
                            </span>
                          </div>
                          <div className="investment-progress">
                            <div
                              className="bar"
                              style={{
                                width: `${((property.totalShares - property.availableShares) / property.totalShares) * 100}%`,
                              }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5" />
                              {property.totalShares - property.availableShares} {language === "ur" ? "حصص فروخت" : "shares sold"}
                            </span>
                            <span>{property.availableShares} {language === "ur" ? "باقی" : "remaining"}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            <span className="font-semibold text-gray-900">
                              PKR {Number(property.totalValue).toLocaleString()}
                            </span>
                            <span className="ml-1">{language === "ur" ? "کل قیمت" : "total value"}</span>
                          </div>
                          <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            {language === "ur" ? "تفصیلات" : "View Details"}
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-80 h-56 md:h-auto bg-muted shrink-0">
                        {property.images && property.images[0] ? (
                          <img 
                            src={property.images[0]} 
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                            <Building2 className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                        <Badge className="absolute top-3 left-3 bg-primary">
                          {property.propertyType.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex-1 p-6 flex flex-col">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <MapPin className="w-4 h-4" />
                            {property.city}, {property.area}
                          </div>
                          <h3 className="font-bold text-xl mb-2">{property.title}</h3>
                          <p className="text-gray-600 line-clamp-2 mb-4">
                            {property.description || "Premium investment opportunity with verified title and professional management."}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-6 pt-4 border-t">
                          <div className="flex items-center gap-2">
                            <Percent className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-xs text-gray-500">Yield</p>
                              <p className="font-semibold">{property.expectedRentalYield}%</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                            <div>
                              <p className="text-xs text-gray-500">Growth</p>
                              <p className="font-semibold">{property.expectedAppreciation}%</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Min. Investment</p>
                            <p className="font-semibold">PKR {Number(property.minInvestment).toLocaleString()}</p>
                          </div>
                          <Button className="ml-auto btn-premium" asChild>
                            <Link href={`/properties/${property.id}`}>
                              View Details
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <Building2 className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === "ur" ? "کوئی پراپرٹی نہیں ملی" : "No Properties Found"}
              </h3>
              <p className="text-gray-600 mb-6">
                {hasActiveFilters
                  ? (language === "ur"
                    ? "آپ کے فلٹرز سے ملتی جلتی کوئی پراپرٹی نہیں ملی۔ فلٹرز تبدیل کر کے دوبارہ کوشش کریں۔"
                    : "No properties match your current filters. Try adjusting your search criteria.")
                  : (language === "ur"
                    ? "ہم فی الحال پریمیم پراپرٹیز تلاش کر رہے ہیں۔ جلد واپس آئیں!"
                    : "We're currently sourcing premium properties. Check back soon!")}
              </p>
              {hasActiveFilters && (
                <Button onClick={clearFilters} variant="outline">
                  {language === "ur" ? "فلٹرز صاف کریں" : "Clear Filters"}
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
