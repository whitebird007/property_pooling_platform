import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { 
  Building2, 
  TrendingUp, 
  Wallet,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Banknote,
  Vote,
  LayoutDashboard,
  Briefcase,
  Store,
  FileCheck,
  Settings,
  LogOut,
  Bell,
  User,
  AlertCircle,
  CheckCircle2,
  Clock,
  Shield,
  Menu,
  X,
  Home,
  Sparkles
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Building2 className="w-8 h-8 text-slate-900" />
          </div>
          <p className="text-slate-400">Loading your dashboard...</p>
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
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-800">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <Building2 className="w-6 h-6 text-slate-900" />
                </div>
                <span className="text-xl font-bold text-white">PropertyPool</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {sidebarLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  link.active 
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/30" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}>
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </div>
              </Link>
            ))}

            {user?.role === "admin" && (
              <>
                <div className="pt-4 pb-2">
                  <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Admin</p>
                </div>
                <Link href="/admin">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-amber-400 hover:bg-amber-500/10 transition-all duration-200">
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Admin Panel</span>
                  </div>
                </Link>
              </>
            )}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-900" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{user?.name || "User"}</p>
                <p className="text-slate-400 text-sm truncate">{user?.email}</p>
              </div>
            </div>
            <button 
              onClick={() => logout()}
              className="flex items-center gap-3 px-4 py-3 mt-2 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-72">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400 text-sm">Welcome back, {user?.name || "Investor"}!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800">
                  <Home className="w-5 h-5 mr-2" />
                  Home
                </Button>
              </Link>
              <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* KYC Alert */}
          {kycData?.profile?.kycStatus !== "verified" && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Complete Your KYC</p>
                    <p className="text-sm text-slate-400">
                      Verify your identity to start investing in properties
                    </p>
                  </div>
                </div>
                <Link href="/kyc">
                  <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold">
                    Complete KYC
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-400">Total Invested</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Banknote className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">PKR {totalInvested.toLocaleString()}</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-400">Current Value</span>
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">PKR {currentValue.toLocaleString()}</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-400">Total Returns</span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${totalReturns >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  {totalReturns >= 0 ? (
                    <ArrowUpRight className="w-5 h-5 text-green-400" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-red-400" />
                  )}
                </div>
              </div>
              <p className={`text-2xl font-bold ${totalReturns >= 0 ? "text-green-400" : "text-red-400"}`}>
                {totalReturns >= 0 ? "+" : ""}PKR {totalReturns.toLocaleString()}
              </p>
              <p className={`text-sm ${totalReturns >= 0 ? "text-green-400" : "text-red-400"}`}>
                {returnPercentage >= 0 ? "+" : ""}{returnPercentage.toFixed(2)}%
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-400">Properties</span>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{propertiesOwned}</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Portfolio */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                  <h2 className="text-lg font-bold text-white">My Properties</h2>
                  <Link href="/portfolio">
                    <Button variant="ghost" className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10">
                      View All
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                <div className="p-6">
                  {investments && investments.length > 0 ? (
                    <div className="space-y-4">
                      {investments.slice(0, 3).map((investment) => (
                        <div key={investment.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center border border-amber-500/30">
                            <Building2 className="w-8 h-8 text-amber-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white truncate">Property #{investment.propertyId}</h4>
                            <p className="text-sm text-slate-400">
                              {investment.sharesOwned} shares owned
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-white">PKR {Number(investment.currentValue).toLocaleString()}</p>
                            <Badge className={`${investment.status === "active" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-slate-700 text-slate-300"}`}>
                              {investment.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
                        <Building2 className="w-8 h-8 text-slate-500" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">No Investments Yet</h3>
                      <p className="text-sm text-slate-400 mb-6">
                        Start building your property portfolio today
                      </p>
                      <Link href="/properties">
                        <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold">
                          <Sparkles className="mr-2 w-4 h-4" />
                          Browse Properties
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 overflow-hidden">
                <div className="p-6 border-b border-slate-700/50">
                  <h2 className="text-lg font-bold text-white">Recent Transactions</h2>
                </div>
                <div className="p-6">
                  {recentTransactions.length > 0 ? (
                    <div className="space-y-3">
                      {recentTransactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between py-3 border-b border-slate-700/50 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              tx.transactionType === "deposit" || tx.transactionType === "dividend"
                                ? "bg-green-500/20"
                                : tx.transactionType === "withdrawal"
                                ? "bg-red-500/20"
                                : "bg-blue-500/20"
                            }`}>
                              {tx.transactionType === "deposit" || tx.transactionType === "dividend" ? (
                                <ArrowDownRight className={`w-5 h-5 ${tx.transactionType === "deposit" || tx.transactionType === "dividend" ? "text-green-400" : ""}`} />
                              ) : tx.transactionType === "withdrawal" ? (
                                <ArrowUpRight className="w-5 h-5 text-red-400" />
                              ) : (
                                <Building2 className="w-5 h-5 text-blue-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-white capitalize">
                                {tx.transactionType.replace("_", " ")}
                              </p>
                              <p className="text-xs text-slate-400">
                                {new Date(tx.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${
                              tx.transactionType === "deposit" || tx.transactionType === "dividend"
                                ? "text-green-400"
                                : tx.transactionType === "withdrawal"
                                ? "text-red-400"
                                : "text-white"
                            }`}>
                              {tx.transactionType === "deposit" || tx.transactionType === "dividend" ? "+" : "-"}
                              PKR {Number(tx.amount).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 mx-auto text-slate-500 mb-4" />
                      <p className="text-slate-400">No transactions yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Wallet Card */}
              <div className="rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-amber-400 font-medium">Wallet Balance</span>
                  <Wallet className="w-5 h-5 text-amber-400" />
                </div>
                <p className="text-3xl font-bold text-white mb-4">PKR {walletBalance.toLocaleString()}</p>
                <div className="flex gap-2">
                  <Link href="/wallet" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold">
                      Add Funds
                    </Button>
                  </Link>
                  <Link href="/wallet" className="flex-1">
                    <Button variant="outline" className="w-full border-amber-500/50 text-amber-400 hover:bg-amber-500/10">
                      Withdraw
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/properties">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Browse Properties</p>
                        <p className="text-xs text-slate-400">Find your next investment</p>
                      </div>
                    </div>
                  </Link>
                  <Link href="/marketplace">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <Store className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Marketplace</p>
                        <p className="text-xs text-slate-400">Trade property shares</p>
                      </div>
                    </div>
                  </Link>
                  <Link href="/education">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Learn</p>
                        <p className="text-xs text-slate-400">Investment guides</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* KYC Status */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Account Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">KYC Status</span>
                    <Badge className={`${
                      kycData?.profile?.kycStatus === "verified" 
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                        : kycData?.profile?.kycStatus === "pending"
                        ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                        : "bg-slate-700 text-slate-300"
                    }`}>
                      {kycData?.profile?.kycStatus || "Not Started"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Account Type</span>
                    <span className="text-white font-medium capitalize">{user?.role || "Investor"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
