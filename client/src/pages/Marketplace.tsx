import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Building2, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Plus,
  X
} from "lucide-react";

export default function Marketplace() {
  const { user, isAuthenticated, loading } = useAuth();
  const { t } = useLanguage();
  const [selectedProperty, setSelectedProperty] = useState<string>("all");
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [orderShares, setOrderShares] = useState(1);
  const [orderPrice, setOrderPrice] = useState("");

  const { data: properties } = trpc.properties.list.useQuery({ status: "active" });
  const { data: myOrders, refetch: refetchOrders } = trpc.market.myOrders.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: investments } = trpc.investments.myInvestments.useQuery(undefined, {
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

  if (!loading && !isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

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

  // Mock order book data for display
  const mockBuyOrders = [
    { price: 52000, shares: 10, total: 520000 },
    { price: 51500, shares: 25, total: 1287500 },
    { price: 51000, shares: 15, total: 765000 },
    { price: 50500, shares: 30, total: 1515000 },
    { price: 50000, shares: 50, total: 2500000 },
  ];

  const mockSellOrders = [
    { price: 53000, shares: 8, total: 424000 },
    { price: 53500, shares: 12, total: 642000 },
    { price: 54000, shares: 20, total: 1080000 },
    { price: 54500, shares: 18, total: 981000 },
    { price: 55000, shares: 35, total: 1925000 },
  ];

  const mockRecentTrades = [
    { price: 52500, shares: 5, time: "2 min ago", type: "buy" },
    { price: 52400, shares: 3, time: "5 min ago", type: "sell" },
    { price: 52600, shares: 10, time: "12 min ago", type: "buy" },
    { price: 52300, shares: 7, time: "18 min ago", type: "sell" },
    { price: 52500, shares: 15, time: "25 min ago", type: "buy" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{t("nav.marketplace")}</h1>
              <p className="text-muted-foreground">
                Buy and sell property shares on the secondary market
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Property" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  {properties?.map((property) => (
                    <SelectItem key={property.id} value={String(property.id)}>
                      {property.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">Last Price</p>
                <p className="text-2xl font-bold">PKR 52,500</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  +2.5%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
                <p className="text-2xl font-bold">PKR 15.2M</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">Bid</p>
                <p className="text-2xl font-bold text-green-600">PKR 52,000</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">Ask</p>
                <p className="text-2xl font-bold text-red-600">PKR 53,000</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Order Book */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Book</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Buy Orders */}
                    <div>
                      <h4 className="font-semibold text-green-600 mb-3">Buy Orders</h4>
                      <div className="space-y-1">
                        <div className="grid grid-cols-3 text-xs text-muted-foreground pb-2 border-b">
                          <span>Price</span>
                          <span className="text-center">Shares</span>
                          <span className="text-right">Total</span>
                        </div>
                        {mockBuyOrders.map((order, index) => (
                          <div key={index} className="grid grid-cols-3 text-sm py-1 relative">
                            <div 
                              className="absolute inset-0 bg-green-500/10 rounded"
                              style={{ width: `${(order.shares / 50) * 100}%` }}
                            />
                            <span className="relative text-green-600 font-medium">
                              {order.price.toLocaleString()}
                            </span>
                            <span className="relative text-center">{order.shares}</span>
                            <span className="relative text-right text-muted-foreground">
                              {(order.total / 1000000).toFixed(2)}M
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Sell Orders */}
                    <div>
                      <h4 className="font-semibold text-red-600 mb-3">Sell Orders</h4>
                      <div className="space-y-1">
                        <div className="grid grid-cols-3 text-xs text-muted-foreground pb-2 border-b">
                          <span>Price</span>
                          <span className="text-center">Shares</span>
                          <span className="text-right">Total</span>
                        </div>
                        {mockSellOrders.map((order, index) => (
                          <div key={index} className="grid grid-cols-3 text-sm py-1 relative">
                            <div 
                              className="absolute inset-0 bg-red-500/10 rounded right-0"
                              style={{ width: `${(order.shares / 35) * 100}%`, marginLeft: "auto" }}
                            />
                            <span className="relative text-red-600 font-medium">
                              {order.price.toLocaleString()}
                            </span>
                            <span className="relative text-center">{order.shares}</span>
                            <span className="relative text-right text-muted-foreground">
                              {(order.total / 1000000).toFixed(2)}M
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Trades */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Trades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 text-xs text-muted-foreground pb-2 border-b">
                      <span>Price</span>
                      <span className="text-center">Shares</span>
                      <span className="text-center">Type</span>
                      <span className="text-right">Time</span>
                    </div>
                    {mockRecentTrades.map((trade, index) => (
                      <div key={index} className="grid grid-cols-4 text-sm py-2 border-b last:border-0">
                        <span className={trade.type === "buy" ? "text-green-600" : "text-red-600"}>
                          PKR {trade.price.toLocaleString()}
                        </span>
                        <span className="text-center">{trade.shares}</span>
                        <span className="text-center">
                          <Badge variant={trade.type === "buy" ? "default" : "secondary"} className="text-xs">
                            {trade.type}
                          </Badge>
                        </span>
                        <span className="text-right text-muted-foreground">{trade.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Place Order & My Orders */}
            <div className="space-y-6">
              {/* Place Order */}
              <Card>
                <CardHeader>
                  <CardTitle>Place Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={orderType === "buy" ? "default" : "outline"}
                      onClick={() => setOrderType("buy")}
                      className={orderType === "buy" ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      Buy
                    </Button>
                    <Button 
                      variant={orderType === "sell" ? "default" : "outline"}
                      onClick={() => setOrderType("sell")}
                      className={orderType === "sell" ? "bg-red-600 hover:bg-red-700" : ""}
                    >
                      Sell
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Property</Label>
                    <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Property" />
                      </SelectTrigger>
                      <SelectContent>
                        {properties?.map((property) => (
                          <SelectItem key={property.id} value={String(property.id)}>
                            {property.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Price per Share (PKR)</Label>
                    <Input
                      type="number"
                      value={orderPrice}
                      onChange={(e) => setOrderPrice(e.target.value)}
                      placeholder="Enter price"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Number of Shares</Label>
                    <Input
                      type="number"
                      value={orderShares}
                      onChange={(e) => setOrderShares(Number(e.target.value))}
                      min={1}
                    />
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-semibold">
                        PKR {(Number(orderPrice || 0) * orderShares).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full ${orderType === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                    onClick={handlePlaceOrder}
                    disabled={placeOrderMutation.isPending}
                  >
                    {placeOrderMutation.isPending ? "Placing..." : `Place ${orderType} Order`}
                  </Button>
                </CardContent>
              </Card>

              {/* My Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>My Open Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  {myOrders && myOrders.length > 0 ? (
                    <div className="space-y-3">
                      {myOrders.filter(o => o.status === "open").map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <Badge variant={order.orderType === "buy" ? "default" : "secondary"}>
                              {order.orderType}
                            </Badge>
                            <p className="text-sm mt-1">
                              {order.shares} shares @ PKR {Number(order.pricePerShare).toLocaleString()}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => cancelOrderMutation.mutate({ orderId: order.id })}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">
                      No open orders
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
