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
  Vote,
  ArrowRight
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container py-24">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto">
              <Building2 className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Your Investment Portfolio</h1>
            <p className="text-gray-600 text-lg">
              Track all your property investments, monitor returns, and manage your fractional ownership shares.
            </p>
            <div className="flex justify-center gap-4">
              <a href={getLoginUrl()}>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-xl">
                  Sign In to View Portfolio
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-purple-50 to-white">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/dashboard" className="hover:text-purple-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Portfolio</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {language === "ur" ? "میرا پورٹ فولیو" : "My Portfolio"}
              </h1>
              <p className="text-gray-600">
                {language === "ur" 
                  ? "اپنی سرمایہ کاری اور منافع کا جائزہ لیں"
                  : "Track your investments and returns"}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl">
                <Download className="mr-2 w-4 h-4" />
                Tax Statement
              </Button>
              <Link href="/properties">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                  <Sparkles className="mr-2 w-4 h-4" />
                  {language === "ur" ? "مزید سرمایہ کاری" : "Invest More"}
                </Button>
              </Link>
            </div>
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-gray-600 text-sm">Total Invested</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                PKR {totalInvested.toLocaleString()}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-600 text-sm">Current Value</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                PKR {currentValue.toLocaleString()}
              </p>
              {currentValue > totalInvested && (
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 text-sm">
                    +{((currentValue - totalInvested) / totalInvested * 100).toFixed(1)}%
                  </span>
                </div>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-600 text-sm">Total Dividends</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                PKR {totalDividends.toLocaleString()}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-green-50 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-200 flex items-center justify-center">
                  <Target className="w-5 h-5 text-green-700" />
                </div>
                <span className="text-gray-600 text-sm">Total Return</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                PKR {totalReturn.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Percent className="w-4 h-4 text-green-600" />
                <span className="text-green-600 text-sm">{returnPercentage.toFixed(1)}% ROI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="py-12">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="flex w-full max-w-lg h-auto p-1 bg-gray-100 border border-gray-200 rounded-xl gap-1">
              <TabsTrigger 
                value="holdings" 
                className="flex-1 rounded-lg text-gray-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:font-semibold py-3"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Holdings
              </TabsTrigger>
              <TabsTrigger 
                value="dividends" 
                className="flex-1 rounded-lg text-gray-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:font-semibold py-3"
              >
                <Banknote className="w-4 h-4 mr-2" />
                Dividends
              </TabsTrigger>
              <TabsTrigger 
                value="votes" 
                className="flex-1 rounded-lg text-gray-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:font-semibold py-3"
              >
                <Vote className="w-4 h-4 mr-2" />
                Voting
              </TabsTrigger>
            </TabsList>

            {/* Holdings Tab */}
            <TabsContent value="holdings" className="space-y-6">
              {investmentsLoading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Loading holdings...</p>
                </div>
              ) : investmentsList.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                    <Building2 className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Investments Yet</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Start building your property portfolio today. Invest in premium properties with as little as PKR 50,000.
                  </p>
                  <Link href="/properties">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
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
                      className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                        {/* Property Image */}
                        <div className="w-full lg:w-48 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <img 
                            src="/hero-bg.png" 
                            alt="Property"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Property Info */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {investment.status || 'Active'}
                            </Badge>
                            <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                              {investment.sharesOwned} Shares
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Property #{investment.propertyId}
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Invested</p>
                              <p className="text-gray-900 font-semibold">PKR {Number(investment.totalInvested || 0).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Avg. Buy Price</p>
                              <p className="text-gray-900 font-semibold">PKR {Number(investment.averageBuyPrice || 0).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Current Value</p>
                              <p className="text-green-600 font-semibold">PKR {Number(investment.currentValue || investment.totalInvested || 0).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Date</p>
                              <p className="text-gray-900 font-semibold">
                                {new Date(investment.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-row lg:flex-col gap-2">
                          <Link href={`/property/${investment.propertyId}`}>
                            <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-100 w-full rounded-lg">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                          </Link>
                          <Link href="/marketplace">
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white w-full rounded-lg">
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
              <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-purple-600" />
                    Dividend History
                  </h3>
                </div>
                {dividendTransactions.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {dividendTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-gray-900 font-medium">Dividend Payment</p>
                            <p className="text-gray-500 text-sm">
                              {new Date(tx.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-green-600 font-bold">
                          +PKR {Number(tx.amount).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <Banknote className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600">No dividend payments yet</p>
                    <p className="text-gray-500 text-sm mt-1">Dividends are distributed quarterly</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Voting Tab */}
            <TabsContent value="votes" className="space-y-6">
              <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Vote className="w-5 h-5 text-purple-600" />
                    Active Proposals
                  </h3>
                </div>
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Vote className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600">No active proposals</p>
                  <p className="text-gray-500 text-sm mt-1">You'll be notified when there's a vote</p>
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
