import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Building2, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  ArrowRight,
  Wallet,
  BarChart3,
  Activity,
  RefreshCw,
  Info,
  ChevronDown,
  Sparkles,
  X
} from "lucide-react";

export default function Marketplace() {
  const { user, isAuthenticated, loading } = useAuth();
  const { t } = useLanguage();
  const [selectedProperty, setSelectedProperty] = useState<string>("all");
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [orderShares, setOrderShares] = useState(1);
  const [orderPrice, setOrderPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: properties } = trpc.properties.list.useQuery({ status: "active" });
  const { data: myOrders, refetch: refetchOrders } = trpc.market.myOrders.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const placeOrderMutation = trpc.market.placeOrder.useMutation({
    onSuccess: () => {
      toast.success("Order placed successfully!");
      refetchOrders();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const cancelOrderMutation = trpc.market.cancelOrder.useMutation({
    onSuccess: () => {
      toast.success("Order cancelled");
      refetchOrders();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Market stats
  const marketStats = [
    { label: "24h Volume", value: "PKR 12.5M", change: "+15.2%", positive: true, icon: BarChart3 },
    { label: "Active Listings", value: "156", change: "+8", positive: true, icon: Activity },
    { label: "Avg. Price/Share", value: "PKR 5,420", change: "-2.1%", positive: false, icon: TrendingDown },
    { label: "Total Trades Today", value: "89", change: "+23", positive: true, icon: RefreshCw },
  ];

  // Sample marketplace data
  const buyOrders = [
    { id: 1, property: "DHA Phase 6 Apartment", shares: 50, pricePerShare: 5200, total: 260000, seller: "Ahmed K.", time: "2 min ago" },
    { id: 2, property: "Bahria Town Villa", shares: 100, pricePerShare: 4800, total: 480000, seller: "Sara M.", time: "5 min ago" },
    { id: 3, property: "Commercial Plaza Gulberg", shares: 25, pricePerShare: 8500, total: 212500, seller: "Hassan R.", time: "12 min ago" },
    { id: 4, property: "DHA Phase 5 Plot", shares: 75, pricePerShare: 6200, total: 465000, seller: "Fatima A.", time: "18 min ago" },
    { id: 5, property: "Bahria Orchard Apartment", shares: 30, pricePerShare: 3900, total: 117000, seller: "Ali Z.", time: "25 min ago" },
  ];

  const sellOrders = [
    { id: 1, property: "DHA Phase 6 Apartment", shares: 40, pricePerShare: 5400, total: 216000, buyer: "Usman T.", time: "1 min ago" },
    { id: 2, property: "Commercial Plaza Gulberg", shares: 60, pricePerShare: 8800, total: 528000, buyer: "Zara K.", time: "8 min ago" },
    { id: 3, property: "Bahria Town Villa", shares: 80, pricePerShare: 5000, total: 400000, buyer: "Imran S.", time: "15 min ago" },
  ];

  const recentTrades = [
    { id: 1, property: "DHA Phase 6 Apartment", shares: 25, price: 5300, type: "buy", time: "Just now", status: "completed" },
    { id: 2, property: "Bahria Town Villa", shares: 50, price: 4900, type: "sell", time: "3 min ago", status: "completed" },
    { id: 3, property: "Commercial Plaza", shares: 15, price: 8600, type: "buy", time: "10 min ago", status: "completed" },
    { id: 4, property: "DHA Phase 5 Plot", shares: 30, price: 6100, type: "sell", time: "22 min ago", status: "pending" },
  ];

  const handlePlaceOrder = () => {
    if (!selectedProperty || selectedProperty === "all") {
      toast.error("Please select a property");
      return;
    }
    if (!orderPrice || Number(orderPrice) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    
    placeOrderMutation.mutate({
      propertyId: Number(selectedProperty),
      orderType,
      shares: orderShares,
      pricePerShare: orderPrice,
    });
  };

  // Not authenticated view
  if (!loading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <div className="container py-24">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mx-auto border border-amber-500/30">
              <Building2 className="w-10 h-10 text-amber-400" />
            </div>
            <h1 className="text-4xl font-bold text-white">Secondary Marketplace</h1>
            <p className="text-slate-400 text-lg">
              Trade your property shares with other verified investors. Buy low, sell high, and maintain liquidity in your portfolio.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/login">
                <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold px-8 py-6 text-lg rounded-xl">
                  Sign In to Trade
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-8 py-6 text-lg rounded-xl">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(251, 191, 36, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 text-sm font-medium">Secondary Market</span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Trade Property <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">Shares</span>
              </h1>
              <p className="text-slate-400">Buy and sell fractional property shares with other verified investors</p>
            </div>
            <div className="flex gap-3">
              <Link href="/wallet">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 rounded-xl">
                  <Wallet className="mr-2 w-4 h-4" />
                  Wallet Balance: PKR 250,000
                </Button>
              </Link>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {marketStats.map((stat, index) => (
              <div key={index} className="p-5 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-slate-400" />
                  </div>
                  <span className={`text-sm font-medium ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-slate-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Trading Section */}
      <section className="py-10 bg-slate-900/50">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Book - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search and Filter */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 py-6 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 rounded-xl"
                  />
                </div>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 px-6 rounded-xl">
                  <Filter className="mr-2 w-4 h-4" />
                  Filter
                </Button>
              </div>

              {/* Buy/Sell Tabs */}
              <Tabs defaultValue="buy" className="w-full">
                <TabsList className="w-full bg-slate-800/50 p-1.5 rounded-xl h-auto">
                  <TabsTrigger 
                    value="buy" 
                    className="flex-1 py-3 rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-slate-400"
                  >
                    <ArrowDownRight className="mr-2 w-4 h-4" />
                    Buy Orders ({buyOrders.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sell" 
                    className="flex-1 py-3 rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white text-slate-400"
                  >
                    <ArrowUpRight className="mr-2 w-4 h-4" />
                    Sell Orders ({sellOrders.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="buy" className="mt-6">
                  <div className="rounded-2xl bg-slate-800/30 border border-slate-700/50 overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-6 gap-4 p-4 bg-slate-800/50 text-slate-400 text-sm font-medium">
                      <div className="col-span-2">Property</div>
                      <div className="text-right">Shares</div>
                      <div className="text-right">Price/Share</div>
                      <div className="text-right">Total</div>
                      <div className="text-right">Action</div>
                    </div>
                    
                    {/* Table Body */}
                    <div className="divide-y divide-slate-700/50">
                      {buyOrders.map((order) => (
                        <div key={order.id} className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-slate-800/30 transition-colors">
                          <div className="col-span-2">
                            <p className="text-white font-medium">{order.property}</p>
                            <p className="text-slate-500 text-sm">by {order.seller} • {order.time}</p>
                          </div>
                          <div className="text-right text-white font-medium">{order.shares}</div>
                          <div className="text-right text-emerald-400 font-medium">PKR {order.pricePerShare.toLocaleString()}</div>
                          <div className="text-right text-white font-bold">PKR {order.total.toLocaleString()}</div>
                          <div className="text-right">
                            <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg">
                              Buy
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sell" className="mt-6">
                  <div className="rounded-2xl bg-slate-800/30 border border-slate-700/50 overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-6 gap-4 p-4 bg-slate-800/50 text-slate-400 text-sm font-medium">
                      <div className="col-span-2">Property</div>
                      <div className="text-right">Shares</div>
                      <div className="text-right">Price/Share</div>
                      <div className="text-right">Total</div>
                      <div className="text-right">Action</div>
                    </div>
                    
                    {/* Table Body */}
                    <div className="divide-y divide-slate-700/50">
                      {sellOrders.map((order) => (
                        <div key={order.id} className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-slate-800/30 transition-colors">
                          <div className="col-span-2">
                            <p className="text-white font-medium">{order.property}</p>
                            <p className="text-slate-500 text-sm">wanted by {order.buyer} • {order.time}</p>
                          </div>
                          <div className="text-right text-white font-medium">{order.shares}</div>
                          <div className="text-right text-red-400 font-medium">PKR {order.pricePerShare.toLocaleString()}</div>
                          <div className="text-right text-white font-bold">PKR {order.total.toLocaleString()}</div>
                          <div className="text-right">
                            <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white rounded-lg">
                              Sell
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* My Open Orders */}
              {myOrders && myOrders.filter(o => o.status === "open").length > 0 && (
                <div className="rounded-2xl bg-slate-800/30 border border-slate-700/50 p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400" />
                    My Open Orders
                  </h3>
                  <div className="space-y-3">
                    {myOrders.filter(o => o.status === "open").map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-700/30">
                        <div className="flex items-center gap-4">
                          <Badge className={order.orderType === "buy" ? "bg-emerald-500" : "bg-red-500"}>
                            {order.orderType}
                          </Badge>
                          <div>
                            <p className="text-white font-medium">{order.shares} shares</p>
                            <p className="text-slate-400 text-sm">@ PKR {Number(order.pricePerShare).toLocaleString()}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => cancelOrderMutation.mutate({ orderId: order.id })}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar - Create Order & Recent Trades */}
            <div className="space-y-6">
              {/* Create Order Card */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-amber-400" />
                  Create Order
                </h3>

                <div className="space-y-5">
                  {/* Buy/Sell Toggle */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={orderType === "buy" ? "default" : "outline"}
                      onClick={() => setOrderType("buy")}
                      className={`rounded-lg ${orderType === "buy" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "border-slate-700 text-slate-400 hover:bg-slate-800"}`}
                    >
                      Buy
                    </Button>
                    <Button 
                      variant={orderType === "sell" ? "default" : "outline"}
                      onClick={() => setOrderType("sell")}
                      className={`rounded-lg ${orderType === "sell" ? "bg-red-500 hover:bg-red-600 text-white" : "border-slate-700 text-slate-400 hover:bg-slate-800"}`}
                    >
                      Sell
                    </Button>
                  </div>

                  {/* Property Select */}
                  <div>
                    <Label className="text-slate-400 text-sm mb-2 block">Select Property</Label>
                    <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                      <SelectTrigger className="w-full bg-slate-700/50 border-slate-600 text-white rounded-lg">
                        <SelectValue placeholder="Choose property" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {properties?.map((property) => (
                          <SelectItem key={property.id} value={String(property.id)} className="text-white hover:bg-slate-700">
                            {property.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Shares Input */}
                  <div>
                    <Label className="text-slate-400 text-sm mb-2 block">Number of Shares</Label>
                    <Input 
                      type="number" 
                      value={orderShares}
                      onChange={(e) => setOrderShares(Number(e.target.value))}
                      min={1}
                      placeholder="0" 
                      className="bg-slate-700/50 border-slate-600 text-white rounded-lg" 
                    />
                  </div>

                  {/* Price Input */}
                  <div>
                    <Label className="text-slate-400 text-sm mb-2 block">Price per Share (PKR)</Label>
                    <Input 
                      type="number" 
                      value={orderPrice}
                      onChange={(e) => setOrderPrice(e.target.value)}
                      placeholder="0" 
                      className="bg-slate-700/50 border-slate-600 text-white rounded-lg" 
                    />
                  </div>

                  {/* Summary */}
                  <div className="p-4 rounded-xl bg-slate-700/30 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Total Amount</span>
                      <span className="text-white font-medium">PKR {(Number(orderPrice || 0) * orderShares).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Platform Fee (0.5%)</span>
                      <span className="text-white font-medium">PKR {((Number(orderPrice || 0) * orderShares) * 0.005).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    onClick={handlePlaceOrder}
                    disabled={placeOrderMutation.isPending}
                    className={`w-full py-6 rounded-xl font-semibold ${
                      orderType === "buy" 
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                  >
                    {placeOrderMutation.isPending ? "Placing..." : `Place ${orderType === "buy" ? "Buy" : "Sell"} Order`}
                  </Button>
                </div>
              </div>

              {/* Recent Trades */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  Recent Trades
                </h3>

                <div className="space-y-3">
                  {recentTrades.map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-700/30">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          trade.type === 'buy' ? 'bg-emerald-500/20' : 'bg-red-500/20'
                        }`}>
                          {trade.type === 'buy' ? (
                            <ArrowDownRight className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{trade.property}</p>
                          <p className="text-slate-500 text-xs">{trade.shares} shares • {trade.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${trade.type === 'buy' ? 'text-emerald-400' : 'text-red-400'}`}>
                          PKR {trade.price.toLocaleString()}
                        </p>
                        {trade.status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto" />
                        ) : (
                          <Clock className="w-4 h-4 text-amber-400 ml-auto" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="ghost" className="w-full mt-4 text-amber-400 hover:text-amber-300 hover:bg-slate-700/50 rounded-lg">
                  View All Trades
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              {/* Info Card */}
              <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-5">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-400 font-medium mb-1">Trading Hours</p>
                    <p className="text-slate-400 text-sm">
                      The marketplace is open 24/7. Orders are processed instantly when matched.
                    </p>
                  </div>
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
