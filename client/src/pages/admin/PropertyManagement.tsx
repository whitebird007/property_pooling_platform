import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { 
  Building2, 
  Users,
  Wrench,
  Calendar,
  DollarSign,
  AlertCircle
} from "lucide-react";

export default function PropertyManagement() {
  const { user, isAuthenticated, loading } = useAuth();
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);

  const { data: properties } = trpc.properties.list.useQuery({});
  
  const { data: tenants } = trpc.propertyManagement.getTenants.useQuery(
    { propertyId: selectedPropertyId! },
    { enabled: !!selectedPropertyId && isAuthenticated && user?.role === "admin" }
  );
  
  const { data: maintenance } = trpc.propertyManagement.getMaintenanceRequests.useQuery(
    { propertyId: selectedPropertyId! },
    { enabled: !!selectedPropertyId && isAuthenticated && user?.role === "admin" }
  );
  
  const { data: bookings } = trpc.propertyManagement.getBookings.useQuery(
    { propertyId: selectedPropertyId! },
    { enabled: !!selectedPropertyId && isAuthenticated && user?.role === "admin" }
  );

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
            <Button variant="outline" asChild>
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
              <h1 className="text-2xl font-bold mb-2">Property Management</h1>
              <p className="text-muted-foreground">
                Manage tenants, maintenance, and bookings
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Select 
                value={selectedPropertyId?.toString() || ""} 
                onValueChange={(v) => setSelectedPropertyId(Number(v))}
              >
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select a property" />
                </SelectTrigger>
                <SelectContent>
                  {properties?.map((property) => (
                    <SelectItem key={property.id} value={property.id.toString()}>
                      {property.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedPropertyId ? (
            <Tabs defaultValue="tenants" className="w-full">
              <TabsList>
                <TabsTrigger value="tenants">
                  <Users className="w-4 h-4 mr-2" />
                  Tenants
                </TabsTrigger>
                <TabsTrigger value="maintenance">
                  <Wrench className="w-4 h-4 mr-2" />
                  Maintenance
                </TabsTrigger>
                <TabsTrigger value="bookings">
                  <Calendar className="w-4 h-4 mr-2" />
                  Bookings
                </TabsTrigger>
              </TabsList>
              
              {/* Tenants Tab */}
              <TabsContent value="tenants" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Tenants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {tenants && tenants.length > 0 ? (
                      <div className="space-y-3">
                        {tenants.map((tenant: any) => (
                          <div key={tenant.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">{tenant.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {tenant.email} • {tenant.phone}
                              </p>
                              <p className="text-sm">
                                Lease: {new Date(tenant.leaseStartDate).toLocaleDateString()} - {new Date(tenant.leaseEndDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">PKR {Number(tenant.monthlyRent).toLocaleString()}/mo</p>
                              <Badge variant={tenant.status === "active" ? "default" : "secondary"}>
                                {tenant.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        No tenants for this property
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Maintenance Tab */}
              <TabsContent value="maintenance" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {maintenance && maintenance.length > 0 ? (
                      <div className="space-y-3">
                        {maintenance.map((request: any) => (
                          <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">{request.title}</p>
                              <p className="text-sm text-muted-foreground">{request.description}</p>
                              <p className="text-xs text-muted-foreground">
                                Created {new Date(request.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge variant={
                                request.priority === "urgent" ? "destructive" :
                                request.priority === "high" ? "default" : "secondary"
                              }>
                                {request.priority}
                              </Badge>
                              <p className="text-sm mt-1">{request.status}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        No maintenance requests
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Bookings Tab */}
              <TabsContent value="bookings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Airbnb / Short-term Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {bookings && bookings.length > 0 ? (
                      <div className="space-y-3">
                        {bookings.map((booking: any) => (
                          <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">{booking.guestName}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Source: {booking.bookingSource || "Direct"}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">PKR {Number(booking.totalAmount).toLocaleString()}</p>
                              <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                                {booking.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        No bookings for this property
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="p-12 text-center">
              <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">Select a Property</h3>
              <p className="text-muted-foreground">
                Choose a property from the dropdown to manage tenants, maintenance, and bookings
              </p>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
