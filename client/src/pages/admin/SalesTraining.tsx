import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
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
  Download,
  Eye,
  Play,
  Clock,
  Star,
  Copy,
  ExternalLink,
  BookOpen
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
  objection_handling: "Training Modules",
  comparison_chart: "Comparison Charts",
  success_story: "Success Stories",
  presentation: "Presentations",
  training_video: "Training Videos",
};

// Sample content for each category
const sampleContent: Record<string, any[]> = {
  pitch_script: [
    {
      id: 1,
      title: "30-Second Elevator Pitch",
      content: `"Imagine owning a piece of prime Pakistani real estate for just PKR 50,000. PropertyPool makes this possible through fractional ownership. We're SECP registered, Shariah certified, and have helped over 2,500 investors earn 8-12% annual returns. Would you like to see how it works?"`,
      duration: "30 seconds",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Full Investment Presentation Script",
      content: `Opening: "Thank you for your time today. I'm excited to share how PropertyPool is revolutionizing real estate investment in Pakistan..."

Key Points:
1. Problem: Traditional real estate requires millions in capital
2. Solution: Fractional ownership starting from PKR 50,000
3. Trust: SECP registered, Shariah certified, FBR compliant
4. Returns: 8-12% annual through rental income + appreciation
5. Liquidity: Secondary marketplace for easy exit

Closing: "Are you ready to start building your property portfolio today?"`,
      duration: "5 minutes",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "WhatsApp Follow-up Script",
      content: `"Assalam o Alaikum [Name]! 

Thank you for your interest in PropertyPool. I wanted to share some exciting news - we have a new DHA Phase 6 property that's 70% funded with projected 10.5% annual returns.

Would you like me to send you the property details? I can also schedule a quick 10-minute call to answer any questions.

Best regards,
[Your Name]"`,
      duration: "Quick message",
      difficulty: "Beginner",
    },
  ],
  objection_handling: [
    {
      id: 1,
      title: "Module 1: Understanding Fractional Ownership",
      content: `This module covers the fundamentals of fractional real estate investment:

• What is fractional ownership?
• How SPV structures protect investors
• Legal framework in Pakistan
• Comparison with traditional real estate

Duration: 45 minutes
Assessment: 10 multiple choice questions`,
      duration: "45 mins",
      type: "Foundation",
    },
    {
      id: 2,
      title: "Module 2: Objection Handling Masterclass",
      content: `Learn to address common investor concerns:

"Is my money safe?"
→ Explain SPV structure, SECP registration, separate bank accounts

"What if the property doesn't sell?"
→ Discuss rental income, long-term appreciation, marketplace liquidity

"How is this different from a Ponzi scheme?"
→ Real assets, transparent ownership, regulatory compliance

"What about taxes?"
→ FBR compliant, proper documentation, tax certificates provided`,
      duration: "60 mins",
      type: "Advanced",
    },
    {
      id: 3,
      title: "Module 3: Closing Techniques",
      content: `Master the art of closing deals:

• The Assumptive Close
• The Summary Close
• The Urgency Close (limited shares available)
• The Trial Close
• Handling "I need to think about it"

Role-play exercises included.`,
      duration: "30 mins",
      type: "Advanced",
    },
  ],
  comparison_chart: [
    {
      id: 1,
      title: "PropertyPool vs Traditional Real Estate",
      content: `| Feature | PropertyPool | Traditional |
|---------|-------------|-------------|
| Minimum Investment | PKR 50,000 | PKR 50 Lakh+ |
| Liquidity | High (Marketplace) | Very Low |
| Management | Professional | Self-managed |
| Diversification | Multiple properties | Usually one |
| Documentation | Digital & automated | Complex paperwork |
| Returns | 8-12% annually | Variable |`,
      type: "Investment Comparison",
    },
    {
      id: 2,
      title: "PropertyPool vs Stocks",
      content: `| Feature | PropertyPool | Stock Market |
|---------|-------------|--------------|
| Volatility | Low | High |
| Tangible Asset | Yes (Real Estate) | No |
| Dividend Frequency | Monthly/Quarterly | Variable |
| Market Correlation | Low | High |
| Inflation Hedge | Strong | Moderate |
| Understanding | Easy | Complex |`,
      type: "Investment Comparison",
    },
    {
      id: 3,
      title: "Property Types Comparison",
      content: `| Type | Expected Return | Risk Level | Liquidity |
|------|----------------|------------|-----------|
| Residential | 8-10% | Low | High |
| Commercial | 10-14% | Medium | Medium |
| Mixed Use | 9-12% | Medium | Medium |
| Land | 12-18% | High | Low |`,
      type: "Property Analysis",
    },
  ],
  success_story: [
    {
      id: 1,
      title: "Ahmed's Journey: From Skeptic to Advocate",
      content: `Ahmed, a 35-year-old software engineer from Lahore, was initially skeptical about fractional ownership. 

"I thought it was too good to be true. But after researching PropertyPool's SECP registration and meeting the team, I invested PKR 200,000 in a DHA Phase 6 apartment."

Results after 18 months:
• Monthly rental income: PKR 3,500
• Property appreciation: 15%
• Total return: PKR 58,000

"Now I've invested in 3 properties and recommend PropertyPool to everyone!"`,
      investor: "Ahmed K.",
      location: "Lahore",
      investment: "PKR 200,000",
      returns: "29% total",
    },
    {
      id: 2,
      title: "Fatima's Retirement Portfolio",
      content: `Fatima, a 58-year-old retired teacher, wanted stable income without the hassle of managing properties.

"I was looking for something safer than stocks but more profitable than bank deposits. PropertyPool was perfect."

Her portfolio:
• 3 residential properties
• 1 commercial property
• Total investment: PKR 1.5 Million

Monthly passive income: PKR 18,000
"It's like having rental properties without the tenant headaches!"`,
      investor: "Fatima B.",
      location: "Karachi",
      investment: "PKR 1.5M",
      returns: "PKR 18K/month",
    },
  ],
  presentation: [
    {
      id: 1,
      title: "Investor Onboarding Deck",
      content: "Complete presentation for new investor meetings. Covers company overview, investment process, property portfolio, and FAQ.",
      slides: 25,
      format: "PowerPoint",
      lastUpdated: "Dec 2024",
    },
    {
      id: 2,
      title: "Corporate Partnership Proposal",
      content: "Presentation for corporate clients interested in employee investment programs or bulk investments.",
      slides: 18,
      format: "PowerPoint",
      lastUpdated: "Nov 2024",
    },
    {
      id: 3,
      title: "Property Showcase Template",
      content: "Customizable template for presenting individual properties to potential investors.",
      slides: 12,
      format: "PowerPoint",
      lastUpdated: "Dec 2024",
    },
  ],
  training_video: [
    {
      id: 1,
      title: "Welcome to PropertyPool Sales Team",
      content: "Introduction video for new sales team members covering company culture, values, and expectations.",
      duration: "15:00",
      views: 245,
      instructor: "CEO",
    },
    {
      id: 2,
      title: "Mastering the Sales Call",
      content: "Step-by-step guide to conducting effective sales calls with potential investors.",
      duration: "28:00",
      views: 189,
      instructor: "Sales Director",
    },
    {
      id: 3,
      title: "Understanding Property Valuation",
      content: "Learn how properties are valued and how to explain valuations to investors.",
      duration: "22:00",
      views: 156,
      instructor: "Head of Acquisitions",
    },
    {
      id: 4,
      title: "CRM & Lead Management",
      content: "Tutorial on using the CRM system to track leads and manage investor relationships.",
      duration: "18:00",
      views: 134,
      instructor: "Tech Team",
    },
  ],
};

export default function SalesTraining() {
  const { user, isAuthenticated } = useAuth();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState<{ open: boolean; item: any; category: string }>({ open: false, item: null, category: "" });
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
    const dbMaterials = materials?.filter((m: any) => m.category === category) || [];
    const samples = sampleContent[category] || [];
    return [...dbMaterials, ...samples];
  };

  const handleCreate = () => {
    createMutation.mutate(newMaterial);
  };

  const handleCopyScript = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Script copied to clipboard!");
  };

  const handleViewItem = (item: any, category: string) => {
    setViewDialog({ open: true, item, category });
  };

  const renderCard = (item: any, category: string) => {
    const Icon = categoryIcons[category];
    
    switch (category) {
      case "pitch_script":
        return (
          <Card key={item.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleCopyScript(item.content)} title="Copy Script">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleViewItem(item, category)} title="View Full Script">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {item.duration}
                </Badge>
                <Badge className={item.difficulty === "Beginner" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                  {item.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 line-clamp-3">{item.content}</p>
            </CardContent>
          </Card>
        );

      case "objection_handling":
        return (
          <Card key={item.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleViewItem(item, category)}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {item.duration}
                </Badge>
                <Badge className={item.type === "Foundation" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}>
                  {item.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 line-clamp-3">{item.content}</p>
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700" onClick={() => handleViewItem(item, category)}>
                Start Module
              </Button>
            </CardContent>
          </Card>
        );

      case "comparison_chart":
        return (
          <Card key={item.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleCopyScript(item.content)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleViewItem(item, category)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <Badge variant="outline" className="mt-2">{item.type}</Badge>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleViewItem(item, category)}>
                View Chart
              </Button>
            </CardContent>
          </Card>
        );

      case "success_story":
        return (
          <Card key={item.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge variant="outline">{item.investor}</Badge>
                <Badge variant="outline">{item.location}</Badge>
                <Badge className="bg-green-100 text-green-700">{item.returns}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 line-clamp-3">{item.content}</p>
              <Button variant="outline" className="w-full mt-4" onClick={() => handleViewItem(item, category)}>
                Read Full Story
              </Button>
            </CardContent>
          </Card>
        );

      case "presentation":
        return (
          <Card key={item.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Presentation className="w-5 h-5 text-indigo-600" />
                </div>
                <Button variant="ghost" size="sm" onClick={() => toast.info("Download feature coming soon")}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">{item.slides} slides</Badge>
                <Badge variant="outline">{item.format}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 line-clamp-2">{item.content}</p>
              <p className="text-xs text-gray-400 mt-2">Updated: {item.lastUpdated}</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1" onClick={() => handleViewItem(item, category)}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700" onClick={() => toast.info("Download feature coming soon")}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "training_video":
        return (
          <Card key={item.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="relative w-full h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-3">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors" onClick={() => handleViewItem(item, category)}>
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">{item.duration}</Badge>
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">{item.instructor}</Badge>
                <Badge variant="outline">{item.views} views</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 line-clamp-2">{item.content}</p>
              <Button className="w-full mt-4 bg-red-600 hover:bg-red-700" onClick={() => handleViewItem(item, category)}>
                <Play className="w-4 h-4 mr-2" />
                Watch Now
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <AdminLayout 
      title="Sales Training Portal" 
      description="Access pitch scripts, training modules, and sales materials"
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
            const count = getMaterialsByCategory(key).length;
            return (
              <TabsTrigger key={key} value={key} className="gap-2 data-[state=active]:bg-white">
                <Icon className="w-4 h-4" />
                {label}
                <Badge variant="secondary" className="ml-1 text-xs">{count}</Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Object.keys(categoryLabels).map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getMaterialsByCategory(category).map((item: any) => renderCard(item, category))}
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

      {/* View Dialog */}
      <Dialog open={viewDialog.open} onOpenChange={(open) => setViewDialog({ ...viewDialog, open })}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewDialog.item?.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {viewDialog.category === "comparison_chart" ? (
              <div className="overflow-x-auto">
                <pre className="text-sm bg-gray-50 p-4 rounded-lg whitespace-pre-wrap font-mono">
                  {viewDialog.item?.content}
                </pre>
              </div>
            ) : viewDialog.category === "training_video" ? (
              <div className="space-y-4">
                <div className="w-full h-64 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-2" />
                    <p>Video Player Placeholder</p>
                    <p className="text-sm opacity-75">Duration: {viewDialog.item?.duration}</p>
                  </div>
                </div>
                <p className="text-gray-600">{viewDialog.item?.content}</p>
                <div className="flex gap-2">
                  <Badge variant="outline">Instructor: {viewDialog.item?.instructor}</Badge>
                  <Badge variant="outline">{viewDialog.item?.views} views</Badge>
                </div>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {viewDialog.item?.content}
                </pre>
              </div>
            )}
          </div>
          <DialogFooter>
            {viewDialog.category === "pitch_script" && (
              <Button variant="outline" onClick={() => handleCopyScript(viewDialog.item?.content)}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Script
              </Button>
            )}
            <Button onClick={() => setViewDialog({ open: false, item: null, category: "" })}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
