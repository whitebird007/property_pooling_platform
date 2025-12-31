import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { 
  FileText, 
  Download,
  Calendar,
  Filter,
  Clock,
  CheckCircle,
  FileSpreadsheet,
  FilePieChart,
  FileBarChart,
  Printer
} from "lucide-react";

export default function AdminReports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const reportTypes = [
    { 
      id: "financial", 
      name: "Financial Summary", 
      description: "Revenue, expenses, and profit analysis",
      icon: FileBarChart,
      lastGenerated: "2024-01-15",
      frequency: "Monthly"
    },
    { 
      id: "investor", 
      name: "Investor Report", 
      description: "Investor activity and portfolio performance",
      icon: FilePieChart,
      lastGenerated: "2024-01-14",
      frequency: "Weekly"
    },
    { 
      id: "property", 
      name: "Property Performance", 
      description: "Occupancy, rental income, and ROI by property",
      icon: FileSpreadsheet,
      lastGenerated: "2024-01-15",
      frequency: "Monthly"
    },
    { 
      id: "kyc", 
      name: "KYC Compliance", 
      description: "Verification status and pending approvals",
      icon: FileText,
      lastGenerated: "2024-01-15",
      frequency: "Daily"
    },
    { 
      id: "transaction", 
      name: "Transaction Report", 
      description: "All deposits, withdrawals, and investments",
      icon: FileSpreadsheet,
      lastGenerated: "2024-01-15",
      frequency: "Daily"
    },
    { 
      id: "tax", 
      name: "Tax Report", 
      description: "FBR compliant tax documentation",
      icon: FileText,
      lastGenerated: "2024-01-01",
      frequency: "Quarterly"
    },
  ];

  const recentReports = [
    { name: "Financial Summary - January 2024", date: "2024-01-15", size: "2.4 MB", status: "ready" },
    { name: "Investor Report - Week 2", date: "2024-01-14", size: "1.8 MB", status: "ready" },
    { name: "Property Performance - Q4 2023", date: "2024-01-01", size: "3.2 MB", status: "ready" },
    { name: "KYC Compliance - Daily", date: "2024-01-15", size: "856 KB", status: "generating" },
  ];

  return (
    <AdminLayout 
      title="Reports" 
      description="Generate and download platform reports"
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      }
    >
      {/* Report Types */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {reportTypes.map((report) => (
          <Card 
            key={report.id} 
            className={`border-0 shadow-sm cursor-pointer transition-all hover:shadow-md ${
              selectedReport === report.id ? "ring-2 ring-purple-500" : ""
            }`}
            onClick={() => setSelectedReport(report.id)}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <report.icon className="w-6 h-6 text-purple-600" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {report.frequency}
                </Badge>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{report.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{report.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Last: {report.lastGenerated}</span>
                <Button size="sm" variant="ghost" className="text-purple-600">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Reports</CardTitle>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{report.name}</h4>
                    <p className="text-sm text-gray-500">{report.date} • {report.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {report.status === "ready" ? (
                    <Badge className="bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Ready
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-700">
                      <Clock className="w-3 h-3 mr-1" />
                      Generating
                    </Badge>
                  )}
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" disabled={report.status !== "ready"}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" disabled={report.status !== "ready"}>
                      <Printer className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card className="border-0 shadow-sm mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Scheduled Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Report</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Frequency</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Next Run</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Recipients</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">Financial Summary</td>
                  <td className="py-4 px-4 text-gray-600">Monthly</td>
                  <td className="py-4 px-4 text-gray-600">Feb 1, 2024</td>
                  <td className="py-4 px-4 text-gray-600">admin@propertypool.pk</td>
                  <td className="py-4 px-4">
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">KYC Compliance</td>
                  <td className="py-4 px-4 text-gray-600">Daily</td>
                  <td className="py-4 px-4 text-gray-600">Tomorrow 9:00 AM</td>
                  <td className="py-4 px-4 text-gray-600">compliance@propertypool.pk</td>
                  <td className="py-4 px-4">
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
