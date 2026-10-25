import React, { useState } from "react";
import { Search, Tag, Check, X, Mail, Phone, Clock, AlertCircle } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatNaira } from "@/data/marketplaceData";

export default function MarketplaceBids({
  bids = [],
  onUpdateBidStatus,
  onRefresh,
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = bids.filter((b) => {
    const q = query.toLowerCase();
    const matchesQuery =
      (b.bidCode || "").toLowerCase().includes(q) ||
      (b.productName || "").toLowerCase().includes(q) ||
      (b.bidderName || "").toLowerCase().includes(q) ||
      (b.bidderEmail || "").toLowerCase().includes(q);

    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Total Bids Submitted</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{bids.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Pending Review</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">
            {bids.filter((b) => b.status === "pending" || !b.status).length}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Accepted Offers</p>
          <p className="mt-1 text-2xl font-bold text-green-600">
            {bids.filter((b) => b.status === "accepted").length}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Rejected / Under Reserve</p>
          <p className="mt-1 text-2xl font-bold text-red-600">
            {bids.filter((b) => b.status === "rejected").length}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bids by code, product, or bidder name..."
            className="h-10 w-full rounded-xl border border-input bg-card pl-9 pr-3 text-sm outline-none transition-all focus:border-green-600 focus:ring-2 focus:ring-green-600/15"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 rounded-xl border border-input bg-card px-3.5 text-sm font-medium outline-none transition-all focus:border-green-600"
        >
          <option value="all">All Bid Statuses</option>
          <option value="pending">Pending Decision</option>
          <option value="accepted">Accepted Offers</option>
          <option value="rejected">Rejected Offers</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Bid Code</th>
                <th className="px-4 py-3 font-semibold">Commodity / Item</th>
                <th className="px-4 py-3 font-semibold">Offered Amount & Qty</th>
                <th className="px-4 py-3 font-semibold">Bidder Information</th>
                <th className="px-4 py-3 font-semibold">Buyer Notes</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Decision</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => {
                const amt = b.bidAmount?.amount || b.offeredAmount || 0;
                return (
                  <tr key={b.id} className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-bold text-green-700 font-mono text-xs">{b.bidCode || `#BID-${b.id}`}</span>
                      <span className="block text-[11px] text-muted-foreground">
                        {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "Recent"}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <p className="font-semibold text-foreground text-xs">{b.productName || "Livestock Item"}</p>
                      <span className="text-[11px] text-muted-foreground">Item #{b.productId || "LPR"}</span>
                    </td>

                    <td className="px-4 py-3">
                      <span className="font-extrabold text-foreground text-xs block">{formatNaira(amt)}</span>
                      <span className="text-[11px] text-muted-foreground">Qty: {b.quantity || 1} units</span>
                    </td>

                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground text-xs">{b.bidderName || "Buyer"}</p>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {b.bidderEmail || "N/A"}
                      </p>
                      {b.bidderPhone && (
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {b.bidderPhone}
                        </p>
                      )}
                    </td>

                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-xs text-muted-foreground line-clamp-2 italic">
                        {b.notes || "No special conditions provided."}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge status={b.status || "pending"} />
                    </td>

                    <td className="px-4 py-3 text-right">
                      {b.status === "pending" || !b.status ? (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => onUpdateBidStatus && onUpdateBidStatus(b.id, "accepted")}
                            className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-green-700 shadow-xs"
                            title="Accept Offer & Auto-Email Bidder"
                          >
                            <Check className="h-3 w-3" /> Accept
                          </button>
                          <button
                            onClick={() => onUpdateBidStatus && onUpdateBidStatus(b.id, "rejected")}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
                            title="Reject Offer"
                          >
                            <X className="h-3 w-3" /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Decisioned</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground bg-card">
          <Tag className="mx-auto h-10 w-10 text-muted-foreground/40 mb-2" />
          <p className="font-semibold text-foreground">No customer bids in this filter</p>
          <p className="text-xs text-muted-foreground mt-1">Offers submitted by registered buyers will appear here.</p>
        </div>
      )}
    </div>
  );
}
