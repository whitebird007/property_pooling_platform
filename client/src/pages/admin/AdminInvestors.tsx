import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { 
  Users, 
  Search,
  AlertCircle,
  ChevronRight
} from "lucide-react";

export default function AdminInvestors() {
  const { user, isAuthenticated, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: investors } = trpc.admin.getAllUsers.useQuery(undefined, {
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

  const filteredInvestors = investors?.filter((inv: { name?: string | null; email?: string | null }) => 
    inv.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
            <Button variant="default" asChild>
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
              <h1 className="text-2xl font-bold mb-2">Investors Management</h1>
              <p className="text-muted-foreground">
                View and manage all registered investors
              </p>
            </div>
            <div className="mt-4 md:mt-0 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search investors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>

          {/* Investors List */}
          <Card>
            <CardHeader>
              <CardTitle>All Investors ({filteredInvestors.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredInvestors.length > 0 ? (
                <div className="space-y-3">
                  {filteredInvestors.map((investor: { id: number; name?: string | null; email?: string | null; role: string; createdAt: Date }) => (
                    <div key={investor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-semibold text-primary">
                            {investor.name?.charAt(0).toUpperCase() || "?"}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{investor.name || "Unknown"}</p>
                          <p className="text-sm text-muted-foreground">{investor.email || "No email"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Joined</p>
                          <p className="text-sm">{new Date(investor.createdAt).toLocaleDateString()}</p>
                        </div>
                        <Badge variant={investor.role === "admin" ? "default" : "secondary"}>
                          {investor.role}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No Investors Found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm ? "Try a different search term" : "No investors have registered yet"}
                  </p>
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
