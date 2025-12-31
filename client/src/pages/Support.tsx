import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ClientLayout from "@/components/ClientLayout";
import { toast } from "sonner";
import { 
  MessageSquare, 
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  HelpCircle,
  FileText,
  Send,
  Headphones,
  MessageCircle
} from "lucide-react";

type Ticket = {
  id: string;
  subject: string;
  category: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  lastUpdate: string;
  messages: number;
};

export default function Support() {
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "",
    priority: "medium",
    message: ""
  });

  const tickets: Ticket[] = [
    { id: "TKT-001", subject: "Investment withdrawal query", category: "Wallet", status: "in_progress", priority: "high", createdAt: "2024-12-28", lastUpdate: "2024-12-30", messages: 4 },
    { id: "TKT-002", subject: "KYC document verification delay", category: "KYC", status: "resolved", priority: "medium", createdAt: "2024-12-25", lastUpdate: "2024-12-27", messages: 3 },
    { id: "TKT-003", subject: "Dividend payment not received", category: "Payments", status: "open", priority: "high", createdAt: "2024-12-30", lastUpdate: "2024-12-30", messages: 1 },
  ];

  const supportStats = [
    { label: "Open Tickets", value: "2", icon: AlertCircle, color: "bg-amber-100 text-amber-600" },
    { label: "Resolved", value: "15", icon: CheckCircle, color: "bg-green-100 text-green-600" },
    { label: "Avg Response", value: "2h", icon: Clock, color: "bg-blue-100 text-blue-600" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open": return <Badge className="bg-amber-100 text-amber-700">Open</Badge>;
      case "in_progress": return <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>;
      case "resolved": return <Badge className="bg-green-100 text-green-700">Resolved</Badge>;
      case "closed": return <Badge className="bg-gray-100 text-gray-700">Closed</Badge>;
      default: return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return <Badge variant="destructive">High</Badge>;
      case "medium": return <Badge className="bg-amber-100 text-amber-700">Medium</Badge>;
      case "low": return <Badge className="bg-gray-100 text-gray-700">Low</Badge>;
      default: return null;
    }
  };

  const handleCreateTicket = () => {
    if (!newTicket.subject || !newTicket.category || !newTicket.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Support ticket created successfully! Ticket ID: TKT-004");
    setIsNewTicketOpen(false);
    setNewTicket({ subject: "", category: "", priority: "medium", message: "" });
  };

  const handleViewTicket = (ticket: Ticket) => {
    toast.info(`Opening ticket ${ticket.id}: ${ticket.subject}`);
  };

  return (
    <ClientLayout title="Support">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {supportStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => toast.info("Live chat coming soon!")}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Live Chat</h4>
                  <p className="text-sm text-gray-500">Chat with support agent</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => toast.info("Call: +92 42 111 786 786")}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Call Us</h4>
                  <p className="text-sm text-gray-500">+92 42 111 786 786</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => toast.info("Email: support@propertypool.pk")}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <p className="text-sm text-gray-500">support@propertypool.pk</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tickets */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Your Support Tickets</CardTitle>
            <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Ticket
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create Support Ticket</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Subject *</label>
                    <Input
                      placeholder="Brief description of your issue"
                      value={newTicket.subject}
                      onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Category *</label>
                      <Select value={newTicket.category} onValueChange={(v) => setNewTicket({ ...newTicket, category: v })}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="account">Account</SelectItem>
                          <SelectItem value="kyc">KYC Verification</SelectItem>
                          <SelectItem value="wallet">Wallet & Payments</SelectItem>
                          <SelectItem value="investment">Investments</SelectItem>
                          <SelectItem value="marketplace">Marketplace</SelectItem>
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Priority</label>
                      <Select value={newTicket.priority} onValueChange={(v) => setNewTicket({ ...newTicket, priority: v })}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Message *</label>
                    <Textarea
                      placeholder="Describe your issue in detail..."
                      value={newTicket.message}
                      onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                      className="mt-1 min-h-[120px]"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => setIsNewTicketOpen(false)}>Cancel</Button>
                    <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleCreateTicket}>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Ticket
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div 
                  key={ticket.id} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleViewTicket(ticket)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono text-gray-500">{ticket.id}</span>
                        {getStatusBadge(ticket.status)}
                        {getPriorityBadge(ticket.priority)}
                      </div>
                      <h4 className="font-medium text-gray-900">{ticket.subject}</h4>
                      <p className="text-sm text-gray-500">
                        {ticket.category} • Last update: {ticket.lastUpdate} • {ticket.messages} messages
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              ))}

              {tickets.length === 0 && (
                <div className="text-center py-12">
                  <Headphones className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No support tickets yet</p>
                  <p className="text-sm text-gray-400">Create a ticket if you need help</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Help Resources */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Help Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => window.location.href = "/faq"}>
                <HelpCircle className="w-8 h-8 text-purple-600" />
                <div>
                  <h4 className="font-medium text-gray-900">FAQ</h4>
                  <p className="text-sm text-gray-500">Find answers to common questions</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => window.location.href = "/education"}>
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Knowledge Base</h4>
                  <p className="text-sm text-gray-500">Learn about property investment</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
}
