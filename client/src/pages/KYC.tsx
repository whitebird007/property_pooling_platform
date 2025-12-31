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
  Sparkles,
  ArrowRight
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading KYC status...</p>
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
              <Shield className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">KYC Verification</h1>
            <p className="text-gray-600 text-lg">
              Complete your identity verification to start investing in premium properties.
            </p>
            <a href={getLoginUrl()}>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-xl">
                Sign In to Complete KYC
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
        <Footer />
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
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" /> Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200">
            <AlertCircle className="w-3 h-3 mr-1" /> Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-600 border-gray-200">
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
            <span className="text-gray-900">KYC Verification</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {language === "ur" ? "شناخت کی تصدیق" : "KYC Verification"}
            </h1>
            <p className="text-gray-600">
              {language === "ur" 
                ? "سرمایہ کاری شروع کرنے کے لیے اپنی شناخت کی تصدیق کریں"
                : "Complete your identity verification to start investing in properties"}
            </p>
          </div>

          {/* Progress Card */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-900 font-medium">Verification Progress</span>
              <span className="text-gray-500 text-sm">{completedDocs}/{requiredDocs} documents verified</span>
            </div>
            <Progress value={progress} className="h-3 bg-gray-100" />
            <div className="mt-4 flex items-center gap-3">
              <span className="text-gray-500 text-sm">Status:</span>
              {profile?.kycStatus === "verified" ? (
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              ) : profile?.kycStatus === "pending" ? (
                <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                  <Clock className="w-3 h-3 mr-1" />
                  Under Review
                </Badge>
              ) : profile?.kycStatus === "rejected" ? (
                <Badge className="bg-red-100 text-red-700 border-red-200">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Action Required
                </Badge>
              ) : (
                <Badge className="bg-gray-100 text-gray-600 border-gray-200">
                  Not Started
                </Badge>
              )}
            </div>
          </div>

          {/* Verified Success Message */}
          {profile?.kycStatus === "verified" && (
            <div className="p-6 rounded-2xl bg-green-50 border border-green-200 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">Verification Complete!</h3>
                  <p className="text-gray-600 text-sm">
                    Your identity has been verified. You can now invest in properties.
                  </p>
                </div>
                <Link href="/properties">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                    <Sparkles className="mr-2 w-4 h-4" />
                    Browse Properties
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Document Upload Section */}
      <section className="py-8">
        <div className="container max-w-4xl">
          {/* Document Upload Cards */}
          <div className="space-y-4 mb-8">
            {documentTypes.map((docType) => {
              const status = getDocumentStatus(docType.type);
              const existingDoc = documents.find(d => d.documentType === docType.type);
              const IconComponent = docType.icon;
              
              return (
                <div 
                  key={docType.type}
                  className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                      <IconComponent className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{docType.title}</h3>
                        {docType.required && (
                          <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded">Required</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {docType.description}
                      </p>
                      
                      {existingDoc?.status === "rejected" && existingDoc.rejectionReason && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 mb-3">
                          <p className="text-sm text-red-700">
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
                            className="border-gray-200 text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"
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
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              Document Guidelines
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-gray-700">Documents must be clear, legible, and in color</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-gray-700">All four corners of the document must be visible</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-gray-700">File size should be less than 5MB (PDF, JPG, PNG accepted)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-gray-700">Proof of address must be dated within the last 3 months</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-gray-700">Verification typically takes 24-48 hours</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
