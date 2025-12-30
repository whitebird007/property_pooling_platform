import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  PiggyBank,
  Building2,
  MapPin,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Info,
  Calendar,
  Percent,
  Wallet,
  BarChart3,
  Target,
  Shield,
  Clock,
  CheckCircle
} from "lucide-react";

// Area data with investment metrics
const areaMetrics = [
  { id: "dha-lahore", name: "DHA Lahore", city: "Lahore", avgPrice: 80900000, rentalYield: 4.5, appreciation: 8, minInvestment: 100000 },
  { id: "bahria-town-lahore", name: "Bahria Town Lahore", city: "Lahore", avgPrice: 37700000, rentalYield: 5.2, appreciation: 10, minInvestment: 50000 },
  { id: "park-view-city", name: "Park View City", city: "Lahore", avgPrice: 21500000, rentalYield: 6.5, appreciation: 15, minInvestment: 50000 },
  { id: "gulberg-lahore", name: "Gulberg", city: "Lahore", avgPrice: 120000000, rentalYield: 3.8, appreciation: 6, minInvestment: 200000 },
  { id: "dha-karachi", name: "DHA Karachi", city: "Karachi", avgPrice: 194400000, rentalYield: 4.0, appreciation: 12, minInvestment: 250000 },
  { id: "bahria-town-islamabad", name: "Bahria Town Islamabad", city: "Islamabad", avgPrice: 40200000, rentalYield: 5.5, appreciation: 9, minInvestment: 75000 },
  { id: "clifton-karachi", name: "Clifton", city: "Karachi", avgPrice: 180000000, rentalYield: 3.5, appreciation: 7, minInvestment: 300000 },
  { id: "f-sectors-islamabad", name: "F-Sectors Islamabad", city: "Islamabad", avgPrice: 95000000, rentalYield: 4.2, appreciation: 8, minInvestment: 150000 },
];

const propertyTypes = [
  { id: "apartment", name: "Apartment", yieldMultiplier: 1.1, appreciationMultiplier: 0.9 },
  { id: "house", name: "House", yieldMultiplier: 1.0, appreciationMultiplier: 1.0 },
  { id: "commercial", name: "Commercial", yieldMultiplier: 1.3, appreciationMultiplier: 0.85 },
  { id: "plot", name: "Plot", yieldMultiplier: 0, appreciationMultiplier: 1.3 },
];

const formatPrice = (price: number) => {
  if (price >= 10000000) {
    return `PKR ${(price / 10000000).toFixed(2)} Crore`;
  } else if (price >= 100000) {
    return `PKR ${(price / 100000).toFixed(2)} Lac`;
  }
  return `PKR ${price.toLocaleString()}`;
};

export default function InvestmentCalculator() {
  const { language } = useLanguage();
  
  // Calculator state
  const [investmentAmount, setInvestmentAmount] = useState([500000]);
  const [selectedArea, setSelectedArea] = useState("dha-lahore");
  const [selectedPropertyType, setSelectedPropertyType] = useState("apartment");
  const [investmentPeriod, setInvestmentPeriod] = useState([5]);
  const [reinvestDividends, setReinvestDividends] = useState(false);

  const area = areaMetrics.find(a => a.id === selectedArea) || areaMetrics[0];
  const propertyType = propertyTypes.find(p => p.id === selectedPropertyType) || propertyTypes[0];

  // Calculate projections
  const projections = useMemo(() => {
    const amount = investmentAmount[0];
    const years = investmentPeriod[0];
    const baseYield = area.rentalYield * propertyType.yieldMultiplier;
    const baseAppreciation = area.appreciation * propertyType.appreciationMultiplier;
    
    // Monthly and annual rental income
    const monthlyRental = (amount * (baseYield / 100)) / 12;
    const annualRental = amount * (baseYield / 100);
    
    // Year by year projections
    const yearlyProjections = [];
    let currentValue = amount;
    let totalRentalIncome = 0;
    
    for (let year = 1; year <= years; year++) {
      const yearRental = currentValue * (baseYield / 100);
      totalRentalIncome += yearRental;
      
      if (reinvestDividends) {
        currentValue = (currentValue + yearRental) * (1 + baseAppreciation / 100);
      } else {
        currentValue = currentValue * (1 + baseAppreciation / 100);
      }
      
      yearlyProjections.push({
        year,
        propertyValue: currentValue,
        rentalIncome: yearRental,
        totalRental: totalRentalIncome,
        totalValue: reinvestDividends ? currentValue : currentValue + totalRentalIncome
      });
    }
    
    const finalValue = yearlyProjections[years - 1]?.totalValue || amount;
    const totalReturn = finalValue - amount;
    const roi = (totalReturn / amount) * 100;
    const annualizedReturn = Math.pow(finalValue / amount, 1 / years) - 1;
    
    // Compare with other investments
    const bankFD = amount * Math.pow(1 + 0.15, years); // 15% FD rate
    const goldReturn = amount * Math.pow(1 + 0.12, years); // 12% gold appreciation
    const stockMarket = amount * Math.pow(1 + 0.18, years); // 18% stock market
    
    return {
      monthlyRental,
      annualRental,
      yearlyProjections,
      finalValue,
      totalReturn,
      roi,
      annualizedReturn: annualizedReturn * 100,
      baseYield,
      baseAppreciation,
      comparisons: {
        bankFD,
        goldReturn,
        stockMarket,
        propertyPool: finalValue
      }
    };
  }, [investmentAmount, selectedArea, selectedPropertyType, investmentPeriod, reinvestDividends, area, propertyType]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
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
            <span className="text-white">Investment Calculator</span>
          </div>

          <div className="max-w-3xl">
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 mb-4">
              <Calculator className="w-3 h-3 mr-1" />
              {language === "ur" ? "سرمایہ کاری کیلکولیٹر" : "Investment Calculator"}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === "ur" ? "اپنی کمائی کا حساب لگائیں" : "Calculate Your"}
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"> Returns</span>
            </h1>
            <p className="text-lg text-slate-400">
              {language === "ur" 
                ? "دیکھیں کہ PropertyPool کے ذریعے جائیداد میں سرمایہ کاری سے آپ کتنا کما سکتے ہیں"
                : "See how much you can earn by investing in real estate through PropertyPool with detailed projections"}
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left - Calculator Inputs */}
            <div className="lg:col-span-2 space-y-6">
              {/* Investment Amount */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                <label className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                  <Wallet className="w-4 h-4" />
                  Investment Amount
                </label>
                <div className="text-3xl font-bold text-amber-400 mb-4">
                  {formatPrice(investmentAmount[0])}
                </div>
                <Slider
                  value={investmentAmount}
                  onValueChange={setInvestmentAmount}
                  min={50000}
                  max={50000000}
                  step={50000}
                  className="mb-3"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>PKR 50,000</span>
                  <span>PKR 5 Crore</span>
                </div>
              </div>

              {/* Area Selection */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                <label className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                  <MapPin className="w-4 h-4" />
                  Select Area
                </label>
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {areaMetrics.map(a => (
                      <SelectItem key={a.id} value={a.id} className="text-white hover:bg-slate-700">
                        {a.name}, {a.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-3 flex gap-4 text-xs">
                  <span className="text-emerald-400">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    {area.rentalYield}% yield
                  </span>
                  <span className="text-blue-400">
                    <BarChart3 className="w-3 h-3 inline mr-1" />
                    {area.appreciation}% growth
                  </span>
                </div>
              </div>

              {/* Property Type */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                <label className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                  <Building2 className="w-4 h-4" />
                  Property Type
                </label>
                <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
                  <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {propertyTypes.map(p => (
                      <SelectItem key={p.id} value={p.id} className="text-white hover:bg-slate-700">
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Investment Period */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                <label className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                  <Calendar className="w-4 h-4" />
                  Investment Period
                </label>
                <div className="text-3xl font-bold text-white mb-4">
                  {investmentPeriod[0]} Years
                </div>
                <Slider
                  value={investmentPeriod}
                  onValueChange={setInvestmentPeriod}
                  min={1}
                  max={20}
                  step={1}
                  className="mb-3"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>1 Year</span>
                  <span>20 Years</span>
                </div>
              </div>

              {/* Reinvest Toggle */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <PiggyBank className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-400">Reinvest Dividends</span>
                  </div>
                  <button
                    onClick={() => setReinvestDividends(!reinvestDividends)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      reinvestDividends ? 'bg-amber-500' : 'bg-slate-600'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      reinvestDividends ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </label>
                <p className="text-xs text-slate-500 mt-2">
                  Automatically reinvest rental income for compound growth
                </p>
              </div>
            </div>

            {/* Right - Results */}
            <div className="lg:col-span-3 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/30">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm mb-2">
                    <PiggyBank className="w-4 h-4" />
                    Monthly Rental Income
                  </div>
                  <p className="text-3xl font-bold text-white">{formatPrice(projections.monthlyRental)}</p>
                  <p className="text-xs text-slate-400 mt-1">Based on {projections.baseYield.toFixed(1)}% yield</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30">
                  <div className="flex items-center gap-2 text-amber-400 text-sm mb-2">
                    <Target className="w-4 h-4" />
                    Total Return ({investmentPeriod[0]}Y)
                  </div>
                  <p className="text-3xl font-bold text-white">{formatPrice(projections.totalReturn)}</p>
                  <p className="text-xs text-slate-400 mt-1">{projections.roi.toFixed(1)}% ROI</p>
                </div>
              </div>

              {/* Final Value */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Projected Portfolio Value</h3>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    +{projections.roi.toFixed(0)}%
                  </Badge>
                </div>
                <div className="flex items-end gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Initial Investment</p>
                    <p className="text-2xl font-bold text-slate-400">{formatPrice(investmentAmount[0])}</p>
                  </div>
                  <ArrowUpRight className="w-8 h-8 text-emerald-400 mb-2" />
                  <div>
                    <p className="text-sm text-slate-400">After {investmentPeriod[0]} Years</p>
                    <p className="text-3xl font-bold text-emerald-400">{formatPrice(projections.finalValue)}</p>
                  </div>
                </div>
              </div>

              {/* Year by Year Breakdown */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Year-by-Year Projection</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 text-slate-400 font-medium">Year</th>
                        <th className="text-right py-3 text-slate-400 font-medium">Property Value</th>
                        <th className="text-right py-3 text-slate-400 font-medium">Rental Income</th>
                        <th className="text-right py-3 text-slate-400 font-medium">Total Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projections.yearlyProjections.slice(0, 10).map((year) => (
                        <tr key={year.year} className="border-b border-slate-800">
                          <td className="py-3 text-white">Year {year.year}</td>
                          <td className="py-3 text-right text-slate-300">{formatPrice(year.propertyValue)}</td>
                          <td className="py-3 text-right text-emerald-400">{formatPrice(year.rentalIncome)}</td>
                          <td className="py-3 text-right text-amber-400 font-semibold">{formatPrice(year.totalValue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {projections.yearlyProjections.length > 10 && (
                  <p className="text-xs text-slate-500 mt-3 text-center">
                    Showing first 10 years of {investmentPeriod[0]} year projection
                  </p>
                )}
              </div>

              {/* Comparison */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Compare with Other Investments</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-amber-400" />
                      </div>
                      <span className="text-white font-medium">PropertyPool</span>
                    </div>
                    <span className="text-xl font-bold text-amber-400">{formatPrice(projections.comparisons.propertyPool)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-slate-300">Stock Market (18% avg)</span>
                    </div>
                    <span className="text-lg font-semibold text-slate-300">{formatPrice(projections.comparisons.stockMarket)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="text-slate-300">Bank FD (15% avg)</span>
                    </div>
                    <span className="text-lg font-semibold text-slate-300">{formatPrice(projections.comparisons.bankFD)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                      </div>
                      <span className="text-slate-300">Gold (12% avg)</span>
                    </div>
                    <span className="text-lg font-semibold text-slate-300">{formatPrice(projections.comparisons.goldReturn)}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-4">
                <Link href="/properties" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold py-6">
                    <Sparkles className="mr-2 w-5 h-5" />
                    Start Investing Now
                  </Button>
                </Link>
                <Link href="/education">
                  <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 py-6">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 border-t border-slate-800">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">How We Calculate Returns</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <PiggyBank className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Rental Yield</h3>
                <p className="text-sm text-slate-400">
                  Based on actual market rental rates in each area, distributed monthly to your wallet.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Capital Appreciation</h3>
                <p className="text-sm text-slate-400">
                  Historical price growth data from Zameen.com and FBR valuation tables.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Conservative Estimates</h3>
                <p className="text-sm text-slate-400">
                  Projections use conservative estimates. Actual returns may vary based on market conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
