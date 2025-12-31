import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientLayout from "@/components/ClientLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { 
  User, 
  Bell,
  Shield,
  CreditCard,
  Globe,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  CheckCircle
} from "lucide-react";

export default function Settings() {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    language: "en",
    currency: "PKR"
  });

  const [notifications, setNotifications] = useState({
    emailInvestments: true,
    emailDividends: true,
    emailMarketing: false,
    emailReports: true,
    smsInvestments: true,
    smsDividends: true,
    smsMarketing: false,
    pushEnabled: true
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: "30"
  });

  const handleSaveProfile = () => {
    toast.success("Profile settings saved successfully!");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved!");
  };

  const handleSaveSecurity = () => {
    toast.success("Security settings updated!");
  };

  const handleChangePassword = () => {
    toast.info("Password change email sent to your registered email address");
  };

  return (
    <ClientLayout title="Settings">
      <div className="space-y-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-gray-100 p-1">
            <TabsTrigger value="profile" className="data-[state=active]:bg-white">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-white">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-white">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="payment" className="data-[state=active]:bg-white">
              <CreditCard className="w-4 h-4 mr-2" />
              Payment
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <div className="flex gap-2 mt-1">
                      <Input value={profile.email} disabled className="bg-gray-50" />
                      <Badge className="bg-green-100 text-green-700 self-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <Input
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Language</label>
                    <Select value={profile.language} onValueChange={(v) => setProfile({ ...profile, language: v })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ur">اردو (Urdu)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Currency Display</label>
                    <Select value={profile.currency} onValueChange={(v) => setProfile({ ...profile, currency: v })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PKR">PKR - Pakistani Rupee</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSaveProfile}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive updates and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 flex items-center gap-2 mb-4">
                    <Mail className="w-5 h-5 text-purple-600" />
                    Email Notifications
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Investment Updates</p>
                        <p className="text-sm text-gray-500">Receive updates about your investments</p>
                      </div>
                      <Switch 
                        checked={notifications.emailInvestments} 
                        onCheckedChange={(v) => setNotifications({ ...notifications, emailInvestments: v })} 
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Dividend Notifications</p>
                        <p className="text-sm text-gray-500">Get notified when dividends are distributed</p>
                      </div>
                      <Switch 
                        checked={notifications.emailDividends} 
                        onCheckedChange={(v) => setNotifications({ ...notifications, emailDividends: v })} 
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Monthly Reports</p>
                        <p className="text-sm text-gray-500">Receive monthly portfolio reports</p>
                      </div>
                      <Switch 
                        checked={notifications.emailReports} 
                        onCheckedChange={(v) => setNotifications({ ...notifications, emailReports: v })} 
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Marketing & Promotions</p>
                        <p className="text-sm text-gray-500">New property listings and special offers</p>
                      </div>
                      <Switch 
                        checked={notifications.emailMarketing} 
                        onCheckedChange={(v) => setNotifications({ ...notifications, emailMarketing: v })} 
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium text-gray-900 flex items-center gap-2 mb-4">
                    <Smartphone className="w-5 h-5 text-purple-600" />
                    SMS Notifications
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Investment Confirmations</p>
                        <p className="text-sm text-gray-500">SMS alerts for investment transactions</p>
                      </div>
                      <Switch 
                        checked={notifications.smsInvestments} 
                        onCheckedChange={(v) => setNotifications({ ...notifications, smsInvestments: v })} 
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Dividend Alerts</p>
                        <p className="text-sm text-gray-500">SMS when dividends are credited</p>
                      </div>
                      <Switch 
                        checked={notifications.smsDividends} 
                        onCheckedChange={(v) => setNotifications({ ...notifications, smsDividends: v })} 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSaveNotifications}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your account password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Current Password</label>
                      <div className="relative mt-1">
                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" />
                        <button 
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div></div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">New Password</label>
                      <Input type="password" placeholder="••••••••" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                      <Input type="password" placeholder="••••••••" className="mt-1" />
                    </div>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleChangePassword}>
                    <Lock className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Enable 2FA</p>
                      <p className="text-sm text-gray-500">Use authenticator app for additional security</p>
                    </div>
                    <Switch 
                      checked={security.twoFactorEnabled} 
                      onCheckedChange={(v) => {
                        setSecurity({ ...security, twoFactorEnabled: v });
                        toast.info(v ? "2FA setup will be available soon" : "2FA disabled");
                      }} 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Login Security</CardTitle>
                  <CardDescription>Manage your login preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Login Alerts</p>
                      <p className="text-sm text-gray-500">Get notified of new login attempts</p>
                    </div>
                    <Switch 
                      checked={security.loginAlerts} 
                      onCheckedChange={(v) => setSecurity({ ...security, loginAlerts: v })} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Session Timeout</p>
                      <p className="text-sm text-gray-500">Auto logout after inactivity</p>
                    </div>
                    <Select value={security.sessionTimeout} onValueChange={(v) => setSecurity({ ...security, sessionTimeout: v })}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end pt-4 border-t">
                    <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSaveSecurity}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Security Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment options for investments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">PropertyPool Wallet</p>
                      <p className="text-sm text-gray-500">Balance: PKR 0.00</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => window.location.href = "/wallet"}>
                    Manage Wallet
                  </Button>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Bank Accounts</h4>
                  <div className="text-center py-8 bg-gray-50 rounded-xl">
                    <CreditCard className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">No bank accounts linked</p>
                    <Button variant="outline" className="mt-4" onClick={() => toast.info("Bank linking coming soon!")}>
                      Link Bank Account
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Mobile Wallets</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 font-bold">
                          EP
                        </div>
                        <span className="font-medium">Easypaisa</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => toast.info("Easypaisa linking coming soon!")}>
                        Link
                      </Button>
                    </div>
                    <div className="p-4 border rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-bold">
                          JC
                        </div>
                        <span className="font-medium">JazzCash</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => toast.info("JazzCash linking coming soon!")}>
                        Link
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClientLayout>
  );
}
