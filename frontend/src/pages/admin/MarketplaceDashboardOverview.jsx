import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Legend,
} from "recharts";
import {
  DollarSign,
  Users,
  PackageCheck,
  ShoppingCart,
  CheckCircle,
  XCircle,
  Truck,
  CreditCard,
  Star,
  ArrowRight,
  PackagePlus,
  Bell,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
  FileSpreadsheet
} from "lucide-react";
import DashboardStatCard from "@/components/admin/DashboardStatCard";
import StatusBadge from "@/components/admin/StatusBadge";
import {
  stats,
  revenueData,
  shipmentStatusData,
  topFarmers,
  recentActivity,
  formatNaira,
} from "@/data/marketplaceData";

const iconMap = {
  CheckCircle,
  ShoppingCart,
  Truck,
  Users,
  CreditCard,
  XCircle,
};

const activityTint = {
  verification: "bg-green-50 text-green-600 ring-green-100",
  order: "bg-indigo-50 text-indigo-600 ring-indigo-100",
  shipment: "bg-blue-50 text-blue-600 ring-blue-100",
  farmer: "bg-amber-50 text-amber-600 ring-amber-100",
  payment: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  rejection: "bg-red-50 text-red-600 ring-red-100",
};

export default function MarketplaceDashboardOverview({
  analytics = {},
  requests = [],
  users = [],
  products = [],
  onNavigateTab,
  onRefresh,
}) {
  // Merge live API numbers with mock data for dynamic display
  const totalVolume = analytics.total_amount ? Number(analytics.total_amount) : stats.totalRevenue;
  const verifiedFarmersCount = users.length ? users.filter((u) => u.isVerified).length : stats.activeFarmers;
  const totalProductsCount = products.length ? products.length : stats.totalProducts;
  const pendingRequestsCount = requests.length
    ? requests.filter((r) => r.status === "pending_review" || !r.status).length
    : stats.pendingProducts;
  const activeOrdersCount = requests.length ? requests.length : stats.activeOrders;

  const sparkTrend = revenueData.slice(-6).map((d) => ({ value: d.revenue }));
  const orderTrend = revenueData.slice(-6).map((d) => ({ value: d.orders }));

  const verificationProgress = [
    { name: "Verified", value: stats.verifiedProducts, fill: "#16a34a" },
    { name: "Pending", value: pendingRequestsCount, fill: "#d97706" },
    { name: "Rejected", value: stats.rejectedProducts, fill: "#dc2626" },
  ];
  const verificationTotal =
    verificationProgress.reduce((s, p) => s + p.value, 0) || 1;

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-green-700/20 bg-gradient-to-br from-green-800 via-green-700 to-emerald-700 p-6 sm:p-8 text-white shadow-md">
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 right-20 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-green-100 backdrop-blur-xs mb-2">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
              <span>Kwara State Livestock Trade & Facilitation Desk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              State Project Coordinating Office
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-green-100/90 max-w-2xl">
              Welcome back. There are <strong className="text-white underline">{pendingRequestsCount} trade requests</strong> pending inspection review,{" "}
              <strong className="text-white">{activeOrdersCount} total orders</strong>, and <strong className="text-white">{stats.inTransitShipments} consignments</strong> in logistics transit across Kwara.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigateTab("verification")}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-green-800 shadow-sm transition hover:bg-green-50 active:scale-95"
            >
              <PackagePlus className="h-4 w-4 text-green-700" />
              <span>Verify Products</span>
            </button>
            <button
              onClick={() => onNavigateTab("orders")}
              className="inline-flex items-center gap-2 rounded-xl bg-green-900/60 border border-white/20 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-900/80 active:scale-95"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Review Requests</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard
          icon={DollarSign}
          label="Total Trade Volume"
          value={formatNaira(totalVolume)}
          change={stats.revenueChange}
          accent="green"
          trend={sparkTrend}
        />
        <DashboardStatCard
          icon={Users}
          label="Verified Producers"
          value={verifiedFarmersCount.toLocaleString()}
          change={stats.farmersChange}
          accent="blue"
          trend={orderTrend}
        />
        <DashboardStatCard
          icon={PackageCheck}
          label="Products in Catalog"
          value={totalProductsCount.toLocaleString()}
          change={stats.productsChange}
          accent="amber"
          trend={sparkTrend}
        />
        <DashboardStatCard
          icon={ShoppingCart}
          label="Active Trade Requests"
          value={activeOrdersCount.toLocaleString()}
          change={stats.ordersChange}
          accent="indigo"
          trend={orderTrend}
        />
      </div>

      {/* Quick Action Shortcuts */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-xs">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">
          Quick Actions:
        </span>
        <button
          onClick={() => onNavigateTab("verification")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
        >
          <PackagePlus className="h-3.5 w-3.5 text-green-600" /> Verify Submissions
        </button>
        <button
          onClick={() => onNavigateTab("farmers")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
        >
          <Users className="h-3.5 w-3.5 text-blue-600" /> Producers Directory
        </button>
        <button
          onClick={() => onNavigateTab("orders")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
        >
          <ShoppingCart className="h-3.5 w-3.5 text-indigo-600" /> Facilitation Requests
        </button>
        <button
          onClick={() => onNavigateTab("shipments")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
        >
          <Truck className="h-3.5 w-3.5 text-amber-600" /> Dispatch & Relay Status
        </button>
        <button
          onClick={() => onNavigateTab("analytics")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
        >
          <TrendingUp className="h-3.5 w-3.5 text-purple-600" /> LGA Regional Trends
        </button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Monthly Orders & Trade BarChart */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground">Monthly Trade Activity</h3>
              <p className="text-xs text-muted-foreground">Volume & orders facilitated across Kwara LGAs</p>
            </div>
            <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 border border-green-200">
              Live Tracker
            </span>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueData}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16a34a" />
                  <stop offset="100%" stopColor="#86efac" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 13, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                formatter={(val, name) => [name === "orders" ? `${val} Orders` : formatNaira(val), name === "orders" ? "Facilitated Orders" : "Trade Volume"]}
              />
              <Bar dataKey="orders" fill="url(#barGrad)" radius={[8, 8, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Verification Pipeline Radial Chart */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <h3 className="text-base font-bold text-foreground">Verification Pipeline</h3>
          <p className="mb-3 text-xs text-muted-foreground">Product inspection and compliance queue</p>
          <ResponsiveContainer width="100%" height={170}>
            <RadialBarChart innerRadius="35%" outerRadius="100%" data={verificationProgress} startAngle={90} endAngle={-270}>
              <PolarAngleAxis type="number" domain={[0, verificationTotal]} angleAxisId={0} tick={false} />
              <RadialBar background dataKey="value" cornerRadius={8} />
              <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: 11 }} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-2 border-t border-border pt-3">
            {verificationProgress.map((p) => (
              <div key={p.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full" style={{ background: p.fill }} />
                  {p.name}
                </span>
                <span className="font-semibold text-foreground">{p.value.toLocaleString()} items</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity + Shipment Status */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground">Live Activity Stream</h3>
              <p className="text-xs text-muted-foreground">Real-time state trade audit & milestone feed</p>
            </div>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="relative space-y-1">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-border" />
            {recentActivity.map((a) => {
              const Icon = iconMap[a.icon] || CheckCircle;
              return (
                <div key={a.id} className="relative flex gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted/40">
                  <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ring-card ${activityTint[a.type] || "bg-muted"}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug text-foreground">{a.message}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">Logistics & Dispatches</h3>
            <span className="text-xs text-muted-foreground">{stats.inTransitShipments} active</span>
          </div>

          <div className="space-y-4">
            {shipmentStatusData.map((s) => {
              const max = Math.max(...shipmentStatusData.map((x) => x.count)) || 1;
              const pct = Math.round((s.count / max) * 100);
              return (
                <div key={s.status}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <span className="h-2 w-2 rounded-full" style={{ background: s.fill }} />
                      {s.status}
                    </span>
                    <span className="font-bold text-foreground">{s.count.toLocaleString()}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: s.fill }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 border-t border-border pt-4">
            <button
              onClick={() => onNavigateTab("shipments")}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-xs font-semibold text-green-700 hover:bg-muted transition-colors"
            >
              <span>View All Dispatches</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Top Performing Producers Table */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-foreground">Top Performing Livestock Producers</h3>
            <p className="text-xs text-muted-foreground">Ranked by volume facilitated through the Kwara L-PRES trade desk</p>
          </div>
          <button
            onClick={() => onNavigateTab("farmers")}
            className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 hover:text-green-800"
          >
            View all producers <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="pb-3 pr-4 font-semibold">Rank</th>
                <th className="pb-3 pr-4 font-semibold">Ranch / Enterprise</th>
                <th className="pb-3 pr-4 font-semibold">Principal Owner</th>
                <th className="pb-3 pr-4 font-semibold">Kwara Location</th>
                <th className="pb-3 pr-4 font-semibold">Rating</th>
                <th className="pb-3 pr-4 font-semibold">Catalog Items</th>
                <th className="pb-3 pr-4 font-semibold">Trade Volume</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {topFarmers.map((f, i) => (
                <tr key={f.id} className="border-b border-border/60 last:border-0 transition-colors hover:bg-muted/30">
                  <td className="py-3 pr-4">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${i < 3 ? "bg-green-600 text-white shadow-xs" : "bg-muted text-muted-foreground"}`}>
                      {i + 1}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                        {f.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      </div>
                      <span className="font-semibold text-foreground">{f.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{f.owner}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{f.location}</td>
                  <td className="py-3 pr-4">
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> {f.rating}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{f.products}</td>
                  <td className="py-3 pr-4 font-bold text-foreground">{formatNaira(f.revenue)}</td>
                  <td className="py-3"><StatusBadge status={f.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
