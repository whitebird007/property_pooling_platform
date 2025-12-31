import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/AdminLayout";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  CreditCard,
  Building2,
  RefreshCw
} from "lucide-react";

export default function AdminTransactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock transaction data
  const transactions = [
    { id: "TXN001", type: "deposit", user: "Ahmed Khan", amount: 500000, method: "Bank Transfer", status: "completed", date: "2024-01-15 10:30" },
    { id: "TXN002", type: "withdrawal", user: "Sara Malik", amount: 250000, method: "JazzCash", status: "pending", date: "2024-01-15 09:15" },
    { id: "TXN003", type: "investment", user: "Usman Ali", amount: 1000000, method: "Wallet", status: "completed", date: "2024-01-14 16:45" },
    { id: "TXN004", type: "dividend", user: "Fatima Hassan", amount: 45000, method: "Auto", status: "completed", date: "2024-01-14 12:00" },
    { id: "TXN005", type: "deposit", user: "Ali Raza", amount: 750000, method: "Easypaisa", status: "failed", date: "2024-01-13 14:20" },
    { id: "TXN006", type: "withdrawal", user: "Ayesha Khan", amount: 100000, method: "Bank Transfer", status: "processing", date: "2024-01-13 11:30" },
  ];

  const stats = {
    totalDeposits: 12500000,
    totalWithdrawals: 3200000,
    pendingWithdrawals: 850000,
    todayVolume: 2100000,
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit": return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case "withdrawal": return <ArrowDownRight className="w-4 h-4 text-red-600" />;
      case "investment": return <Building2 className="w-4 h-4 text-purple-600" />;
      case "dividend": return <DollarSign className="w-4 h-4 text-blue-600" />;
      default: return <CreditCard className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed": return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" /> Completed</Badge>;
      case "pending": return <Badge className="bg-amber-100 text-amber-700"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "processing": return <Badge className="bg-blue-100 text-blue-700"><RefreshCw className="w-3 h-3 mr-1" /> Processing</Badge>;
      case "failed": return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 mr-1" /> Failed</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    if (activeTab !== "all" && tx.type !== activeTab) return false;
    if (searchTerm && !tx.user.toLowerCase().includes(searchTerm.toLowerCase()) && !tx.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <AdminLayout 
      title="Transactions" 
      description="Manage deposits, withdrawals, and payments"
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">PKR {(stats.totalDeposits / 1000000).toFixed(1)}M</p>
            <p className="text-green-100 text-sm">Total Deposits</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <ArrowDownRight className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">PKR {(stats.totalWithdrawals / 1000000).toFixed(1)}M</p>
            <p className="text-red-100 text-sm">Total Withdrawals</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">PKR {(stats.pendingWithdrawals / 1000).toFixed(0)}K</p>
            <p className="text-amber-100 text-sm">Pending Withdrawals</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Wallet className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">PKR {(stats.todayVolume / 1000000).toFixed(1)}M</p>
            <p className="text-purple-100 text-sm">Today's Volume</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-gray-100">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deposit">Deposits</TabsTrigger>
                <TabsTrigger value="withdrawal">Withdrawals</TabsTrigger>
                <TabsTrigger value="investment">Investments</TabsTrigger>
                <TabsTrigger value="dividend">Dividends</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Method</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-4 px-4 font-mono text-sm">{tx.id}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          tx.type === "deposit" ? "bg-green-100" :
                          tx.type === "withdrawal" ? "bg-red-100" :
                          tx.type === "investment" ? "bg-purple-100" : "bg-blue-100"
                        }`}>
                          {getTypeIcon(tx.type)}
                        </div>
                        <span className="capitalize">{tx.type}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">{tx.user}</td>
                    <td className="py-4 px-4">
                      <span className={`font-medium ${
                        tx.type === "deposit" || tx.type === "dividend" ? "text-green-600" : 
                        tx.type === "withdrawal" ? "text-red-600" : "text-gray-900"
                      }`}>
                        {tx.type === "deposit" || tx.type === "dividend" ? "+" : tx.type === "withdrawal" ? "-" : ""}
                        PKR {tx.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{tx.method}</td>
                    <td className="py-4 px-4">{getStatusBadge(tx.status)}</td>
                    <td className="py-4 px-4 text-gray-500 text-sm">{tx.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-1">
                        {tx.status === "pending" && (
                          <>
                            <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50">
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <Wallet className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No transactions found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
