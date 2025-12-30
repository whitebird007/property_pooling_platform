import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { 
  Building2, 
  TrendingUp, 
  Search,
  Percent,
  MapPin,
  SlidersHorizontal,
  Grid3X3,
  List
} from "lucide-react";

export default function Properties() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState<string>("all");
  const [city, setCity] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const { data: properties, isLoading } = trpc.properties.list.useQuery({ status: "active" });

  const filteredProperties = properties?.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (property.area?.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = propertyType === "all" || property.propertyType === propertyType;
    const matchesCity = city === "all" || property.city.toLowerCase() === city.toLowerCase();
    return matchesSearch && matchesType && matchesCity;
  });

  const cities = Array.from(new Set(properties?.map(p => p.city) || []));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="bg-muted/30 py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("nav.properties")}</h1>
          <p className="text-muted-foreground">
            Discover verified, income-generating properties across Pakistan
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b sticky top-16 bg-background z-40">
        <div className="container py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="mixed_use">Mixed Use</SelectItem>
                <SelectItem value="vacation_rental">Vacation Rental</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((c) => (
                  <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex gap-1 border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid/List */}
      <section className="py-8 flex-1">
        <div className="container">
          {isLoading ? (
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg" />
                  <CardContent className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProperties && filteredProperties.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Showing {filteredProperties.length} properties
              </p>
              
              <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                {filteredProperties.map((property) => (
                  viewMode === "grid" ? (
                    <Card key={property.id} className="overflow-hidden card-hover">
                      <div className="relative h-48 bg-muted">
                        {property.images && property.images[0] ? (
                          <img 
                            src={property.images[0]} 
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Building2 className="w-12 h-12 text-muted-foreground" />
                          </div>
                        )}
                        <Badge className="absolute top-3 left-3">
                          {property.propertyType.replace("_", " ")}
                        </Badge>
                        {property.rentalType === "short_term" && (
                          <Badge variant="secondary" className="absolute top-3 right-3">
                            Airbnb Ready
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {property.city}, {property.area}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Percent className="w-4 h-4 text-primary" />
                            <span>{property.expectedRentalYield}% yield</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span>{property.expectedAppreciation}% growth</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t flex justify-between items-center">
                          <div>
                            <p className="text-xs text-muted-foreground">Min. Investment</p>
                            <p className="font-semibold">PKR {Number(property.minInvestment).toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">{property.availableShares} shares</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button className="w-full" asChild>
                          <Link href={`/properties/${property.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ) : (
                    <Card key={property.id} className="overflow-hidden card-hover">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-64 h-48 md:h-auto bg-muted shrink-0">
                          {property.images && property.images[0] ? (
                            <img 
                              src={property.images[0]} 
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Building2 className="w-12 h-12 text-muted-foreground" />
                            </div>
                          )}
                          <Badge className="absolute top-3 left-3">
                            {property.propertyType.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="flex-1 p-4 flex flex-col">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {property.city}, {property.area}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {property.description || "Premium investment opportunity with verified title and professional management."}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t">
                            <div className="flex items-center gap-1 text-sm">
                              <Percent className="w-4 h-4 text-primary" />
                              <span>{property.expectedRentalYield}% yield</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <TrendingUp className="w-4 h-4 text-primary" />
                              <span>{property.expectedAppreciation}% growth</span>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Min. Investment</p>
                              <p className="font-semibold">PKR {Number(property.minInvestment).toLocaleString()}</p>
                            </div>
                            <Button className="ml-auto" asChild>
                              <Link href={`/properties/${property.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                ))}
              </div>
            </>
          ) : (
            <Card className="p-12 text-center">
              <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">No Properties Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || propertyType !== "all" || city !== "all"
                  ? "Try adjusting your filters to see more properties."
                  : "We're currently sourcing premium properties. Check back soon!"}
              </p>
              {(searchQuery || propertyType !== "all" || city !== "all") && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setPropertyType("all");
                    setCity("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
