import React from "react";
import { cn } from "@/lib/utils";

const variants = {
  verified: "bg-green-50 text-green-700 border-green-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  pending_review: "bg-amber-50 text-amber-700 border-amber-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  suspended: "bg-red-50 text-red-700 border-red-200",
  unverified: "bg-slate-100 text-slate-700 border-slate-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  under_facilitation: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inspection_passed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
  logistics_dispatched: "bg-indigo-50 text-indigo-700 border-indigo-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
  in_transit: "bg-indigo-50 text-indigo-700 border-indigo-200",
  pending_pickup: "bg-amber-50 text-amber-700 border-amber-200",
  delayed: "bg-red-50 text-red-700 border-red-200",
  paid: "bg-green-50 text-green-700 border-green-200",
  refunded: "bg-red-50 text-red-700 border-red-200",
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactive: "bg-slate-100 text-slate-600 border-slate-200",
  accepted: "bg-green-50 text-green-700 border-green-200",
};

const labels = {
  in_transit: "In Transit",
  pending_pickup: "Pending Pickup",
  pending_review: "Pending Review",
  under_facilitation: "Under Facilitation",
  inspection_passed: "Inspection Passed",
  logistics_dispatched: "Dispatched",
};

export default function StatusBadge({ status }) {
  const normalized = (status || "pending").toLowerCase();
  const variant = variants[normalized] || "bg-muted text-muted-foreground border-border";
  const label = labels[normalized] || normalized.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        variant
      )}
    >
      {label}
    </span>
  );
}
