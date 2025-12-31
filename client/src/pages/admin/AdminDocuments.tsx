import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  FileText, 
  Upload,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  User,
  Calendar,
  FileCheck,
  FilePlus,
  FolderOpen,
  Send,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

type Document = {
  id: number;
  name: string;
  type: string;
  category: string;
  investorId: number;
  investorName: string;
  uploadedAt: string;
  size: string;
  status: "active" | "pending" | "expired";
};

export default function AdminDocuments() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedInvestor, setSelectedInvestor] = useState("");
  const [uploadForm, setUploadForm] = useState({
    investorId: "",
    documentType: "",
    documentName: "",
    description: "",
    file: null as File | null
  });

  const { data: investors } = trpc.admin.getAllUsers.useQuery();

  // Sample documents data
  const documents: Document[] = [
    { id: 1, name: "Investment Certificate - DHA Phase 6", type: "certificate", category: "Investment", investorId: 1, investorName: "Dexter Mcgrowder", uploadedAt: "2024-12-30", size: "1.2 MB", status: "active" },
    { id: 2, name: "Tax Statement 2024", type: "tax", category: "Tax", investorId: 1, investorName: "Dexter Mcgrowder", uploadedAt: "2024-12-28", size: "856 KB", status: "active" },
    { id: 3, name: "Property Deed - Bahria Town", type: "legal", category: "Legal", investorId: 2, investorName: "Ahmed Khan", uploadedAt: "2024-12-25", size: "2.4 MB", status: "active" },
    { id: 4, name: "Dividend Report Q4 2024", type: "report", category: "Financial", investorId: 1, investorName: "Dexter Mcgrowder", uploadedAt: "2024-12-20", size: "1.5 MB", status: "pending" },
    { id: 5, name: "KYC Verification", type: "kyc", category: "KYC", investorId: 3, investorName: "Sara Ali", uploadedAt: "2024-12-15", size: "3.2 MB", status: "active" },
  ];

  const documentStats = [
    { label: "Total Documents", value: "156", icon: FileText, color: "bg-purple-100 text-purple-600" },
    { label: "Pending Review", value: "12", icon: Clock, color: "bg-amber-100 text-amber-600" },
    { label: "Active", value: "142", icon: CheckCircle, color: "bg-green-100 text-green-600" },
    { label: "Expired", value: "2", icon: AlertCircle, color: "bg-red-100 text-red-600" },
  ];

  const documentCategories = [
    { value: "investment", label: "Investment Certificates" },
    { value: "tax", label: "Tax Statements" },
    { value: "legal", label: "Legal Documents" },
    { value: "financial", label: "Financial Reports" },
    { value: "kyc", label: "KYC Documents" },
    { value: "property", label: "Property Documents" },
    { value: "agreement", label: "Agreements" },
    { value: "other", label: "Other" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case "pending": return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
      case "expired": return <Badge className="bg-red-100 text-red-700">Expired</Badge>;
      default: return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "investment": return <FileCheck className="w-5 h-5 text-purple-600" />;
      case "tax": return <FileText className="w-5 h-5 text-blue-600" />;
      case "legal": return <FolderOpen className="w-5 h-5 text-amber-600" />;
      case "financial": return <FileText className="w-5 h-5 text-green-600" />;
      case "kyc": return <User className="w-5 h-5 text-indigo-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadForm({ ...uploadForm, file: e.target.files[0] });
    }
  };

  const handleUpload = () => {
    if (!uploadForm.investorId || !uploadForm.documentType || !uploadForm.file) {
      toast.error("Please fill in all required fields and select a file");
      return;
    }
    
    toast.success(`Document "${uploadForm.file.name}" uploaded successfully for investor!`);
    setIsUploadOpen(false);
    setUploadForm({ investorId: "", documentType: "", documentName: "", description: "", file: null });
  };

  const handleDownload = (doc: Document) => {
    const content = `PropertyPool Document
=====================

Document: ${doc.name}
Category: ${doc.category}
Investor: ${doc.investorName}
Uploaded: ${doc.uploadedAt}
Status: ${doc.status}

---
This is a sample document generated by PropertyPool.
For actual documents, please contact support.
`;
    
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${doc.name.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Document downloaded!");
  };

  const handleView = (doc: Document) => {
    toast.info(`Viewing document: ${doc.name}`);
  };

  const handleDelete = (doc: Document) => {
    toast.success(`Document "${doc.name}" deleted successfully`);
  };

  const handleSendToInvestor = (doc: Document) => {
    toast.success(`Document sent to ${doc.investorName}'s email`);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.investorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || doc.category.toLowerCase() === filterCategory;
    const matchesInvestor = !selectedInvestor || doc.investorId.toString() === selectedInvestor;
    return matchesSearch && matchesCategory && matchesInvestor;
  });

  return (
    <AdminLayout 
      title="Document Management" 
      description="Upload and manage investor documents"
      actions={
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Upload Document for Investor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Select Investor *</label>
                <Select value={uploadForm.investorId} onValueChange={(v) => setUploadForm({ ...uploadForm, investorId: v })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose an investor" />
                  </SelectTrigger>
                  <SelectContent>
                    {investors?.map((investor) => (
                      <SelectItem key={investor.id} value={investor.id.toString()}>
                        {investor.name} ({investor.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Document Type *</label>
                <Select value={uploadForm.documentType} onValueChange={(v) => setUploadForm({ ...uploadForm, documentType: v })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Document Name</label>
                <Input
                  placeholder="e.g., Investment Certificate - DHA Phase 6"
                  value={uploadForm.documentName}
                  onChange={(e) => setUploadForm({ ...uploadForm, documentName: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  placeholder="Brief description of the document..."
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Upload File *</label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="document-upload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <label htmlFor="document-upload" className="cursor-pointer">
                    {uploadForm.file ? (
                      <div className="flex items-center justify-center gap-2">
                        <FileCheck className="w-8 h-8 text-green-600" />
                        <span className="text-gray-700">{uploadForm.file.name}</span>
                      </div>
                    ) : (
                      <>
                        <FilePlus className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-400">PDF, DOC, DOCX, JPG, PNG (max 10MB)</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>Cancel</Button>
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleUpload}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {documentStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search documents or investors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {documentCategories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedInvestor} onValueChange={setSelectedInvestor}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Investors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Investors</SelectItem>
                  {investors?.map((investor) => (
                    <SelectItem key={investor.id} value={investor.id.toString()}>
                      {investor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Documents Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">All Documents ({filteredDocuments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Document</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Investor</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Uploaded</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            {getCategoryIcon(doc.category)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{doc.name}</p>
                            <p className="text-sm text-gray-500">{doc.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{doc.investorName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{doc.category}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {doc.uploadedAt}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(doc.status)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleView(doc)} title="View">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDownload(doc)} title="Download">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleSendToInvestor(doc)} title="Send to Investor">
                            <Send className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(doc)} title="Delete" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <FolderOpen className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No documents found</p>
                  <p className="text-sm text-gray-400">Upload a document to get started</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Upload for Specific Investor */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-900">Bulk Document Upload</h3>
                <p className="text-sm text-gray-600">Upload multiple documents for multiple investors at once</p>
              </div>
              <Button variant="outline" onClick={() => toast.info("Bulk upload coming soon!")}>
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
