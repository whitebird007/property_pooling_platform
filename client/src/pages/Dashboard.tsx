import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import ClientLayout from "@/components/ClientLayout";
import { 
  Building2, 
  TrendingUp, 
  Wallet,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Banknote,
  AlertCircle,
  Plus
} from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { language } = useLanguage();

  const { data: investments } = trpc.investments.myInvestments.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: transactions } = trpc.transactions.myTransactions.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: kycData } = trpc.kyc.getProfile.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Calculate portfolio stats
  const totalInvested = investments?.reduce((sum, inv) => sum + Number(inv.totalInvested), 0) || 0;
  const currentValue = investments?.reduce((sum, inv) => sum + Number(inv.currentValue), 0) || 0;
  const totalReturns = currentValue - totalInvested;
  const returnPercentage = totalInvested > 0 ? ((totalReturns / totalInvested) * 100) : 0;
  const propertiesOwned = investments?.length || 0;
  const walletBalance = Number(kycData?.profile?.walletBalance || 0);

  const recentTransactions = transactions?.slice(0, 5) || [];

  return (
    <ClientLayout 
      title={language === "ur" ? "ڈیش بورڈ" : "Dashboard"} 
      description={`${language === "ur" ? "خوش آمدید" : "Welcome back"}, ${user?.name || "Investor"}`}
      actions={
        <Button className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
          <Link href="/properties">
            <Plus className="w-4 h-4 mr-2" />
            New Investment
          </Link>
        </Button>
      }
    >
      {/* KYC Alert */}
      {kycData?.profile?.kycStatus !== "verified" && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200">
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
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
              <Link href="/kyc">Complete KYC</Link>
            </Button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Total Invested</span>
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Banknote className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">PKR {totalInvested.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Current Value</span>
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <PieChart className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">PKR {currentValue.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
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
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Properties</span>
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{propertiesOwned}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* My Properties */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">My Properties</CardTitle>
            <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50" asChild>
              <Link href="/portfolio">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
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
                <p className="text-gray-500 mb-4">Start building your property portfolio today</p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
                  <Link href="/properties">Browse Properties</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions & Wallet */}
        <div className="space-y-6">
          {/* Wallet Balance */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-purple-100 text-sm">Wallet Balance</p>
                  <p className="text-2xl font-bold">PKR {walletBalance.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0" asChild>
                  <Link href="/wallet">Add Funds</Link>
                </Button>
                <Button variant="secondary" className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0" asChild>
                  <Link href="/wallet">Withdraw</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" className="text-purple-600" asChild>
                <Link href="/transactions">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {recentTransactions.length > 0 ? (
                <div className="space-y-3">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          tx.transactionType === "deposit" ? "bg-green-100" : 
                          tx.transactionType === "withdrawal" ? "bg-red-100" : "bg-purple-100"
                        }`}>
                          {tx.transactionType === "deposit" ? (
                            <ArrowUpRight className="w-4 h-4 text-green-600" />
                          ) : tx.transactionType === "withdrawal" ? (
                            <ArrowDownRight className="w-4 h-4 text-red-600" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-purple-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 capitalize">{tx.transactionType}</p>
                          <p className="text-xs text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className={`font-medium text-sm ${
                        tx.transactionType === "deposit" ? "text-green-600" : 
                        tx.transactionType === "withdrawal" ? "text-red-600" : "text-gray-900"
                      }`}>
                        {tx.transactionType === "deposit" ? "+" : tx.transactionType === "withdrawal" ? "-" : ""}
                        PKR {Number(tx.amount).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">No recent transactions</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientLayout>
  );
}
