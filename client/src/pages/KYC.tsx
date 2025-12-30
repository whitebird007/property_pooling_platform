import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  CreditCard,
  Home,
  Building,
  ChevronRight,
  Shield,
  Sparkles
} from "lucide-react";

export default function KYC() {
  const { user, isAuthenticated, loading } = useAuth();
  const { language, t } = useLanguage();
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);

  const { data: kycData, refetch } = trpc.kyc.getProfile.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const submitDocMutation = trpc.kyc.submitDocument.useMutation({
    onSuccess: () => {
      toast.success("Document submitted for verification");
      refetch();
      setUploadingDoc(null);
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
          <p className="text-slate-400">Loading KYC status...</p>
        </div>
      </div>
    );
  }

  const profile = kycData?.profile;
  const documents = kycData?.documents || [];

  const documentTypes = [
    {
      type: "cnic" as const,
      title: language === "ur" ? "شناختی کارڈ" : "CNIC",
      description: "Upload clear photos of both sides of your CNIC",
      icon: CreditCard,
      required: true,
    },
    {
      type: "passport" as const,
      title: language === "ur" ? "پاسپورٹ" : "Passport",
      description: "Alternative to CNIC for overseas Pakistanis",
      icon: FileText,
      required: false,
    },
    {
      type: "proof_of_address" as const,
      title: language === "ur" ? "پتے کا ثبوت" : "Proof of Address",
      description: "Utility bill or bank statement (less than 3 months old)",
      icon: Home,
      required: true,
    },
    {
      type: "bank_statement" as const,
      title: language === "ur" ? "بینک اسٹیٹمنٹ" : "Bank Statement",
      description: "Recent bank statement showing your name and account",
      icon: Building,
      required: true,
    },
  ];

  const getDocumentStatus = (type: string) => {
    const doc = documents.find(d => d.documentType === type);
    return doc?.status || "not_submitted";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <CheckCircle className="w-3 h-3 mr-1" /> Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <AlertCircle className="w-3 h-3 mr-1" /> Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-700/50 text-slate-400 border-slate-600/50">
            Not Submitted
          </Badge>
        );
    }
  };

  const completedDocs = documents.filter(d => d.status === "verified").length;
  const requiredDocs = documentTypes.filter(d => d.required).length;
  const progress = (completedDocs / requiredDocs) * 100;

  const handleFileUpload = async (docType: "cnic" | "passport" | "bank_statement" | "proof_of_address") => {
    setUploadingDoc(docType);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    submitDocMutation.mutate({
      documentType: docType,
      documentUrl: `https://storage.example.com/kyc/${user?.id}/${docType}-${Date.now()}.pdf`,
    });
  };

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
            <span className="text-white">KYC Verification</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {language === "ur" ? "شناخت کی تصدیق" : "KYC Verification"}
            </h1>
            <p className="text-slate-400">
              {language === "ur" 
                ? "سرمایہ کاری شروع کرنے کے لیے اپنی شناخت کی تصدیق کریں"
                : "Complete your identity verification to start investing in properties"}
            </p>
          </div>

          {/* Progress Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-medium">Verification Progress</span>
              <span className="text-slate-400 text-sm">{completedDocs}/{requiredDocs} documents verified</span>
            </div>
            <Progress value={progress} className="h-3 bg-slate-700" />
            <div className="mt-4 flex items-center gap-3">
              <span className="text-slate-400 text-sm">Status:</span>
              {profile?.kycStatus === "verified" ? (
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              ) : profile?.kycStatus === "pending" ? (
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                  <Clock className="w-3 h-3 mr-1" />
                  Under Review
                </Badge>
              ) : profile?.kycStatus === "rejected" ? (
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Action Required
                </Badge>
              ) : (
                <Badge className="bg-slate-700/50 text-slate-400 border-slate-600/50">
                  Not Started
                </Badge>
              )}
            </div>
          </div>

          {/* Verified Success Message */}
          {profile?.kycStatus === "verified" && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">Verification Complete!</h3>
                  <p className="text-slate-400 text-sm">
                    Your identity has been verified. You can now invest in properties.
                  </p>
                </div>
                <Link href="/properties">
                  <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold">
                    <Sparkles className="mr-2 w-4 h-4" />
                    Browse Properties
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Document Upload Cards */}
          <div className="space-y-4 mb-8">
            {documentTypes.map((docType) => {
              const status = getDocumentStatus(docType.type);
              const existingDoc = documents.find(d => d.documentType === docType.type);
              const IconComponent = docType.icon;
              
              return (
                <div 
                  key={docType.type}
                  className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 hover:border-slate-600/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center shrink-0">
                      <IconComponent className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white">{docType.title}</h3>
                        {docType.required && (
                          <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Required</span>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 mb-3">
                        {docType.description}
                      </p>
                      
                      {existingDoc?.status === "rejected" && existingDoc.rejectionReason && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 mb-3">
                          <p className="text-sm text-red-400">
                            <strong>Rejection Reason:</strong> {existingDoc.rejectionReason}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3">
                        {getStatusBadge(status)}
                        
                        {status !== "verified" && status !== "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFileUpload(docType.type)}
                            disabled={uploadingDoc === docType.type || submitDocMutation.isPending}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            {uploadingDoc === docType.type ? "Uploading..." : "Upload Document"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guidelines */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" />
              Document Guidelines
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-slate-300">Documents must be clear, legible, and in color</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-slate-300">All four corners of the document must be visible</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-slate-300">File size should be less than 5MB (PDF, JPG, PNG accepted)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-slate-300">Proof of address must be dated within the last 3 months</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-slate-300">Verification typically takes 24-48 hours</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
