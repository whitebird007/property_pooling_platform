import { useState, useMemo } from "react";
import { Link, useParams } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Building2, 
  TrendingUp, 
  Percent,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Calendar,
  FileCheck,
  Shield,
  Calculator,
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  Play
} from "lucide-react";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  
  const { data, isLoading, error } = trpc.properties.getById.useQuery({ id: Number(id) });
  
  const [investmentShares, setInvestmentShares] = useState(1);
  
  const property = data?.property;
  const documents = data?.documents || [];
  const spv = data?.spv;
  const dueDiligence = data?.dueDiligence || [];

  // Investment Calculator
  const calculations = useMemo(() => {
    if (!property) return null;
    
    const sharePrice = Number(property.sharePrice);
    const totalInvestment = investmentShares * sharePrice;
    const rentalYield = Number(property.expectedRentalYield) / 100;
    const appreciation = Number(property.expectedAppreciation) / 100;
    
    const monthlyIncome = (totalInvestment * rentalYield) / 12;
    const annualIncome = totalInvestment * rentalYield;
    const fiveYearIncome = annualIncome * 5;
    const fiveYearAppreciation = totalInvestment * Math.pow(1 + appreciation, 5) - totalInvestment;
    const fiveYearTotal = totalInvestment + fiveYearIncome + fiveYearAppreciation;
    
    return {
      totalInvestment,
      monthlyIncome,
      annualIncome,
      fiveYearIncome,
      fiveYearAppreciation,
      fiveYearTotal,
      roi: ((fiveYearTotal - totalInvestment) / totalInvestment) * 100,
    };
  }, [property, investmentShares]);

  const fundingProgress = property 
    ? ((property.totalShares - property.availableShares) / property.totalShares) * 100 
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="p-8 text-center max-w-md">
            <AlertCircle className="w-12 h-12 mx-auto text-destructive mb-4" />
            <h2 className="text-xl font-semibold mb-2">Property Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/properties">Browse Properties</Link>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Back Button */}
      <div className="container py-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/properties">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Link>
        </Button>
      </div>

      {/* Property Header */}
      <section className="container pb-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative rounded-xl overflow-hidden bg-muted aspect-video">
              {property.images && property.images[0] ? (
                <img 
                  src={property.images[0]} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Building2 className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
              {property.virtualTourUrl && (
                <Button 
                  className="absolute bottom-4 right-4"
                  onClick={() => window.open(property.virtualTourUrl!, '_blank')}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Virtual Tour
                </Button>
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge>{property.propertyType.replace("_", " ")}</Badge>
                {property.rentalType === "short_term" && (
                  <Badge variant="secondary">Airbnb Ready</Badge>
                )}
              </div>
            </div>

            {/* Title & Location */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{property.title}</h1>
              <p className="text-muted-foreground flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {property.address}, {property.city}
              </p>
            </div>

            {/* Property Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {property.sizeSqFt && (
                <Card className="p-4 text-center">
                  <Maximize className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="font-semibold">{property.sizeSqFt.toLocaleString()} sq ft</p>
                </Card>
              )}
              {property.bedrooms && (
                <Card className="p-4 text-center">
                  <Bed className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                  <p className="font-semibold">{property.bedrooms}</p>
                </Card>
              )}
              {property.bathrooms && (
                <Card className="p-4 text-center">
                  <Bath className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                  <p className="font-semibold">{property.bathrooms}</p>
                </Card>
              )}
              {property.yearBuilt && (
                <Card className="p-4 text-center">
                  <Calendar className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Year Built</p>
                  <p className="font-semibold">{property.yearBuilt}</p>
                </Card>
              )}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="spv">SPV Structure</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {property.description || 
                        "This premium property offers an excellent investment opportunity with verified title and professional management. Located in a prime area with high rental demand and strong appreciation potential."}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>100% verified title with comprehensive legal due diligence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>Professional property management included</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>Shariah-compliant Diminishing Musharaka structure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>Monthly rental income distribution</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>Secondary market liquidity for easy exit</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="financials" className="space-y-4 mt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Expected Returns</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Rental Yield</span>
                        <span className="font-semibold text-primary">{property.expectedRentalYield}% p.a.</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Capital Appreciation</span>
                        <span className="font-semibold text-primary">{property.expectedAppreciation}% p.a.</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Holding Period</span>
                        <span className="font-semibold">{property.holdingPeriod || 60} months</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Property Valuation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total Value</span>
                        <span className="font-semibold">PKR {Number(property.totalValue).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total Shares</span>
                        <span className="font-semibold">{property.totalShares.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Price per Share</span>
                        <span className="font-semibold">PKR {Number(property.sharePrice).toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="documents" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Verification Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {documents.length > 0 ? (
                      <div className="space-y-3">
                        {documents.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileCheck className="w-5 h-5 text-primary" />
                              <div>
                                <p className="font-medium">{doc.title}</p>
                                <p className="text-sm text-muted-foreground capitalize">
                                  {doc.documentType.replace("_", " ")}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={doc.verificationStatus === "verified" ? "default" : "secondary"}>
                                {doc.verificationStatus}
                              </Badge>
                              {doc.documentUrl && (
                                <Button variant="ghost" size="sm">
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        Document verification in progress. Check back soon.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="spv" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>SPV Structure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {spv ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">SPV Name</span>
                          <span className="font-semibold">{spv.spvName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Registration Number</span>
                          <span className="font-semibold">{spv.registrationNumber || "Pending"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Status</span>
                          <Badge>{spv.status}</Badge>
                        </div>
                        <Separator />
                        <p className="text-sm text-muted-foreground">
                          {spv.legalStructure || 
                            "This property is held in a dedicated Special Purpose Vehicle (SPV) registered with SECP. Each investor owns shares in the SPV proportional to their investment, providing legal protection and clear ownership rights."}
                        </p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        SPV structure information will be available once the property is fully funded.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Investment Card */}
          <div className="space-y-6">
            {/* Funding Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Funding Progress</span>
                  <Badge variant={property.status === "active" ? "default" : "secondary"}>
                    {property.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={fundingProgress} className="h-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {property.totalShares - property.availableShares} shares sold
                  </span>
                  <span className="font-semibold">{fundingProgress.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Available</span>
                  <span className="font-semibold">{property.availableShares} shares</span>
                </div>
              </CardContent>
            </Card>

            {/* Investment Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  {t("calculator.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Number of Shares</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[investmentShares]}
                      onValueChange={([value]) => setInvestmentShares(value)}
                      min={1}
                      max={Math.min(property.availableShares, 100)}
                      step={1}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={investmentShares}
                      onChange={(e) => setInvestmentShares(Math.max(1, Math.min(property.availableShares, Number(e.target.value))))}
                      className="w-20"
                    />
                  </div>
                </div>

                {calculations && (
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("calculator.amount")}</span>
                      <span className="font-semibold">PKR {calculations.totalInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("calculator.monthly")}</span>
                      <span className="font-semibold text-primary">PKR {calculations.monthlyIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("calculator.annual")}</span>
                      <span className="font-semibold text-primary">PKR {calculations.annualIncome.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("calculator.fiveYear")}</span>
                      <span className="font-bold text-lg text-primary">PKR {calculations.fiveYearTotal.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      *Projections based on expected yields. Actual returns may vary.
                    </p>
                  </div>
                )}

                <div className="pt-4">
                  {isAuthenticated ? (
                    <Button className="w-full" size="lg" asChild>
                      <Link href={`/kyc?redirect=/properties/${property.id}&invest=true`}>
                        {t("property.invest")}
                      </Link>
                    </Button>
                  ) : (
                    <Button className="w-full" size="lg" asChild>
                      <a href={getLoginUrl()}>
                        Login to Invest
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="text-sm">SECP Registered SPV</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-5 h-5 text-primary" />
                    <span className="text-sm">Verified Title Documents</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Shariah-Compliant Structure</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
