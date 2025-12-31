import { useState, useMemo } from "react";
import { Link, useParams, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Building2, 
  TrendingUp, 
  Percent,
  MapPin,
  Calendar,
  Shield,
  Calculator,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  CreditCard,
  Wallet,
  FileCheck,
  Lock,
  Info,
  Sparkles
} from "lucide-react";

export default function Invest() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  
  const { data, isLoading, error } = trpc.properties.getById.useQuery({ id: Number(id) });
  const { data: profileData } = trpc.kyc.getProfile.useQuery(undefined, { enabled: isAuthenticated });
  
  const investMutation = trpc.investments.invest.useMutation({
    onSuccess: () => {
      toast.success(language === "ur" ? "سرمایہ کاری کامیاب!" : "Investment successful!");
      navigate("/portfolio");
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || "Investment failed");
    }
  });
  
  const [shares, setShares] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "bank">("wallet");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToRisks, setAgreedToRisks] = useState(false);
  
  const property = data?.property;
  
  const calculations = useMemo(() => {
    if (!property) return null;
    
    const sharePrice = Number(property.sharePrice);
    const totalInvestment = shares * sharePrice;
    const platformFee = totalInvestment * 0.02; // 2% platform fee
    const totalAmount = totalInvestment + platformFee;
    const rentalYield = Number(property.expectedRentalYield) / 100;
    
    const monthlyIncome = (totalInvestment * rentalYield) / 12;
    const annualIncome = totalInvestment * rentalYield;
    
    return {
      sharePrice,
      totalInvestment,
      platformFee,
      totalAmount,
      monthlyIncome,
      annualIncome,
    };
  }, [property, shares]);

  const walletBalance = profileData?.profile?.walletBalance ? Number(profileData.profile.walletBalance) : 0;
  const hasEnoughBalance = calculations ? walletBalance >= calculations.totalAmount : false;
  const isKycVerified = profileData?.profile?.kycStatus === "verified";
  
  const canInvest = isAuthenticated && isKycVerified && agreedToTerms && agreedToRisks && 
    (paymentMethod === "bank" || hasEnoughBalance);

  const fundingProgress = property 
    ? ((property.totalShares - property.availableShares) / property.totalShares) * 100 
    : 0;

  const handleInvest = () => {
    if (!property || !calculations) return;
    
    investMutation.mutate({
      propertyId: property.id,
      shares,
      totalAmount: calculations.totalAmount.toString(),
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container max-w-lg">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-200">
              <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {language === "ur" ? "لاگ ان ضروری ہے" : "Login Required"}
              </h1>
              <p className="text-gray-600 mb-6">
                {language === "ur" 
                  ? "سرمایہ کاری کرنے کے لیے براہ کرم لاگ ان کریں" 
                  : "Please login to invest in this property"}
              </p>
              <a href={getLoginUrl()}>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  {language === "ur" ? "لاگ ان کریں" : "Login to Continue"}
                </Button>
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading investment details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container max-w-lg">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-200">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h1>
              <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
              <Link href="/properties">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Browse Properties
                </Button>
              </Link>
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
      
      <div className="pt-24 pb-16">
        <div className="container">
          {/* Back Button */}
          <Link href={`/property/${id}`}>
            <Button variant="ghost" className="mb-6 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Property
            </Button>
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Investment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Property Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                    {property.images && property.images.length > 0 ? (
                      <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                    ) : (
                      <Building2 className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-xl font-bold text-gray-900 mb-1">{property.title}</h1>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{property.address}, {property.city}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {property.expectedRentalYield}% Yield
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                        {property.propertyType.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500 text-sm">Funding Progress</span>
                    <span className="text-purple-600 font-semibold">{fundingProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={fundingProgress} className="h-2 bg-gray-100" />
                  <p className="text-gray-500 text-xs mt-1">
                    {property.availableShares} of {property.totalShares} shares available
                  </p>
                </div>
              </div>

              {/* Investment Amount */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-purple-600" />
                  {language === "ur" ? "سرمایہ کاری کی رقم" : "Investment Amount"}
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Number of Shares: <span className="text-purple-600">{shares}</span>
                    </label>
                    <Slider
                      value={[shares]}
                      onValueChange={(value) => setShares(value[0])}
                      min={1}
                      max={Math.min(property.availableShares, 100)}
                      step={1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>1 Share</span>
                      <span>{Math.min(property.availableShares, 100)} Shares</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[1, 5, 10, 25, 50].map((num) => (
                      <Button
                        key={num}
                        variant="outline"
                        size="sm"
                        onClick={() => setShares(Math.min(num, property.availableShares))}
                        className={`border-gray-200 ${shares === num ? 'bg-purple-100 text-purple-700 border-purple-300' : 'text-gray-700 hover:bg-purple-50'}`}
                      >
                        {num} {num === 1 ? 'Share' : 'Shares'}
                      </Button>
                    ))}
                  </div>

                  {calculations && (
                    <div className="space-y-3 p-4 rounded-xl bg-gray-50">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Share Price</span>
                        <span className="text-gray-900">PKR {calculations.sharePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Shares × {shares}</span>
                        <span className="text-gray-900">PKR {calculations.totalInvestment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Platform Fee (2%)</span>
                        <span className="text-gray-900">PKR {calculations.platformFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                        <span className="text-gray-900 font-bold">Total Amount</span>
                        <span className="text-purple-600 font-bold text-xl">
                          PKR {calculations.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  {language === "ur" ? "ادائیگی کا طریقہ" : "Payment Method"}
                </h2>

                <div className="space-y-3">
                  <div
                    onClick={() => setPaymentMethod("wallet")}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "wallet" 
                        ? "border-purple-500 bg-purple-50" 
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          paymentMethod === "wallet" ? "bg-purple-100" : "bg-gray-100"
                        }`}>
                          <Wallet className={`w-5 h-5 ${paymentMethod === "wallet" ? "text-purple-600" : "text-gray-500"}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Wallet Balance</p>
                          <p className="text-sm text-gray-500">
                            Available: PKR {walletBalance.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "wallet" ? "border-purple-500 bg-purple-500" : "border-gray-300"
                      }`}>
                        {paymentMethod === "wallet" && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    {paymentMethod === "wallet" && !hasEnoughBalance && calculations && (
                      <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-200">
                        <p className="text-red-600 text-sm flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Insufficient balance. Please add PKR {(calculations.totalAmount - walletBalance).toLocaleString()} to your wallet.
                        </p>
                        <Link href="/wallet">
                          <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700 text-white">
                            Add Funds
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>

                  <div
                    onClick={() => setPaymentMethod("bank")}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "bank" 
                        ? "border-purple-500 bg-purple-50" 
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          paymentMethod === "bank" ? "bg-purple-100" : "bg-gray-100"
                        }`}>
                          <CreditCard className={`w-5 h-5 ${paymentMethod === "bank" ? "text-purple-600" : "text-gray-500"}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Bank Transfer</p>
                          <p className="text-sm text-gray-500">Pay via bank transfer (1-2 business days)</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "bank" ? "border-purple-500 bg-purple-500" : "border-gray-300"
                      }`}>
                        {paymentMethod === "bank" && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-purple-600" />
                  {language === "ur" ? "شرائط و ضوابط" : "Terms & Conditions"}
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="terms" 
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                      I have read and agree to the <Link href="/terms" className="text-purple-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link>. I understand that this is a binding investment agreement.
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="risks" 
                      checked={agreedToRisks}
                      onCheckedChange={(checked) => setAgreedToRisks(checked as boolean)}
                    />
                    <label htmlFor="risks" className="text-sm text-gray-600 cursor-pointer">
                      I understand and accept the investment risks. Real estate investments are subject to market fluctuations and there is no guarantee of returns. I am investing funds that I can afford to lose.
                    </label>
                  </div>
                </div>

                {!isKycVerified && (
                  <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <p className="text-amber-700 text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      KYC verification required before investing.
                    </p>
                    <Link href="/kyc">
                      <Button size="sm" className="mt-2 bg-amber-600 hover:bg-amber-700 text-white">
                        Complete KYC
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                  
                  {calculations && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Property</span>
                        <span className="text-gray-900 font-medium">{property.title}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Shares</span>
                        <span className="text-gray-900 font-medium">{shares}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Investment</span>
                        <span className="text-gray-900 font-medium">PKR {calculations.totalInvestment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Platform Fee</span>
                        <span className="text-gray-900 font-medium">PKR {calculations.platformFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-gray-200">
                        <span className="text-gray-900 font-bold">Total</span>
                        <span className="text-purple-600 font-bold">PKR {calculations.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6 text-lg"
                    disabled={!canInvest || investMutation.isPending}
                    onClick={handleInvest}
                  >
                    {investMutation.isPending ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="mr-2 w-5 h-5" />
                        {language === "ur" ? "سرمایہ کاری کریں" : "Confirm Investment"}
                      </>
                    )}
                  </Button>

                  <p className="text-center text-gray-500 text-xs mt-4">
                    <Lock className="w-3 h-3 inline mr-1" />
                    Secure & encrypted transaction
                  </p>
                </div>

                {/* Expected Returns */}
                {calculations && (
                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 text-white">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Expected Returns
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-purple-200">Monthly Income</span>
                        <span className="font-bold">PKR {calculations.monthlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200">Annual Income</span>
                        <span className="font-bold">PKR {calculations.annualIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200">Rental Yield</span>
                        <span className="font-bold">{property.expectedRentalYield}% p.a.</span>
                      </div>
                    </div>
                    <p className="text-purple-200 text-xs mt-4">
                      <Info className="w-3 h-3 inline mr-1" />
                      Returns are estimates and not guaranteed
                    </p>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Investor Protection</h3>
                  <div className="space-y-3">
                    {[
                      { icon: Shield, label: "SECP Registered SPV", color: "text-green-600 bg-green-100" },
                      { icon: FileCheck, label: "Title Verified", color: "text-purple-600 bg-purple-100" },
                      { icon: CheckCircle, label: "Escrow Protected", color: "text-blue-600 bg-blue-100" },
                    ].map((badge, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${badge.color.split(' ')[1]}`}>
                          <badge.icon className={`w-4 h-4 ${badge.color.split(' ')[0]}`} />
                        </div>
                        <span className="text-gray-700 text-sm">{badge.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
