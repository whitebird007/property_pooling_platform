import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Building2, 
  TrendingUp, 
  Wallet,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Banknote,
  LayoutDashboard,
  Briefcase,
  Store,
  FileCheck,
  LogOut,
  Bell,
  User,
  AlertCircle,
  Shield,
  Home,
  Sparkles,
  Plus,
  BarChart3
} from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: investments } = trpc.investments.myInvestments.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: transactions } = trpc.transactions.myTransactions.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: kycData } = trpc.kyc.getProfile.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Redirect to login if not authenticated
  if (!loading && !isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Building2 className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate portfolio stats
  const totalInvested = investments?.reduce((sum, inv) => sum + Number(inv.totalInvested), 0) || 0;
  const currentValue = investments?.reduce((sum, inv) => sum + Number(inv.currentValue), 0) || 0;
  const totalReturns = currentValue - totalInvested;
  const returnPercentage = totalInvested > 0 ? ((totalReturns / totalInvested) * 100) : 0;
  const propertiesOwned = investments?.length || 0;
  const walletBalance = Number(kycData?.profile?.walletBalance || 0);

  const recentTransactions = transactions?.slice(0, 5) || [];

  const sidebarLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, active: true },
    { href: "/portfolio", label: "Portfolio", icon: Briefcase },
    { href: "/marketplace", label: "Marketplace", icon: Store },
    { href: "/wallet", label: "Wallet", icon: Wallet },
    { href: "/kyc", label: "KYC Verification", icon: FileCheck },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-purple-50 to-white">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Dashboard</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {language === "ur" ? "خوش آمدید" : "Welcome back"}, {user?.name || "Investor"}
              </h1>
              <p className="text-gray-600">
                {language === "ur" ? "اپنی سرمایہ کاری کا جائزہ لیں" : "Here's an overview of your investments"}
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/properties">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  New Investment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* KYC Alert */}
      {kycData?.profile?.kycStatus !== "verified" && (
        <section className="py-4 bg-white border-b border-gray-200">
          <div className="container">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-200 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Complete Your KYC</p>
                    <p className="text-sm text-gray-600">
                      Verify your identity to start investing in properties
                    </p>
                  </div>
                </div>
                <Link href="/kyc">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Complete KYC
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Cards */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Total Invested</span>
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Banknote className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">PKR {totalInvested.toLocaleString()}</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Current Value</span>
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">PKR {currentValue.toLocaleString()}</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Total Returns</span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${totalReturns >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                  {totalReturns >= 0 ? (
                    <ArrowUpRight className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </div>
              <p className={`text-2xl font-bold ${totalReturns >= 0 ? "text-green-600" : "text-red-600"}`}>
                {totalReturns >= 0 ? "+" : ""}PKR {totalReturns.toLocaleString()}
              </p>
              <p className={`text-sm ${totalReturns >= 0 ? "text-green-600" : "text-red-600"}`}>
                {returnPercentage >= 0 ? "+" : ""}{returnPercentage.toFixed(2)}%
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Properties</span>
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{propertiesOwned}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Portfolio */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900">My Properties</h2>
                  <Link href="/portfolio">
                    <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                      View All
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                <div className="p-6">
                  {investments && investments.length > 0 ? (
                    <div className="space-y-4">
                      {investments.slice(0, 3).map((investment) => (
                        <div key={investment.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="w-16 h-16 rounded-xl bg-purple-100 flex items-center justify-center">
                            <Building2 className="w-8 h-8 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">Property #{investment.propertyId}</h4>
                            <p className="text-sm text-gray-500">
                              {investment.sharesOwned} shares owned
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">PKR {Number(investment.currentValue).toLocaleString()}</p>
                            <Badge className={`${investment.status === "active" ? "bg-green-100 text-green-700 border-green-200" : "bg-gray-100 text-gray-700"}`}>
                              {investment.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <Building2 className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">No Investments Yet</h3>
                      <p className="text-sm text-gray-500 mb-6">
                        Start building your property portfolio today
                      </p>
                      <Link href="/properties">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                          <Sparkles className="mr-2 w-4 h-4" />
                          Browse Properties
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
                </div>
                <div className="p-6">
                  {recentTransactions.length > 0 ? (
                    <div className="space-y-3">
                      {recentTransactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              tx.transactionType === "deposit" || tx.transactionType === "dividend" 
                                ? "bg-green-100" 
                                : tx.transactionType === "withdrawal" 
                                  ? "bg-red-100" 
                                  : "bg-purple-100"
                            }`}>
                              {tx.transactionType === "deposit" || tx.transactionType === "dividend" ? (
                                <ArrowUpRight className="w-5 h-5 text-green-600" />
                              ) : tx.transactionType === "withdrawal" ? (
                                <ArrowDownRight className="w-5 h-5 text-red-600" />
                              ) : (
                                <Building2 className="w-5 h-5 text-purple-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 capitalize">{tx.transactionType}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(tx.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${
                              tx.transactionType === "deposit" || tx.transactionType === "dividend" 
                                ? "text-green-600" 
                                : tx.transactionType === "withdrawal" 
                                  ? "text-red-600" 
                                  : "text-gray-900"
                            }`}>
                              {tx.transactionType === "deposit" || tx.transactionType === "dividend" ? "+" : "-"}PKR {Number(tx.amount).toLocaleString()}
                            </p>
                            <Badge className={`text-xs ${
                              tx.status === "completed" 
                                ? "bg-green-100 text-green-700" 
                                : tx.status === "pending" 
                                  ? "bg-yellow-100 text-yellow-700" 
                                  : "bg-red-100 text-red-700"
                            }`}>
                              {tx.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No transactions yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Wallet Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Wallet className="w-6 h-6" />
                  <h3 className="font-bold">Wallet Balance</h3>
                </div>
                <p className="text-3xl font-bold mb-4">PKR {walletBalance.toLocaleString()}</p>
                <div className="flex gap-2">
                  <Link href="/wallet" className="flex-1">
                    <Button className="w-full bg-white text-purple-700 hover:bg-purple-50">
                      Add Funds
                    </Button>
                  </Link>
                  <Link href="/wallet" className="flex-1">
                    <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                      Withdraw
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {sidebarLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <div className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                        link.active 
                          ? "bg-purple-50 text-purple-600 border border-purple-200" 
                          : "text-gray-600 hover:bg-gray-50"
                      }`}>
                        <link.icon className="w-5 h-5" />
                        <span className="font-medium">{link.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Admin Link */}
              {user?.role === "admin" && (
                <Link href="/admin">
                  <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-200 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-amber-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-amber-900">Admin Panel</p>
                        <p className="text-sm text-amber-700">Manage platform</p>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Logout */}
              <button 
                onClick={() => logout()}
                className="w-full p-4 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-gray-600"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
