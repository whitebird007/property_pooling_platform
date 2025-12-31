import { useState } from "react";
import { Link } from "wouter";
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
  Globe,
  Wallet,
  PieChart,
  CheckCircle
} from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to OAuth login
    window.location.href = getLoginUrl();
  };

  const handleOAuthLogin = () => {
    window.location.href = getLoginUrl();
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

          {/* OAuth Button */}
          <Button 
            onClick={handleOAuthLogin}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6 text-lg rounded-xl shadow-lg shadow-purple-500/25"
          >
            <Globe className="mr-2 w-5 h-5" />
            Continue with Manus Account
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-50 text-gray-500">Or sign in with email</span>
            </div>
          </div>

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
                  className="pl-12 py-6 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 rounded-xl"
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
                  className="pl-12 pr-12 py-6 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                className="border-gray-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                Remember me for 30 days
              </Label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-6 text-lg rounded-xl"
            >
              Sign In
              <ArrowRight className="ml-2 w-5 h-5" />
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
