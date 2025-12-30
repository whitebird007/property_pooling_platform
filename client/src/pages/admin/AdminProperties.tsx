import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Building2, 
  Plus,
  Search,
  AlertCircle,
  Edit,
  Eye
} from "lucide-react";

export default function AdminProperties() {
  const { user, isAuthenticated, loading } = useAuth();
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

  const filteredProperties = properties?.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.city.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleCreateProperty = () => {
    createPropertyMutation.mutate(newProperty);
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
            <Button variant="default" asChild>
              <Link href="/admin/properties">Properties</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/investors">Investors</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/kyc">KYC Approvals</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/sales-training">Sales Training</Link>
            </Button>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold mb-2">Properties Management</h1>
              <p className="text-muted-foreground">
                Add, edit, and manage property listings
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button>
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
                    <Button onClick={handleCreateProperty} disabled={createPropertyMutation.isPending}>
                      {createPropertyMutation.isPending ? "Creating..." : "Create Property"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Properties List */}
          <Card>
            <CardHeader>
              <CardTitle>All Properties ({filteredProperties.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredProperties.length > 0 ? (
                <div className="space-y-3">
                  {filteredProperties.map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{property.title}</p>
                          <p className="text-sm text-muted-foreground">{property.city} • {property.propertyType}</p>
                          <p className="text-sm">PKR {Number(property.totalValue).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Funding Progress</p>
                          <p className="font-semibold">
                            {Math.round(((property.totalShares - property.availableShares) / property.totalShares) * 100)}%
                          </p>
                        </div>
                        <Badge variant={property.status === "active" ? "default" : "secondary"}>
                          {property.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/properties/${property.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No Properties Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? "Try a different search term" : "Add your first property to get started"}
                  </p>
                  <Button onClick={() => setShowAddDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Property
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
