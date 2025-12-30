import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign,
  FileCheck,
  AlertCircle,
  ChevronRight
} from "lucide-react";

export default function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();

  const { data: properties } = trpc.properties.list.useQuery({});
  const { data: stats } = trpc.admin.getDashboardStats.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
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

  // Dashboard stats
  const dashboardStats = {
    totalProperties: stats?.totalProperties || properties?.length || 0,
    activeInvestors: stats?.totalUsers || 0,
    totalInvested: Number(stats?.totalInvested || 0),
    totalTrades: stats?.totalTrades || 0,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Admin Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 p-4 bg-muted/50 rounded-lg">
            <Button variant="default" asChild>
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

          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of platform performance and pending actions
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Properties</span>
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">{dashboardStats.totalProperties}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Active Investors</span>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">{dashboardStats.activeInvestors}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Invested</span>
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">PKR {(dashboardStats.totalInvested / 1000000).toFixed(1)}M</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Trades</span>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">{dashboardStats.totalTrades}</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Pending Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/admin/kyc">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <FileCheck className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">KYC Verifications</p>
                        <p className="text-sm text-muted-foreground">
                          Review pending approvals
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Link>
                
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Withdrawal Requests</p>
                      <p className="text-sm text-muted-foreground">
                        Process pending withdrawals
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>New investor registered</span>
                    <span className="text-muted-foreground ml-auto">2 min ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Investment completed - PKR 100,000</span>
                    <span className="text-muted-foreground ml-auto">15 min ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>KYC document submitted</span>
                    <span className="text-muted-foreground ml-auto">1 hour ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>Property funded - 100%</span>
                    <span className="text-muted-foreground ml-auto">3 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Properties Overview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Properties Overview</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/properties">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {properties && properties.length > 0 ? (
                <div className="space-y-3">
                  {properties.slice(0, 5).map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{property.title}</p>
                          <p className="text-sm text-muted-foreground">{property.city}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">PKR {Number(property.totalValue).toLocaleString()}</p>
                        <Badge variant={property.status === "active" ? "default" : "secondary"}>
                          {property.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No properties listed yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
