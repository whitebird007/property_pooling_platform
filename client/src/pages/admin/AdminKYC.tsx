import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { 
  FileCheck, 
  CheckCircle,
  X,
  Eye,
  Clock,
  Download
} from "lucide-react";

export default function AdminKYC() {
  const { user, isAuthenticated } = useAuth();
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const { data: pendingDocs, refetch } = trpc.kyc.getPendingDocuments.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const reviewMutation = trpc.kyc.reviewDocument.useMutation({
    onSuccess: () => {
      toast.success("Document reviewed successfully!");
      setSelectedDoc(null);
      setRejectionReason("");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleApprove = (docId: number) => {
    reviewMutation.mutate({
      documentId: docId,
      status: "verified",
    });
  };

  const handleReject = () => {
    if (!selectedDoc) return;
    reviewMutation.mutate({
      documentId: selectedDoc.id,
      status: "rejected",
      rejectionReason,
    });
  };

  return (
    <AdminLayout 
      title="KYC Verification Queue" 
      description="Review and approve investor identity documents"
      actions={
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      }
    >
      {/* Pending Documents */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="w-5 h-5 text-amber-500" />
            Pending Verifications ({pendingDocs?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingDocs && pendingDocs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Document Type</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Submitted</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingDocs.map((doc: any) => (
                    <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <FileCheck className="w-5 h-5 text-amber-600" />
                          </div>
                          <span className="font-medium text-gray-900">User #{doc.userId}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 capitalize">
                        {doc.documentType.replace("_", " ")}
                      </td>
                      <td className="py-4 px-4 text-gray-500 text-sm">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className="bg-amber-100 text-amber-700">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={doc.documentUrl} target="_blank" rel="noopener noreferrer">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </a>
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApprove(doc.id)}
                            disabled={reviewMutation.isPending}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => setSelectedDoc(doc)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">All Caught Up!</h3>
              <p className="text-gray-500">
                No pending KYC documents to review
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rejection Dialog */}
      <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Rejection Reason</Label>
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a reason for rejection..."
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedDoc(null)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleReject}
                disabled={!rejectionReason || reviewMutation.isPending}
              >
                Reject Document
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
