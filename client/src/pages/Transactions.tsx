import { useState } from "react";
import ClientLayout from "@/components/ClientLayout";
import { trpc } from "@/lib/trpc";
import { 
  ArrowUpRight, ArrowDownLeft, Filter, Search, Download,
  Calendar, CreditCard, Building2, TrendingUp, Clock
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Transactions() {
  const [filter, setFilter] = useState<"all" | "deposit" | "withdrawal" | "investment" | "dividend">("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Wallet data would come from backend

  // Mock transaction data - in production this would come from the backend
  const transactions = [
    {
      id: 1,
      type: "deposit",
      amount: 100000,
      status: "completed",
      date: "2024-12-28",
      description: "Bank Transfer Deposit",
      reference: "DEP-2024-001",
    },
    {
      id: 2,
      type: "investment",
      amount: -50000,
      status: "completed",
      date: "2024-12-27",
      description: "Investment in DHA Phase 6 Villa",
      reference: "INV-2024-001",
      propertyName: "DHA Phase 6 Villa",
    },
    {
      id: 3,
      type: "dividend",
      amount: 2500,
      status: "completed",
      date: "2024-12-25",
      description: "Q4 2024 Rental Distribution",
      reference: "DIV-2024-001",
      propertyName: "Bahria Town Commercial",
    },
    {
      id: 4,
      type: "withdrawal",
      amount: -25000,
      status: "pending",
      date: "2024-12-24",
      description: "Bank Withdrawal Request",
      reference: "WTH-2024-001",
    },
    {
      id: 5,
      type: "investment",
      amount: -75000,
      status: "completed",
      date: "2024-12-20",
      description: "Investment in Clifton Apartment",
      reference: "INV-2024-002",
      propertyName: "Clifton Block 5 Apartment",
    },
  ];

  const filteredTransactions = transactions.filter(tx => {
    if (filter !== "all" && tx.type !== filter) return false;
    if (searchQuery && !tx.description.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !tx.reference.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="w-4 h-4 text-green-600" />;
      case "withdrawal":
        return <ArrowUpRight className="w-4 h-4 text-red-600" />;
      case "investment":
        return <Building2 className="w-4 h-4 text-purple-600" />;
      case "dividend":
        return <TrendingUp className="w-4 h-4 text-blue-600" />;
      default:
        return <CreditCard className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const styles: Record<string, string> = {
      deposit: "bg-green-100 text-green-700",
      withdrawal: "bg-red-100 text-red-700",
      investment: "bg-purple-100 text-purple-700",
      dividend: "bg-blue-100 text-blue-700",
    };
    return styles[type] || "bg-gray-100 text-gray-700";
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      completed: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      failed: "bg-red-100 text-red-700",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  const formatAmount = (amount: number) => {
    const absAmount = Math.abs(amount);
    const formatted = new Intl.NumberFormat("en-PK").format(absAmount);
    return amount >= 0 ? `+PKR ${formatted}` : `-PKR ${formatted}`;
  };

  // Calculate summary stats
  const totalDeposits = transactions.filter(t => t.type === "deposit").reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawals = Math.abs(transactions.filter(t => t.type === "withdrawal").reduce((sum, t) => sum + t.amount, 0));
  const totalInvestments = Math.abs(transactions.filter(t => t.type === "investment").reduce((sum, t) => sum + t.amount, 0));
  const totalDividends = transactions.filter(t => t.type === "dividend").reduce((sum, t) => sum + t.amount, 0);

  return (
    <ClientLayout title="Transactions">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
            <p className="text-gray-600">View and manage all your financial transactions</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <ArrowDownLeft className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Total Deposits</span>
            </div>
            <p className="text-xl font-bold text-gray-900">PKR {new Intl.NumberFormat("en-PK").format(totalDeposits)}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-red-600" />
              </div>
              <span className="text-sm text-gray-600">Total Withdrawals</span>
            </div>
            <p className="text-xl font-bold text-gray-900">PKR {new Intl.NumberFormat("en-PK").format(totalWithdrawals)}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">Total Invested</span>
            </div>
            <p className="text-xl font-bold text-gray-900">PKR {new Intl.NumberFormat("en-PK").format(totalInvestments)}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Total Dividends</span>
            </div>
            <p className="text-xl font-bold text-gray-900">PKR {new Intl.NumberFormat("en-PK").format(totalDividends)}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions..."
                className="pl-10"
              />
            </div>
            
            {/* Type Filter */}
            <div className="flex gap-2">
              {[
                { value: "all", label: "All" },
                { value: "deposit", label: "Deposits" },
                { value: "withdrawal", label: "Withdrawals" },
                { value: "investment", label: "Investments" },
                { value: "dividend", label: "Dividends" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value as typeof filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === option.value
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          {getTypeIcon(tx.type)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{tx.description}</p>
                          <p className="text-sm text-gray-500">{tx.reference}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getTypeBadge(tx.type)}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(tx.date).toLocaleDateString("en-PK", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(tx.status)}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-semibold ${tx.amount >= 0 ? "text-green-600" : "text-gray-900"}`}>
                        {formatAmount(tx.amount)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No transactions found</p>
              <p className="text-sm text-gray-400">Try adjusting your filters</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
