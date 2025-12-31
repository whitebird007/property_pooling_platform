import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ClientLayout from "@/components/ClientLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { 
  MessageSquare, 
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Send,
  MessageCircle,
  X,
  Bot,
  User,
  Loader2,
  ArrowLeft,
  Sparkles
} from "lucide-react";

export default function Support() {
  const { user, isAuthenticated, loading } = useAuth();
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [chatSessionId] = useState(() => `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [chatInput, setChatInput] = useState("");
  const [ticketReply, setTicketReply] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "general" as "general" | "investment" | "technical" | "kyc" | "payment" | "other",
    priority: "medium" as "low" | "medium" | "high" | "urgent",
    message: ""
  });

  // Queries
  const { data: tickets, refetch: refetchTickets } = trpc.support.getMyTickets.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  const { data: ticketDetail, refetch: refetchTicketDetail } = trpc.support.getTicket.useQuery(
    { ticketId: selectedTicketId! },
    { enabled: !!selectedTicketId }
  );
  
  const { data: chatHistory, refetch: refetchChat } = trpc.chat.getHistory.useQuery(
    { sessionId: chatSessionId },
    { enabled: isAuthenticated && isChatOpen }
  );

  // Mutations
  const createTicketMutation = trpc.support.createTicket.useMutation({
    onSuccess: () => {
      toast.success("Support ticket created successfully!");
      setIsNewTicketOpen(false);
      setNewTicket({ subject: "", category: "general", priority: "medium", message: "" });
      refetchTickets();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create ticket");
    }
  });

  const addMessageMutation = trpc.support.addMessage.useMutation({
    onSuccess: () => {
      setTicketReply("");
      refetchTicketDetail();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send message");
    }
  });

  const sendChatMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: () => {
      refetchChat();
    },
    onError: () => {
      toast.error("Failed to get response. Please try again.");
    }
  });

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const openCount = tickets?.filter(t => t.status === "open").length || 0;
  const resolvedCount = tickets?.filter(t => t.status === "resolved" || t.status === "closed").length || 0;

  const supportStats = [
    { label: "Open Tickets", value: openCount.toString(), icon: AlertCircle, color: "bg-amber-100 text-amber-600" },
    { label: "Resolved", value: resolvedCount.toString(), icon: CheckCircle, color: "bg-green-100 text-green-600" },
    { label: "Avg Response", value: "2h", icon: Clock, color: "bg-blue-100 text-blue-600" },
  ];

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

  const handleCreateTicket = () => {
    if (!newTicket.subject || !newTicket.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    createTicketMutation.mutate({
      subject: newTicket.subject,
      description: newTicket.message,
      category: newTicket.category,
      priority: newTicket.priority,
    });
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const message = chatInput;
    setChatInput("");
    sendChatMutation.mutate({ sessionId: chatSessionId, message });
  };

  const handleSendTicketReply = () => {
    if (!ticketReply.trim() || !selectedTicketId) return;
    addMessageMutation.mutate({ ticketId: selectedTicketId, message: ticketReply });
  };

  if (loading) {
    return (
      <ClientLayout title="Support">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      </ClientLayout>
    );
  }

  // Ticket Detail View
  if (selectedTicketId && ticketDetail) {
    return (
      <ClientLayout title="Support">
        <div className="space-y-6">
          <Button variant="ghost" onClick={() => setSelectedTicketId(null)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tickets
          </Button>

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
                    Created: {new Date(ticketDetail.ticket.createdAt).toLocaleDateString()}
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
                      className={`flex ${msg.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.senderType === 'user' 
                          ? 'bg-purple-600 text-white' 
                          : msg.senderType === 'admin'
                          ? 'bg-blue-100 text-gray-900'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          {msg.senderType === 'user' ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                          <span className="text-xs opacity-75">
                            {msg.senderType === 'user' ? 'You' : 'Support Team'}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                        <p className={`text-xs mt-1 ${msg.senderType === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
                          {new Date(msg.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {ticketDetail.ticket.status !== 'closed' && ticketDetail.ticket.status !== 'resolved' && (
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Input
                    placeholder="Type your reply..."
                    value={ticketReply}
                    onChange={(e) => setTicketReply(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendTicketReply()}
                  />
                  <Button 
                    onClick={handleSendTicketReply} 
                    disabled={addMessageMutation.isPending}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {addMessageMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </ClientLayout>
    );
  }

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
          <Card 
            className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white" 
            onClick={() => setIsChatOpen(true)}
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">AI Chat Assistant</h4>
                  <p className="text-sm text-gray-500">Get instant help 24/7</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.open("tel:+924211178678")}>
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

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.open("mailto:support@propertypool.pk")}>
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
                      <Select value={newTicket.category} onValueChange={(v: any) => setNewTicket({ ...newTicket, category: v })}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="investment">Investment</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="kyc">KYC Verification</SelectItem>
                          <SelectItem value="payment">Payment</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Priority</label>
                      <Select value={newTicket.priority} onValueChange={(v: any) => setNewTicket({ ...newTicket, priority: v })}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
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
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700" 
                      onClick={handleCreateTicket}
                      disabled={createTicketMutation.isPending}
                    >
                      {createTicketMutation.isPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      Submit Ticket
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!tickets || tickets.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No support tickets yet</p>
                  <p className="text-sm text-gray-400">Create a ticket or chat with our AI assistant</p>
                </div>
              ) : (
                tickets.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => setSelectedTicketId(ticket.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono text-gray-500">TKT-{ticket.id.toString().padStart(3, '0')}</span>
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                        <h4 className="font-medium text-gray-900">{ticket.subject}</h4>
                        <p className="text-sm text-gray-500">
                          {ticket.category} • Created: {new Date(ticket.createdAt).toLocaleDateString()}
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

      {/* Live Chat Widget */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border flex flex-col z-50">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-white">PropertyPool AI</h4>
                <p className="text-xs text-purple-200">Always here to help</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsChatOpen(false)} className="text-white hover:bg-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {/* Welcome message */}
              {(!chatHistory || chatHistory.length === 0) && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="w-4 h-4 text-purple-600" />
                      <span className="text-xs text-gray-500">PropertyPool AI</span>
                    </div>
                    <p className="text-sm text-gray-900">
                      Assalam-o-Alaikum! 👋 I'm your PropertyPool AI assistant. How can I help you today? You can ask me about:
                    </p>
                    <ul className="text-sm text-gray-700 mt-2 space-y-1">
                      <li>• Property investments</li>
                      <li>• KYC verification</li>
                      <li>• Wallet & payments</li>
                      <li>• Marketplace trading</li>
                    </ul>
                  </div>
                </div>
              )}

              {chatHistory?.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {msg.role === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4 text-purple-600" />
                      )}
                      <span className={`text-xs ${msg.role === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
                        {msg.role === 'user' ? 'You' : 'PropertyPool AI'}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}

              {sendChatMutation.isPending && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-gray-100">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                      <span className="text-sm text-gray-500">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendChat()}
                disabled={sendChatMutation.isPending}
              />
              <Button 
                onClick={handleSendChat} 
                disabled={sendChatMutation.isPending || !chatInput.trim()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Need human help? <button onClick={() => { setIsChatOpen(false); setIsNewTicketOpen(true); }} className="text-purple-600 hover:underline">Create a ticket</button>
            </p>
          </div>
        </div>
      )}

      {/* Floating Chat Button (when chat is closed) */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}
    </ClientLayout>
  );
}
