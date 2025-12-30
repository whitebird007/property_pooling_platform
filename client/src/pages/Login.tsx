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
  Sparkles,
  Globe,
  Wallet,
  PieChart
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
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-slate-900 to-slate-950 items-center justify-center p-12">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/hero-bg.png')" }}
          />
        </div>

        <div className="relative z-10 max-w-lg space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Your Portfolio Awaits</span>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight">
            Welcome Back to
            <span className="block bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              PropertyPool
            </span>
          </h2>

          <p className="text-slate-400 text-lg">
            Access your investment portfolio, track returns, and discover new property opportunities.
          </p>

          {/* Stats Preview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center mb-3">
                <Wallet className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-2xl font-bold text-white">PKR 500M+</p>
              <p className="text-slate-400 text-sm">Total Investments</p>
            </div>
            <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-3">
                <PieChart className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-white">8-12%</p>
              <p className="text-slate-400 text-sm">Avg. Returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-slate-900" />
              </div>
              <span className="text-2xl font-bold text-white">PropertyPool</span>
            </div>
          </Link>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-slate-400">Sign in to access your investment portfolio</p>
          </div>

          {/* OAuth Button */}
          <Button 
            onClick={handleOAuthLogin}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold py-6 text-lg rounded-xl shadow-lg shadow-amber-500/25"
          >
            <Globe className="mr-2 w-5 h-5" />
            Continue with Manus Account
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-950 text-slate-500">Or sign in with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-12 py-6 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 rounded-xl"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <Link href="/forgot-password" className="text-sm text-amber-400 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-12 pr-12 py-6 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
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
                className="border-slate-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
              />
              <Label htmlFor="remember" className="text-sm text-slate-400">
                Remember me for 30 days
              </Label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-6 text-lg rounded-xl border border-slate-700"
            >
              Sign In
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-slate-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-amber-400 hover:underline font-medium">
              Create Account
            </Link>
          </p>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
            <Shield className="w-4 h-4" />
            <span>Your data is protected with bank-level security</span>
          </div>
        </div>
      </div>
    </div>
  );
}
