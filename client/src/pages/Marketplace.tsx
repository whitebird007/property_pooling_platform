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
  ChevronRight,
  Sparkles,
  X,
  ShoppingCart,
  Tag,
  Shield
} from "lucide-react";

export default function Marketplace() {
  const { user, isAuthenticated, loading } = useAuth();
  const { t, language } = useLanguage();
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
    { label: "24h Volume", value: "PKR 12.5M", change: "+15.2%", positive: true, icon: BarChart3, color: "purple" },
    { label: "Active Listings", value: "156", change: "+8", positive: true, icon: Activity, color: "blue" },
    { label: "Avg. Price/Share", value: "PKR 5,420", change: "-2.1%", positive: false, icon: TrendingDown, color: "amber" },
    { label: "Total Trades Today", value: "89", change: "+23", positive: true, icon: RefreshCw, color: "green" },
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

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      purple: "bg-purple-100 text-purple-600",
      blue: "bg-blue-100 text-blue-600",
      amber: "bg-amber-100 text-amber-600",
      green: "bg-green-100 text-green-600",
    };
    return colors[color] || colors.purple;
  };

  // Not authenticated view
  if (!loading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container py-24">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto">
              <ShoppingCart className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Secondary Marketplace</h1>
            <p className="text-gray-600 text-lg">
              Trade your property shares with other verified investors. Buy low, sell high, and maintain liquidity in your portfolio.
            </p>
            <div className="flex justify-center gap-4">
              <a href={getLoginUrl()}>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-xl">
                  Sign In to Trade
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <Link href="/signup">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl">
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-purple-50 to-white">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Marketplace</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-4">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-purple-700 text-sm font-medium">Secondary Market</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Trade Property <span className="text-purple-600">Shares</span>
              </h1>
              <p className="text-gray-600">Buy and sell fractional property shares with other verified investors</p>
            </div>
            <div className="flex gap-3">
              <Link href="/wallet">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl">
                  <Wallet className="mr-2 w-4 h-4" />
                  Wallet Balance
                </Button>
              </Link>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {marketStats.map((stat, index) => (
              <div key={index} className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getColorClasses(stat.color)}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Trading Section */}
      <section className="py-10">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Book - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search and Filter */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 py-6 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl"
                  />
                </div>
                <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-100 px-6 rounded-xl">
                  <Filter className="mr-2 w-4 h-4" />
                  Filter
                </Button>
              </div>

              {/* Buy/Sell Tabs */}
              <Tabs defaultValue="buy" className="w-full">
                <TabsList className="w-full bg-gray-100 p-1.5 rounded-xl h-auto">
                  <TabsTrigger 
                    value="buy" 
                    className="flex-1 py-3 rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white text-gray-600"
                  >
                    <ArrowDownRight className="mr-2 w-4 h-4" />
                    Buy Orders ({buyOrders.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sell" 
                    className="flex-1 py-3 rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white text-gray-600"
                  >
                    <ArrowUpRight className="mr-2 w-4 h-4" />
                    Sell Orders ({sellOrders.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="buy" className="mt-6">
                  <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 text-gray-600 text-sm font-medium border-b border-gray-200">
                      <div className="col-span-2">Property</div>
                      <div className="text-right">Shares</div>
                      <div className="text-right">Price/Share</div>
                      <div className="text-right">Total</div>
                      <div className="text-right">Action</div>
                    </div>
                    
                    {/* Table Body */}
                    <div className="divide-y divide-gray-100">
                      {buyOrders.map((order) => (
                        <div key={order.id} className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                          <div className="col-span-2">
                            <p className="text-gray-900 font-medium">{order.property}</p>
                            <p className="text-gray-500 text-sm">by {order.seller} • {order.time}</p>
                          </div>
                          <div className="text-right text-gray-900 font-medium">{order.shares}</div>
                          <div className="text-right text-green-600 font-medium">PKR {order.pricePerShare.toLocaleString()}</div>
                          <div className="text-right text-gray-900 font-bold">PKR {order.total.toLocaleString()}</div>
                          <div className="text-right">
                            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white rounded-lg">
                              Buy
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sell" className="mt-6">
                  <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 text-gray-600 text-sm font-medium border-b border-gray-200">
                      <div className="col-span-2">Property</div>
                      <div className="text-right">Shares</div>
                      <div className="text-right">Price/Share</div>
                      <div className="text-right">Total</div>
                      <div className="text-right">Action</div>
                    </div>
                    
                    {/* Table Body */}
                    <div className="divide-y divide-gray-100">
                      {sellOrders.map((order) => (
                        <div key={order.id} className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                          <div className="col-span-2">
                            <p className="text-gray-900 font-medium">{order.property}</p>
                            <p className="text-gray-500 text-sm">wanted by {order.buyer} • {order.time}</p>
                          </div>
                          <div className="text-right text-gray-900 font-medium">{order.shares}</div>
                          <div className="text-right text-red-600 font-medium">PKR {order.pricePerShare.toLocaleString()}</div>
                          <div className="text-right text-gray-900 font-bold">PKR {order.total.toLocaleString()}</div>
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
                <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    My Open Orders
                  </h3>
                  <div className="space-y-3">
                    {myOrders.filter(o => o.status === "open").map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                        <div className="flex items-center gap-4">
                          <Badge className={order.orderType === "buy" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                            {order.orderType.toUpperCase()}
                          </Badge>
                          <div>
                            <p className="text-gray-900 font-medium">{order.shares} shares @ PKR {Number(order.pricePerShare).toLocaleString()}</p>
                            <p className="text-gray-500 text-sm">Property #{order.propertyId}</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => cancelOrderMutation.mutate({ orderId: order.id })}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Place Order - Right Side */}
            <div className="space-y-6">
              {/* Place Order Card */}
              <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Place Order</h3>
                
                <div className="space-y-4">
                  {/* Order Type */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={orderType === "buy" ? "default" : "outline"}
                      className={orderType === "buy" 
                        ? "bg-green-500 hover:bg-green-600 text-white" 
                        : "border-gray-200 text-gray-700 hover:bg-gray-100"
                      }
                      onClick={() => setOrderType("buy")}
                    >
                      <ArrowDownRight className="mr-2 w-4 h-4" />
                      Buy
                    </Button>
                    <Button 
                      variant={orderType === "sell" ? "default" : "outline"}
                      className={orderType === "sell" 
                        ? "bg-red-500 hover:bg-red-600 text-white" 
                        : "border-gray-200 text-gray-700 hover:bg-gray-100"
                      }
                      onClick={() => setOrderType("sell")}
                    >
                      <ArrowUpRight className="mr-2 w-4 h-4" />
                      Sell
                    </Button>
                  </div>

                  {/* Property Select */}
                  <div>
                    <Label className="text-gray-700 mb-2 block">Property</Label>
                    <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                      <SelectTrigger className="bg-white border-gray-200 text-gray-900">
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        <SelectItem value="all">Select a property</SelectItem>
                        {properties?.map((prop) => (
                          <SelectItem key={prop.id} value={String(prop.id)}>
                            {prop.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Shares */}
                  <div>
                    <Label className="text-gray-700 mb-2 block">Number of Shares</Label>
                    <Input
                      type="number"
                      min={1}
                      value={orderShares}
                      onChange={(e) => setOrderShares(Number(e.target.value))}
                      className="bg-white border-gray-200 text-gray-900"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <Label className="text-gray-700 mb-2 block">Price per Share (PKR)</Label>
                    <Input
                      type="number"
                      placeholder="Enter price"
                      value={orderPrice}
                      onChange={(e) => setOrderPrice(e.target.value)}
                      className="bg-white border-gray-200 text-gray-900"
                    />
                  </div>

                  {/* Total */}
                  <div className="p-4 rounded-xl bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="text-xl font-bold text-gray-900">
                        PKR {(orderShares * Number(orderPrice || 0)).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    className={`w-full py-6 ${
                      orderType === "buy" 
                        ? "bg-green-500 hover:bg-green-600" 
                        : "bg-red-500 hover:bg-red-600"
                    } text-white`}
                    onClick={handlePlaceOrder}
                    disabled={placeOrderMutation.isPending}
                  >
                    {placeOrderMutation.isPending ? "Processing..." : `Place ${orderType === "buy" ? "Buy" : "Sell"} Order`}
                  </Button>
                </div>
              </div>

              {/* Security Badge */}
              <div className="p-6 rounded-2xl bg-green-50 border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-green-200 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">Secure Trading</p>
                    <p className="text-sm text-green-700">All transactions protected</p>
                  </div>
                </div>
                <p className="text-sm text-green-700">
                  Funds are held in escrow until shares are successfully transferred. Both parties are protected.
                </p>
              </div>

              {/* How It Works */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">How It Works</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Place Order</p>
                      <p className="text-sm text-gray-500">Set your price and quantity</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Match Found</p>
                      <p className="text-sm text-gray-500">System finds matching orders</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Trade Complete</p>
                      <p className="text-sm text-gray-500">Shares transferred instantly</p>
                    </div>
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
