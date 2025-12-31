import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { 
  Users, 
  Search,
  Eye,
  Mail,
  MoreVertical,
  Download,
  UserCog,
  Shield,
  Ban,
  Trash2,
  Calendar,
  Phone,
  MapPin,
  Wallet,
  FileText,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";

type Investor = {
  id: number;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  role: string;
  createdAt: Date;
  lastSignedIn?: Date | null;
};

export default function AdminInvestors() {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, isAuthenticated } = useAuth();
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const { data: investors } = trpc.admin.getAllUsers.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  // KYC status will be fetched per-user when needed

  const filteredInvestors = investors?.filter((inv: Investor) => 
    inv.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleViewInvestor = (investor: Investor) => {
    setSelectedInvestor(investor);
    setViewDialogOpen(true);
  };

  const handleSendEmail = (investor: Investor) => {
    setSelectedInvestor(investor);
    setEmailSubject("");
    setEmailBody("");
    setEmailDialogOpen(true);
  };

  const handleEmailSubmit = () => {
    if (!emailSubject || !emailBody) {
      toast.error("Please fill in all fields");
      return;
    }
    // Email functionality placeholder - will be connected when email credentials are added
    toast.info("Email functionality will be available once email credentials are configured in Settings");
    setEmailDialogOpen(false);
  };

  const handleExport = () => {
    if (!investors || investors.length === 0) {
      toast.error("No investors to export");
      return;
    }
    
    // Create CSV content
    const headers = ["ID", "Name", "Email", "Phone", "Role", "Joined Date", "Last Sign In"];
    const rows = investors.map((inv: Investor) => [
      inv.id,
      inv.name || "",
      inv.email || "",
      inv.phone || "",
      inv.role,
      new Date(inv.createdAt).toLocaleDateString(),
      inv.lastSignedIn ? new Date(inv.lastSignedIn).toLocaleDateString() : "Never"
    ]);
    
    const csvContent = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `investors-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Investors exported successfully");
  };

  const getKycStatus = (_userId: number) => {
    // Placeholder - would fetch from KYC data
    return "not_submitted";
  };

  const getKycBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle2 className="w-3 h-3 mr-1" />Verified</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-600">Not Submitted</Badge>;
    }
  };

  return (
    <AdminLayout 
      title="Investors Management" 
      description="View and manage all registered investors"
      actions={
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      }
    >
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search investors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Investors List */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">All Investors ({filteredInvestors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredInvestors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Investor</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">KYC Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Joined</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvestors.map((investor: Investor) => (
                    <tr key={investor.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-medium">
                            {investor.name?.charAt(0).toUpperCase() || "?"}
                          </div>
                          <span className="font-medium text-gray-900">{investor.name || "Unknown"}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{investor.email || "No email"}</td>
                      <td className="py-4 px-4">
                        {getKycBadge(getKycStatus(investor.id))}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={investor.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"}>
                          {investor.role}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-500 text-sm">
                        {new Date(investor.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewInvestor(investor)}
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleSendEmail(investor)}
                            title="Send Email"
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewInvestor(investor)}>
                                <UserCog className="w-4 h-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendEmail(investor)}>
                                <Mail className="w-4 h-4 mr-2" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info("View documents feature coming soon")}>
                                <FileText className="w-4 h-4 mr-2" />
                                View Documents
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => toast.info("Role change feature coming soon")}>
                                <Shield className="w-4 h-4 mr-2" />
                                Change Role
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => toast.info("Suspend account feature coming soon")}
                                className="text-amber-600"
                              >
                                <Ban className="w-4 h-4 mr-2" />
                                Suspend Account
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => toast.info("Delete account feature coming soon")}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Account
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Investors Found</h3>
              <p className="text-gray-500">
                {searchTerm ? "Try a different search term" : "No investors have registered yet"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Investor Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Investor Details</DialogTitle>
            <DialogDescription>
              View detailed information about this investor
            </DialogDescription>
          </DialogHeader>
          {selectedInvestor && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  {selectedInvestor.name?.charAt(0).toUpperCase() || "?"}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedInvestor.name || "Unknown"}</h3>
                  <p className="text-gray-500">{selectedInvestor.email || "No email"}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge className={selectedInvestor.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"}>
                      {selectedInvestor.role}
                    </Badge>
                    {getKycBadge(getKycStatus(selectedInvestor.id))}
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">Email</span>
                  </div>
                  <p className="font-medium text-gray-900">{selectedInvestor.email || "Not provided"}</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">Phone</span>
                  </div>
                  <p className="font-medium text-gray-900">{selectedInvestor.phone || "Not provided"}</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Joined</span>
                  </div>
                  <p className="font-medium text-gray-900">{new Date(selectedInvestor.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Last Sign In</span>
                  </div>
                  <p className="font-medium text-gray-900">
                    {selectedInvestor.lastSignedIn 
                      ? new Date(selectedInvestor.lastSignedIn).toLocaleDateString() 
                      : "Never"}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-purple-50 text-center">
                  <Wallet className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-900">PKR 0</p>
                  <p className="text-sm text-purple-600">Wallet Balance</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 text-center">
                  <FileText className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-900">0</p>
                  <p className="text-sm text-blue-600">Investments</p>
                </div>
                <div className="p-4 rounded-xl bg-green-50 text-center">
                  <MapPin className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-900">0</p>
                  <p className="text-sm text-green-600">Properties</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setViewDialogOpen(false);
              if (selectedInvestor) handleSendEmail(selectedInvestor);
            }}>
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
            <DialogDescription>
              Send an email to {selectedInvestor?.name || selectedInvestor?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-to">To</Label>
              <Input 
                id="email-to" 
                value={selectedInvestor?.email || ""} 
                disabled 
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-subject">Subject</Label>
              <Input 
                id="email-subject" 
                placeholder="Enter email subject..."
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-body">Message</Label>
              <Textarea 
                id="email-body" 
                placeholder="Enter your message..."
                rows={6}
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
              />
            </div>
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
              <p className="text-sm text-amber-700">
                <strong>Note:</strong> Email functionality requires SMTP credentials to be configured in Admin Settings.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEmailSubmit}>
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
