import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { 
  Users, 
  Search,
  Eye,
  Mail,
  MoreVertical,
  Download
} from "lucide-react";

export default function AdminInvestors() {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, isAuthenticated } = useAuth();

  const { data: investors } = trpc.admin.getAllUsers.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const filteredInvestors = investors?.filter((inv: { name?: string | null; email?: string | null }) => 
    inv.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <AdminLayout 
      title="Investors Management" 
      description="View and manage all registered investors"
      actions={
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      }
    >
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search investors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Investors List */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">All Investors ({filteredInvestors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredInvestors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Investor</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Joined</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvestors.map((investor: { id: number; name?: string | null; email?: string | null; role: string; createdAt: Date }) => (
                    <tr key={investor.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-medium">
                            {investor.name?.charAt(0).toUpperCase() || "?"}
                          </div>
                          <span className="font-medium text-gray-900">{investor.name || "Unknown"}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{investor.email || "No email"}</td>
                      <td className="py-4 px-4">
                        <Badge className={investor.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"}>
                          {investor.role}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-500 text-sm">
                        {new Date(investor.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
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
              <Users className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Investors Found</h3>
              <p className="text-gray-500">
                {searchTerm ? "Try a different search term" : "No investors have registered yet"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
