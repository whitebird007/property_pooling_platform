import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Building2, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowRight, 
  Eye, 
  EyeOff,
  Shield,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function SignUp() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreePrivacy: false
  });

  const registerMutation = trpc.auth.register.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validation
      if (!formData.fullName || !formData.email || !formData.password) {
        setError("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        setIsLoading(false);
        return;
      }

      if (!formData.agreeTerms || !formData.agreePrivacy) {
        setError("You must agree to the Terms and Privacy Policy");
        setIsLoading(false);
        return;
      }

      const result = await registerMutation.mutateAsync({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        // Redirect to dashboard
        setLocation("/dashboard");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed. Please try again.";
      setError(message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-purple-600 to-purple-800 items-center justify-center p-12 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />
        </div>

        <div className="relative z-10 max-w-lg space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Join 2,500+ Investors</span>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight">
            Start Building Wealth Through
            <span className="block text-purple-200">
              Property Investment
            </span>
          </h2>

          <p className="text-purple-200 text-lg">
            Invest in premium real estate starting from just PKR 50,000. Shariah-compliant, transparent, and professionally managed.
          </p>

          <div className="space-y-4">
            {[
              { title: "Start Small", desc: "Invest from PKR 50,000" },
              { title: "Earn Passive Income", desc: "8-12% annual rental yields" },
              { title: "Build Wealth", desc: "Property appreciation over time" },
              { title: "100% Legal", desc: "SECP registered SPV structure" },
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">{benefit.title}</p>
                  <p className="text-purple-200 text-sm">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Property<span className="text-purple-600">Pool</span>
              </span>
            </div>
          </Link>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
            <p className="text-gray-600">Start your property investment journey today</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  disabled={isLoading}
                  className="pl-12 py-6 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 rounded-xl disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isLoading}
                  className="pl-12 py-6 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 rounded-xl disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number (Optional)</Label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+92 300 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={isLoading}
                  className="pl-12 py-6 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 rounded-xl disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password (min. 8 chars)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={isLoading}
                  className="pl-12 pr-12 py-6 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 rounded-xl disabled:bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  disabled={isLoading}
                  className="pl-12 pr-12 py-6 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 rounded-xl disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Checkbox 
                  id="terms" 
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                  disabled={isLoading}
                  className="mt-1 border-gray-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                  I agree to the <Link href="/terms" className="text-purple-600 hover:text-purple-700">Terms of Service</Link> and understand the investment risks
                </Label>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox 
                  id="privacy" 
                  checked={formData.agreePrivacy}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreePrivacy: checked as boolean })}
                  disabled={isLoading}
                  className="mt-1 border-gray-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Label htmlFor="privacy" className="text-sm text-gray-600 leading-relaxed">
                  I agree to the <Link href="/privacy" className="text-purple-600 hover:text-purple-700">Privacy Policy</Link> and consent to data processing
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-6 text-lg rounded-xl disabled:bg-gray-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
              Sign In
            </Link>
          </p>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <Shield className="w-4 h-4" />
            <span>Your data is protected with bank-level security</span>
          </div>
        </div>
      </div>
    </div>
  );
}
