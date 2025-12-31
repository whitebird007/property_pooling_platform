import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Home,
  MapPin,
  ChevronRight,
  ArrowRight,
  BarChart3,
  Wallet,
  Search,
  Landmark
} from "lucide-react";

// Comprehensive price data by area
const priceData = [
  { area: "DHA Phase 5", city: "Lahore", housePrice: 85000000, apartmentPrice: 25000000, plotPrice: 52000000, rent: 160000, yoyChange: 9, rentalYield: 4.3 },
  { area: "DHA Phase 6", city: "Lahore", housePrice: 75000000, apartmentPrice: 22000000, plotPrice: 42000000, rent: 140000, yoyChange: 10, rentalYield: 4.6 },
  { area: "Bahria Town Lahore", city: "Lahore", housePrice: 42000000, apartmentPrice: 16000000, plotPrice: 28000000, rent: 90000, yoyChange: 12, rentalYield: 5.2 },
  { area: "Park View City", city: "Lahore", housePrice: 28000000, apartmentPrice: 14000000, plotPrice: 15000000, rent: 70000, yoyChange: 20, rentalYield: 6.0 },
  { area: "Gulberg III", city: "Lahore", housePrice: 180000000, apartmentPrice: 55000000, plotPrice: 120000000, rent: 300000, yoyChange: 4, rentalYield: 3.2 },
  { area: "Model Town", city: "Lahore", housePrice: 120000000, apartmentPrice: 35000000, plotPrice: 80000000, rent: 200000, yoyChange: 5, rentalYield: 3.8 },
  { area: "Johar Town", city: "Lahore", housePrice: 45000000, apartmentPrice: 18000000, plotPrice: 30000000, rent: 85000, yoyChange: 8, rentalYield: 4.8 },
  { area: "DHA Phase 6 Karachi", city: "Karachi", housePrice: 180000000, apartmentPrice: 45000000, plotPrice: 120000000, rent: 320000, yoyChange: 14, rentalYield: 4.2 },
  { area: "Clifton", city: "Karachi", housePrice: 280000000, apartmentPrice: 60000000, plotPrice: 180000000, rent: 450000, yoyChange: 8, rentalYield: 3.5 },
  { area: "Bahria Town Karachi", city: "Karachi", housePrice: 55000000, apartmentPrice: 22000000, plotPrice: 35000000, rent: 100000, yoyChange: 20, rentalYield: 5.0 },
  { area: "F-6 Islamabad", city: "Islamabad", housePrice: 350000000, apartmentPrice: 80000000, plotPrice: 250000000, rent: 500000, yoyChange: 6, rentalYield: 3.2 },
  { area: "F-7 Islamabad", city: "Islamabad", housePrice: 380000000, apartmentPrice: 85000000, plotPrice: 280000000, rent: 550000, yoyChange: 5, rentalYield: 3.0 },
  { area: "Bahria Town Islamabad", city: "Islamabad", housePrice: 45000000, apartmentPrice: 20000000, plotPrice: 32000000, rent: 95000, yoyChange: 10, rentalYield: 5.2 },
  { area: "DHA Phase 2 Islamabad", city: "Islamabad", housePrice: 85000000, apartmentPrice: 28000000, plotPrice: 58000000, rent: 145000, yoyChange: 14, rentalYield: 4.4 },
];

const formatPrice = (price: number) => {
  if (price >= 10000000) return `${(price / 10000000).toFixed(1)} Cr`;
  if (price >= 100000) return `${(price / 100000).toFixed(0)} Lac`;
  return price.toLocaleString();
};

export default function PriceIndex() {
  const { language } = useLanguage();
  const [selectedCity, setSelectedCity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("area");

  const cities = ["all", ...Array.from(new Set(priceData.map(d => d.city)))];

  const filteredData = priceData
    .filter(d => {
      const matchesCity = selectedCity === "all" || d.city === selectedCity;
      const matchesSearch = d.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           d.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCity && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-high") return b.housePrice - a.housePrice;
      if (sortBy === "price-low") return a.housePrice - b.housePrice;
      if (sortBy === "yield") return b.rentalYield - a.rentalYield;
      if (sortBy === "growth") return b.yoyChange - a.yoyChange;
      return a.area.localeCompare(b.area);
    });

  const avgHousePrice = filteredData.reduce((sum, item) => sum + item.housePrice, 0) / filteredData.length;
  const avgRent = filteredData.reduce((sum, item) => sum + item.rent, 0) / filteredData.length;
  const avgYield = filteredData.reduce((sum, item) => sum + item.rentalYield, 0) / filteredData.length;
  const avgGrowth = filteredData.reduce((sum, item) => sum + item.yoyChange, 0) / filteredData.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-purple-50 to-white">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Price Index</span>
          </div>

          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <BarChart3 className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 text-sm font-medium">
                {language === "ur" ? "قیمتوں کا انڈیکس" : "Price Index"}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === "ur" ? "پاکستان میں" : "Property Prices"}
              <span className="block text-purple-600">
                {language === "ur" ? "جائیداد کی قیمتیں" : "Across Pakistan"}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600">
              {language === "ur"
                ? "مختلف علاقوں میں مکانات، اپارٹمنٹس اور پلاٹس کی تازہ ترین قیمتیں دیکھیں۔"
                : "Compare house, apartment, and plot prices across major cities with rental income estimates."}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-200"
              />
            </div>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full md:w-40 bg-white border-gray-200">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                {cities.map(city => (
                  <SelectItem key={city} value={city}>
                    {city === "all" ? "All Cities" : city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-white border-gray-200">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="area">Area Name</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="yield">Highest Yield</SelectItem>
                <SelectItem value="growth">Highest Growth</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Stats Summary */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-xl bg-purple-50 border border-purple-100">
              <p className="text-2xl font-bold text-purple-600">PKR {formatPrice(avgHousePrice)}</p>
              <p className="text-gray-600 text-sm">Avg. House Price</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-green-50 border border-green-100">
              <p className="text-2xl font-bold text-green-600">PKR {formatPrice(avgRent)}/mo</p>
              <p className="text-gray-600 text-sm">Avg. Monthly Rent</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-blue-50 border border-blue-100">
              <p className="text-2xl font-bold text-blue-600">{avgYield.toFixed(1)}%</p>
              <p className="text-gray-600 text-sm">Avg. Rental Yield</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-amber-50 border border-amber-100">
              <p className="text-2xl font-bold text-amber-600">+{avgGrowth.toFixed(1)}%</p>
              <p className="text-gray-600 text-sm">Avg. YoY Growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Price Table */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Area</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">City</th>
                    <th className="text-right py-4 px-4 text-gray-700 font-semibold">
                      <div className="flex items-center justify-end gap-1">
                        <Home className="w-4 h-4" /> House
                      </div>
                    </th>
                    <th className="text-right py-4 px-4 text-gray-700 font-semibold">
                      <div className="flex items-center justify-end gap-1">
                        <Building2 className="w-4 h-4" /> Apartment
                      </div>
                    </th>
                    <th className="text-right py-4 px-4 text-gray-700 font-semibold">
                      <div className="flex items-center justify-end gap-1">
                        <Landmark className="w-4 h-4" /> Plot
                      </div>
                    </th>
                    <th className="text-right py-4 px-4 text-gray-700 font-semibold">Rent/mo</th>
                    <th className="text-right py-4 px-4 text-gray-700 font-semibold">YoY</th>
                    <th className="text-right py-4 px-4 text-gray-700 font-semibold">Yield</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-purple-600" />
                          </div>
                          <span className="font-medium text-gray-900">{item.area}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {item.city}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-medium text-gray-900">
                        PKR {formatPrice(item.housePrice)}
                      </td>
                      <td className="py-4 px-4 text-right font-medium text-gray-900">
                        PKR {formatPrice(item.apartmentPrice)}
                      </td>
                      <td className="py-4 px-4 text-right font-medium text-gray-900">
                        PKR {formatPrice(item.plotPrice)}
                      </td>
                      <td className="py-4 px-4 text-right font-medium text-green-600">
                        PKR {formatPrice(item.rent)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={`inline-flex items-center gap-1 font-medium ${
                          item.yoyChange >= 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          {item.yoyChange >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          {item.yoyChange >= 0 ? "+" : ""}{item.yoyChange}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-medium text-purple-600">{item.rentalYield}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No areas found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Investment CTA */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Investment Opportunity</h3>
                  <p className="text-purple-200 mb-4">
                    With PropertyPool, you don't need to buy an entire property. Invest as little as PKR 50,000 and earn rental income proportional to your share. Use our calculator to see your potential returns.
                  </p>
                  <Link href="/calculator">
                    <Button className="bg-white text-purple-700 hover:bg-purple-50">
                      Calculate Your Returns
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
