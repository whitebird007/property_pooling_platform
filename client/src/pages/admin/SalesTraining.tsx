import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  FileText, 
  MessageSquare,
  BarChart3,
  Trophy,
  Presentation,
  Video,
  Plus,
  Download,
  AlertCircle
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
  const { user, isAuthenticated, loading } = useAuth();
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

  if (user?.role !== "admin" && user?.role !== "sales") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-destructive mb-4" />
              <h2 className="text-xl font-bold mb-2">Access Denied</h2>
              <p className="text-muted-foreground mb-4">
                You don't have permission to access sales training materials.
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

  const getMaterialsByCategory = (category: string) => {
    return materials?.filter((m: any) => m.category === category) || [];
  };

  const handleCreate = () => {
    createMutation.mutate(newMaterial);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Admin Navigation */}
          {user?.role === "admin" && (
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
              <Button variant="outline" asChild>
                <Link href="/admin/kyc">KYC Approvals</Link>
              </Button>
              <Button variant="default" asChild>
                <Link href="/admin/sales-training">Sales Training</Link>
              </Button>
            </div>
          )}

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold mb-2">Sales Training Portal</h1>
              <p className="text-muted-foreground">
                Access pitch scripts, objection handling guides, and training materials
              </p>
            </div>
            {user?.role === "admin" && (
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button className="mt-4 md:mt-0">
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
                    <Button onClick={handleCreate} disabled={createMutation.isPending}>
                      {createMutation.isPending ? "Adding..." : "Add Material"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Materials Tabs */}
          <Tabs defaultValue="pitch_script" className="w-full">
            <TabsList className="flex-wrap h-auto gap-1">
              {Object.entries(categoryLabels).map(([key, label]) => {
                const Icon = categoryIcons[key];
                return (
                  <TabsTrigger key={key} value={key} className="gap-2">
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
                        <Card key={material.id}>
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-primary" />
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
                            <p className="text-sm text-muted-foreground line-clamp-4">
                              {material.content || "No content available"}
                            </p>
                          </CardContent>
                        </Card>
                      );
                    })
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-muted-foreground">
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
            <h2 className="text-xl font-bold mb-6">Quick Reference Guides</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Selling Points</CardTitle>
                  <CardDescription>Use these in every pitch</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-0.5">1</Badge>
                    <p className="text-sm">Fractional ownership makes property investment accessible to everyone</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="mt-0.5">2</Badge>
                    <p className="text-sm">Shariah-compliant structure using Diminishing Musharaka model</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="mt-0.5">3</Badge>
                    <p className="text-sm">Transparent ownership through SPV structure with legal documentation</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="mt-0.5">4</Badge>
                    <p className="text-sm">Passive income through rental yields + capital appreciation</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="mt-0.5">5</Badge>
                    <p className="text-sm">Secondary marketplace for liquidity - sell shares anytime</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Common Objections</CardTitle>
                  <CardDescription>Quick responses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-sm">"Is this like the file system?"</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      No - we provide legal ownership through SPV, not just a booking receipt. You get actual property rights.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">"What if I need my money back?"</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Our secondary marketplace lets you sell shares to other verified investors anytime.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">"Is this halal?"</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Yes - we use Diminishing Musharaka structure approved by Islamic scholars. No interest involved.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
