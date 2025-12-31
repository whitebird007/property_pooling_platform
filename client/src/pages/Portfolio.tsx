import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientLayout from "@/components/ClientLayout";
import { trpc } from "@/lib/trpc";
import { 
  Building2, 
  TrendingUp, 
  ArrowUpRight,
  Download,
  Eye,
  BarChart3,
  DollarSign,
  Banknote
} from "lucide-react";

export default function Portfolio() {
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
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

  return (
    <ClientLayout 
      title={language === "ur" ? "میرا پورٹ فولیو" : "My Portfolio"} 
      description="View and manage your property investments"
      actions={
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      }
    >
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
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">PKR {currentValue.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Total Returns</span>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${totalReturn >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <ArrowUpRight className={`w-5 h-5 ${totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </div>
            <p className={`text-2xl font-bold ${totalReturn >= 0 ? "text-green-600" : "text-red-600"}`}>
              {totalReturn >= 0 ? "+" : ""}PKR {totalReturn.toLocaleString()}
            </p>
            <p className={`text-sm ${totalReturn >= 0 ? "text-green-600" : "text-red-600"}`}>
              {returnPercentage >= 0 ? "+" : ""}{returnPercentage.toFixed(2)}%
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Total Shares</span>
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalShares.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-100 p-1 mb-6">
          <TabsTrigger value="holdings" className="data-[state=active]:bg-white">
            <Building2 className="w-4 h-4 mr-2" />
            Holdings
          </TabsTrigger>
          <TabsTrigger value="dividends" className="data-[state=active]:bg-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            Dividends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="holdings">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Property Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              {investmentsLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="text-gray-500">Loading investments...</p>
                </div>
              ) : investmentsList.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Property</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Shares</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Invested</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Current Value</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {investmentsList.map((investment) => (
                        <tr key={investment.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-purple-600" />
                              </div>
                              <span className="font-medium text-gray-900">Property #{investment.propertyId}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-600">{investment.sharesOwned}</td>
                          <td className="py-4 px-4 text-gray-900">PKR {Number(investment.totalInvested).toLocaleString()}</td>
                          <td className="py-4 px-4 font-medium text-gray-900">PKR {Number(investment.currentValue).toLocaleString()}</td>
                          <td className="py-4 px-4">
                            <Badge className={investment.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                              {investment.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/properties/${investment.propertyId}`}>
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
        </TabsContent>

        <TabsContent value="dividends">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Dividend History</CardTitle>
            </CardHeader>
            <CardContent>
              {dividendTransactions.length > 0 ? (
                <div className="space-y-4">
                  {dividendTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Dividend Payment</p>
                          <p className="text-sm text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className="font-bold text-green-600">+PKR {Number(tx.amount).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">No Dividends Yet</h3>
                  <p className="text-gray-500">Dividends will appear here once distributed</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ClientLayout>
  );
}
