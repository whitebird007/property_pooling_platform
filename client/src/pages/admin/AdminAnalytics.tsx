import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  PieChart,
  Activity,
  Target,
  Percent
} from "lucide-react";
import Chart from "chart.js/auto";

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("month");
  const revenueChartRef = useRef<HTMLCanvasElement>(null);
  const pieChartRef = useRef<HTMLCanvasElement>(null);
  const revenueChartInstance = useRef<Chart | null>(null);
  const pieChartInstance = useRef<Chart | null>(null);

  // Mock analytics data based on time range
  const getMetrics = (range: string) => {
    const multiplier = range === "week" ? 0.25 : range === "month" ? 1 : 12;
    return {
      totalRevenue: Math.round(4500000 * multiplier),
      revenueGrowth: range === "week" ? 5.2 : range === "month" ? 23.5 : 156.8,
      totalUsers: range === "week" ? 847 : range === "month" ? 2847 : 12500,
      userGrowth: range === "week" ? 3.1 : range === "month" ? 12.3 : 89.5,
      activeInvestors: range === "week" ? 423 : range === "month" ? 1523 : 8750,
      investorGrowth: range === "week" ? 2.4 : range === "month" ? 8.7 : 67.2,
      avgInvestment: range === "week" ? 245000 : range === "month" ? 287000 : 312000,
      investmentGrowth: range === "week" ? 1.5 : range === "month" ? -2.1 : 15.3,
    };
  };

  const metrics = getMetrics(timeRange);

  const getChartData = (range: string) => {
    if (range === "week") {
      return {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        investments: [3, 5, 4, 7, 6, 8, 5],
        revenue: [350000, 520000, 410000, 780000, 650000, 920000, 580000],
      };
    } else if (range === "month") {
      return {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        investments: [12, 18, 22, 28],
        revenue: [2500000, 3200000, 4100000, 5200000],
      };
    } else {
      return {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        investments: [8, 12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 48],
        revenue: [1800000, 2200000, 2800000, 3200000, 3800000, 4200000, 4800000, 5200000, 5800000, 6200000, 6800000, 7500000],
      };
    }
  };

  const propertyPerformance = [
    { name: "DHA Phase 6", roi: 12.5, occupancy: 95, investors: 42 },
    { name: "Bahria Town", roi: 10.8, occupancy: 100, investors: 67 },
    { name: "Clifton Sea View", roi: 9.2, occupancy: 88, investors: 23 },
    { name: "Gulberg III", roi: 11.3, occupancy: 92, investors: 35 },
  ];

  const userSegments = [
    { segment: "High Value (>1M)", count: 234, percentage: 15 },
    { segment: "Medium (100K-1M)", count: 892, percentage: 58 },
    { segment: "Entry (<100K)", count: 412, percentage: 27 },
  ];

  // Initialize and update charts
  useEffect(() => {
    const chartData = getChartData(timeRange);

    // Revenue Chart
    if (revenueChartRef.current) {
      if (revenueChartInstance.current) {
        revenueChartInstance.current.destroy();
      }

      const ctx = revenueChartRef.current.getContext("2d");
      if (ctx) {
        revenueChartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: chartData.labels,
            datasets: [
              {
                label: "Revenue (PKR)",
                data: chartData.revenue,
                backgroundColor: "rgba(147, 51, 234, 0.8)",
                borderColor: "rgba(147, 51, 234, 1)",
                borderWidth: 1,
                borderRadius: 6,
                yAxisID: "y",
              },
              {
                label: "Investments",
                data: chartData.investments,
                type: "line",
                borderColor: "rgba(59, 130, 246, 1)",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                yAxisID: "y1",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: "index",
              intersect: false,
            },
            plugins: {
              legend: {
                position: "top",
                labels: {
                  usePointStyle: true,
                  padding: 20,
                },
              },
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                padding: 12,
                titleFont: { size: 14 },
                bodyFont: { size: 13 },
                  callbacks: {
                    label: function(context: any) {
                    if (context.dataset.label === "Revenue (PKR)") {
                      return `Revenue: PKR ${(context.raw as number / 1000000).toFixed(2)}M`;
                    }
                    return `Investments: ${context.raw}`;
                  }
                }
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                type: "linear",
                display: true,
                position: "left",
                grid: {
                  color: "rgba(0, 0, 0, 0.05)",
                },
                ticks: {
                  callback: function(value: any) {
                    return "PKR " + (Number(value) / 1000000).toFixed(1) + "M";
                  },
                },
              },
              y1: {
                type: "linear",
                display: true,
                position: "right",
                grid: {
                  drawOnChartArea: false,
                },
                ticks: {
                  stepSize: 5,
                },
              },
            },
          },
        });
      }
    }

    // Pie Chart
    if (pieChartRef.current) {
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }

      const ctx = pieChartRef.current.getContext("2d");
      if (ctx) {
        pieChartInstance.current = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: userSegments.map(s => s.segment),
            datasets: [
              {
                data: userSegments.map(s => s.count),
                backgroundColor: [
                  "rgba(147, 51, 234, 1)",
                  "rgba(147, 51, 234, 0.6)",
                  "rgba(147, 51, 234, 0.3)",
                ],
                borderWidth: 0,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                padding: 12,
                callbacks: {
                  label: function(context: any) {
                    const segment = userSegments[context.dataIndex];
                    return `${segment.count} investors (${segment.percentage}%)`;
                  }
                }
              },
            },
          },
        });
      }
    }

    return () => {
      if (revenueChartInstance.current) {
        revenueChartInstance.current.destroy();
      }
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
    };
  }, [timeRange]);

  const formatRevenue = (value: number) => {
    if (value >= 10000000) {
      return `PKR ${(value / 10000000).toFixed(1)} Cr`;
    }
    return `PKR ${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <AdminLayout 
      title="Analytics" 
      description="Platform performance and insights"
      actions={
        <div className="flex gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => setTimeRange("week")}
              className={timeRange === "week" ? "bg-white shadow-sm text-purple-600" : "text-gray-600 hover:text-gray-900"}
            >
              Week
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => setTimeRange("month")}
              className={timeRange === "month" ? "bg-white shadow-sm text-purple-600" : "text-gray-600 hover:text-gray-900"}
            >
              Month
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => setTimeRange("year")}
              className={timeRange === "year" ? "bg-white shadow-sm text-purple-600" : "text-gray-600 hover:text-gray-900"}
            >
              Year
            </Button>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      }
    >
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <Badge className={`${metrics.revenueGrowth >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {metrics.revenueGrowth >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {Math.abs(metrics.revenueGrowth)}%
              </Badge>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatRevenue(metrics.totalRevenue)}</p>
            <p className="text-sm text-gray-500">Total Revenue</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <Badge className="bg-green-100 text-green-700">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                {metrics.userGrowth}%
              </Badge>
            </div>
            <p className="text-2xl font-bold text-gray-900">{metrics.totalUsers.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Total Users</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <Badge className="bg-green-100 text-green-700">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                {metrics.investorGrowth}%
              </Badge>
            </div>
            <p className="text-2xl font-bold text-gray-900">{metrics.activeInvestors.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Active Investors</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-amber-600" />
              </div>
              <Badge className={`${metrics.investmentGrowth >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {metrics.investmentGrowth >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {Math.abs(metrics.investmentGrowth)}%
              </Badge>
            </div>
            <p className="text-2xl font-bold text-gray-900">PKR {(metrics.avgInvestment / 1000).toFixed(0)}K</p>
            <p className="text-sm text-gray-500">Avg Investment</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Revenue & Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: "320px" }}>
              <canvas ref={revenueChartRef}></canvas>
            </div>
          </CardContent>
        </Card>

        {/* User Segments */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Investor Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: "180px" }} className="relative mb-6">
              <canvas ref={pieChartRef}></canvas>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">1,538</p>
                  <p className="text-xs text-gray-500">Total</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {userSegments.map((segment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? "bg-purple-600" : index === 1 ? "bg-purple-400" : "bg-purple-200"
                    }`} />
                    <span className="text-sm text-gray-600">{segment.segment}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{segment.count}</span>
                    <span className="text-sm text-gray-500">({segment.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Performance */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Property Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Property</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">ROI</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Occupancy</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Investors</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Performance</th>
                </tr>
              </thead>
              <tbody>
                {propertyPerformance.map((property, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="font-medium text-gray-900">{property.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <Percent className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-600">{property.roi}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${property.occupancy}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{property.occupancy}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{property.investors}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={property.roi > 11 ? "bg-green-100 text-green-700" : property.roi > 10 ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}>
                        {property.roi > 11 ? "Excellent" : property.roi > 10 ? "Good" : "Average"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
