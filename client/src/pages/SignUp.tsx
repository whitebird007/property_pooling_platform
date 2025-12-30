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
  CheckCircle2,
  Sparkles,
  Globe
} from "lucide-react";
import { getLoginUrl } from "@/const";

export default function SignUp() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreePrivacy: false
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
      {/* Left Side - Form */}
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
            <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
            <p className="text-slate-400">Start your property investment journey today</p>
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
              <span className="px-4 bg-slate-950 text-slate-500">Or sign up with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-300">Full Name</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="pl-12 py-6 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 rounded-xl"
                />
              </div>
            </div>

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

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+92 300 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-12 py-6 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 rounded-xl"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
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

            {/* Terms */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Checkbox 
                  id="terms" 
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                  className="mt-1 border-slate-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                />
                <Label htmlFor="terms" className="text-sm text-slate-400 leading-relaxed">
                  I agree to the <Link href="/terms" className="text-amber-400 hover:underline">Terms of Service</Link> and understand the investment risks
                </Label>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox 
                  id="privacy" 
                  checked={formData.agreePrivacy}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreePrivacy: checked as boolean })}
                  className="mt-1 border-slate-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                />
                <Label htmlFor="privacy" className="text-sm text-slate-400 leading-relaxed">
                  I agree to the <Link href="/privacy" className="text-amber-400 hover:underline">Privacy Policy</Link> and consent to data processing
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-6 text-lg rounded-xl border border-slate-700"
            >
              Create Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-400 hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-slate-900 to-slate-950 items-center justify-center p-12">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative z-10 max-w-lg space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Join 2,500+ Investors</span>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight">
            Start Building Wealth Through
            <span className="block bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Property Investment
            </span>
          </h2>

          <div className="space-y-4">
            {[
              { icon: Shield, text: "SECP Registered & Fully Compliant" },
              { icon: CheckCircle2, text: "100% Shariah-Compliant Structure" },
              { icon: Building2, text: "Premium Verified Properties Only" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-white font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
