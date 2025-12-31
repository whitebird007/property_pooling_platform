import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Smartphone,
  Copy,
  CheckCircle,
  ChevronRight,
  Shield,
  Clock,
  Plus,
  Minus,
  ArrowRight
} from "lucide-react";

export default function Wallet() {
  const { user, isAuthenticated, loading } = useAuth();
  const { language, t } = useLanguage();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading wallet...</p>
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
              <WalletIcon className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Your Digital Wallet</h1>
            <p className="text-gray-600 text-lg">
              Manage your funds securely. Deposit, withdraw, and track all your transactions in one place.
            </p>
            <a href={getLoginUrl()}>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-xl">
                Sign In to Access Wallet
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const walletBalance = Number(kycData?.profile?.walletBalance || 0);

  const handleDeposit = () => {
    if (!depositAmount || Number(depositAmount) < 10000) {
      toast.error("Minimum deposit is PKR 10,000");
      return;
    }
    depositMutation.mutate({ amount: depositAmount, paymentMethod: "bank_transfer" });
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || Number(withdrawAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (Number(withdrawAmount) > walletBalance) {
      toast.error("Insufficient balance");
      return;
    }
    if (!withdrawAccount) {
      toast.error("Please enter your bank account details");
      return;
    }
    withdrawMutation.mutate({ amount: withdrawAmount });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const bankDetails = {
    bankName: "Meezan Bank",
    accountTitle: "PropertyPool Pvt Ltd",
    accountNumber: "0123456789012",
    iban: "PK36MEZN0001230456789012",
  };

  const walletTransactions = transactions?.filter(t => 
    t.transactionType === 'deposit' || t.transactionType === 'withdrawal'
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-purple-50 to-white">
        <div className="container max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/dashboard" className="hover:text-purple-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Wallet</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {language === "ur" ? "میرا والیٹ" : "My Wallet"}
            </h1>
            <p className="text-gray-600">
              {language === "ur" 
                ? "اپنے فنڈز کا انتظام کریں"
                : "Manage your funds for property investments"}
            </p>
          </div>

          {/* Wallet Balance Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm mb-1">Available Balance</p>
                <p className="text-4xl font-bold">
                  PKR {walletBalance.toLocaleString()}
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <WalletIcon className="w-8 h-8" />
              </div>
            </div>
          </div>

          {/* Deposit / Withdraw Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="flex w-full h-auto p-1 bg-gray-100 border border-gray-200 rounded-xl gap-1">
              <TabsTrigger 
                value="deposit" 
                className="flex-1 rounded-lg text-gray-600 data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:font-semibold py-3"
              >
                <ArrowDownRight className="w-4 h-4 mr-2" />
                Deposit
              </TabsTrigger>
              <TabsTrigger 
                value="withdraw" 
                className="flex-1 rounded-lg text-gray-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:font-semibold py-3"
              >
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Withdraw
              </TabsTrigger>
            </TabsList>
            
            {/* Deposit Tab */}
            <TabsContent value="deposit" className="mt-6">
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-green-500" />
                  Add Funds to Your Wallet
                </h3>

                <div className="space-y-6">
                  {/* Amount Input */}
                  <div>
                    <Label className="text-gray-700">Amount (PKR)</Label>
                    <Input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="Minimum PKR 10,000"
                      className="bg-white border-gray-200 text-gray-900 mt-2"
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {[10000, 50000, 100000, 500000].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          size="sm"
                          onClick={() => setDepositAmount(String(amount))}
                          className="border-gray-200 text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"
                        >
                          {(amount / 1000)}K
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-purple-600" />
                      Bank Transfer Details
                    </h4>
                    <div className="grid gap-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Bank Name:</span>
                        <span className="text-gray-900 font-medium">{bankDetails.bankName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Account Title:</span>
                        <span className="text-gray-900 font-medium">{bankDetails.accountTitle}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Account Number:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900 font-medium">{bankDetails.accountNumber}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(bankDetails.accountNumber)}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-purple-600"
                          >
                            {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">IBAN:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900 font-medium text-xs">{bankDetails.iban}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(bankDetails.iban)}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-purple-600"
                          >
                            {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                    <p className="text-purple-900 font-medium mb-2">Instructions:</p>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-purple-700">
                      <li>Transfer the amount to our bank account</li>
                      <li>Use your registered email as reference</li>
                      <li>Click "Confirm Deposit" after transfer</li>
                      <li>Funds will be credited within 24 hours</li>
                    </ol>
                  </div>

                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-6" 
                    onClick={handleDeposit}
                    disabled={depositMutation.isPending}
                  >
                    {depositMutation.isPending ? "Processing..." : "Confirm Deposit"}
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Withdraw Tab */}
            <TabsContent value="withdraw" className="mt-6">
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Minus className="w-5 h-5 text-purple-600" />
                  Withdraw Funds
                </h3>

                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <p className="text-gray-500 text-sm">Available Balance</p>
                    <p className="text-2xl font-bold text-gray-900">PKR {walletBalance.toLocaleString()}</p>
                  </div>

                  <div>
                    <Label className="text-gray-700">Amount (PKR)</Label>
                    <Input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Enter amount"
                      max={walletBalance}
                      className="bg-white border-gray-200 text-gray-900 mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700">Bank Account (IBAN)</Label>
                    <Input
                      value={withdrawAccount}
                      onChange={(e) => setWithdrawAccount(e.target.value)}
                      placeholder="PK00XXXX0000000000000000"
                      className="bg-white border-gray-200 text-gray-900 mt-2"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-700">
                        <strong className="text-amber-900">Note:</strong> Withdrawals are processed within 2-3 business days. 
                        A processing fee of PKR 50 will be deducted.
                      </p>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6" 
                    onClick={handleWithdraw}
                    disabled={withdrawMutation.isPending || walletBalance <= 0}
                  >
                    {withdrawMutation.isPending ? "Processing..." : "Request Withdrawal"}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Transaction History */}
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                Transaction History
              </h3>
            </div>
            {walletTransactions.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {walletTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        tx.transactionType === 'deposit' ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        {tx.transactionType === 'deposit' ? (
                          <ArrowDownRight className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-purple-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 capitalize">{tx.transactionType}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(tx.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        tx.transactionType === 'deposit' ? 'text-green-600' : 'text-purple-600'
                      }`}>
                        {tx.transactionType === 'deposit' ? '+' : '-'}PKR {Number(tx.amount).toLocaleString()}
                      </p>
                      <Badge className={`text-xs ${
                        tx.status === 'completed' ? 'bg-green-100 text-green-700' :
                        tx.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600">No transactions yet</p>
                <p className="text-gray-500 text-sm mt-1">Make your first deposit to get started</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
