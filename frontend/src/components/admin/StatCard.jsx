import React from "react";
import { cn } from "@/lib/utils";

export default function StatCard({ icon: Icon, label, value, change, accent }) {
  const positive = change >= 0;
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
        </div>
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-lg", accent)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1.5">
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-semibold",
            positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          )}
        >
          {positive ? "↑" : "↓"} {Math.abs(change)}%
        </span>
        <span className="text-xs text-muted-foreground">vs last month</span>
      </div>
    </div>
  );
}
