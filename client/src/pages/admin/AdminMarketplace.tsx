import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  BarChart3,
  Activity
} from "lucide-react";

export default function AdminMarketplace() {
  const [searchTerm, setSearchTerm] = useState("");

  // Orders would come from a marketplace router if implemented
  const orders: any[] = [];

  // Mock data for marketplace stats
  const marketStats = {
    totalVolume: 45000000,
    totalTrades: 156,
    activeBuyOrders: 23,
    activeSellOrders: 18,
    avgTradeSize: 288461,
    liquidityScore: 78,
  };

  const recentTrades = [
    { id: 1, property: "DHA Phase 6 Apartment", shares: 10, price: 12500, total: 125000, buyer: "Ahmed K.", seller: "Sara M.", time: "2 min ago", status: "completed" },
    { id: 2, property: "Bahria Town Commercial", shares: 5, price: 18000, total: 90000, buyer: "Usman A.", seller: "Fatima H.", time: "15 min ago", status: "completed" },
    { id: 3, property: "Clifton Sea View", shares: 20, price: 15000, total: 300000, buyer: "Ali R.", seller: "Ayesha K.", time: "1 hour ago", status: "pending" },
    { id: 4, property: "Gulberg III Office", shares: 8, price: 22000, total: 176000, buyer: "Hassan A.", seller: "Zara S.", time: "3 hours ago", status: "completed" },
  ];

  const orderBook = {
    buyOrders: [
      { price: 12500, shares: 50, total: 625000 },
      { price: 12400, shares: 30, total: 372000 },
      { price: 12300, shares: 75, total: 922500 },
      { price: 12200, shares: 40, total: 488000 },
    ],
    sellOrders: [
      { price: 12600, shares: 25, total: 315000 },
      { price: 12700, shares: 45, total: 571500 },
      { price: 12800, shares: 60, total: 768000 },
      { price: 12900, shares: 35, total: 451500 },
    ],
  };

  return (
    <AdminLayout 
      title="Marketplace" 
      description="Monitor secondary market trades and liquidity"
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
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
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Buy Orders</p>
                <p className="text-lg font-bold text-gray-900">{marketStats.activeBuyOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Sell Orders</p>
                <p className="text-lg font-bold text-gray-900">{marketStats.activeSellOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Avg Trade</p>
                <p className="text-lg font-bold text-gray-900">PKR {(marketStats.avgTradeSize / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
                <Activity className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Liquidity</p>
                <p className="text-lg font-bold text-gray-900">{marketStats.liquidityScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Order Book */}
        <Card className="lg:col-span-1 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Order Book</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Sell Orders */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">SELL ORDERS</p>
              <div className="space-y-1">
                {orderBook.sellOrders.reverse().map((order, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-red-50 rounded-lg text-sm">
                    <span className="text-red-600 font-medium">PKR {order.price.toLocaleString()}</span>
                    <span className="text-gray-600">{order.shares} shares</span>
                    <span className="text-gray-500">PKR {(order.total / 1000).toFixed(0)}K</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spread */}
            <div className="py-3 text-center border-y border-gray-100">
              <p className="text-xs text-gray-500">Spread</p>
              <p className="text-lg font-bold text-gray-900">PKR 100 (0.8%)</p>
            </div>

            {/* Buy Orders */}
            <div className="mt-4">
              <p className="text-xs font-medium text-gray-500 mb-2">BUY ORDERS</p>
              <div className="space-y-1">
                {orderBook.buyOrders.map((order, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg text-sm">
                    <span className="text-green-600 font-medium">PKR {order.price.toLocaleString()}</span>
                    <span className="text-gray-600">{order.shares} shares</span>
                    <span className="text-gray-500">PKR {(order.total / 1000).toFixed(0)}K</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Trades */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Trades</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search trades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-48"
                />
              </div>
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
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
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
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Orders from Database */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Active Orders</CardTitle>
          <Badge variant="outline">{orders?.length || 0} orders</Badge>
        </CardHeader>
        <CardContent>
          {orders && orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Shares</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any) => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-4 px-4 font-mono text-sm">#{order.id}</td>
                      <td className="py-4 px-4">
                        <Badge className={order.orderType === "buy" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                          {order.orderType}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">{order.shares}</td>
                      <td className="py-4 px-4">PKR {Number(order.pricePerShare).toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{order.status}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="text-green-600">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingCart className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No active orders</p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
