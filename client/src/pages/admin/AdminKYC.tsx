import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useState } from "react";
import { 
  FileCheck, 
  AlertCircle,
  CheckCircle,
  X,
  Eye,
  Clock
} from "lucide-react";

export default function AdminKYC() {
  const { user, isAuthenticated, loading } = useAuth();
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

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-destructive mb-4" />
              <h2 className="text-xl font-bold mb-2">Access Denied</h2>
              <p className="text-muted-foreground mb-4">
                You don't have permission to access the admin panel.
              </p>
              <Button asChild>
                <Link href="/">Go Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Admin Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 p-4 bg-muted/50 rounded-lg">
            <Button variant="outline" asChild>
              <Link href="/admin">Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/properties">Properties</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/investors">Investors</Link>
            </Button>
            <Button variant="default" asChild>
              <Link href="/admin/kyc">KYC Approvals</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/sales-training">Sales Training</Link>
            </Button>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">KYC Verification Queue</h1>
            <p className="text-muted-foreground">
              Review and approve investor identity documents
            </p>
          </div>

          {/* Pending Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Pending Verifications ({pendingDocs?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingDocs && pendingDocs.length > 0 ? (
                <div className="space-y-3">
                  {pendingDocs.map((doc: any) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <FileCheck className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">User #{doc.userId}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {doc.documentType.replace("_", " ")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Submitted {new Date(doc.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
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
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
                  <h3 className="font-semibold mb-2">All Caught Up!</h3>
                  <p className="text-muted-foreground">
                    No pending KYC documents to review
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

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

      <Footer />
    </div>
  );
}
