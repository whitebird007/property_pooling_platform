import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AdminLayout from "@/components/AdminLayout";
import { toast } from "sonner";
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
  Printer,
  Plus,
  Edit,
  Trash2,
  Eye,
  Send,
  X
} from "lucide-react";

type ReportType = {
  id: string;
  name: string;
  description: string;
  icon: any;
  lastGenerated: string;
  frequency: string;
};

type RecentReport = {
  id: number;
  name: string;
  date: string;
  size: string;
  status: "ready" | "generating";
  type: string;
};

type ScheduledReport = {
  id: number;
  report: string;
  frequency: string;
  nextRun: string;
  recipients: string;
  status: "active" | "paused";
};

export default function AdminReports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [generateDialogOpen, setGenerateDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [editScheduleDialogOpen, setEditScheduleDialogOpen] = useState(false);
  const [viewReportDialogOpen, setViewReportDialogOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduledReport | null>(null);
  const [selectedViewReport, setSelectedViewReport] = useState<RecentReport | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [newReport, setNewReport] = useState({
    type: "",
    dateFrom: "",
    dateTo: "",
    format: "pdf",
  });

  const [newSchedule, setNewSchedule] = useState({
    report: "",
    frequency: "daily",
    recipients: "",
  });

  const reportTypes: ReportType[] = [
    { 
      id: "financial", 
      name: "Financial Summary", 
      description: "Revenue, expenses, and profit analysis",
      icon: FileBarChart,
      lastGenerated: "2024-12-30",
      frequency: "Monthly"
    },
    { 
      id: "investor", 
      name: "Investor Report", 
      description: "Investor activity and portfolio performance",
      icon: FilePieChart,
      lastGenerated: "2024-12-29",
      frequency: "Weekly"
    },
    { 
      id: "property", 
      name: "Property Performance", 
      description: "Occupancy, rental income, and ROI by property",
      icon: FileSpreadsheet,
      lastGenerated: "2024-12-30",
      frequency: "Monthly"
    },
    { 
      id: "kyc", 
      name: "KYC Compliance", 
      description: "Verification status and pending approvals",
      icon: FileText,
      lastGenerated: "2024-12-31",
      frequency: "Daily"
    },
    { 
      id: "transaction", 
      name: "Transaction Report", 
      description: "All deposits, withdrawals, and investments",
      icon: FileSpreadsheet,
      lastGenerated: "2024-12-31",
      frequency: "Daily"
    },
    { 
      id: "tax", 
      name: "Tax Report", 
      description: "FBR compliant tax documentation",
      icon: FileText,
      lastGenerated: "2024-12-01",
      frequency: "Quarterly"
    },
  ];

  const [recentReports, setRecentReports] = useState<RecentReport[]>([
    { id: 1, name: "Financial Summary - December 2024", date: "2024-12-30", size: "2.4 MB", status: "ready", type: "financial" },
    { id: 2, name: "Investor Report - Week 52", date: "2024-12-29", size: "1.8 MB", status: "ready", type: "investor" },
    { id: 3, name: "Property Performance - Q4 2024", date: "2024-12-31", size: "3.2 MB", status: "ready", type: "property" },
    { id: 4, name: "KYC Compliance - Daily", date: "2024-12-31", size: "856 KB", status: "generating", type: "kyc" },
  ]);

  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>([
    { id: 1, report: "Financial Summary", frequency: "Monthly", nextRun: "Jan 1, 2025", recipients: "admin@propertypool.pk", status: "active" },
    { id: 2, report: "KYC Compliance", frequency: "Daily", nextRun: "Tomorrow 9:00 AM", recipients: "compliance@propertypool.pk", status: "active" },
  ]);

  const handleGenerateReport = () => {
    if (!newReport.type) {
      toast.error("Please select a report type");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      const reportType = reportTypes.find(r => r.id === newReport.type);
      const newReportEntry: RecentReport = {
        id: Date.now(),
        name: `${reportType?.name} - ${new Date().toLocaleDateString()}`,
        date: new Date().toISOString().split("T")[0],
        size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
        status: "ready",
        type: newReport.type,
      };
      
      setRecentReports([newReportEntry, ...recentReports]);
      setIsGenerating(false);
      setGenerateDialogOpen(false);
      setNewReport({ type: "", dateFrom: "", dateTo: "", format: "pdf" });
      toast.success("Report generated successfully!");
    }, 2000);
  };

  const handleDownloadReport = (report: RecentReport) => {
    if (report.status !== "ready") {
      toast.error("Report is still generating");
      return;
    }
    
    // Create a sample CSV content
    const csvContent = `PropertyPool Report: ${report.name}
Generated: ${report.date}

Sample Data:
Date,Description,Amount
2024-12-01,Investment,PKR 500000
2024-12-15,Rental Income,PKR 25000
2024-12-20,Dividend,PKR 15000
`;
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.name.replace(/\s+/g, "_")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Report downloaded successfully!");
  };

  const handlePrintReport = (report: RecentReport) => {
    if (report.status !== "ready") {
      toast.error("Report is still generating");
      return;
    }
    
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${report.name}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; }
              h1 { color: #7c3aed; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
              th { background-color: #f3f4f6; }
              .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
              .logo { font-size: 24px; font-weight: bold; color: #7c3aed; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">PropertyPool</div>
              <div>Generated: ${new Date().toLocaleDateString()}</div>
            </div>
            <h1>${report.name}</h1>
            <p>Report Date: ${report.date}</p>
            <p>File Size: ${report.size}</p>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount (PKR)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>2024-12-01</td><td>Investment</td><td>500,000</td></tr>
                <tr><td>2024-12-15</td><td>Rental Income</td><td>25,000</td></tr>
                <tr><td>2024-12-20</td><td>Dividend</td><td>15,000</td></tr>
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
    toast.success("Print dialog opened");
  };

  const handleViewReport = (report: RecentReport) => {
    setSelectedViewReport(report);
    setViewReportDialogOpen(true);
  };

  const handleEditSchedule = (schedule: ScheduledReport) => {
    setSelectedSchedule(schedule);
    setNewSchedule({
      report: schedule.report,
      frequency: schedule.frequency.toLowerCase(),
      recipients: schedule.recipients,
    });
    setEditScheduleDialogOpen(true);
  };

  const handleSaveSchedule = () => {
    if (!selectedSchedule) return;
    
    setScheduledReports(scheduledReports.map(s => 
      s.id === selectedSchedule.id 
        ? { ...s, frequency: newSchedule.frequency.charAt(0).toUpperCase() + newSchedule.frequency.slice(1), recipients: newSchedule.recipients }
        : s
    ));
    setEditScheduleDialogOpen(false);
    toast.success("Schedule updated successfully!");
  };

  const handleDeleteSchedule = (id: number) => {
    setScheduledReports(scheduledReports.filter(s => s.id !== id));
    toast.success("Schedule deleted");
  };

  const handleToggleScheduleStatus = (id: number) => {
    setScheduledReports(scheduledReports.map(s => 
      s.id === id ? { ...s, status: s.status === "active" ? "paused" : "active" } : s
    ));
    toast.success("Schedule status updated");
  };

  const handleAddSchedule = () => {
    if (!newSchedule.report || !newSchedule.recipients) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const newEntry: ScheduledReport = {
      id: Date.now(),
      report: newSchedule.report,
      frequency: newSchedule.frequency.charAt(0).toUpperCase() + newSchedule.frequency.slice(1),
      nextRun: "Tomorrow 9:00 AM",
      recipients: newSchedule.recipients,
      status: "active",
    };
    
    setScheduledReports([...scheduledReports, newEntry]);
    setScheduleDialogOpen(false);
    setNewSchedule({ report: "", frequency: "daily", recipients: "" });
    toast.success("Schedule created successfully!");
  };

  const handleQuickDownload = (reportType: ReportType) => {
    const report: RecentReport = {
      id: Date.now(),
      name: `${reportType.name} - Latest`,
      date: reportType.lastGenerated,
      size: "1.5 MB",
      status: "ready",
      type: reportType.id,
    };
    handleDownloadReport(report);
  };

  return (
    <AdminLayout 
      title="Reports" 
      description="Generate and download platform reports"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setScheduleDialogOpen(true)}>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setGenerateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
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
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-purple-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickDownload(report);
                  }}
                >
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
          <Button variant="outline" size="sm" onClick={() => toast.info("Filter feature coming soon")}>
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      disabled={report.status !== "ready"}
                      onClick={() => handleViewReport(report)}
                      title="View Report"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      disabled={report.status !== "ready"}
                      onClick={() => handleDownloadReport(report)}
                      title="Download Report"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      disabled={report.status !== "ready"}
                      onClick={() => handlePrintReport(report)}
                      title="Print Report"
                    >
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Scheduled Reports</CardTitle>
          <Button size="sm" onClick={() => setScheduleDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Schedule
          </Button>
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
                {scheduledReports.map((schedule) => (
                  <tr key={schedule.id} className="border-b border-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{schedule.report}</td>
                    <td className="py-4 px-4 text-gray-600">{schedule.frequency}</td>
                    <td className="py-4 px-4 text-gray-600">{schedule.nextRun}</td>
                    <td className="py-4 px-4 text-gray-600">{schedule.recipients}</td>
                    <td className="py-4 px-4">
                      <Badge 
                        className={schedule.status === "active" ? "bg-green-100 text-green-700 cursor-pointer" : "bg-gray-100 text-gray-700 cursor-pointer"}
                        onClick={() => handleToggleScheduleStatus(schedule.id)}
                      >
                        {schedule.status === "active" ? "Active" : "Paused"}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditSchedule(schedule)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteSchedule(schedule.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Generate Report Dialog */}
      <Dialog open={generateDialogOpen} onOpenChange={setGenerateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
            <DialogDescription>
              Select report type and date range to generate a new report
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select value={newReport.type} onValueChange={(v) => setNewReport({ ...newReport, type: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From Date</Label>
                <Input 
                  type="date" 
                  value={newReport.dateFrom}
                  onChange={(e) => setNewReport({ ...newReport, dateFrom: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>To Date</Label>
                <Input 
                  type="date" 
                  value={newReport.dateTo}
                  onChange={(e) => setNewReport({ ...newReport, dateTo: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Format</Label>
              <Select value={newReport.format} onValueChange={(v) => setNewReport({ ...newReport, format: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGenerateDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleGenerateReport} 
              disabled={isGenerating}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isGenerating ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Report Dialog */}
      <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Report</DialogTitle>
            <DialogDescription>
              Set up automatic report generation and delivery
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select value={newSchedule.report} onValueChange={(v) => setNewSchedule({ ...newSchedule, report: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.id} value={type.name}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select value={newSchedule.frequency} onValueChange={(v) => setNewSchedule({ ...newSchedule, frequency: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Recipients (Email)</Label>
              <Input 
                placeholder="email@example.com"
                value={newSchedule.recipients}
                onChange={(e) => setNewSchedule({ ...newSchedule, recipients: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSchedule} className="bg-purple-600 hover:bg-purple-700">
              <Calendar className="w-4 h-4 mr-2" />
              Create Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Schedule Dialog */}
      <Dialog open={editScheduleDialogOpen} onOpenChange={setEditScheduleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Schedule</DialogTitle>
            <DialogDescription>
              Update the schedule settings for {selectedSchedule?.report}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select value={newSchedule.frequency} onValueChange={(v) => setNewSchedule({ ...newSchedule, frequency: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Recipients (Email)</Label>
              <Input 
                placeholder="email@example.com"
                value={newSchedule.recipients}
                onChange={(e) => setNewSchedule({ ...newSchedule, recipients: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditScheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSchedule} className="bg-purple-600 hover:bg-purple-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Report Dialog */}
      <Dialog open={viewReportDialogOpen} onOpenChange={setViewReportDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedViewReport?.name}</DialogTitle>
            <DialogDescription>
              Generated on {selectedViewReport?.date} • {selectedViewReport?.size}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">Report Preview</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Date</th>
                    <th className="text-left py-2 px-4">Description</th>
                    <th className="text-right py-2 px-4">Amount (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">2024-12-01</td>
                    <td className="py-2 px-4">Investment - DHA Phase 6</td>
                    <td className="py-2 px-4 text-right">500,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">2024-12-15</td>
                    <td className="py-2 px-4">Rental Income</td>
                    <td className="py-2 px-4 text-right text-green-600">+25,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">2024-12-20</td>
                    <td className="py-2 px-4">Dividend Distribution</td>
                    <td className="py-2 px-4 text-right text-green-600">+15,000</td>
                  </tr>
                  <tr className="font-bold">
                    <td className="py-2 px-4" colSpan={2}>Total</td>
                    <td className="py-2 px-4 text-right">540,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewReportDialogOpen(false)}>
              Close
            </Button>
            <Button variant="outline" onClick={() => selectedViewReport && handlePrintReport(selectedViewReport)}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button onClick={() => selectedViewReport && handleDownloadReport(selectedViewReport)} className="bg-purple-600 hover:bg-purple-700">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
