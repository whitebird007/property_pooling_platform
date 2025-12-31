import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();

  const { data: properties } = trpc.properties.list.useQuery({});
  const { data: stats } = trpc.admin.getDashboardStats.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  // Dashboard stats
  const dashboardStats = {
    totalProperties: stats?.totalProperties || properties?.length || 0,
    activeInvestors: stats?.totalUsers || 0,
    totalInvested: Number(stats?.totalInvested || 0),
    totalTrades: stats?.totalTrades || 0,
  };

  // Mock data for charts and tables
  const recentInvestments = [
    { investor: "Ahmed Khan", property: "DHA Phase 6 Apartment", amount: 500000, date: "2 hours ago", status: "completed" },
    { investor: "Sara Malik", property: "Bahria Town Commercial", amount: 1000000, date: "5 hours ago", status: "completed" },
    { investor: "Usman Ali", property: "Clifton Sea View", amount: 250000, date: "1 day ago", status: "pending" },
    { investor: "Fatima Hassan", property: "DHA Phase 6 Apartment", amount: 750000, date: "2 days ago", status: "completed" },
  ];

  const pendingKYC = [
    { name: "Ali Raza", email: "ali@example.com", submitted: "10 min ago", documents: 3 },
    { name: "Ayesha Khan", email: "ayesha@example.com", submitted: "1 hour ago", documents: 2 },
    { name: "Hassan Ahmed", email: "hassan@example.com", submitted: "3 hours ago", documents: 3 },
  ];

  const propertyPerformance = [
    { name: "DHA Phase 6 Apartment", funded: 85, investors: 42, returns: 10.5 },
    { name: "Bahria Town Commercial", funded: 100, investors: 67, returns: 12.0 },
    { name: "Clifton Sea View", funded: 45, investors: 23, returns: 9.5 },
    { name: "Gulberg III Office", funded: 70, investors: 35, returns: 11.0 },
  ];

  return (
    <AdminLayout 
      title="Dashboard" 
      description={`Welcome back, ${user?.name?.split(' ')[0] || 'Admin'}`}
      actions={
        <Button className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
          <Link href="/admin/properties">
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Link>
        </Button>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <Badge className="bg-white/20 text-white border-0">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +12%
              </Badge>
            </div>
            <p className="text-3xl font-bold mb-1">{dashboardStats.totalProperties}</p>
            <p className="text-purple-100 text-sm">Total Properties</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <Badge className="bg-white/20 text-white border-0">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +8%
              </Badge>
            </div>
            <p className="text-3xl font-bold mb-1">{dashboardStats.activeInvestors.toLocaleString()}</p>
            <p className="text-blue-100 text-sm">Active Investors</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <Badge className="bg-white/20 text-white border-0">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +23%
              </Badge>
            </div>
            <p className="text-3xl font-bold mb-1">PKR {(dashboardStats.totalInvested / 1000000).toFixed(1)}M</p>
            <p className="text-green-100 text-sm">Total Invested</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <Badge className="bg-white/20 text-white border-0">
                <ArrowDownRight className="w-3 h-3 mr-1" />
                -2%
              </Badge>
            </div>
            <p className="text-3xl font-bold mb-1">{dashboardStats.totalTrades}</p>
            <p className="text-orange-100 text-sm">Total Trades</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Investment Overview Chart */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Investment Overview</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Weekly</Button>
              <Button variant="outline" size="sm" className="bg-purple-50 text-purple-700 border-purple-200">Monthly</Button>
              <Button variant="outline" size="sm">Yearly</Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Placeholder Chart */}
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                <p className="text-gray-500">Investment chart visualization</p>
                <p className="text-sm text-gray-400">Connect Chart.js for real data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KYC Verification Queue */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">KYC Queue</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/kyc">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingKYC.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-amber-600 font-medium">{item.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.submitted}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-600 hover:bg-green-50">
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:bg-red-50">
                    <XCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Property Performance & Recent Investments */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Property Performance */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Property Performance</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/properties">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {propertyPerformance.map((property, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm text-gray-900">{property.name}</p>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                    {property.returns}% ROI
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <Progress value={property.funded} className="flex-1 h-2" />
                  <span className="text-sm text-gray-500 w-12">{property.funded}%</span>
                </div>
                <p className="text-xs text-gray-500">{property.investors} investors</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Investments */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Investments</CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvestments.map((investment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 font-medium">{investment.investor.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{investment.investor}</p>
                      <p className="text-xs text-gray-500">{investment.property}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm text-gray-900">PKR {investment.amount.toLocaleString()}</p>
                    <div className="flex items-center gap-1 justify-end">
                      {investment.status === "completed" ? (
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                      ) : (
                        <Clock className="w-3 h-3 text-amber-500" />
                      )}
                      <span className="text-xs text-gray-500">{investment.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
            <Link href="/admin/properties">
              <Building2 className="w-5 h-5 text-purple-600" />
              <span>Add Property</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
            <Link href="/admin/kyc">
              <Eye className="w-5 h-5 text-blue-600" />
              <span>Review KYC</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
            <Link href="/admin/investors">
              <Users className="w-5 h-5 text-green-600" />
              <span>Manage Users</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
            <Link href="/admin/sales-training">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <span>Sales Training</span>
            </Link>
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
