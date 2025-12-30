import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  CreditCard,
  Building2,
  Smartphone,
  Copy,
  CheckCircle
} from "lucide-react";

export default function Wallet() {
  const { user, isAuthenticated, loading } = useAuth();
  const { t } = useLanguage();
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAccount, setWithdrawAccount] = useState("");
  const [copied, setCopied] = useState(false);

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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
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
    setTimeout(() => setCopied(false), 2000);
  };

  const bankDetails = {
    bankName: "Meezan Bank",
    accountTitle: "PropertyPool Pvt Ltd",
    accountNumber: "0123456789012",
    iban: "PK36MEZN0001230456789012",
  };

  const paymentMethods = [
    { id: "bank", name: "Bank Transfer", icon: Building2, description: "Transfer from any bank" },
    { id: "jazzcash", name: "JazzCash", icon: Smartphone, description: "Mobile wallet" },
    { id: "easypaisa", name: "Easypaisa", icon: Smartphone, description: "Mobile wallet" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Wallet</h1>
            <p className="text-muted-foreground">
              Manage your funds for property investments
            </p>
          </div>

          {/* Balance Card */}
          <Card className="mb-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 mb-1">Available Balance</p>
                  <p className="text-4xl font-bold">PKR {walletBalance.toLocaleString()}</p>
                </div>
                <WalletIcon className="w-16 h-16 text-primary-foreground/20" />
              </div>
            </CardContent>
          </Card>

          {/* Deposit / Withdraw Tabs */}
          <Tabs defaultValue="deposit" className="mb-8">
            <TabsList className="w-full">
              <TabsTrigger value="deposit" className="flex-1">
                <ArrowDownRight className="w-4 h-4 mr-2" />
                Deposit
              </TabsTrigger>
              <TabsTrigger value="withdraw" className="flex-1">
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Withdraw
              </TabsTrigger>
            </TabsList>
            
            {/* Deposit Tab */}
            <TabsContent value="deposit" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Funds to Your Wallet</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Amount Input */}
                  <div className="space-y-2">
                    <Label>Amount (PKR)</Label>
                    <Input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="Minimum PKR 10,000"
                    />
                    <div className="flex gap-2 mt-2">
                      {[10000, 50000, 100000, 500000].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          size="sm"
                          onClick={() => setDepositAmount(String(amount))}
                        >
                          {(amount / 1000)}K
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="bg-muted p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Bank Transfer Details</h4>
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bank Name:</span>
                        <span className="font-medium">{bankDetails.bankName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Title:</span>
                        <span className="font-medium">{bankDetails.accountTitle}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Account Number:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{bankDetails.accountNumber}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(bankDetails.accountNumber)}
                          >
                            {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">IBAN:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-xs">{bankDetails.iban}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(bankDetails.iban)}
                          >
                            {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p><strong>Instructions:</strong></p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Transfer the amount to our bank account</li>
                      <li>Use your registered email as reference</li>
                      <li>Click "Confirm Deposit" after transfer</li>
                      <li>Funds will be credited within 24 hours</li>
                    </ol>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={handleDeposit}
                    disabled={depositMutation.isPending}
                  >
                    {depositMutation.isPending ? "Processing..." : "Confirm Deposit"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Withdraw Tab */}
            <TabsContent value="withdraw" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Withdraw Funds</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Amount (PKR)</Label>
                    <Input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Enter amount"
                      max={walletBalance}
                    />
                    <p className="text-xs text-muted-foreground">
                      Available: PKR {walletBalance.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Bank Account (IBAN)</Label>
                    <Input
                      value={withdrawAccount}
                      onChange={(e) => setWithdrawAccount(e.target.value)}
                      placeholder="PK00XXXX0000000000000000"
                    />
                  </div>

                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> Withdrawals are processed within 2-3 business days. 
                      A processing fee of PKR 50 will be deducted.
                    </p>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={handleWithdraw}
                    disabled={withdrawMutation.isPending || walletBalance <= 0}
                  >
                    {withdrawMutation.isPending ? "Processing..." : "Request Withdrawal"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions && transactions.length > 0 ? (
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.transactionType === "deposit" || tx.transactionType === "dividend"
                            ? "bg-green-100 text-green-600"
                            : tx.transactionType === "withdrawal"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}>
                          {tx.transactionType === "deposit" || tx.transactionType === "dividend" ? (
                            <ArrowDownRight className="w-5 h-5" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium capitalize">
                            {tx.transactionType.replace("_", " ")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(tx.createdAt).toLocaleDateString()} at {new Date(tx.createdAt).toLocaleTimeString()}
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
                        <Badge 
                          variant={
                            tx.status === "completed" ? "default" : 
                            tx.status === "pending" ? "secondary" : 
                            "destructive"
                          }
                          className="text-xs"
                        >
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No transactions yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
