import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PolarAngleAxis,
} from "recharts";
import {
  stats,
  revenueData,
  categoryData,
  shipmentStatusData,
  conversionFunnel,
  regionalData,
  formatNaira,
} from "@/data/marketplaceData";
import { TrendingUp, Award, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";

export default function MarketplaceAnalytics({ analytics = {} }) {
  const grossRev = analytics.total_amount ? Number(analytics.total_amount) : stats.totalRevenue;

  return (
    <div className="space-y-6">
      {/* Top 4 Metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Gross Trade Volume</p>
          <p className="mt-1.5 text-2xl font-bold text-foreground">{formatNaira(grossRev)}</p>
          <p className="mt-1.5 text-xs text-green-600 font-semibold flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" /> +14.8% growth vs last quarter
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Avg. Trade Ticket</p>
          <p className="mt-1.5 text-2xl font-bold text-foreground">{formatNaira(248500)}</p>
          <p className="mt-1.5 text-xs text-green-600 font-semibold flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" /> +5.4% increase
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Veterinary Compliance</p>
          <p className="mt-1.5 text-2xl font-bold text-foreground">
            {Math.round((stats.verifiedProducts / stats.totalProducts) * 100)}%
          </p>
          <p className="mt-1.5 text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> State Certified Standards
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Logistics Fulfillment</p>
          <p className="mt-1.5 text-2xl font-bold text-foreground">
            {Math.round((stats.completedDeliveries / (stats.completedDeliveries + stats.inTransitShipments)) * 100)}%
          </p>
          <p className="mt-1.5 text-xs text-green-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> 940 safe deliveries
          </p>
        </div>
      </div>

      {/* Revenue & Volume Trend Chart */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <div>
            <h3 className="text-base font-bold text-foreground">Trade Volume & Value Growth (2026)</h3>
            <p className="text-xs text-muted-foreground">Cumulative monthly trade facilitated across all Kwara pastoralist belts</p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Kwara L-PRES Analytics
          </span>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <Tooltip
              formatter={(v) => [formatNaira(v), "Trade Volume"]}
              contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 13, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2.5} fill="url(#revArea)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Conversion Funnel + Regional Performance */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Conversion Funnel */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
          <h3 className="text-base font-bold text-foreground">Marketplace Facilitation Funnel</h3>
          <p className="mb-4 text-xs text-muted-foreground">From initial catalog discovery to physical delivery</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={conversionFunnel} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis dataKey="stage" type="category" tick={{ fontSize: 11 }} stroke="#94a3b8" width={110} />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 13 }}
                formatter={(val) => [`${val.toLocaleString()} actions`, "Volume"]}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22}>
                {conversionFunnel.map((entry, i) => (
                  <rect key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Regional Performance by Kwara LGA */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground">Kwara LGA Trade Activity</h3>
              <p className="text-xs text-muted-foreground">Trade orders facilitated per local government cluster</p>
            </div>
            <MapPin className="h-4 w-4 text-emerald-600" />
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={regionalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="region" tick={{ fontSize: 10 }} stroke="#94a3b8" interval={0} />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 13 }}
                formatter={(val, name, item) => [
                  `${val} Orders (${formatNaira(item.payload.revenue)})`,
                  "Trade Facilitated",
                ]}
              />
              <Bar dataKey="orders" fill="#16a34a" radius={[6, 6, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown + Logistics Radial */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Category distribution */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
          <h3 className="text-base font-bold text-foreground">Product Category Distribution</h3>
          <p className="mb-4 text-xs text-muted-foreground">Breakdown of listed livestock & agro-allied commodities</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 13 }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={26}>
                {categoryData.map((entry, i) => (
                  <rect key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Shipment Status Overview */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
          <h3 className="text-base font-bold text-foreground">Consignment Logistics Ratio</h3>
          <p className="mb-4 text-xs text-muted-foreground">Current state-wide haulage status overview</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadialBarChart innerRadius="20%" outerRadius="100%" data={shipmentStatusData} startAngle={90} endAngle={-270}>
              <PolarAngleAxis dataKey="count" tick={false} />
              <RadialBar dataKey="count" cornerRadius={6} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 13 }} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
