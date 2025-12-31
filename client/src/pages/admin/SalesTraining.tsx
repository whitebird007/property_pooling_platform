import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { 
  FileText, 
  MessageSquare,
  BarChart3,
  Trophy,
  Presentation,
  Video,
  Plus,
  Download
} from "lucide-react";

const categoryIcons: Record<string, any> = {
  pitch_script: FileText,
  objection_handling: MessageSquare,
  comparison_chart: BarChart3,
  success_story: Trophy,
  presentation: Presentation,
  training_video: Video,
};

const categoryLabels: Record<string, string> = {
  pitch_script: "Pitch Scripts",
  objection_handling: "Objection Handling",
  comparison_chart: "Comparison Charts",
  success_story: "Success Stories",
  presentation: "Presentations",
  training_video: "Training Videos",
};

export default function SalesTraining() {
  const { user, isAuthenticated } = useAuth();
  const [showAddDialog, setShowAddDialog] = useState(false);
  type SalesCategory = "pitch_script" | "objection_handling" | "comparison_chart" | "success_story" | "presentation" | "training_video";
  const [newMaterial, setNewMaterial] = useState<{
    category: SalesCategory;
    title: string;
    content: string;
    fileUrl: string;
  }>({
    category: "pitch_script",
    title: "",
    content: "",
    fileUrl: "",
  });

  const { data: materials, refetch } = trpc.sales.getMaterials.useQuery({}, {
    enabled: isAuthenticated && (user?.role === "admin" || user?.role === "sales"),
  });

  const createMutation = trpc.sales.createMaterial.useMutation({
    onSuccess: () => {
      toast.success("Material added successfully!");
      setShowAddDialog(false);
      setNewMaterial({ category: "pitch_script" as SalesCategory, title: "", content: "", fileUrl: "" });
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const getMaterialsByCategory = (category: string) => {
    return materials?.filter((m: any) => m.category === category) || [];
  };

  const handleCreate = () => {
    createMutation.mutate(newMaterial);
  };

  return (
    <AdminLayout 
      title="Sales Training Portal" 
      description="Access pitch scripts, objection handling guides, and training materials"
      actions={
        user?.role === "admin" && (
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Material
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Training Material</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={newMaterial.category}
                    onValueChange={(v) => setNewMaterial({...newMaterial, category: v as SalesCategory})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categoryLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={newMaterial.title}
                    onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                    placeholder="Material title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea
                    value={newMaterial.content}
                    onChange={(e) => setNewMaterial({...newMaterial, content: e.target.value})}
                    placeholder="Material content or script..."
                    rows={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label>File URL (optional)</Label>
                  <Input
                    value={newMaterial.fileUrl}
                    onChange={(e) => setNewMaterial({...newMaterial, fileUrl: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreate} 
                  disabled={createMutation.isPending}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {createMutation.isPending ? "Adding..." : "Add Material"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )
      }
    >
      {/* Materials Tabs */}
      <Tabs defaultValue="pitch_script" className="w-full">
        <TabsList className="flex-wrap h-auto gap-1 bg-gray-100 p-1">
          {Object.entries(categoryLabels).map(([key, label]) => {
            const Icon = categoryIcons[key];
            return (
              <TabsTrigger key={key} value={key} className="gap-2 data-[state=active]:bg-white">
                <Icon className="w-4 h-4" />
                {label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Object.keys(categoryLabels).map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getMaterialsByCategory(category).length > 0 ? (
                getMaterialsByCategory(category).map((material: any) => {
                  const Icon = categoryIcons[category];
                  return (
                    <Card key={material.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-purple-600" />
                          </div>
                          {material.fileUrl && (
                            <Button variant="ghost" size="sm" asChild>
                              <a href={material.fileUrl} target="_blank" rel="noopener noreferrer">
                                <Download className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                        <CardTitle className="text-lg">{material.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 line-clamp-4">
                          {material.content || "No content available"}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">
                    No materials in this category yet
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Quick Reference Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Quick Reference</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Key Selling Points</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <p className="text-sm text-gray-600">SECP Registered - Full regulatory compliance</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <p className="text-sm text-gray-600">Shariah Certified - Ethical investment structure</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <p className="text-sm text-gray-600">Low Entry - Start from PKR 50,000</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <p className="text-sm text-gray-600">8-12% Annual Returns - Competitive yields</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Common Objections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium text-sm text-gray-900">"Is my money safe?"</p>
                <p className="text-sm text-gray-500">SPV structure protects each property investment separately</p>
              </div>
              <div>
                <p className="font-medium text-sm text-gray-900">"How do I exit?"</p>
                <p className="text-sm text-gray-500">Secondary marketplace allows selling shares anytime</p>
              </div>
              <div>
                <p className="font-medium text-sm text-gray-900">"What about taxes?"</p>
                <p className="text-sm text-gray-500">FBR compliant with proper documentation provided</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
