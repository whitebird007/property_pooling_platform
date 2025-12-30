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
  Minus
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

  if (!loading && !isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading wallet...</p>
        </div>
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

        <div className="container relative z-10 max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/dashboard" className="hover:text-amber-400 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Wallet</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {language === "ur" ? "میرا والیٹ" : "My Wallet"}
            </h1>
            <p className="text-slate-400">
              {language === "ur" 
                ? "اپنے فنڈز کا انتظام کریں"
                : "Manage your funds for property investments"}
            </p>
          </div>

          {/* Wallet Balance Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-800/80 to-emerald-500/20 border border-amber-500/30 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Available Balance</p>
                <p className="text-4xl font-bold text-white">
                  PKR {walletBalance.toLocaleString()}
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
                <WalletIcon className="w-8 h-8 text-slate-900" />
              </div>
            </div>
          </div>

          {/* Deposit / Withdraw Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="flex w-full h-auto p-1 bg-slate-800/50 border border-slate-700 rounded-xl gap-1">
              <TabsTrigger 
                value="deposit" 
                className="flex-1 rounded-lg text-slate-400 data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:font-semibold py-3"
              >
                <ArrowDownRight className="w-4 h-4 mr-2" />
                Deposit
              </TabsTrigger>
              <TabsTrigger 
                value="withdraw" 
                className="flex-1 rounded-lg text-slate-400 data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900 data-[state=active]:font-semibold py-3"
              >
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Withdraw
              </TabsTrigger>
            </TabsList>
            
            {/* Deposit Tab */}
            <TabsContent value="deposit" className="mt-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-emerald-400" />
                  Add Funds to Your Wallet
                </h3>

                <div className="space-y-6">
                  {/* Amount Input */}
                  <div>
                    <Label className="text-slate-300">Amount (PKR)</Label>
                    <Input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="Minimum PKR 10,000"
                      className="bg-slate-800/50 border-slate-600 text-white mt-2"
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {[10000, 50000, 100000, 500000].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          size="sm"
                          onClick={() => setDepositAmount(String(amount))}
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                        >
                          {(amount / 1000)}K
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="p-4 rounded-xl bg-slate-700/30 border border-slate-600/50 space-y-3">
                    <h4 className="font-semibold text-white flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-amber-400" />
                      Bank Transfer Details
                    </h4>
                    <div className="grid gap-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Bank Name:</span>
                        <span className="text-white font-medium">{bankDetails.bankName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Account Title:</span>
                        <span className="text-white font-medium">{bankDetails.accountTitle}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Account Number:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{bankDetails.accountNumber}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(bankDetails.accountNumber)}
                            className="h-8 w-8 p-0 text-slate-400 hover:text-amber-400"
                          >
                            {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">IBAN:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium text-xs">{bankDetails.iban}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(bankDetails.iban)}
                            className="h-8 w-8 p-0 text-slate-400 hover:text-amber-400"
                          >
                            {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <p className="text-white font-medium mb-2">Instructions:</p>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-slate-300">
                      <li>Transfer the amount to our bank account</li>
                      <li>Use your registered email as reference</li>
                      <li>Click "Confirm Deposit" after transfer</li>
                      <li>Funds will be credited within 24 hours</li>
                    </ol>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-6" 
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
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Minus className="w-5 h-5 text-amber-400" />
                  Withdraw Funds
                </h3>

                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-slate-700/30 border border-slate-600/50">
                    <p className="text-slate-400 text-sm">Available Balance</p>
                    <p className="text-2xl font-bold text-white">PKR {walletBalance.toLocaleString()}</p>
                  </div>

                  <div>
                    <Label className="text-slate-300">Amount (PKR)</Label>
                    <Input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Enter amount"
                      max={walletBalance}
                      className="bg-slate-800/50 border-slate-600 text-white mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300">Bank Account (IBAN)</Label>
                    <Input
                      value={withdrawAccount}
                      onChange={(e) => setWithdrawAccount(e.target.value)}
                      placeholder="PK00XXXX0000000000000000"
                      className="bg-slate-800/50 border-slate-600 text-white mt-2"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-300">
                        <strong className="text-white">Note:</strong> Withdrawals are processed within 2-3 business days. 
                        A processing fee of PKR 50 will be deducted.
                      </p>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold py-6" 
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
          <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 overflow-hidden">
            <div className="p-6 border-b border-slate-700/50">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                Transaction History
              </h3>
            </div>
            {walletTransactions.length > 0 ? (
              <div className="divide-y divide-slate-700/30">
                {walletTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-slate-800/30">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        tx.transactionType === 'deposit'
                          ? 'bg-emerald-500/20'
                          : 'bg-red-500/20'
                      }`}>
                        {tx.transactionType === 'deposit' ? (
                          <ArrowDownRight className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium capitalize">{tx.transactionType}</p>
                        <p className="text-sm text-slate-400">
                          {new Date(tx.createdAt).toLocaleDateString()} • {new Date(tx.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        tx.transactionType === 'deposit' ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {tx.transactionType === 'deposit' ? '+' : '-'}PKR {Number(tx.amount).toLocaleString()}
                      </p>
                      <Badge className={
                        tx.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : tx.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }>
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <WalletIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No transactions yet</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
