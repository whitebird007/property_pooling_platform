import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClientLayout from "@/components/ClientLayout";
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
  Shield
} from "lucide-react";

export default function KYC() {
  const { isAuthenticated } = useAuth();
  const { language } = useLanguage();
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

  const kycStatus = kycData?.profile?.kycStatus || "pending";
  const documents = kycData?.documents || [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-700 border-green-200"><CheckCircle className="w-3 h-3 mr-1" /> Verified</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-700 border-red-200"><AlertCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">Not Submitted</Badge>;
    }
  };

  const requiredDocuments = [
    { type: "cnic" as const, label: "CNIC (Front & Back)", icon: CreditCard, description: "Clear photo of your CNIC both sides" },
    { type: "proof_of_address" as const, label: "Proof of Address", icon: Home, description: "Utility bill or bank statement" },
    { type: "bank_statement" as const, label: "Bank Statement", icon: FileText, description: "Recent bank statement for verification" },
    { type: "passport" as const, label: "Passport (Optional)", icon: FileText, description: "For international investors" },
  ];

  const getDocumentStatus = (docType: string) => {
    const doc = documents.find((d: any) => d.documentType === docType);
    return doc?.status || "not_submitted";
  };

  const completedDocs = requiredDocuments.filter(d => getDocumentStatus(d.type) === "verified").length;
  const progress = (completedDocs / requiredDocuments.length) * 100;

  const handleFileUpload = async (docType: "cnic" | "passport" | "bank_statement" | "proof_of_address", file: File) => {
    setUploadingDoc(docType);
    // In a real app, you'd upload to S3 first
    // For now, we'll simulate with a placeholder URL
    const fakeUrl = `https://storage.example.com/${docType}_${Date.now()}.jpg`;
    submitDocMutation.mutate({
      documentType: docType,
      documentUrl: fakeUrl,
    });
  };

  return (
    <ClientLayout 
      title={language === "ur" ? "شناخت کی تصدیق" : "KYC Verification"} 
      description="Complete your identity verification to start investing"
    >
      {/* Status Overview */}
      <Card className="border-0 shadow-sm mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                kycStatus === "verified" ? "bg-green-100" : 
                kycStatus === "pending" ? "bg-amber-100" : "bg-purple-100"
              }`}>
                {kycStatus === "verified" ? (
                  <CheckCircle className="w-7 h-7 text-green-600" />
                ) : kycStatus === "pending" ? (
                  <Clock className="w-7 h-7 text-amber-600" />
                ) : (
                  <Shield className="w-7 h-7 text-purple-600" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">KYC Status</h2>
                <div className="mt-1">{getStatusBadge(kycStatus)}</div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Completion</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(progress)}%</p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-500 mt-2">
            {completedDocs} of {requiredDocuments.length} documents verified
          </p>
        </CardContent>
      </Card>

      {/* Verified Message */}
      {kycStatus === "verified" && (
        <Card className="border-0 shadow-sm mb-8 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-200 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-green-800">Identity Verified</h3>
                <p className="text-green-700">Your KYC verification is complete. You can now invest in properties.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Document Upload Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {requiredDocuments.map((doc) => {
          const status = getDocumentStatus(doc.type);
          const isUploading = uploadingDoc === doc.type;
          
          return (
            <Card key={doc.type} className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      status === "verified" ? "bg-green-100" : 
                      status === "pending" ? "bg-amber-100" : "bg-gray-100"
                    }`}>
                      <doc.icon className={`w-6 h-6 ${
                        status === "verified" ? "text-green-600" : 
                        status === "pending" ? "text-amber-600" : "text-gray-400"
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{doc.label}</h3>
                      <p className="text-sm text-gray-500">{doc.description}</p>
                    </div>
                  </div>
                  {getStatusBadge(status)}
                </div>

                {status !== "verified" && (
                  <div className="mt-4">
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(doc.type, file);
                        }}
                        disabled={isUploading}
                      />
                      <div className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                        isUploading ? "border-purple-300 bg-purple-50" : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                      }`}>
                        {isUploading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="animate-spin w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full" />
                            <span className="text-purple-600">Uploading...</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                )}

                {status === "rejected" && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      Document rejected. Please upload a clearer image.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Information Card */}
      <Card className="border-0 shadow-sm mt-8">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            Why KYC is Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Security</h4>
                <p className="text-sm text-gray-500">Protects you and other investors from fraud</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Compliance</h4>
                <p className="text-sm text-gray-500">Required by SECP and FBR regulations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Trust</h4>
                <p className="text-sm text-gray-500">Builds a trusted investment community</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ClientLayout>
  );
}
