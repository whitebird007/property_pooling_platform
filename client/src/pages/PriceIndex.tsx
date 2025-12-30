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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search,
  TrendingUp,
  TrendingDown,
  Home,
  Building2,
  Landmark,
  ChevronRight,
  ArrowUpRight,
  MapPin,
  Calculator,
  PiggyBank,
  BarChart3,
  Filter,
  SortAsc,
  Sparkles
} from "lucide-react";

// Comprehensive price data by area
const priceData = [
  // Lahore
  { area: "DHA Phase 1", city: "Lahore", housePrice: 95000000, apartmentPrice: 28000000, plotPrice: 55000000, rent: 180000, yoyChange: 8, rentalYield: 4.2 },
  { area: "DHA Phase 2", city: "Lahore", housePrice: 88000000, apartmentPrice: 26000000, plotPrice: 50000000, rent: 165000, yoyChange: 7, rentalYield: 4.3 },
  { area: "DHA Phase 3", city: "Lahore", housePrice: 82000000, apartmentPrice: 24000000, plotPrice: 48000000, rent: 155000, yoyChange: 6, rentalYield: 4.4 },
  { area: "DHA Phase 4", city: "Lahore", housePrice: 78000000, apartmentPrice: 23000000, plotPrice: 45000000, rent: 145000, yoyChange: 5, rentalYield: 4.5 },
  { area: "DHA Phase 5", city: "Lahore", housePrice: 85000000, apartmentPrice: 25000000, plotPrice: 52000000, rent: 160000, yoyChange: 9, rentalYield: 4.3 },
  { area: "DHA Phase 6", city: "Lahore", housePrice: 75000000, apartmentPrice: 22000000, plotPrice: 42000000, rent: 140000, yoyChange: 10, rentalYield: 4.6 },
  { area: "DHA Phase 7", city: "Lahore", housePrice: 70000000, apartmentPrice: 20000000, plotPrice: 38000000, rent: 130000, yoyChange: 12, rentalYield: 4.8 },
  { area: "DHA Phase 8", city: "Lahore", housePrice: 65000000, apartmentPrice: 18000000, plotPrice: 35000000, rent: 120000, yoyChange: 15, rentalYield: 5.0 },
  { area: "DHA Phase 9", city: "Lahore", housePrice: 55000000, apartmentPrice: 15000000, plotPrice: 28000000, rent: 100000, yoyChange: 18, rentalYield: 5.5 },
  { area: "Bahria Town Sector A", city: "Lahore", housePrice: 42000000, apartmentPrice: 16000000, plotPrice: 28000000, rent: 90000, yoyChange: 12, rentalYield: 5.2 },
  { area: "Bahria Town Sector B", city: "Lahore", housePrice: 40000000, apartmentPrice: 15000000, plotPrice: 26000000, rent: 85000, yoyChange: 11, rentalYield: 5.3 },
  { area: "Bahria Town Sector C", city: "Lahore", housePrice: 38000000, apartmentPrice: 14000000, plotPrice: 24000000, rent: 80000, yoyChange: 10, rentalYield: 5.4 },
  { area: "Bahria Town Janiper", city: "Lahore", housePrice: 35000000, apartmentPrice: 13000000, plotPrice: 22000000, rent: 75000, yoyChange: 14, rentalYield: 5.6 },
  { area: "Park View City Golf Estate", city: "Lahore", housePrice: 28000000, apartmentPrice: 14000000, plotPrice: 15000000, rent: 70000, yoyChange: 20, rentalYield: 6.0 },
  { area: "Park View City Pearl Block", city: "Lahore", housePrice: 22000000, apartmentPrice: 12000000, plotPrice: 10000000, rent: 60000, yoyChange: 18, rentalYield: 6.5 },
  { area: "Gulberg I", city: "Lahore", housePrice: 150000000, apartmentPrice: 45000000, plotPrice: 100000000, rent: 250000, yoyChange: 5, rentalYield: 3.5 },
  { area: "Gulberg II", city: "Lahore", housePrice: 140000000, apartmentPrice: 42000000, plotPrice: 95000000, rent: 240000, yoyChange: 6, rentalYield: 3.6 },
  { area: "Gulberg III (MM Alam)", city: "Lahore", housePrice: 180000000, apartmentPrice: 55000000, plotPrice: 120000000, rent: 300000, yoyChange: 4, rentalYield: 3.2 },
  { area: "Model Town", city: "Lahore", housePrice: 120000000, apartmentPrice: 35000000, plotPrice: 80000000, rent: 200000, yoyChange: 5, rentalYield: 3.8 },
  { area: "Johar Town", city: "Lahore", housePrice: 45000000, apartmentPrice: 18000000, plotPrice: 30000000, rent: 85000, yoyChange: 8, rentalYield: 4.8 },
  
  // Karachi
  { area: "DHA Phase 1 Karachi", city: "Karachi", housePrice: 250000000, apartmentPrice: 55000000, plotPrice: 150000000, rent: 400000, yoyChange: 10, rentalYield: 3.8 },
  { area: "DHA Phase 2 Karachi", city: "Karachi", housePrice: 220000000, apartmentPrice: 50000000, plotPrice: 140000000, rent: 380000, yoyChange: 11, rentalYield: 3.9 },
  { area: "DHA Phase 5 Karachi", city: "Karachi", housePrice: 200000000, apartmentPrice: 48000000, plotPrice: 130000000, rent: 350000, yoyChange: 12, rentalYield: 4.0 },
  { area: "DHA Phase 6 Karachi", city: "Karachi", housePrice: 180000000, apartmentPrice: 45000000, plotPrice: 120000000, rent: 320000, yoyChange: 14, rentalYield: 4.2 },
  { area: "DHA Phase 7 Karachi", city: "Karachi", housePrice: 160000000, apartmentPrice: 42000000, plotPrice: 110000000, rent: 300000, yoyChange: 15, rentalYield: 4.3 },
  { area: "DHA Phase 8 Karachi", city: "Karachi", housePrice: 140000000, apartmentPrice: 38000000, plotPrice: 95000000, rent: 280000, yoyChange: 18, rentalYield: 4.5 },
  { area: "Clifton Block 2", city: "Karachi", housePrice: 280000000, apartmentPrice: 60000000, plotPrice: 180000000, rent: 450000, yoyChange: 8, rentalYield: 3.5 },
  { area: "Clifton Block 5", city: "Karachi", housePrice: 260000000, apartmentPrice: 55000000, plotPrice: 170000000, rent: 420000, yoyChange: 9, rentalYield: 3.6 },
  { area: "Bahria Town Karachi", city: "Karachi", housePrice: 55000000, apartmentPrice: 22000000, plotPrice: 35000000, rent: 100000, yoyChange: 20, rentalYield: 5.0 },
  
  // Islamabad
  { area: "F-6 Islamabad", city: "Islamabad", housePrice: 350000000, apartmentPrice: 80000000, plotPrice: 250000000, rent: 500000, yoyChange: 6, rentalYield: 3.2 },
  { area: "F-7 Islamabad", city: "Islamabad", housePrice: 380000000, apartmentPrice: 85000000, plotPrice: 280000000, rent: 550000, yoyChange: 5, rentalYield: 3.0 },
  { area: "F-8 Islamabad", city: "Islamabad", housePrice: 280000000, apartmentPrice: 65000000, plotPrice: 200000000, rent: 400000, yoyChange: 7, rentalYield: 3.4 },
  { area: "F-10 Islamabad", city: "Islamabad", housePrice: 220000000, apartmentPrice: 55000000, plotPrice: 160000000, rent: 350000, yoyChange: 8, rentalYield: 3.6 },
  { area: "F-11 Islamabad", city: "Islamabad", housePrice: 180000000, apartmentPrice: 48000000, plotPrice: 130000000, rent: 300000, yoyChange: 9, rentalYield: 3.8 },
  { area: "E-11 Islamabad", city: "Islamabad", housePrice: 120000000, apartmentPrice: 35000000, plotPrice: 85000000, rent: 200000, yoyChange: 10, rentalYield: 4.0 },
  { area: "DHA Phase 1 Islamabad", city: "Islamabad", housePrice: 95000000, apartmentPrice: 30000000, plotPrice: 65000000, rent: 160000, yoyChange: 12, rentalYield: 4.2 },
  { area: "DHA Phase 2 Islamabad", city: "Islamabad", housePrice: 85000000, apartmentPrice: 28000000, plotPrice: 58000000, rent: 145000, yoyChange: 14, rentalYield: 4.4 },
  { area: "Bahria Town Phase 1-6", city: "Islamabad", housePrice: 45000000, apartmentPrice: 20000000, plotPrice: 32000000, rent: 95000, yoyChange: 10, rentalYield: 5.2 },
  { area: "Bahria Town Phase 7", city: "Islamabad", housePrice: 42000000, apartmentPrice: 18000000, plotPrice: 28000000, rent: 90000, yoyChange: 12, rentalYield: 5.4 },
  { area: "Bahria Town Phase 8", city: "Islamabad", housePrice: 38000000, apartmentPrice: 16000000, plotPrice: 25000000, rent: 85000, yoyChange: 15, rentalYield: 5.6 },
];

const formatPrice = (price: number) => {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `${(price / 100000).toFixed(1)} Lac`;
  }
  return price.toLocaleString();
};

const formatFullPrice = (price: number) => {
  if (price >= 10000000) {
    return `PKR ${(price / 10000000).toFixed(2)} Crore`;
  } else if (price >= 100000) {
    return `PKR ${(price / 100000).toFixed(2)} Lac`;
  }
  return `PKR ${price.toLocaleString()}`;
};

export default function PriceIndex() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [sortBy, setSortBy] = useState("area");
  const [propertyType, setPropertyType] = useState("all");

  const cities = ["Lahore", "Karachi", "Islamabad"];

  const filteredData = priceData
    .filter(item => {
      const matchesSearch = item.area.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = selectedCity === "all" || item.city === selectedCity;
      return matchesSearch && matchesCity;
    })
    .sort((a, b) => {
      if (sortBy === "price-high") return b.housePrice - a.housePrice;
      if (sortBy === "price-low") return a.housePrice - b.housePrice;
      if (sortBy === "yield") return b.rentalYield - a.rentalYield;
      if (sortBy === "growth") return b.yoyChange - a.yoyChange;
      return a.area.localeCompare(b.area);
    });

  // Calculate averages
  const avgHousePrice = filteredData.reduce((sum, item) => sum + item.housePrice, 0) / filteredData.length;
  const avgRent = filteredData.reduce((sum, item) => sum + item.rent, 0) / filteredData.length;
  const avgYield = filteredData.reduce((sum, item) => sum + item.rentalYield, 0) / filteredData.length;
  const avgGrowth = filteredData.reduce((sum, item) => sum + item.yoyChange, 0) / filteredData.length;

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-10" />
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Price Index</span>
          </div>

          <div className="max-w-3xl mb-10">
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 mb-4">
              <BarChart3 className="w-3 h-3 mr-1" />
              {language === "ur" ? "قیمت انڈیکس" : "Price Index"}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === "ur" ? "پاکستان میں جائیداد کی قیمتیں" : "Property Prices in"}
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"> Pakistan</span>
            </h1>
            <p className="text-lg text-slate-400">
              {language === "ur" 
                ? "مختلف علاقوں میں مکانات، اپارٹمنٹس اور پلاٹس کی قیمتیں اور کرایہ کی آمدنی دیکھیں"
                : "Compare house, apartment, and plot prices across different areas with rental income estimates"}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder={language === "ur" ? "علاقہ تلاش کریں..." : "Search area..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full md:w-40 bg-slate-900/50 border-slate-600 text-white">
                <SelectValue placeholder="City" />
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
                <SelectItem value="area" className="text-white hover:bg-slate-700">Area Name</SelectItem>
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
              <p className="text-2xl font-bold text-amber-400">{formatFullPrice(avgHousePrice)}</p>
              <p className="text-slate-400 text-sm">Avg. House Price</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">{formatFullPrice(avgRent)}/mo</p>
              <p className="text-slate-400 text-sm">Avg. Monthly Rent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">{avgYield.toFixed(1)}%</p>
              <p className="text-slate-400 text-sm">Avg. Rental Yield</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">+{avgGrowth.toFixed(1)}%</p>
              <p className="text-slate-400 text-sm">Avg. YoY Growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Price Table */}
      <section className="py-12">
        <div className="container">
          <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-800/50">
                    <th className="text-left py-4 px-6 text-slate-300 font-semibold">Area</th>
                    <th className="text-left py-4 px-4 text-slate-300 font-semibold">City</th>
                    <th className="text-right py-4 px-4 text-slate-300 font-semibold">
                      <div className="flex items-center justify-end gap-1">
                        <Home className="w-4 h-4" /> House
                      </div>
                    </th>
                    <th className="text-right py-4 px-4 text-slate-300 font-semibold">
                      <div className="flex items-center justify-end gap-1">
                        <Building2 className="w-4 h-4" /> Apartment
                      </div>
                    </th>
                    <th className="text-right py-4 px-4 text-slate-300 font-semibold">
                      <div className="flex items-center justify-end gap-1">
                        <Landmark className="w-4 h-4" /> Plot
                      </div>
                    </th>
                    <th className="text-right py-4 px-4 text-slate-300 font-semibold">
                      <div className="flex items-center justify-end gap-1">
                        <PiggyBank className="w-4 h-4" /> Rent/mo
                      </div>
                    </th>
                    <th className="text-right py-4 px-4 text-slate-300 font-semibold">Yield</th>
                    <th className="text-right py-4 px-6 text-slate-300 font-semibold">YoY</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, idx) => (
                    <tr 
                      key={idx} 
                      className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-amber-400" />
                          <span className="text-white font-medium">{item.area}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {item.city}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right text-white font-medium">
                        {formatPrice(item.housePrice)}
                      </td>
                      <td className="py-4 px-4 text-right text-slate-300">
                        {formatPrice(item.apartmentPrice)}
                      </td>
                      <td className="py-4 px-4 text-right text-slate-300">
                        {formatPrice(item.plotPrice)}
                      </td>
                      <td className="py-4 px-4 text-right text-emerald-400 font-medium">
                        {formatPrice(item.rent)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          {item.rentalYield}%
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className={`flex items-center justify-end gap-1 ${item.yoyChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {item.yoyChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          {item.yoyChange}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No areas found</h3>
              <p className="text-slate-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Rental Income Calculator CTA */}
      <section className="py-16 border-t border-slate-800">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 mb-4">
              <Calculator className="w-3 h-3 mr-1" />
              Calculate Your Earnings
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-4">
              See How Much You Can Earn
            </h2>
            <p className="text-slate-400 mb-8">
              Use our investment calculator to see projected rental income and capital appreciation based on your investment amount.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator">
                <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold px-8">
                  <Calculator className="mr-2 w-4 h-4" />
                  Investment Calculator
                </Button>
              </Link>
              <Link href="/properties">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                  Browse Properties
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 border-t border-slate-800">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Data Sources</h3>
              <p className="text-sm text-slate-400">
                Prices are sourced from Zameen.com, FBR valuation tables, and actual market transactions.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                <PiggyBank className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Rental Yield</h3>
              <p className="text-sm text-slate-400">
                Calculated as annual rent divided by property value, showing your potential passive income.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">YoY Growth</h3>
              <p className="text-sm text-slate-400">
                Year-over-year price appreciation based on historical data and market trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
