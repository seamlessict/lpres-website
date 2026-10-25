import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const ACCENTS = {
  green: {
    icon: "bg-green-600",
    soft: "bg-green-50 text-green-700",
    stroke: "#16a34a",
    fill: "#16a34a",
    glow: "from-green-500/15",
    chip: "bg-green-50 text-green-700",
  },
  blue: {
    icon: "bg-blue-600",
    soft: "bg-blue-50 text-blue-700",
    stroke: "#2563eb",
    fill: "#2563eb",
    glow: "from-blue-500/15",
    chip: "bg-blue-50 text-blue-700",
  },
  amber: {
    icon: "bg-amber-600",
    soft: "bg-amber-50 text-amber-700",
    stroke: "#d97706",
    fill: "#d97706",
    glow: "from-amber-500/15",
    chip: "bg-amber-50 text-amber-700",
  },
  indigo: {
    icon: "bg-indigo-600",
    soft: "bg-indigo-50 text-indigo-700",
    stroke: "#4f46e5",
    fill: "#4f46e5",
    glow: "from-indigo-500/15",
    chip: "bg-indigo-50 text-indigo-700",
  },
};

export default function DashboardStatCard({
  icon: Icon,
  label,
  value,
  change,
  accent = "green",
  trend = [],
  trendKey = "value",
}) {
  const a = ACCENTS[accent] || ACCENTS.green;
  const positive = change >= 0;
  const Arrow = positive ? ArrowUpRight : ArrowDownRight;
  const gradientId = `spark-${accent}-${label ? label.replace(/\s+/g, "") : "stat"}`;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div
        className={cn(
          "pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br to-transparent opacity-60 blur-2xl",
          a.glow
        )}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            {value}
          </p>
        </div>
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm", a.icon)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {trend && trend.length > 0 && (
        <div className="relative mt-3 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={a.fill} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={a.fill} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey={trendKey}
                stroke={a.stroke}
                strokeWidth={2}
                fill={`url(#${gradientId})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="relative mt-3 flex items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
            positive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          )}
        >
          <Arrow className="h-3 w-3" />
          {Math.abs(change)}%
        </span>
        <span className="text-xs text-muted-foreground">vs last month</span>
      </div>
    </div>
  );
}
