import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { 
  Building2, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Vote,
  Banknote
} from "lucide-react";

export default function Portfolio() {
  const { user, isAuthenticated, loading } = useAuth();
  const { t } = useLanguage();

  const { data: investments } = trpc.investments.myInvestments.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: transactions } = trpc.transactions.myTransactions.useQuery(undefined, {
    enabled: isAuthenticated,
  });

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

  // Calculate stats
  const totalInvested = investments?.reduce((sum, inv) => sum + Number(inv.totalInvested), 0) || 0;
  const currentValue = investments?.reduce((sum, inv) => sum + Number(inv.currentValue), 0) || 0;
  const totalReturns = currentValue - totalInvested;
  const totalShares = investments?.reduce((sum, inv) => sum + inv.sharesOwned, 0) || 0;

  // Filter dividend transactions
  const dividendTransactions = transactions?.filter(tx => tx.transactionType === "dividend") || [];
  const totalDividends = dividendTransactions.reduce((sum, tx) => sum + Number(tx.amount), 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{t("nav.portfolio")}</h1>
              <p className="text-muted-foreground">
                Track your property investments and returns
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Tax Statement
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">Total Invested</p>
                <p className="text-2xl font-bold">PKR {totalInvested.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">Current Value</p>
                <p className="text-2xl font-bold">PKR {currentValue.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">Total Returns</p>
                <p className={`text-2xl font-bold ${totalReturns >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {totalReturns >= 0 ? "+" : ""}PKR {totalReturns.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">Total Dividends</p>
                <p className="text-2xl font-bold text-primary">PKR {totalDividends.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="properties" className="w-full">
            <TabsList>
              <TabsTrigger value="properties">My Properties</TabsTrigger>
              <TabsTrigger value="dividends">Dividend History</TabsTrigger>
              <TabsTrigger value="votes">Voting</TabsTrigger>
            </TabsList>
            
            {/* Properties Tab */}
            <TabsContent value="properties" className="mt-6">
              {investments && investments.length > 0 ? (
                <div className="space-y-4">
                  {investments.map((investment) => (
                    <Card key={investment.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center shrink-0">
                            <Building2 className="w-10 h-10 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">Property #{investment.propertyId}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Invested on {new Date(investment.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <Badge variant={investment.status === "active" ? "default" : "secondary"}>
                                {investment.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                              <div>
                                <p className="text-xs text-muted-foreground">Shares Owned</p>
                                <p className="font-semibold">{investment.sharesOwned}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Avg. Buy Price</p>
                                <p className="font-semibold">PKR {Number(investment.averageBuyPrice).toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Total Invested</p>
                                <p className="font-semibold">PKR {Number(investment.totalInvested).toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Current Value</p>
                                <p className="font-semibold text-primary">PKR {Number(investment.currentValue).toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/properties/${investment.propertyId}`}>
                                View Property
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href="/marketplace">
                                Sell Shares
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No Properties Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start building your property portfolio today
                  </p>
                  <Button asChild>
                    <Link href="/properties">Browse Properties</Link>
                  </Button>
                </Card>
              )}
            </TabsContent>
            
            {/* Dividends Tab */}
            <TabsContent value="dividends" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dividend History</CardTitle>
                </CardHeader>
                <CardContent>
                  {dividendTransactions.length > 0 ? (
                    <div className="space-y-3">
                      {dividendTransactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between py-3 border-b last:border-0">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <Banknote className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">Dividend Payment</p>
                              <p className="text-sm text-muted-foreground">
                                Property #{tx.propertyId} • {new Date(tx.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">+PKR {Number(tx.amount).toLocaleString()}</p>
                            <Badge variant="default" className="text-xs">Completed</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No dividend payments yet. Dividends are distributed monthly based on rental income.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Voting Tab */}
            <TabsContent value="votes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Votes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    No active votes at the moment. You'll be notified when property decisions require your vote.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
