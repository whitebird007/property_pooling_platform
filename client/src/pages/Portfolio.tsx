import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { 
  Building2, 
  TrendingUp, 
  Wallet,
  ArrowUpRight,
  Download,
  Eye,
  BarChart3,
  Sparkles,
  ChevronRight,
  CheckCircle,
  DollarSign,
  Target,
  Percent,
  Banknote,
  Vote
} from "lucide-react";

export default function Portfolio() {
  const { language, t } = useLanguage();
  const { user, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("holdings");

  const { data: investments, isLoading: investmentsLoading } = trpc.investments.myInvestments.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: transactions, isLoading: transactionsLoading } = trpc.transactions.myTransactions.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  // Calculate portfolio stats
  const investmentsList = investments || [];
  const transactionsList = transactions || [];

  const totalInvested = investmentsList.reduce((sum, inv) => sum + Number(inv.totalInvested || 0), 0);
  const currentValue = investmentsList.reduce((sum, inv) => sum + Number(inv.currentValue || inv.totalInvested || 0), 0);
  const totalShares = investmentsList.reduce((sum, inv) => sum + (inv.sharesOwned || 0), 0);
  const dividendTransactions = transactionsList.filter(t => t.transactionType === 'dividend');
  const totalDividends = dividendTransactions.reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const totalReturn = currentValue - totalInvested + totalDividends;
  const returnPercentage = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-10" />
        
        {/* Animated shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/dashboard" className="hover:text-amber-400 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Portfolio</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {language === "ur" ? "میرا پورٹ فولیو" : "My Portfolio"}
              </h1>
              <p className="text-slate-400">
                {language === "ur" 
                  ? "اپنی سرمایہ کاری اور منافع کا جائزہ لیں"
                  : "Track your investments and returns"}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                <Download className="mr-2 w-4 h-4" />
                Tax Statement
              </Button>
              <Link href="/properties">
                <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold">
                  <Sparkles className="mr-2 w-4 h-4" />
                  {language === "ur" ? "مزید سرمایہ کاری" : "Invest More"}
                </Button>
              </Link>
            </div>
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-slate-400 text-sm">Total Invested</span>
              </div>
              <p className="text-2xl font-bold text-white">
                PKR {totalInvested.toLocaleString()}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-slate-400 text-sm">Current Value</span>
              </div>
              <p className="text-2xl font-bold text-white">
                PKR {currentValue.toLocaleString()}
              </p>
              {currentValue > totalInvested && (
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-sm">
                    +{((currentValue - totalInvested) / totalInvested * 100).toFixed(1)}%
                  </span>
                </div>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-slate-400 text-sm">Total Dividends</span>
              </div>
              <p className="text-2xl font-bold text-white">
                PKR {totalDividends.toLocaleString()}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-slate-400 text-sm">Total Return</span>
              </div>
              <p className="text-2xl font-bold text-emerald-400">
                PKR {totalReturn.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Percent className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-sm">{returnPercentage.toFixed(1)}% ROI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="py-12">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="flex w-full max-w-lg h-auto p-1 bg-slate-800/50 border border-slate-700 rounded-xl gap-1">
              <TabsTrigger 
                value="holdings" 
                className="flex-1 rounded-lg text-slate-400 data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900 data-[state=active]:font-semibold py-3"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Holdings
              </TabsTrigger>
              <TabsTrigger 
                value="dividends" 
                className="flex-1 rounded-lg text-slate-400 data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900 data-[state=active]:font-semibold py-3"
              >
                <Banknote className="w-4 h-4 mr-2" />
                Dividends
              </TabsTrigger>
              <TabsTrigger 
                value="votes" 
                className="flex-1 rounded-lg text-slate-400 data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900 data-[state=active]:font-semibold py-3"
              >
                <Vote className="w-4 h-4 mr-2" />
                Voting
              </TabsTrigger>
            </TabsList>

            {/* Holdings Tab */}
            <TabsContent value="holdings" className="space-y-6">
              {investmentsLoading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-slate-400">Loading holdings...</p>
                </div>
              ) : investmentsList.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-6">
                    <Building2 className="w-10 h-10 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Investments Yet</h3>
                  <p className="text-slate-400 mb-6 max-w-md mx-auto">
                    Start building your property portfolio today. Invest in premium properties with as little as PKR 50,000.
                  </p>
                  <Link href="/properties">
                    <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold">
                      <Sparkles className="mr-2 w-4 h-4" />
                      Browse Properties
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6">
                  {investmentsList.map((investment) => (
                    <div 
                      key={investment.id}
                      className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                        {/* Property Image */}
                        <div className="w-full lg:w-48 h-32 rounded-xl overflow-hidden bg-slate-700/50 flex-shrink-0">
                          <img 
                            src="/hero-bg.png" 
                            alt="Property"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Property Info */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {investment.status || 'Active'}
                            </Badge>
                            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                              {investment.sharesOwned} Shares
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            Property #{investment.propertyId}
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-slate-400">Invested</p>
                              <p className="text-white font-semibold">PKR {Number(investment.totalInvested || 0).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Avg. Buy Price</p>
                              <p className="text-white font-semibold">PKR {Number(investment.averageBuyPrice || 0).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Current Value</p>
                              <p className="text-emerald-400 font-semibold">PKR {Number(investment.currentValue || investment.totalInvested || 0).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Date</p>
                              <p className="text-white font-semibold">
                                {new Date(investment.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-row lg:flex-col gap-2">
                          <Link href={`/property/${investment.propertyId}`}>
                            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700 w-full">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                          </Link>
                          <Link href="/marketplace">
                            <Button variant="outline" size="sm" className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10 w-full">
                              <TrendingUp className="w-4 h-4 mr-2" />
                              Sell
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Dividends Tab */}
            <TabsContent value="dividends" className="space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 overflow-hidden">
                <div className="p-6 border-b border-slate-700/50">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-amber-400" />
                    Dividend History
                  </h3>
                </div>
                {dividendTransactions.length > 0 ? (
                  <div className="divide-y divide-slate-700/30">
                    {dividendTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-slate-800/30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Dividend Payment</p>
                            <p className="text-sm text-slate-400">
                              Property #{tx.propertyId} • {new Date(tx.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-emerald-400 font-bold">+PKR {Number(tx.amount).toLocaleString()}</p>
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                            Completed
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Banknote className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">
                      No dividend payments yet. Dividends are distributed monthly based on rental income.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Voting Tab */}
            <TabsContent value="votes" className="space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 overflow-hidden">
                <div className="p-6 border-b border-slate-700/50">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Vote className="w-5 h-5 text-amber-400" />
                    Active Votes
                  </h3>
                </div>
                <div className="text-center py-12">
                  <Vote className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">
                    No active votes at the moment. You'll be notified when property decisions require your vote.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
