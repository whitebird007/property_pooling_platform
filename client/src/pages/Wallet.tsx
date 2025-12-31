import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientLayout from "@/components/ClientLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownRight,
  Smartphone,
  Copy,
  CheckCircle,
  Shield,
  Clock,
  Plus,
  Minus
} from "lucide-react";

export default function Wallet() {
  const { isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAccount, setWithdrawAccount] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("deposit");

  const { data: kycData } = trpc.kyc.getProfile.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: transactions, refetch: refetchTx } = trpc.transactions.myTransactions.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const depositMutation = trpc.transactions.deposit.useMutation({
    onSuccess: () => {
      toast.success("Deposit initiated! Please complete the bank transfer.");
      setDepositAmount("");
      refetchTx();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const withdrawMutation = trpc.transactions.withdraw.useMutation({
    onSuccess: () => {
      toast.success("Withdrawal request submitted!");
      setWithdrawAmount("");
      setWithdrawAccount("");
      refetchTx();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const walletBalance = Number(kycData?.profile?.walletBalance || 0);
  const recentTransactions = transactions?.filter(t => 
    t.transactionType === "deposit" || t.transactionType === "withdrawal"
  ).slice(0, 10) || [];

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount < 1000) {
      toast.error("Minimum deposit is PKR 1,000");
      return;
    }
    depositMutation.mutate({ amount: depositAmount, paymentMethod: "bank_transfer" });
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount < 1000) {
      toast.error("Minimum withdrawal is PKR 1,000");
      return;
    }
    if (amount > walletBalance) {
      toast.error("Insufficient balance");
      return;
    }
    if (!withdrawAccount) {
      toast.error("Please enter account details");
      return;
    }
    withdrawMutation.mutate({ amount: withdrawAmount });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard!");
  };

  return (
    <ClientLayout 
      title={language === "ur" ? "والیٹ" : "Wallet"} 
      description="Manage your funds and transactions"
    >
      {/* Balance Card */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-500 to-purple-600 text-white mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Available Balance</p>
              <p className="text-4xl font-bold">PKR {walletBalance.toLocaleString()}</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <WalletIcon className="w-8 h-8" />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button 
              variant="secondary" 
              className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0"
              onClick={() => setActiveTab("deposit")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Funds
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0"
              onClick={() => setActiveTab("withdraw")}
            >
              <Minus className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Deposit/Withdraw Tabs */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-gray-100 p-1 mb-6">
              <TabsTrigger value="deposit" className="data-[state=active]:bg-white">
                <Plus className="w-4 h-4 mr-2" />
                Deposit
              </TabsTrigger>
              <TabsTrigger value="withdraw" className="data-[state=active]:bg-white">
                <Minus className="w-4 h-4 mr-2" />
                Withdraw
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deposit">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Add Funds</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Amount (PKR)</Label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">Minimum deposit: PKR 1,000</p>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {[10000, 25000, 50000, 100000].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setDepositAmount(amount.toString())}
                      >
                        PKR {amount.toLocaleString()}
                      </Button>
                    ))}
                  </div>

                  {/* Bank Details */}
                  <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                    <h4 className="font-medium text-gray-900">Bank Transfer Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Bank Name</span>
                        <span className="font-medium">Meezan Bank</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Account Number</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">0123456789012</span>
                          <button onClick={() => copyToClipboard("0123456789012")}>
                            {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Account Title</span>
                        <span className="font-medium">PropertyPool Pakistan</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Or Pay Via</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors flex items-center gap-3">
                        <Smartphone className="w-6 h-6 text-green-600" />
                        <span className="font-medium">JazzCash</span>
                      </button>
                      <button className="p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors flex items-center gap-3">
                        <Smartphone className="w-6 h-6 text-blue-600" />
                        <span className="font-medium">Easypaisa</span>
                      </button>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={handleDeposit}
                    disabled={depositMutation.isPending}
                  >
                    {depositMutation.isPending ? "Processing..." : "Initiate Deposit"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="withdraw">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Withdraw Funds</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Amount (PKR)</Label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">Available: PKR {walletBalance.toLocaleString()}</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Bank Account / Mobile Wallet</Label>
                    <Input
                      placeholder="Enter account number or mobile wallet"
                      value={withdrawAccount}
                      onChange={(e) => setWithdrawAccount(e.target.value)}
                    />
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-800">Processing Time</p>
                        <p className="text-sm text-amber-700">Withdrawals are processed within 1-3 business days</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={handleWithdraw}
                    disabled={withdrawMutation.isPending}
                  >
                    {withdrawMutation.isPending ? "Processing..." : "Request Withdrawal"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Transaction History */}
        <div>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {recentTransactions.length > 0 ? (
                <div className="space-y-3">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          tx.transactionType === "deposit" ? "bg-green-100" : "bg-red-100"
                        }`}>
                          {tx.transactionType === "deposit" ? (
                            <ArrowUpRight className="w-5 h-5 text-green-600" />
                          ) : (
                            <ArrowDownRight className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 capitalize">{tx.transactionType}</p>
                          <p className="text-xs text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${tx.transactionType === "deposit" ? "text-green-600" : "text-red-600"}`}>
                          {tx.transactionType === "deposit" ? "+" : "-"}PKR {Number(tx.amount).toLocaleString()}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <WalletIcon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No transactions yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Note */}
          <Card className="border-0 shadow-sm mt-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Secure Transactions</p>
                  <p className="text-sm text-gray-500">All transactions are encrypted and protected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientLayout>
  );
}
