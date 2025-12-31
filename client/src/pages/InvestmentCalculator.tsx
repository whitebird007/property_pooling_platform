import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calculator,
  TrendingUp,
  Wallet,
  Building2,
  PiggyBank,
  ArrowRight,
  ChevronRight,
  Info,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Target,
  MapPin,
  Calendar,
  ArrowUpRight
} from "lucide-react";

// Area data with investment metrics
const areaMetrics = [
  { id: "dha-lahore", name: "DHA Lahore", city: "Lahore", avgPrice: 80900000, rentalYield: 4.5, appreciation: 8, minInvestment: 100000 },
  { id: "bahria-town-lahore", name: "Bahria Town Lahore", city: "Lahore", avgPrice: 37700000, rentalYield: 5.2, appreciation: 10, minInvestment: 50000 },
  { id: "park-view-city", name: "Park View City", city: "Lahore", avgPrice: 21500000, rentalYield: 6.5, appreciation: 15, minInvestment: 50000 },
  { id: "gulberg-lahore", name: "Gulberg", city: "Lahore", avgPrice: 120000000, rentalYield: 3.8, appreciation: 6, minInvestment: 200000 },
  { id: "dha-karachi", name: "DHA Karachi", city: "Karachi", avgPrice: 194400000, rentalYield: 4.0, appreciation: 12, minInvestment: 250000 },
  { id: "bahria-town-islamabad", name: "Bahria Town Islamabad", city: "Islamabad", avgPrice: 40200000, rentalYield: 5.5, appreciation: 9, minInvestment: 75000 },
];

const propertyTypes = [
  { id: "apartment", name: "Apartment", yieldMultiplier: 1.1, appreciationMultiplier: 0.9 },
  { id: "house", name: "House", yieldMultiplier: 1.0, appreciationMultiplier: 1.0 },
  { id: "commercial", name: "Commercial", yieldMultiplier: 1.3, appreciationMultiplier: 0.85 },
];

export default function InvestmentCalculator() {
  const { language } = useLanguage();
  const [investmentAmount, setInvestmentAmount] = useState([500000]);
  const [selectedArea, setSelectedArea] = useState("dha-lahore");
  const [selectedPropertyType, setSelectedPropertyType] = useState("apartment");
  const [investmentPeriod, setInvestmentPeriod] = useState([5]);

  const area = areaMetrics.find(a => a.id === selectedArea) || areaMetrics[0];
  const propertyType = propertyTypes.find(p => p.id === selectedPropertyType) || propertyTypes[0];

  const projections = useMemo(() => {
    const amount = investmentAmount[0];
    const years = investmentPeriod[0];
    const baseYield = area.rentalYield * propertyType.yieldMultiplier;
    const baseAppreciation = area.appreciation * propertyType.appreciationMultiplier;
    
    const monthlyRental = (amount * (baseYield / 100)) / 12;
    const annualRental = amount * (baseYield / 100);
    
    let currentValue = amount;
    let totalRentalIncome = 0;
    
    for (let year = 1; year <= years; year++) {
      const yearRental = currentValue * (baseYield / 100);
      totalRentalIncome += yearRental;
      currentValue = currentValue * (1 + baseAppreciation / 100);
    }
    
    const finalValue = currentValue + totalRentalIncome;
    const totalReturn = finalValue - amount;
    const roi = (totalReturn / amount) * 100;
    
    const bankFD = amount * Math.pow(1 + 0.12, years) - amount;
    const goldReturn = amount * Math.pow(1 + 0.08, years) - amount;
    const stockMarket = amount * Math.pow(1 + 0.15, years) - amount;
    
    return {
      monthlyRental,
      annualRental,
      totalRentalIncome,
      propertyValue: currentValue,
      finalValue,
      totalReturn,
      roi,
      baseYield,
      baseAppreciation,
      comparisons: {
        bankFD,
        goldReturn,
        stockMarket,
        propertyPool: totalReturn
      }
    };
  }, [investmentAmount, selectedArea, selectedPropertyType, investmentPeriod, area, propertyType]);

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `PKR ${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `PKR ${(price / 100000).toFixed(2)} Lac`;
    return `PKR ${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-purple-50 to-white">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Investment Calculator</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <Calculator className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 text-sm font-medium">
                {language === "ur" ? "سرمایہ کاری کیلکولیٹر" : "Investment Calculator"}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === "ur" ? "اپنی کمائی کا حساب لگائیں" : "Calculate Your"}
              <span className="block text-purple-600">
                {language === "ur" ? "پراپرٹی سے" : "Property Returns"}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600">
              {language === "ur"
                ? "دیکھیں کہ آپ کی سرمایہ کاری سے کتنی آمدنی ہو سکتی ہے۔"
                : "See how much you could earn from fractional property investment."}
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="space-y-6">
              {/* Investment Amount */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Investment Amount</h3>
                    <p className="text-sm text-gray-500">How much do you want to invest?</p>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-purple-600">{formatPrice(investmentAmount[0])}</span>
                </div>

                <Slider
                  value={investmentAmount}
                  onValueChange={setInvestmentAmount}
                  min={50000}
                  max={10000000}
                  step={50000}
                  className="mb-4"
                />

                <div className="flex justify-between text-sm text-gray-500">
                  <span>PKR 50,000</span>
                  <span>PKR 1 Crore</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {[100000, 500000, 1000000, 2500000, 5000000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setInvestmentAmount([amount])}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        investmentAmount[0] === amount
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {formatPrice(amount)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area Selection */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Select Area</h3>
                    <p className="text-sm text-gray-500">Choose investment location</p>
                  </div>
                </div>

                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger className="w-full bg-white border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    {areaMetrics.map(a => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}, {a.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="mt-4 flex gap-4">
                  <div className="flex-1 p-3 rounded-xl bg-green-50 border border-green-100">
                    <p className="text-xs text-gray-500 mb-1">Rental Yield</p>
                    <p className="font-bold text-green-600">{area.rentalYield}%</p>
                  </div>
                  <div className="flex-1 p-3 rounded-xl bg-blue-50 border border-blue-100">
                    <p className="text-xs text-gray-500 mb-1">Annual Growth</p>
                    <p className="font-bold text-blue-600">{area.appreciation}%</p>
                  </div>
                </div>
              </div>

              {/* Property Type */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Property Type</h3>
                    <p className="text-sm text-gray-500">Select property category</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedPropertyType(type.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        selectedPropertyType === type.id
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <p className="font-semibold text-gray-900 text-sm">{type.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Holding Period */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Holding Period</h3>
                    <p className="text-sm text-gray-500">How long will you hold?</p>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-blue-600">{investmentPeriod[0]}</span>
                  <span className="text-xl text-gray-500 ml-2">years</span>
                </div>

                <Slider
                  value={investmentPeriod}
                  onValueChange={setInvestmentPeriod}
                  min={1}
                  max={10}
                  step={1}
                  className="mb-4"
                />

                <div className="flex justify-between text-sm text-gray-500">
                  <span>1 year</span>
                  <span>10 years</span>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              {/* Main Results */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 text-white">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Your Projected Returns
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white/10">
                    <p className="text-purple-200 text-sm mb-1">Monthly Rental</p>
                    <p className="text-2xl font-bold">{formatPrice(projections.monthlyRental)}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/10">
                    <p className="text-purple-200 text-sm mb-1">Yearly Rental</p>
                    <p className="text-2xl font-bold">{formatPrice(projections.annualRental)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/20">
                    <span className="text-purple-200">Total Rental Income ({investmentPeriod[0]} yrs)</span>
                    <span className="font-bold">{formatPrice(projections.totalRentalIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/20">
                    <span className="text-purple-200">Capital Appreciation</span>
                    <span className="font-bold">{formatPrice(projections.propertyValue - investmentAmount[0])}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/20">
                    <span className="text-purple-200">Property Value After {investmentPeriod[0]} yrs</span>
                    <span className="font-bold">{formatPrice(projections.propertyValue)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-white/20">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Total Returns</span>
                    <span className="text-3xl font-bold">{formatPrice(projections.totalReturn)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-purple-200">ROI</span>
                    <span className="text-xl font-semibold text-green-300">+{projections.roi.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* Comparison */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  Compare with Other Investments
                </h3>

                <div className="space-y-4">
                  {[
                    { name: "PropertyPool", value: projections.comparisons.propertyPool, color: "bg-purple-500", highlight: true },
                    { name: "Bank FD (12%)", value: projections.comparisons.bankFD, color: "bg-blue-400" },
                    { name: "Gold (8%)", value: projections.comparisons.goldReturn, color: "bg-amber-400" },
                    { name: "Stocks (15%)", value: projections.comparisons.stockMarket, color: "bg-green-400" },
                  ].map((item) => {
                    const maxValue = Math.max(...Object.values(projections.comparisons));
                    const percentage = (item.value / maxValue) * 100;
                    
                    return (
                      <div key={item.name} className={`p-4 rounded-xl ${item.highlight ? 'bg-purple-50 border-2 border-purple-200' : 'bg-gray-50'}`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className={`font-medium ${item.highlight ? 'text-purple-700' : 'text-gray-700'}`}>
                            {item.name}
                            {item.highlight && <span className="ml-2 text-xs bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full">Best</span>}
                          </span>
                          <span className={`font-bold ${item.highlight ? 'text-purple-700' : 'text-gray-900'}`}>
                            {formatPrice(item.value)}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.color} rounded-full transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">Ready to Start Investing?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Browse our verified properties and start building wealth today.
                </p>
                <Link href="/properties">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6 rounded-xl">
                    Explore Properties
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Important Note</h3>
                  <p className="text-gray-600 text-sm">
                    These calculations are estimates based on historical data and market averages. Actual returns may vary based on property performance, market conditions, and occupancy rates. Past performance is not indicative of future results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Invest with PropertyPool?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-purple-50 border border-purple-100 text-center">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <PiggyBank className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Low Entry Barrier</h3>
              <p className="text-gray-600 text-sm">Start with just PKR 50,000</p>
            </div>
            <div className="p-6 rounded-2xl bg-green-50 border border-green-100 text-center">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Dual Returns</h3>
              <p className="text-gray-600 text-sm">Rental income + appreciation</p>
            </div>
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Shariah Compliant</h3>
              <p className="text-gray-600 text-sm">100% halal investment</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
