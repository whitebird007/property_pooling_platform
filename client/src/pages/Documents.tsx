import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import ClientLayout from "@/components/ClientLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { 
  FileText, 
  Download, 
  Search, 
  Filter,
  Building2,
  Receipt,
  FileCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Calendar,
  FolderOpen,
  Shield,
  ArrowRight
} from "lucide-react";

export default function Documents() {
  const { user, isAuthenticated, loading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: investments } = trpc.investments.myInvestments.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Document categories
  const categories = [
    { id: "all", label: "All Documents", icon: FolderOpen },
    { id: "investment", label: "Investment Docs", icon: FileText },
    { id: "property", label: "Property Docs", icon: Building2 },
    { id: "tax", label: "Tax Documents", icon: Receipt },
    { id: "legal", label: "Legal Documents", icon: FileCheck },
  ];

  // Sample documents (would come from backend in production)
  const documents = [
    {
      id: 1,
      name: "Investment Certificate - DHA Phase 6",
      category: "investment",
      propertyId: 1,
      propertyName: "DHA Phase 6 Apartment",
      type: "PDF",
      size: "245 KB",
      date: "2024-01-15",
      status: "available",
    },
    {
      id: 2,
      name: "Share Ownership Agreement",
      category: "legal",
      propertyId: 1,
      propertyName: "DHA Phase 6 Apartment",
      type: "PDF",
      size: "512 KB",
      date: "2024-01-15",
      status: "available",
    },
    {
      id: 3,
      name: "Property Valuation Report",
      category: "property",
      propertyId: 1,
      propertyName: "DHA Phase 6 Apartment",
      type: "PDF",
      size: "1.2 MB",
      date: "2024-01-10",
      status: "available",
    },
    {
      id: 4,
      name: "Tax Statement FY 2024",
      category: "tax",
      propertyId: null,
      propertyName: null,
      type: "PDF",
      size: "128 KB",
      date: "2024-06-30",
      status: "pending",
    },
    {
      id: 5,
      name: "Dividend Distribution Statement Q1",
      category: "investment",
      propertyId: 1,
      propertyName: "DHA Phase 6 Apartment",
      type: "PDF",
      size: "89 KB",
      date: "2024-03-31",
      status: "available",
    },
    {
      id: 6,
      name: "SPV Registration Certificate",
      category: "legal",
      propertyId: 1,
      propertyName: "DHA Phase 6 Apartment",
      type: "PDF",
      size: "320 KB",
      date: "2024-01-05",
      status: "available",
    },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.propertyName && doc.propertyName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle2 className="w-3 h-3 mr-1" />Available</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "expired":
        return <Badge className="bg-red-100 text-red-700"><AlertCircle className="w-3 h-3 mr-1" />Expired</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">{status}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "investment":
        return <FileText className="w-5 h-5 text-purple-600" />;
      case "property":
        return <Building2 className="w-5 h-5 text-blue-600" />;
      case "tax":
        return <Receipt className="w-5 h-5 text-green-600" />;
      case "legal":
        return <FileCheck className="w-5 h-5 text-amber-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  // Not authenticated view
  if (!loading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md text-center space-y-6 p-8">
          <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto">
            <FileText className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">My Documents</h1>
          <p className="text-gray-600">
            Access your investment certificates, property documents, tax statements, and legal agreements.
          </p>
          <a href={getLoginUrl()}>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-xl">
              Sign In to View Documents
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <ClientLayout title="My Documents">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
            <p className="text-gray-600">Access and download your investment documents</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-100">
              <Download className="mr-2 w-4 h-4" />
              Download All
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
                <p className="text-gray-500 text-sm">Total Documents</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{documents.filter(d => d.status === "available").length}</p>
                <p className="text-gray-500 text-sm">Available</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{documents.filter(d => d.status === "pending").length}</p>
                <p className="text-gray-500 text-sm">Pending</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{investments?.length || 0}</p>
                <p className="text-gray-500 text-sm">Properties</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-5 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl"
            />
          </div>
          <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-100 px-6 rounded-xl">
            <Filter className="mr-2 w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="w-full bg-gray-100 p-1.5 rounded-xl h-auto flex-wrap">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex-1 py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-600 text-gray-600"
              >
                <category.icon className="mr-2 w-4 h-4" />
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            {/* Documents List */}
            <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden">
              {filteredDocuments.length === 0 ? (
                <div className="p-12 text-center">
                  <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Documents Found</h3>
                  <p className="text-gray-500">
                    {searchQuery 
                      ? "Try adjusting your search query" 
                      : "Documents will appear here once you make investments"}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredDocuments.map((doc) => (
                    <div key={doc.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                            {getCategoryIcon(doc.category)}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{doc.name}</h4>
                            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                              {doc.propertyName && (
                                <span className="flex items-center gap-1">
                                  <Building2 className="w-3.5 h-3.5" />
                                  {doc.propertyName}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(doc.date).toLocaleDateString()}
                              </span>
                              <span>{doc.type} • {doc.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(doc.status)}
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-gray-200 text-gray-700 hover:bg-gray-100"
                              disabled={doc.status !== "available"}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-purple-600 hover:bg-purple-700 text-white"
                              disabled={doc.status !== "available"}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Security Notice */}
        <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-purple-900">Secure Document Storage</h4>
              <p className="text-purple-700 text-sm mt-1">
                All your documents are encrypted and stored securely. Only you can access your personal investment documents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
