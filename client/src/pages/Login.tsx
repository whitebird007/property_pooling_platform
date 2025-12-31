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
  ArrowRight, 
  Eye, 
  EyeOff,
  Shield,
  TrendingUp,
  Wallet,
  PieChart,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const loginMutation = trpc.auth.login.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!formData.email || !formData.password) {
        setError("Please enter both email and password");
        setIsLoading(false);
        return;
      }

      const result = await loginMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        // Redirect to dashboard
        setLocation("/dashboard");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
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
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access your investment portfolio</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            {/* Remember Me */}
            <div className="flex items-center gap-3">
              <Checkbox 
                id="remember" 
                checked={formData.rememberMe}
                onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                disabled={isLoading}
                className="border-gray-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                Remember me for 30 days
              </Label>
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
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-purple-600 hover:text-purple-700 font-semibold">
              Create Account
            </Link>
          </p>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <Shield className="w-4 h-4" />
            <span>Your data is protected with bank-level security</span>
          </div>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-purple-600 to-purple-800 items-center justify-center p-12 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />
        </div>

        <div className="relative z-10 max-w-lg space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
            <TrendingUp className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Your Portfolio Awaits</span>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight">
            Welcome Back to
            <span className="block text-purple-200">
              PropertyPool
            </span>
          </h2>

          <p className="text-purple-200 text-lg">
            Access your investment portfolio, track returns, and discover new property opportunities.
          </p>

          {/* Stats Preview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-3">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-white">PKR 500M+</p>
              <p className="text-purple-200 text-sm">Total Investments</p>
            </div>
            <div className="p-5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-3">
                <PieChart className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-white">8-12%</p>
              <p className="text-purple-200 text-sm">Avg. Returns</p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {[
              "SECP Registered SPV",
              "100% Shariah Compliant",
              "8-12% Annual Returns",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-white">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
