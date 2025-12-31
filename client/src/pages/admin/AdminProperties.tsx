import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Building2, 
  Plus,
  Search,
  Edit,
  Eye,
  Trash2,
  MoreVertical
} from "lucide-react";

export default function AdminProperties() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  type PropertyType = "residential" | "commercial" | "mixed_use" | "vacation_rental";
  const [newProperty, setNewProperty] = useState<{
    title: string;
    propertyType: PropertyType;
    address: string;
    city: string;
    totalValue: string;
    totalShares: number;
    sharePrice: string;
    availableShares: number;
    minInvestment: string;
  }>({
    title: "",
    propertyType: "residential",
    address: "",
    city: "",
    totalValue: "",
    totalShares: 1000,
    sharePrice: "",
    availableShares: 1000,
    minInvestment: "50000",
  });

  const { data: properties, refetch } = trpc.properties.list.useQuery({});
  
  const createPropertyMutation = trpc.properties.create.useMutation({
    onSuccess: () => {
      toast.success("Property created successfully!");
      setShowAddDialog(false);
      setNewProperty({
        title: "",
        propertyType: "residential",
        address: "",
        city: "",
        totalValue: "",
        totalShares: 1000,
        sharePrice: "",
        availableShares: 1000,
        minInvestment: "50000",
      });
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const filteredProperties = properties?.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.city.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleCreateProperty = () => {
    createPropertyMutation.mutate(newProperty);
  };

  return (
    <AdminLayout 
      title="Properties Management" 
      description="Add, edit, and manage property listings"
      actions={
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={newProperty.title}
                    onChange={(e) => setNewProperty({...newProperty, title: e.target.value})}
                    placeholder="Property title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={newProperty.propertyType}
                    onValueChange={(v) => 
                      setNewProperty({...newProperty, propertyType: v as PropertyType})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="mixed_use">Mixed Use</SelectItem>
                      <SelectItem value="vacation_rental">Vacation Rental</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  value={newProperty.address}
                  onChange={(e) => setNewProperty({...newProperty, address: e.target.value})}
                  placeholder="Full address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    value={newProperty.city}
                    onChange={(e) => setNewProperty({...newProperty, city: e.target.value})}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Total Value (PKR)</Label>
                  <Input
                    value={newProperty.totalValue}
                    onChange={(e) => setNewProperty({...newProperty, totalValue: e.target.value})}
                    placeholder="e.g., 50000000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Total Shares</Label>
                  <Input
                    type="number"
                    value={newProperty.totalShares}
                    onChange={(e) => setNewProperty({
                      ...newProperty, 
                      totalShares: Number(e.target.value),
                      availableShares: Number(e.target.value)
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Share Price (PKR)</Label>
                  <Input
                    value={newProperty.sharePrice}
                    onChange={(e) => setNewProperty({...newProperty, sharePrice: e.target.value})}
                    placeholder="e.g., 50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Min Investment (PKR)</Label>
                  <Input
                    value={newProperty.minInvestment}
                    onChange={(e) => setNewProperty({...newProperty, minInvestment: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateProperty} 
                disabled={createPropertyMutation.isPending}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {createPropertyMutation.isPending ? "Creating..." : "Create Property"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Properties List */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">All Properties ({filteredProperties.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredProperties.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Property</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Value</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Shares</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProperties.map((property) => (
                    <tr key={property.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{property.title}</p>
                            <p className="text-xs text-gray-500">{property.address}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{property.city}</td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="capitalize">
                          {property.propertyType.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 font-medium text-gray-900">
                        PKR {Number(property.totalValue).toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {property.availableShares}/{property.totalShares}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={
                          property.status === 'funding' 
                            ? 'bg-green-100 text-green-700' 
                            : property.status === 'sold'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }>
                          {property.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                            <Link href={`/properties/${property.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
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
              <Building2 className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Properties Found</h3>
              <p className="text-gray-500 mb-4">Add your first property to get started</p>
              <Button 
                onClick={() => setShowAddDialog(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
