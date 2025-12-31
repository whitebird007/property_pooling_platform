import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
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
  X
} from "lucide-react";

export default function AdminSPV() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newSPV, setNewSPV] = useState({
    name: "",
    property: "",
    totalShares: "",
    valuation: "",
    secpNumber: "",
  });

  // Get properties for dropdown
  const { data: propertiesData } = trpc.properties.list.useQuery({});

  // Mock SPV data (in a real app, this would come from the backend)
  const [spvs, setSPVs] = useState([
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
      secpNumber: "SECP-2024-001"
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
      secpNumber: "SECP-2023-089"
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
      secpNumber: "Pending"
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
      secpNumber: "-"
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
    
    const createdSPV = {
      id: newId,
      name: newSPV.name,
      property: newSPV.property,
      status: "draft" as const,
      totalShares: parseInt(newSPV.totalShares),
      soldShares: 0,
      investors: 0,
      valuation: parseInt(newSPV.valuation),
      registrationDate: today,
      secpNumber: newSPV.secpNumber || "Pending",
    };

    setSPVs([...spvs, createdSPV]);
    setNewSPV({ name: "", property: "", totalShares: "", valuation: "", secpNumber: "" });
    setIsCreateDialogOpen(false);
    toast.success("SPV created successfully!");
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
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New SPV</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
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
                    {/* Fallback options if no properties exist */}
                    <SelectItem value="DHA Phase 8 Villa">DHA Phase 8 Villa</SelectItem>
                    <SelectItem value="Bahria Town Apartment">Bahria Town Apartment</SelectItem>
                    <SelectItem value="Clifton Commercial">Clifton Commercial</SelectItem>
                    <SelectItem value="Gulberg Office Space">Gulberg Office Space</SelectItem>
                  </SelectContent>
                </Select>
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
                    <Button variant="outline" size="sm" onClick={() => toast.info("View SPV details coming soon")}>
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => toast.info("Edit SPV coming soon")}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
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
    </AdminLayout>
  );
}
