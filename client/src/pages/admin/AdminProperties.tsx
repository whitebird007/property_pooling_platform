import { useState, useRef } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
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
  Upload,
  Image as ImageIcon,
  X
} from "lucide-react";

export default function AdminProperties() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  type PropertyType = "residential" | "commercial" | "mixed_use" | "vacation_rental";
  const [newProperty, setNewProperty] = useState<{
    title: string;
    description: string;
    propertyType: PropertyType;
    address: string;
    city: string;
    area: string;
    totalValue: string;
    totalShares: number;
    sharePrice: string;
    availableShares: number;
    minInvestment: string;
    expectedRentalYield: string;
    expectedAppreciation: string;
    sizeSqFt: string;
    bedrooms: string;
    bathrooms: string;
    mainImage: string;
    galleryImages: string[];
  }>({
    title: "",
    description: "",
    propertyType: "residential",
    address: "",
    city: "",
    area: "",
    totalValue: "",
    totalShares: 1000,
    sharePrice: "",
    availableShares: 1000,
    minInvestment: "50000",
    expectedRentalYield: "",
    expectedAppreciation: "",
    sizeSqFt: "",
    bedrooms: "",
    bathrooms: "",
    mainImage: "",
    galleryImages: [],
  });

  const { data: properties, refetch } = trpc.properties.list.useQuery({});
  
  const createPropertyMutation = trpc.properties.create.useMutation({
    onSuccess: () => {
      toast.success("Property created successfully!");
      setShowAddDialog(false);
      resetForm();
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const resetForm = () => {
    setNewProperty({
      title: "",
      description: "",
      propertyType: "residential",
      address: "",
      city: "",
      area: "",
      totalValue: "",
      totalShares: 1000,
      sharePrice: "",
      availableShares: 1000,
      minInvestment: "50000",
      expectedRentalYield: "",
      expectedAppreciation: "",
      sizeSqFt: "",
      bedrooms: "",
      bathrooms: "",
      mainImage: "",
      galleryImages: [],
    });
  };

  const filteredProperties = properties?.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.city.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleImageUpload = async (file: File, isMain: boolean) => {
    setUploadingImages(true);
    try {
      // Create FormData and upload to storage
      const formData = new FormData();
      formData.append("file", file);
      
      // For now, we'll use a data URL as a placeholder
      // In production, this would upload to S3 via the backend
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        if (isMain) {
          setNewProperty(prev => ({ ...prev, mainImage: dataUrl }));
        } else {
          setNewProperty(prev => ({ 
            ...prev, 
            galleryImages: [...prev.galleryImages, dataUrl] 
          }));
        }
        setUploadingImages(false);
        toast.success(`Image uploaded successfully!`);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Failed to upload image");
      setUploadingImages(false);
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      handleImageUpload(file, true);
    }
  };

  const handleGalleryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large. Max 5MB per image.`);
          return;
        }
        handleImageUpload(file, false);
      });
    }
  };

  const removeGalleryImage = (index: number) => {
    setNewProperty(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index)
    }));
  };

  const handleCreateProperty = () => {
    // Combine main image with gallery images for the images array
    const allImages = newProperty.mainImage 
      ? [newProperty.mainImage, ...newProperty.galleryImages]
      : newProperty.galleryImages;

    createPropertyMutation.mutate({
      ...newProperty,
      images: allImages,
      sizeSqFt: newProperty.sizeSqFt ? parseInt(newProperty.sizeSqFt) : undefined,
      bedrooms: newProperty.bedrooms ? parseInt(newProperty.bedrooms) : undefined,
      bathrooms: newProperty.bathrooms ? parseInt(newProperty.bathrooms) : undefined,
      expectedRentalYield: newProperty.expectedRentalYield || undefined,
      expectedAppreciation: newProperty.expectedAppreciation || undefined,
    });
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
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      value={newProperty.title}
                      onChange={(e) => setNewProperty({...newProperty, title: e.target.value})}
                      placeholder="Property title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Type *</Label>
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
                  <Label>Description</Label>
                  <Textarea
                    value={newProperty.description}
                    onChange={(e) => setNewProperty({...newProperty, description: e.target.value})}
                    placeholder="Property description..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Property Images</h3>
                
                {/* Main Image */}
                <div className="space-y-2">
                  <Label>Main Image (Thumbnail) *</Label>
                  <div className="flex items-start gap-4">
                    {newProperty.mainImage ? (
                      <div className="relative w-40 h-28 rounded-lg overflow-hidden border">
                        <img 
                          src={newProperty.mainImage} 
                          alt="Main" 
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => setNewProperty({...newProperty, mainImage: ""})}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => mainImageInputRef.current?.click()}
                        disabled={uploadingImages}
                        className="w-40 h-28 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-purple-500 hover:bg-purple-50 transition-colors"
                      >
                        <Upload className="w-6 h-6 text-gray-400" />
                        <span className="text-sm text-gray-500">Upload Main</span>
                      </button>
                    )}
                    <input
                      ref={mainImageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageChange}
                      className="hidden"
                    />
                    <div className="text-sm text-gray-500">
                      <p>This will be the thumbnail displayed in listings</p>
                      <p className="text-xs mt-1">Max 5MB, JPG/PNG/WebP</p>
                    </div>
                  </div>
                </div>

                {/* Gallery Images */}
                <div className="space-y-2">
                  <Label>Gallery Images</Label>
                  <div className="flex flex-wrap gap-3">
                    {newProperty.galleryImages.map((img, index) => (
                      <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border">
                        <img 
                          src={img} 
                          alt={`Gallery ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => galleryInputRef.current?.click()}
                      disabled={uploadingImages || newProperty.galleryImages.length >= 10}
                      className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-1 hover:border-purple-500 hover:bg-purple-50 transition-colors disabled:opacity-50"
                    >
                      <ImageIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-xs text-gray-500">Add</span>
                    </button>
                    <input
                      ref={galleryInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryImageChange}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Add up to 10 gallery images. Max 5MB each.</p>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Location</h3>
                <div className="space-y-2">
                  <Label>Address *</Label>
                  <Input
                    value={newProperty.address}
                    onChange={(e) => setNewProperty({...newProperty, address: e.target.value})}
                    placeholder="Full address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>City *</Label>
                    <Select
                      value={newProperty.city}
                      onValueChange={(v) => setNewProperty({...newProperty, city: v})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lahore">Lahore</SelectItem>
                        <SelectItem value="Karachi">Karachi</SelectItem>
                        <SelectItem value="Islamabad">Islamabad</SelectItem>
                        <SelectItem value="Rawalpindi">Rawalpindi</SelectItem>
                        <SelectItem value="Faisalabad">Faisalabad</SelectItem>
                        <SelectItem value="Multan">Multan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Area</Label>
                    <Input
                      value={newProperty.area}
                      onChange={(e) => setNewProperty({...newProperty, area: e.target.value})}
                      placeholder="e.g., DHA Phase 6"
                    />
                  </div>
                </div>
              </div>

              {/* Financial */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Financial Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Total Value (PKR) *</Label>
                    <Input
                      value={newProperty.totalValue}
                      onChange={(e) => setNewProperty({...newProperty, totalValue: e.target.value})}
                      placeholder="e.g., 50000000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Share Price (PKR) *</Label>
                    <Input
                      value={newProperty.sharePrice}
                      onChange={(e) => setNewProperty({...newProperty, sharePrice: e.target.value})}
                      placeholder="e.g., 50000"
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
                    <Label>Min Investment (PKR)</Label>
                    <Input
                      value={newProperty.minInvestment}
                      onChange={(e) => setNewProperty({...newProperty, minInvestment: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Expected Rental Yield (%)</Label>
                    <Input
                      value={newProperty.expectedRentalYield}
                      onChange={(e) => setNewProperty({...newProperty, expectedRentalYield: e.target.value})}
                      placeholder="e.g., 8.5"
                    />
                  </div>
                </div>
              </div>

              {/* Property Specs */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Property Specifications</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Size (sq ft)</Label>
                    <Input
                      type="number"
                      value={newProperty.sizeSqFt}
                      onChange={(e) => setNewProperty({...newProperty, sizeSqFt: e.target.value})}
                      placeholder="e.g., 2500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bedrooms</Label>
                    <Input
                      type="number"
                      value={newProperty.bedrooms}
                      onChange={(e) => setNewProperty({...newProperty, bedrooms: e.target.value})}
                      placeholder="e.g., 3"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bathrooms</Label>
                    <Input
                      type="number"
                      value={newProperty.bathrooms}
                      onChange={(e) => setNewProperty({...newProperty, bathrooms: e.target.value})}
                      placeholder="e.g., 2"
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                onClick={handleCreateProperty} 
                disabled={createPropertyMutation.isPending || uploadingImages}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {createPropertyMutation.isPending ? "Creating..." : "Create Property"}
              </Button>
            </DialogFooter>
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
                          {property.images && (property.images as string[])[0] ? (
                            <img 
                              src={(property.images as string[])[0]} 
                              alt={property.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                              <Building2 className="w-6 h-6 text-purple-600" />
                            </div>
                          )}
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
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toast.info("Edit feature coming soon")}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => toast.info("Delete feature coming soon")}>
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
