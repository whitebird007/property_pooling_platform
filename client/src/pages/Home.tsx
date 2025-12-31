import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Building2, Users, TrendingUp, MapPin, ArrowRight, Play } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const { data: properties } = trpc.properties.list.useQuery();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Dark Purple Gradient Background */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/hero-bg-dark.png')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Dark Purple Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f3d] via-[#2d1b69] to-[#1a0f3d]" />

        {/* Decorative Dot Pattern - Top Left */}
        <div className="absolute top-20 left-10 opacity-20">
          <div className="grid grid-cols-4 gap-2">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-purple-400"
              />
            ))}
          </div>
        </div>

        {/* Decorative Dot Pattern - Bottom Right */}
        <div className="absolute bottom-32 right-10 opacity-20">
          <div className="grid grid-cols-4 gap-2">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-blue-400"
              />
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                <span className="text-sm font-medium text-white">
                  Pakistan's First Fractional Property Platform
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  Own Property,{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    Together
                  </span>
                </h1>
                <p className="text-lg text-gray-300 leading-relaxed max-w-md">
                  Invest in premium Pakistani real estate starting from just PKR 50,000.
                  Shariah-compliant, transparent, and professionally managed.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => navigate("/properties")}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Explore Properties <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  onClick={() => navigate("/education")}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-lg font-semibold text-lg backdrop-blur-md"
                >
                  <Play className="w-5 h-5 mr-2" /> How It Works
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 pt-4">
                <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-purple-400 flex items-center justify-center">
                    <span className="text-xs text-white font-bold">✓</span>
                  </div>
                  <span className="text-sm font-medium text-white">SECP Registered</span>
                </div>
                <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center">
                    <span className="text-xs text-white font-bold">✓</span>
                  </div>
                  <span className="text-sm font-medium text-white">Shariah Certified</span>
                </div>
                <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center">
                    <span className="text-xs text-white font-bold">✓</span>
                  </div>
                  <span className="text-sm font-medium text-white">FBR Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Column - 3D Glassmorphism Cards */}
            <div className="grid grid-cols-2 gap-6">
              {/* Card 1 - Total Property Value */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-white/40 transition-all hover:bg-white/15 h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">PKR 500M+</p>
                      <p className="text-sm text-gray-300 mt-1">Total Property Value</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Active Investors */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-white/40 transition-all hover:bg-white/15 h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">2,500+</p>
                      <p className="text-sm text-gray-300 mt-1">Active Investors</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Annual Returns */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-white/40 transition-all hover:bg-white/15 h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">8-12%</p>
                      <p className="text-sm text-gray-300 mt-1">Annual Returns</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4 - Properties Listed */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-white/40 transition-all hover:bg-white/15 h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">15+</p>
                      <p className="text-sm text-gray-300 mt-1">Properties Listed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-lg text-gray-600">
              Explore our premium property portfolio and start investing today
            </p>
          </div>

          {properties && properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.slice(0, 3).map((property) => (
                <div
                  key={property.id}
                  onClick={() => navigate(`/property/${property.id}`)}
                  className="group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-200"
                >
                  <div className="h-48 bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-purple-600 opacity-50" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{property.address}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-purple-600">
                        PKR {((Number(property.totalValue) || 0) / 100000).toFixed(1)}L+
                      </span>
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Invest Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No properties listed yet</p>
              {isAuthenticated && user?.role === "admin" && (
                <Button
                  onClick={() => navigate("/admin/properties")}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Add First Property
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">
              Simple steps to start your property investment journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: "1", title: "Sign Up", desc: "Create your account and complete KYC verification" },
              { num: "2", title: "Browse", desc: "Explore our curated property portfolio" },
              { num: "3", title: "Invest", desc: "Purchase fractional shares starting from PKR 50,000" },
              { num: "4", title: "Earn", desc: "Receive monthly rental income and capital appreciation" },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Investing?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of Pakistani investors building wealth through fractional property ownership
          </p>
          <Button
            onClick={() =>
              isAuthenticated ? navigate("/properties") : window.location.href = getLoginUrl()
            }
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 rounded-lg font-semibold text-lg"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
}
