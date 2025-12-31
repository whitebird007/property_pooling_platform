import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/AdminLayout";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { 
  Landmark, 
  Building2,
  Users,
  FileText,
  Search,
  Plus,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Scale,
  Shield,
  Trash2,
  Download,
  Calendar,
  TrendingUp,
  PieChart
} from "lucide-react";

type SPV = {
  id: string;
  name: string;
  property: string;
  status: "active" | "pending" | "draft";
  totalShares: number;
  soldShares: number;
  investors: number;
  valuation: number;
  registrationDate: string;
  secpNumber: string;
  description?: string;
  managementFee?: number;
  distributionFrequency?: string;
};

export default function AdminSPV() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSPV, setSelectedSPV] = useState<SPV | null>(null);
  const [editingSPV, setEditingSPV] = useState<SPV | null>(null);
  const [newSPV, setNewSPV] = useState({
    name: "",
    property: "",
    totalShares: "",
    valuation: "",
    secpNumber: "",
    description: "",
    managementFee: "2",
    distributionFrequency: "quarterly",
  });

  // Get properties for dropdown
  const { data: propertiesData } = trpc.properties.list.useQuery({});

  // Mock SPV data (in a real app, this would come from the backend)
  const [spvs, setSPVs] = useState<SPV[]>([
    { 
      id: "SPV001", 
      name: "DHA Phase 6 Holdings Ltd", 
      property: "DHA Phase 6 Apartment",
      status: "active",
      totalShares: 1000,
      soldShares: 850,
      investors: 42,
      valuation: 50000000,
      registrationDate: "2024-01-01",
      secpNumber: "SECP-2024-001",
      description: "Premium residential investment in DHA Phase 6, Lahore. This SPV holds a 3-bedroom luxury apartment with high rental yield potential.",
      managementFee: 2,
      distributionFrequency: "quarterly"
    },
    { 
      id: "SPV002", 
      name: "Bahria Commercial SPV", 
      property: "Bahria Town Commercial",
      status: "active",
      totalShares: 2000,
      soldShares: 2000,
      investors: 67,
      valuation: 120000000,
      registrationDate: "2023-11-15",
      secpNumber: "SECP-2023-089",
      description: "Commercial plaza investment in Bahria Town, Lahore. Fully leased with stable rental income.",
      managementFee: 1.5,
      distributionFrequency: "monthly"
    },
    { 
      id: "SPV003", 
      name: "Clifton View Holdings", 
      property: "Clifton Sea View",
      status: "pending",
      totalShares: 1500,
      soldShares: 675,
      investors: 23,
      valuation: 75000000,
      registrationDate: "2024-02-01",
      secpNumber: "Pending",
      description: "Luxury sea-facing apartment in Clifton, Karachi. Premium location with high appreciation potential.",
      managementFee: 2,
      distributionFrequency: "quarterly"
    },
    { 
      id: "SPV004", 
      name: "Gulberg Office Trust", 
      property: "Gulberg III Office",
      status: "draft",
      totalShares: 800,
      soldShares: 0,
      investors: 0,
      valuation: 40000000,
      registrationDate: "-",
      secpNumber: "-",
      description: "Modern office space in Gulberg III, Lahore. Ideal for corporate tenants.",
      managementFee: 2,
      distributionFrequency: "quarterly"
    },
  ]);

  const stats = {
    totalSPVs: spvs.length,
    activeSPVs: spvs.filter(s => s.status === "active").length,
    totalValuation: spvs.reduce((sum, s) => sum + s.valuation, 0),
    totalInvestors: spvs.reduce((sum, s) => sum + s.investors, 0),
  };

  const handleCreateSPV = () => {
    if (!newSPV.name || !newSPV.property || !newSPV.totalShares || !newSPV.valuation) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newId = `SPV${String(spvs.length + 1).padStart(3, "0")}`;
    const today = new Date().toISOString().split("T")[0];
    
    const createdSPV: SPV = {
      id: newId,
      name: newSPV.name,
      property: newSPV.property,
      status: "draft",
      totalShares: parseInt(newSPV.totalShares),
      soldShares: 0,
      investors: 0,
      valuation: parseInt(newSPV.valuation),
      registrationDate: today,
      secpNumber: newSPV.secpNumber || "Pending",
      description: newSPV.description,
      managementFee: parseFloat(newSPV.managementFee),
      distributionFrequency: newSPV.distributionFrequency,
    };

    setSPVs([...spvs, createdSPV]);
    setNewSPV({ name: "", property: "", totalShares: "", valuation: "", secpNumber: "", description: "", managementFee: "2", distributionFrequency: "quarterly" });
    setIsCreateDialogOpen(false);
    toast.success("SPV created successfully!");
  };

  const handleViewSPV = (spv: SPV) => {
    setSelectedSPV(spv);
    setIsViewDialogOpen(true);
  };

  const handleEditSPV = (spv: SPV) => {
    setEditingSPV({ ...spv });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingSPV) return;
    
    setSPVs(spvs.map(s => s.id === editingSPV.id ? editingSPV : s));
    setIsEditDialogOpen(false);
    toast.success("SPV updated successfully!");
  };

  const handleDeleteSPV = (id: string) => {
    if (confirm("Are you sure you want to delete this SPV?")) {
      setSPVs(spvs.filter(s => s.id !== id));
      toast.success("SPV deleted");
    }
  };

  const handleActivateSPV = (id: string) => {
    setSPVs(spvs.map(s => s.id === id ? { ...s, status: "active" as const } : s));
    toast.success("SPV activated successfully!");
  };

  const handleDownloadDocuments = (spv: SPV) => {
    const docContent = `
PropertyPool SPV Documentation
==============================

SPV Name: ${spv.name}
SPV ID: ${spv.id}
SECP Number: ${spv.secpNumber}
Property: ${spv.property}
Valuation: PKR ${spv.valuation.toLocaleString()}
Total Shares: ${spv.totalShares}
Sold Shares: ${spv.soldShares}
Investors: ${spv.investors}
Registration Date: ${spv.registrationDate}
Management Fee: ${spv.managementFee}%
Distribution: ${spv.distributionFrequency}

Description:
${spv.description || "N/A"}

---
Generated on: ${new Date().toLocaleString()}
This is an official document from PropertyPool Pakistan.
    `;
    
    const blob = new Blob([docContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${spv.id}_documentation.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Documents downloaded!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" /> Active</Badge>;
      case "pending": return <Badge className="bg-amber-100 text-amber-700"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "draft": return <Badge className="bg-gray-100 text-gray-700"><AlertCircle className="w-3 h-3 mr-1" /> Draft</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredSPVs = spvs.filter(spv => 
    spv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spv.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout 
      title="SPV Management" 
      description="Manage Special Purpose Vehicles for properties"
      actions={
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create SPV
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New SPV</DialogTitle>
              <DialogDescription>Set up a new Special Purpose Vehicle for property investment</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="spv-name">SPV Name *</Label>
                <Input
                  id="spv-name"
                  placeholder="e.g., DHA Phase 8 Holdings Ltd"
                  value={newSPV.name}
                  onChange={(e) => setNewSPV({ ...newSPV, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="property">Property *</Label>
                <Select
                  value={newSPV.property}
                  onValueChange={(value) => setNewSPV({ ...newSPV, property: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a property" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertiesData?.map((property: any) => (
                      <SelectItem key={property.id} value={property.title}>
                        {property.title}
                      </SelectItem>
                    ))}
                    <SelectItem value="DHA Phase 8 Villa">DHA Phase 8 Villa</SelectItem>
                    <SelectItem value="Bahria Town Apartment">Bahria Town Apartment</SelectItem>
                    <SelectItem value="Clifton Commercial">Clifton Commercial</SelectItem>
                    <SelectItem value="Gulberg Office Space">Gulberg Office Space</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe the investment opportunity..."
                  value={newSPV.description}
                  onChange={(e) => setNewSPV({ ...newSPV, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="total-shares">Total Shares *</Label>
                  <Input
                    id="total-shares"
                    type="number"
                    placeholder="e.g., 1000"
                    value={newSPV.totalShares}
                    onChange={(e) => setNewSPV({ ...newSPV, totalShares: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valuation">Valuation (PKR) *</Label>
                  <Input
                    id="valuation"
                    type="number"
                    placeholder="e.g., 50000000"
                    value={newSPV.valuation}
                    onChange={(e) => setNewSPV({ ...newSPV, valuation: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Management Fee (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={newSPV.managementFee}
                    onChange={(e) => setNewSPV({ ...newSPV, managementFee: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Distribution Frequency</Label>
                  <Select
                    value={newSPV.distributionFrequency}
                    onValueChange={(v) => setNewSPV({ ...newSPV, distributionFrequency: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secp-number">SECP Number (Optional)</Label>
                <Input
                  id="secp-number"
                  placeholder="e.g., SECP-2024-XXX"
                  value={newSPV.secpNumber}
                  onChange={(e) => setNewSPV({ ...newSPV, secpNumber: e.target.value })}
                />
                <p className="text-xs text-gray-500">Leave empty if pending registration</p>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleCreateSPV} className="bg-purple-600 hover:bg-purple-700">
                Create SPV
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Landmark className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total SPVs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSPVs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active SPVs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeSPVs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Valuation</p>
                <p className="text-2xl font-bold text-gray-900">PKR {(stats.totalValuation / 1000000).toFixed(0)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Investors</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalInvestors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SPV List */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">All SPVs</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search SPVs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSPVs.map((spv) => (
              <div key={spv.id} className="p-6 bg-gray-50 rounded-xl">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Landmark className="w-7 h-7 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{spv.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {spv.property}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(spv.status)}
                    <Button variant="outline" size="sm" onClick={() => handleViewSPV(spv)}>
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditSPV(spv)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    {spv.status === "draft" && (
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleActivateSPV(spv.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Activate
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">SECP Number</p>
                    <p className="font-medium text-gray-900">{spv.secpNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Valuation</p>
                    <p className="font-medium text-gray-900">PKR {(spv.valuation / 1000000).toFixed(0)}M</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Shares</p>
                    <p className="font-medium text-gray-900">{spv.totalShares.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Investors</p>
                    <p className="font-medium text-gray-900">{spv.investors}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Registration Date</p>
                    <p className="font-medium text-gray-900">{spv.registrationDate}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-500">Shares Sold</p>
                    <p className="text-sm font-medium text-gray-900">{spv.soldShares.toLocaleString()} / {spv.totalShares.toLocaleString()} ({Math.round((spv.soldShares / spv.totalShares) * 100)}%)</p>
                  </div>
                  <Progress value={(spv.soldShares / spv.totalShares) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>

          {filteredSPVs.length === 0 && (
            <div className="text-center py-12">
              <Landmark className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No SPVs found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Compliance Info */}
      <Card className="border-0 shadow-sm mt-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            Compliance Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">SECP Registration</h4>
                <p className="text-sm text-gray-500">All SPVs must be registered with SECP</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Scale className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Shariah Compliance</h4>
                <p className="text-sm text-gray-500">Certified by Shariah board</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">FBR Compliance</h4>
                <p className="text-sm text-gray-500">Tax documentation maintained</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View SPV Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-purple-600" />
              {selectedSPV?.name}
            </DialogTitle>
            <DialogDescription>SPV ID: {selectedSPV?.id}</DialogDescription>
          </DialogHeader>
          
          {selectedSPV && (
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="investors">Investors</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Property</p>
                    <p className="font-medium">{selectedSPV.property}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Status</p>
                    {getStatusBadge(selectedSPV.status)}
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">SECP Number</p>
                    <p className="font-medium">{selectedSPV.secpNumber}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Registration Date</p>
                    <p className="font-medium">{selectedSPV.registrationDate}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Valuation</p>
                    <p className="font-medium text-lg">PKR {selectedSPV.valuation.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Share Price</p>
                    <p className="font-medium text-lg">PKR {(selectedSPV.valuation / selectedSPV.totalShares).toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Management Fee</p>
                    <p className="font-medium">{selectedSPV.managementFee || 2}%</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Distribution</p>
                    <p className="font-medium capitalize">{selectedSPV.distributionFrequency || "Quarterly"}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">Description</p>
                  <p className="text-gray-700">{selectedSPV.description || "No description available."}</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-500">Funding Progress</p>
                    <p className="text-sm font-medium">{Math.round((selectedSPV.soldShares / selectedSPV.totalShares) * 100)}%</p>
                  </div>
                  <Progress value={(selectedSPV.soldShares / selectedSPV.totalShares) * 100} className="h-3" />
                  <p className="text-xs text-gray-500 mt-2">{selectedSPV.soldShares.toLocaleString()} of {selectedSPV.totalShares.toLocaleString()} shares sold</p>
                </div>
              </TabsContent>
              
              <TabsContent value="investors" className="mt-4">
                <div className="text-center py-8">
                  <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="font-medium text-gray-900">{selectedSPV.investors} Investors</p>
                  <p className="text-sm text-gray-500 mt-2">Investor details are available in the Investors section</p>
                  <Button variant="outline" className="mt-4" onClick={() => {
                    setIsViewDialogOpen(false);
                    window.location.href = "/admin/investors";
                  }}>
                    View All Investors
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="documents" className="mt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium">SPV Registration Certificate</p>
                        <p className="text-sm text-gray-500">PDF • 245 KB</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadDocuments(selectedSPV)}>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Shariah Compliance Certificate</p>
                        <p className="text-sm text-gray-500">PDF • 180 KB</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadDocuments(selectedSPV)}>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Property Valuation Report</p>
                        <p className="text-sm text-gray-500">PDF • 1.2 MB</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadDocuments(selectedSPV)}>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setIsViewDialogOpen(false);
              if (selectedSPV) handleEditSPV(selectedSPV);
            }} className="bg-purple-600 hover:bg-purple-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit SPV
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit SPV Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit SPV</DialogTitle>
            <DialogDescription>Update SPV details for {editingSPV?.id}</DialogDescription>
          </DialogHeader>
          
          {editingSPV && (
            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-2">
                <Label>SPV Name</Label>
                <Input
                  value={editingSPV.name}
                  onChange={(e) => setEditingSPV({ ...editingSPV, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Property</Label>
                <Input
                  value={editingSPV.property}
                  onChange={(e) => setEditingSPV({ ...editingSPV, property: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={editingSPV.description || ""}
                  onChange={(e) => setEditingSPV({ ...editingSPV, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Total Shares</Label>
                  <Input
                    type="number"
                    value={editingSPV.totalShares}
                    onChange={(e) => setEditingSPV({ ...editingSPV, totalShares: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Valuation (PKR)</Label>
                  <Input
                    type="number"
                    value={editingSPV.valuation}
                    onChange={(e) => setEditingSPV({ ...editingSPV, valuation: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Management Fee (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={editingSPV.managementFee || 2}
                    onChange={(e) => setEditingSPV({ ...editingSPV, managementFee: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Distribution Frequency</Label>
                  <Select
                    value={editingSPV.distributionFrequency || "quarterly"}
                    onValueChange={(v) => setEditingSPV({ ...editingSPV, distributionFrequency: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>SECP Number</Label>
                  <Input
                    value={editingSPV.secpNumber}
                    onChange={(e) => setEditingSPV({ ...editingSPV, secpNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={editingSPV.status}
                    onValueChange={(v: "active" | "pending" | "draft") => setEditingSPV({ ...editingSPV, status: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex justify-between">
            <Button 
              variant="outline" 
              className="text-red-600 hover:text-red-700"
              onClick={() => {
                if (editingSPV) {
                  handleDeleteSPV(editingSPV.id);
                  setIsEditDialogOpen(false);
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit} className="bg-purple-600 hover:bg-purple-700">
                Save Changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
