import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign,
  FileCheck,
  AlertCircle,
  ChevronRight,
  BarChart3,
  PieChart,
  Activity,
  Wallet,
  ShoppingCart,
  Settings,
  Bell,
  Search,
  Plus,
  Download,
  Filter,
  Calendar,
  MapPin,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Home,
  Briefcase,
  FileText,
  Shield,
  CreditCard,
  RefreshCw,
  MoreVertical,
  Menu,
  X,
  LogOut,
  User,
  ChevronDown,
  Landmark,
  Scale,
  Target,
  Percent
} from "lucide-react";

export default function AdminDashboard() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const { data: properties } = trpc.properties.list.useQuery({});
  const { data: stats } = trpc.admin.getDashboardStats.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  if (!loading && !isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">
              You don't have permission to access the admin panel.
            </p>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/">Go Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard stats
  const dashboardStats = {
    totalProperties: stats?.totalProperties || properties?.length || 0,
    activeInvestors: stats?.totalUsers || 0,
    totalInvested: Number(stats?.totalInvested || 0),
    totalTrades: stats?.totalTrades || 0,
  };

  // Sidebar navigation items
  const sidebarItems = [
    { icon: Home, label: "Dashboard", href: "/admin", active: true },
    { icon: Building2, label: "Properties", href: "/admin/properties" },
    { icon: Users, label: "Investors", href: "/admin/investors" },
    { icon: FileCheck, label: "KYC Approvals", href: "/admin/kyc" },
    { icon: ShoppingCart, label: "Marketplace", href: "/admin/marketplace" },
    { icon: Wallet, label: "Transactions", href: "/admin/transactions" },
    { icon: Landmark, label: "SPV Management", href: "/admin/spv" },
    { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    { icon: FileText, label: "Reports", href: "/admin/reports" },
    { icon: Briefcase, label: "Sales Training", href: "/admin/sales-training" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900">PropertyPool</span>
              <span className="block text-xs text-purple-600 font-medium">Admin Panel</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {sidebarItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  item.active 
                    ? 'bg-purple-50 text-purple-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name || "Admin"}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <button 
                onClick={() => logout()}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.name?.split(' ')[0] || 'Admin'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent border-none outline-none text-sm w-48"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-xl">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Quick Actions */}
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white hover:bg-white/30">+12%</Badge>
                </div>
                <p className="text-3xl font-bold mb-1">{dashboardStats.totalProperties}</p>
                <p className="text-sm text-white/80">Total Properties</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white hover:bg-white/30">+8%</Badge>
                </div>
                <p className="text-3xl font-bold mb-1">{dashboardStats.activeInvestors.toLocaleString()}</p>
                <p className="text-sm text-white/80">Active Investors</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-green-500 to-emerald-500 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white hover:bg-white/30">+23%</Badge>
                </div>
                <p className="text-3xl font-bold mb-1">PKR {(dashboardStats.totalInvested / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-white/80">Total Invested</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-500 to-amber-500 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white hover:bg-white/30">+15%</Badge>
                </div>
                <p className="text-3xl font-bold mb-1">{dashboardStats.totalTrades}</p>
                <p className="text-sm text-white/80">Total Trades</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Investment Overview Chart */}
            <Card className="lg:col-span-2 border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg">Investment Overview</CardTitle>
                  <CardDescription>Monthly investment trends</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Last 6 Months
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Placeholder for Chart */}
                <div className="h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-purple-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Investment chart visualization</p>
                    <p className="text-xs text-gray-400 mt-1">Data will be displayed here</p>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900">PKR 125M</p>
                    <p className="text-xs text-gray-500">This Month</p>
                    <div className="flex items-center justify-center gap-1 mt-1 text-green-600 text-xs">
                      <ArrowUpRight className="w-3 h-3" />
                      +18%
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900">342</p>
                    <p className="text-xs text-gray-500">New Investors</p>
                    <div className="flex items-center justify-center gap-1 mt-1 text-green-600 text-xs">
                      <ArrowUpRight className="w-3 h-3" />
                      +12%
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900">10.5%</p>
                    <p className="text-xs text-gray-500">Avg. Returns</p>
                    <div className="flex items-center justify-center gap-1 mt-1 text-green-600 text-xs">
                      <ArrowUpRight className="w-3 h-3" />
                      +2%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions & Alerts */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/admin/properties" className="block">
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Add New Property</p>
                      <p className="text-xs text-gray-500">List a new investment opportunity</p>
                    </div>
                  </div>
                </Link>

                <Link href="/admin/kyc" className="block">
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
                      <FileCheck className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">KYC Approvals</p>
                      <p className="text-xs text-gray-500">{pendingKYC.length} pending verifications</p>
                    </div>
                    <Badge className="bg-amber-500">{pendingKYC.length}</Badge>
                  </div>
                </Link>

                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Process Withdrawals</p>
                    <p className="text-xs text-gray-500">5 pending requests</p>
                  </div>
                  <Badge className="bg-blue-500">5</Badge>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Distribute Dividends</p>
                    <p className="text-xs text-gray-500">Monthly payout due</p>
                  </div>
                </div>

                <Link href="/admin/reports" className="block">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-gray-500 flex items-center justify-center">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Generate Reports</p>
                      <p className="text-xs text-gray-500">Export financial data</p>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Property Performance & KYC Queue */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Property Performance */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Property Performance</CardTitle>
                  <CardDescription>Funding progress and returns</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/properties">View All</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {propertyPerformance.map((property, index) => (
                  <div key={index} className="p-4 border border-gray-100 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{property.name}</p>
                          <p className="text-xs text-gray-500">{property.investors} investors</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{property.returns}%</p>
                        <p className="text-xs text-gray-500">Annual Return</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Funding Progress</span>
                        <span className="font-medium">{property.funded}%</span>
                      </div>
                      <Progress value={property.funded} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pending KYC */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Pending KYC Verifications</CardTitle>
                  <CardDescription>Review and approve investor documents</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/kyc">View All</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingKYC.map((kyc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-medium">
                        {kyc.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{kyc.name}</p>
                        <p className="text-xs text-gray-500">{kyc.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{kyc.submitted}</p>
                        <p className="text-xs text-gray-400">{kyc.documents} documents</p>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-green-600 hover:bg-green-50">
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 hover:bg-red-50">
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Investments Table */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Investments</CardTitle>
                <CardDescription>Latest investment transactions</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Investor</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Property</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInvestments.map((investment, index) => (
                      <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                              {investment.investor.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-900">{investment.investor}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{investment.property}</td>
                        <td className="py-4 px-4 font-medium text-gray-900">PKR {investment.amount.toLocaleString()}</td>
                        <td className="py-4 px-4 text-gray-500 text-sm">{investment.date}</td>
                        <td className="py-4 px-4">
                          <Badge className={investment.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>
                            {investment.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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

          {/* Platform Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-500">Conversion Rate</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">24.5%</p>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3" /> +3.2% from last month
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Percent className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-500">Platform Fee</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">PKR 2.5M</p>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3" /> +15% from last month
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Scale className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-500">Shariah Compliance</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">100%</p>
              <p className="text-xs text-gray-500 mt-1">All properties certified</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-5 h-5 text-amber-500" />
                <span className="text-sm text-gray-500">KYC Verified</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">89%</p>
              <p className="text-xs text-gray-500 mt-1">Of active investors</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
