import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  MessageSquare, 
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  User,
  Search,
  Filter,
  Loader2,
  ArrowLeft,
  CheckCheck,
  XCircle,
  MessageCircle,
  BarChart3
} from "lucide-react";

export default function AdminTickets() {
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Queries
  const { data: stats } = trpc.adminSupport.getStats.useQuery();
  const { data: tickets, refetch: refetchTickets } = trpc.adminSupport.getAllTickets.useQuery(
    statusFilter !== "all" ? { status: statusFilter as any } : undefined
  );
  const { data: ticketDetail, refetch: refetchTicketDetail } = trpc.support.getTicket.useQuery(
    { ticketId: selectedTicketId! },
    { enabled: !!selectedTicketId }
  );

  // Mutations
  const updateStatusMutation = trpc.adminSupport.updateTicketStatus.useMutation({
    onSuccess: () => {
      toast.success("Ticket status updated");
      refetchTickets();
      refetchTicketDetail();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update status");
    }
  });

  const replyMutation = trpc.adminSupport.replyToTicket.useMutation({
    onSuccess: () => {
      toast.success("Reply sent successfully");
      setReplyMessage("");
      refetchTicketDetail();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send reply");
    }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open": return <Badge className="bg-amber-100 text-amber-700">Open</Badge>;
      case "in_progress": return <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>;
      case "waiting": return <Badge className="bg-purple-100 text-purple-700">Waiting</Badge>;
      case "resolved": return <Badge className="bg-green-100 text-green-700">Resolved</Badge>;
      case "closed": return <Badge className="bg-gray-100 text-gray-700">Closed</Badge>;
      default: return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent": return <Badge variant="destructive">Urgent</Badge>;
      case "high": return <Badge className="bg-red-100 text-red-700">High</Badge>;
      case "medium": return <Badge className="bg-amber-100 text-amber-700">Medium</Badge>;
      case "low": return <Badge className="bg-gray-100 text-gray-700">Low</Badge>;
      default: return null;
    }
  };

  const handleSendReply = () => {
    if (!replyMessage.trim() || !selectedTicketId) return;
    replyMutation.mutate({
      ticketId: selectedTicketId,
      message: replyMessage,
      isInternal: isInternal,
    });
  };

  const handleUpdateStatus = (status: "open" | "in_progress" | "waiting" | "resolved" | "closed") => {
    if (!selectedTicketId) return;
    updateStatusMutation.mutate({ ticketId: selectedTicketId, status });
  };

  const filteredTickets = tickets?.filter(ticket => {
    if (!searchQuery) return true;
    return ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
           ticket.id.toString().includes(searchQuery);
  });

  // Ticket Detail View
  if (selectedTicketId && ticketDetail) {
    return (
      <AdminLayout title="Support Tickets">
        <div className="space-y-6">
          <Button variant="ghost" onClick={() => setSelectedTicketId(null)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tickets
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chat Area */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-mono text-gray-500">TKT-{ticketDetail.ticket.id.toString().padStart(3, '0')}</span>
                        {getStatusBadge(ticketDetail.ticket.status)}
                        {getPriorityBadge(ticketDetail.ticket.priority)}
                      </div>
                      <CardTitle>{ticketDetail.ticket.subject}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        Category: {ticketDetail.ticket.category} • Created: {new Date(ticketDetail.ticket.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {ticketDetail.messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`flex ${msg.senderType === 'admin' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            msg.senderType === 'admin' 
                              ? msg.isInternal 
                                ? 'bg-yellow-100 text-gray-900 border-2 border-yellow-300'
                                : 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <div className="flex items-center gap-2 mb-1">
                              <User className="w-4 h-4" />
                              <span className={`text-xs ${msg.senderType === 'admin' && !msg.isInternal ? 'text-blue-200' : 'text-gray-500'}`}>
                                {msg.senderType === 'admin' ? (msg.isInternal ? 'Internal Note' : 'Support Team') : 'Customer'}
                              </span>
                            </div>
                            <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                            <p className={`text-xs mt-1 ${msg.senderType === 'admin' && !msg.isInternal ? 'text-blue-200' : 'text-gray-500'}`}>
                              {new Date(msg.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {ticketDetail.ticket.status !== 'closed' && (
                    <div className="mt-4 pt-4 border-t space-y-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="internal"
                          checked={isInternal}
                          onChange={(e) => setIsInternal(e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor="internal" className="text-sm text-gray-600">
                          Internal note (not visible to customer)
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Type your reply..."
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleSendReply} 
                          disabled={replyMutation.isPending || !replyMessage.trim()}
                          className={isInternal ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"}
                        >
                          {replyMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                          {isInternal ? "Add Internal Note" : "Send Reply"}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Ticket Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Update Status</label>
                    <Select 
                      value={ticketDetail.ticket.status} 
                      onValueChange={(v: any) => handleUpdateStatus(v)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="waiting">Waiting for Customer</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-green-600 border-green-200 hover:bg-green-50"
                      onClick={() => handleUpdateStatus("resolved")}
                    >
                      <CheckCheck className="w-4 h-4 mr-2" />
                      Mark as Resolved
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-gray-600 border-gray-200 hover:bg-gray-50"
                      onClick={() => handleUpdateStatus("closed")}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Close Ticket
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Customer Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">User ID:</span>
                      <span className="font-medium">{ticketDetail.ticket.userId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-medium capitalize">{ticketDetail.ticket.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Priority:</span>
                      <span className="font-medium capitalize">{ticketDetail.ticket.priority}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Created:</span>
                      <span className="font-medium">{new Date(ticketDetail.ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Support Tickets">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
            <p className="text-gray-500">Manage and respond to customer support requests</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Open</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.open || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.inProgress || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Resolved</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.resolved || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.total || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tickets</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="waiting">Waiting</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tickets List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">All Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!filteredTickets || filteredTickets.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No tickets found</p>
                </div>
              ) : (
                filteredTickets.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => setSelectedTicketId(ticket.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        ticket.priority === 'urgent' ? 'bg-red-100' :
                        ticket.priority === 'high' ? 'bg-orange-100' :
                        'bg-white shadow-sm'
                      }`}>
                        <MessageCircle className={`w-5 h-5 ${
                          ticket.priority === 'urgent' ? 'text-red-600' :
                          ticket.priority === 'high' ? 'text-orange-600' :
                          'text-purple-600'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-mono text-gray-500">TKT-{ticket.id.toString().padStart(3, '0')}</span>
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                          <Badge variant="outline" className="capitalize">{ticket.category}</Badge>
                        </div>
                        <h4 className="font-medium text-gray-900 mt-1">{ticket.subject}</h4>
                        <p className="text-sm text-gray-500">
                          User #{ticket.userId} • {new Date(ticket.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
