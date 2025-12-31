import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import AdminLayout from "@/components/AdminLayout";
import { 
  ShoppingCart, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  Search, Filter, RefreshCw, Eye, CheckCircle, XCircle, Clock,
  DollarSign, BarChart3, Activity, Settings, AlertTriangle, Ban,
  Play, Pause, Trash2, Edit, Shield, Percent, Users, Building2
} from "lucide-react";

export default function AdminMarketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [marketplaceEnabled, setMarketplaceEnabled] = useState(true);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  
  // Marketplace settings state
  const [settings, setSettings] = useState({
    tradingFee: 1.0,
    minOrderSize: 10000,
    maxOrderSize: 5000000,
    minHoldingPeriod: 180,
    allowInstantTrades: true,
    requireKYC: true,
    priceFluctationLimit: 10,
  });

  // Mock data for marketplace stats
  const marketStats = {
    totalVolume: 45000000,
    totalTrades: 156,
    activeBuyOrders: 23,
    activeSellOrders: 18,
    avgTradeSize: 288461,
    liquidityScore: 78,
    pendingApprovals: 5,
    flaggedOrders: 2,
  };

  const recentTrades = [
    { id: 1, property: "DHA Phase 6 Apartment", shares: 10, price: 12500, total: 125000, buyer: "Ahmed K.", seller: "Sara M.", time: "2 min ago", status: "completed" },
    { id: 2, property: "Bahria Town Commercial", shares: 5, price: 18000, total: 90000, buyer: "Usman A.", seller: "Fatima H.", time: "15 min ago", status: "completed" },
    { id: 3, property: "Clifton Sea View", shares: 20, price: 15000, total: 300000, buyer: "Ali R.", seller: "Ayesha K.", time: "1 hour ago", status: "pending" },
    { id: 4, property: "Gulberg III Office", shares: 8, price: 22000, total: 176000, buyer: "Hassan A.", seller: "Zara S.", time: "3 hours ago", status: "completed" },
  ];

  const pendingOrders = [
    { id: 101, type: "sell", property: "DHA Phase 5 Villa", shares: 15, price: 25000, total: 375000, user: "Muhammad A.", reason: "Large order", createdAt: "2024-12-30" },
    { id: 102, type: "buy", property: "Bahria Town Apartment", shares: 50, price: 12000, total: 600000, user: "Fatima Z.", reason: "Price deviation", createdAt: "2024-12-30" },
    { id: 103, type: "sell", property: "Clifton Block 5", shares: 30, price: 18500, total: 555000, user: "Ali K.", reason: "First-time seller", createdAt: "2024-12-29" },
    { id: 104, type: "buy", property: "Model Town Plot", shares: 25, price: 30000, total: 750000, user: "Sara H.", reason: "Bulk purchase", createdAt: "2024-12-29" },
    { id: 105, type: "sell", property: "Johar Town Commercial", shares: 10, price: 45000, total: 450000, user: "Usman R.", reason: "Manual review", createdAt: "2024-12-28" },
  ];

  const flaggedOrders = [
    { id: 201, type: "sell", property: "DHA Phase 6", shares: 100, price: 8000, total: 800000, user: "Unknown User", flag: "Suspicious pricing", severity: "high" },
    { id: 202, type: "buy", property: "Bahria Town", shares: 200, price: 50000, total: 10000000, user: "New Account", flag: "Unusual volume", severity: "medium" },
  ];

  const orderBook = {
    buyOrders: [
      { id: 1, price: 12500, shares: 50, total: 625000, user: "Ahmed K." },
      { id: 2, price: 12400, shares: 30, total: 372000, user: "Sara M." },
      { id: 3, price: 12300, shares: 75, total: 922500, user: "Usman A." },
      { id: 4, price: 12200, shares: 40, total: 488000, user: "Fatima H." },
    ],
    sellOrders: [
      { id: 5, price: 12600, shares: 25, total: 315000, user: "Ali R." },
      { id: 6, price: 12700, shares: 45, total: 571500, user: "Hassan A." },
      { id: 7, price: 12800, shares: 60, total: 768000, user: "Zara S." },
      { id: 8, price: 12900, shares: 35, total: 451500, user: "Ayesha K." },
    ],
  };

  const handleApproveOrder = (orderId: number) => {
    alert(`Order ${orderId} approved`);
  };

  const handleRejectOrder = (orderId: number) => {
    alert(`Order ${orderId} rejected`);
  };

  const handleCancelOrder = (orderId: number) => {
    alert(`Order ${orderId} cancelled`);
  };

  const handleSaveSettings = () => {
    alert("Marketplace settings saved successfully");
    setShowSettingsDialog(false);
  };

  return (
    <AdminLayout 
      title="Marketplace Management" 
      description="Monitor, control, and manage secondary market trading"
      actions={
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border">
            <span className="text-sm text-gray-600">Trading:</span>
            <Switch
              checked={marketplaceEnabled}
              onCheckedChange={setMarketplaceEnabled}
            />
            <span className={`text-sm font-medium ${marketplaceEnabled ? "text-green-600" : "text-red-600"}`}>
              {marketplaceEnabled ? "Active" : "Paused"}
            </span>
          </div>
          <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Marketplace Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Trading Fee (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={settings.tradingFee}
                    onChange={(e) => setSettings({...settings, tradingFee: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Minimum Order Size (PKR)</Label>
                  <Input
                    type="number"
                    value={settings.minOrderSize}
                    onChange={(e) => setSettings({...settings, minOrderSize: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Maximum Order Size (PKR)</Label>
                  <Input
                    type="number"
                    value={settings.maxOrderSize}
                    onChange={(e) => setSettings({...settings, maxOrderSize: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Minimum Holding Period (Days)</Label>
                  <Input
                    type="number"
                    value={settings.minHoldingPeriod}
                    onChange={(e) => setSettings({...settings, minHoldingPeriod: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price Fluctuation Limit (%)</Label>
                  <Input
                    type="number"
                    value={settings.priceFluctationLimit}
                    onChange={(e) => setSettings({...settings, priceFluctationLimit: parseInt(e.target.value)})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Allow Instant Trades</Label>
                  <Switch
                    checked={settings.allowInstantTrades}
                    onCheckedChange={(checked) => setSettings({...settings, allowInstantTrades: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Require KYC Verification</Label>
                  <Switch
                    checked={settings.requireKYC}
                    onCheckedChange={(checked) => setSettings({...settings, requireKYC: checked})}
                  />
                </div>
                <Button onClick={handleSaveSettings} className="w-full">
                  Save Settings
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      }
    >
      {/* Alert Banner */}
      {!marketplaceEnabled && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <div>
            <p className="font-medium text-red-800">Marketplace Trading is Paused</p>
            <p className="text-sm text-red-600">All trading activities are currently suspended. Toggle the switch above to resume.</p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Volume</p>
                <p className="text-lg font-bold text-gray-900">PKR {(marketStats.totalVolume / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Trades</p>
                <p className="text-lg font-bold text-gray-900">{marketStats.totalTrades}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Pending Approvals</p>
                <p className="text-lg font-bold text-gray-900">{marketStats.pendingApprovals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Flagged Orders</p>
                <p className="text-lg font-bold text-gray-900">{marketStats.flaggedOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="orders">Active Orders</TabsTrigger>
          <TabsTrigger value="pending">
            Pending Approvals
            {pendingOrders.length > 0 && (
              <Badge className="ml-2 bg-amber-100 text-amber-700">{pendingOrders.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="flagged">
            Flagged
            {flaggedOrders.length > 0 && (
              <Badge className="ml-2 bg-red-100 text-red-700">{flaggedOrders.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="trades">Recent Trades</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Active Orders Tab */}
        <TabsContent value="orders">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Buy Orders */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Buy Orders ({marketStats.activeBuyOrders})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {orderBook.buyOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-700">PKR {order.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{order.shares} shares • {order.user}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">PKR {(order.total / 1000).toFixed(0)}K</span>
                        <Button size="sm" variant="ghost" onClick={() => handleCancelOrder(order.id)}>
                          <XCircle className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sell Orders */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                  Sell Orders ({marketStats.activeSellOrders})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {orderBook.sellOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium text-red-700">PKR {order.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{order.shares} shares • {order.user}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">PKR {(order.total / 1000).toFixed(0)}K</span>
                        <Button size="sm" variant="ghost" onClick={() => handleCancelOrder(order.id)}>
                          <XCircle className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pending Approvals Tab */}
        <TabsContent value="pending">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Orders Requiring Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Order</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Property</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Details</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Reason</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <Badge className={order.type === "buy" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                            {order.type === "buy" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                            {order.type.toUpperCase()}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">#{order.id}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium text-gray-900">{order.property}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-gray-900">{order.shares} shares @ PKR {order.price.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">Total: PKR {order.total.toLocaleString()}</p>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{order.user}</td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            {order.reason}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApproveOrder(order.id)}>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleRejectOrder(order.id)}>
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Flagged Orders Tab */}
        <TabsContent value="flagged">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Flagged Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {flaggedOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-green-300 mx-auto mb-4" />
                  <p className="text-gray-500">No flagged orders at this time</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {flaggedOrders.map((order) => (
                    <div key={order.id} className={`p-4 rounded-xl border-2 ${order.severity === "high" ? "border-red-300 bg-red-50" : "border-amber-300 bg-amber-50"}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={order.severity === "high" ? "bg-red-600 text-white" : "bg-amber-600 text-white"}>
                              {order.severity.toUpperCase()} RISK
                            </Badge>
                            <Badge className={order.type === "buy" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                              {order.type.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="font-medium text-gray-900">{order.property}</p>
                          <p className="text-sm text-gray-600">{order.shares} shares @ PKR {order.price.toLocaleString()} = PKR {order.total.toLocaleString()}</p>
                          <p className="text-sm text-gray-500 mt-1">User: {order.user}</p>
                          <p className="text-sm font-medium text-red-700 mt-2">Flag: {order.flag}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Clear Flag
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                            <Ban className="w-4 h-4 mr-1" />
                            Block Order
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Investigate
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Trades Tab */}
        <TabsContent value="trades">
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Trade History</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search trades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Property</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Shares</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Parties</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTrades.map((trade) => (
                      <tr key={trade.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <p className="font-medium text-gray-900">{trade.property}</p>
                          <p className="text-xs text-gray-500">{trade.time}</p>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{trade.shares}</td>
                        <td className="py-4 px-4 text-gray-900">PKR {trade.price.toLocaleString()}</td>
                        <td className="py-4 px-4 font-medium text-gray-900">PKR {trade.total.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-green-600">{trade.buyer} <ArrowUpRight className="w-3 h-3 inline" /></p>
                          <p className="text-sm text-red-600">{trade.seller} <ArrowDownRight className="w-3 h-3 inline" /></p>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={trade.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                            {trade.status === "completed" ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                            {trade.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Trading Volume (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-purple-300 mx-auto mb-2" />
                    <p className="text-gray-500">Volume chart visualization</p>
                    <p className="text-2xl font-bold text-purple-600 mt-2">PKR 45M</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Top Traded Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "DHA Phase 6 Apartment", volume: "PKR 12.5M", trades: 45 },
                    { name: "Bahria Town Commercial", volume: "PKR 8.2M", trades: 32 },
                    { name: "Clifton Sea View", volume: "PKR 6.8M", trades: 28 },
                    { name: "Gulberg III Office", volume: "PKR 5.1M", trades: 21 },
                  ].map((property, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{property.name}</p>
                          <p className="text-sm text-gray-500">{property.trades} trades</p>
                        </div>
                      </div>
                      <span className="font-bold text-purple-600">{property.volume}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Marketplace Health Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-green-50 rounded-xl text-center">
                    <p className="text-3xl font-bold text-green-600">{marketStats.liquidityScore}%</p>
                    <p className="text-sm text-gray-600">Liquidity Score</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl text-center">
                    <p className="text-3xl font-bold text-blue-600">0.8%</p>
                    <p className="text-sm text-gray-600">Avg Spread</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl text-center">
                    <p className="text-3xl font-bold text-purple-600">2.3 hrs</p>
                    <p className="text-sm text-gray-600">Avg Fill Time</p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-xl text-center">
                    <p className="text-3xl font-bold text-amber-600">94%</p>
                    <p className="text-sm text-gray-600">Order Success Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
