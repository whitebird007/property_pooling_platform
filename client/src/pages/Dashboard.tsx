import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { 
  Building2, 
  TrendingUp, 
  Wallet,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Banknote,
  Vote
} from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back, {user?.name || "Investor"}!
            </h1>
            <p className="text-muted-foreground">
              Here's an overview of your investment portfolio
            </p>
          </div>

          {/* KYC Alert */}
          {kycData?.profile?.kycStatus !== "verified" && (
            <Card className="mb-6 border-amber-200 bg-amber-50">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="font-medium text-amber-800">Complete Your KYC</p>
                    <p className="text-sm text-amber-600">
                      Verify your identity to start investing in properties
                    </p>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/kyc">Complete KYC</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t("dashboard.totalInvested")}</span>
                  <Banknote className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">PKR {totalInvested.toLocaleString()}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t("dashboard.currentValue")}</span>
                  <PieChart className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">PKR {currentValue.toLocaleString()}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t("dashboard.totalReturns")}</span>
                  {totalReturns >= 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <p className={`text-2xl font-bold ${totalReturns >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {totalReturns >= 0 ? "+" : ""}PKR {totalReturns.toLocaleString()}
                </p>
                <p className={`text-sm ${totalReturns >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {returnPercentage >= 0 ? "+" : ""}{returnPercentage.toFixed(2)}%
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t("dashboard.properties")}</span>
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">{propertiesOwned}</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Portfolio */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>My Properties</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
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
                        <div key={investment.id} className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
                            <Building2 className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold truncate">Property #{investment.propertyId}</h4>
                            <p className="text-sm text-muted-foreground">
                              {investment.sharesOwned} shares owned
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">PKR {Number(investment.currentValue).toLocaleString()}</p>
                            <Badge variant={investment.status === "active" ? "default" : "secondary"}>
                              {investment.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">No Investments Yet</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Start building your property portfolio today
                      </p>
                      <Button asChild>
                        <Link href="/properties">Browse Properties</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  {recentTransactions.length > 0 ? (
                    <div className="space-y-3">
                      {recentTransactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              tx.transactionType === "deposit" || tx.transactionType === "dividend"
                                ? "bg-green-100 text-green-600"
                                : tx.transactionType === "withdrawal"
                                ? "bg-red-100 text-red-600"
                                : "bg-blue-100 text-blue-600"
                            }`}>
                              {tx.transactionType === "deposit" || tx.transactionType === "dividend" ? (
                                <ArrowDownRight className="w-4 h-4" />
                              ) : tx.transactionType === "withdrawal" ? (
                                <ArrowUpRight className="w-4 h-4" />
                              ) : (
                                <Building2 className="w-4 h-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium capitalize">
                                {tx.transactionType.replace("_", " ")}
                              </p>
                              <p className="text-xs text-muted-foreground">
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
                                : ""
                            }`}>
                              {tx.transactionType === "deposit" || tx.transactionType === "dividend" ? "+" : "-"}
                              PKR {Number(tx.amount).toLocaleString()}
                            </p>
                            <Badge variant={tx.status === "completed" ? "default" : "secondary"} className="text-xs">
                              {tx.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">
                      No transactions yet
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Wallet */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Wallet Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-4">PKR {walletBalance.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <Button className="flex-1" asChild>
                      <Link href="/wallet">Deposit</Link>
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href="/wallet">Withdraw</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/properties">
                      <Building2 className="w-4 h-4 mr-2" />
                      Browse Properties
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/marketplace">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Secondary Market
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/portfolio">
                      <Vote className="w-4 h-4 mr-2" />
                      Vote on Decisions
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* KYC Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">KYC Verification</span>
                    <Badge variant={kycData?.profile?.kycStatus === "verified" ? "default" : "secondary"}>
                      {kycData?.profile?.kycStatus || "Not Started"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Risk Profile</span>
                    <Badge variant="outline">
                      {kycData?.profile?.riskProfile || "Not Set"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Member Since</span>
                    <span className="text-sm text-muted-foreground">
                      {kycData?.profile?.createdAt ? new Date(kycData.profile.createdAt).toLocaleDateString() : "N/A"}
                    </span>
                  </div>
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
