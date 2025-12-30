import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Building
} from "lucide-react";

export default function KYC() {
  const { user, isAuthenticated, loading } = useAuth();
  const { t } = useLanguage();
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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  const profile = kycData?.profile;
  const documents = kycData?.documents || [];

  const documentTypes = [
    {
      type: "cnic" as const,
      title: t("kyc.cnic"),
      description: "Upload clear photos of both sides of your CNIC",
      icon: CreditCard,
      required: true,
    },
    {
      type: "passport" as const,
      title: t("kyc.passport"),
      description: "Alternative to CNIC for overseas Pakistanis",
      icon: FileText,
      required: false,
    },
    {
      type: "proof_of_address" as const,
      title: t("kyc.proofOfAddress"),
      description: "Utility bill or bank statement (less than 3 months old)",
      icon: Home,
      required: true,
    },
    {
      type: "bank_statement" as const,
      title: t("kyc.bankStatement"),
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
        return <Badge className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" /> Verified</Badge>;
      case "pending":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge variant="outline">Not Submitted</Badge>;
    }
  };

  const completedDocs = documents.filter(d => d.status === "verified").length;
  const requiredDocs = documentTypes.filter(d => d.required).length;
  const progress = (completedDocs / requiredDocs) * 100;

  const handleFileUpload = async (docType: "cnic" | "passport" | "bank_statement" | "proof_of_address") => {
    // In a real implementation, this would upload to S3 first
    // For now, we'll simulate with a placeholder URL
    setUploadingDoc(docType);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    submitDocMutation.mutate({
      documentType: docType,
      documentUrl: `https://storage.example.com/kyc/${user?.id}/${docType}-${Date.now()}.pdf`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{t("kyc.title")}</h1>
            <p className="text-muted-foreground">
              Complete your identity verification to start investing in properties
            </p>
          </div>

          {/* Progress */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Verification Progress</span>
                <span className="text-sm text-muted-foreground">{completedDocs}/{requiredDocs} documents verified</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                {profile?.kycStatus === "verified" ? (
                  <Badge className="bg-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                ) : profile?.kycStatus === "pending" ? (
                  <Badge variant="secondary">
                    <Clock className="w-3 h-3 mr-1" />
                    Under Review
                  </Badge>
                ) : profile?.kycStatus === "rejected" ? (
                  <Badge variant="destructive">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Action Required
                  </Badge>
                ) : (
                  <Badge variant="outline">Not Started</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Verified Success Message */}
          {profile?.kycStatus === "verified" && (
            <Card className="mb-8 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800">Verification Complete!</h3>
                    <p className="text-sm text-green-600">
                      Your identity has been verified. You can now invest in properties.
                    </p>
                  </div>
                  <Button className="ml-auto" asChild>
                    <Link href="/properties">Browse Properties</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Document Upload Cards */}
          <div className="space-y-4">
            {documentTypes.map((docType) => {
              const status = getDocumentStatus(docType.type);
              const existingDoc = documents.find(d => d.documentType === docType.type);
              
              return (
                <Card key={docType.type}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <docType.icon className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{docType.title}</h3>
                          {docType.required && (
                            <span className="text-xs text-destructive">Required</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {docType.description}
                        </p>
                        
                        {existingDoc?.status === "rejected" && existingDoc.rejectionReason && (
                          <div className="bg-red-50 border border-red-200 rounded p-3 mb-3">
                            <p className="text-sm text-red-600">
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
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              {uploadingDoc === docType.type ? "Uploading..." : "Upload Document"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Guidelines */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Document Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>Documents must be clear, legible, and in color</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>All four corners of the document must be visible</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>File size should be less than 5MB (PDF, JPG, PNG accepted)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>Proof of address must be dated within the last 3 months</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>Verification typically takes 24-48 hours</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
