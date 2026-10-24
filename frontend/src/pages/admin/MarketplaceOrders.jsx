import React, { useState } from "react";
import { Search, Download, CheckCircle2, Truck, Eye, Mail, Phone, MapPin, ShieldCheck, XCircle, Clock } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { mockOrders, formatNaira } from "@/data/marketplaceData";

export default function MarketplaceOrders({
  requests = [],
  onUpdateStatus,
  updatingStatus = false,
  onRefresh,
}) {
  // Map live API requests if present, else fallback to mock orders
  const mappedRequests = requests.length > 0 ? requests.map((r) => {
    const estAmt = r.estimatedTotal?.amount || 0;
    return {
      id: r.requestCode || `LPR-REQ-${r.id}`,
      rawId: r.id,
      buyer: r.buyerName || "Kwara Buyer",
      buyerEmail: r.buyerEmail,
      buyerPhone: r.buyerPhone,
      buyerLga: r.buyerLga,
      farmer: r.sellerName || "Registered Kwara Producer",
      product: r.productName || "Livestock Item",
      category: r.productCategory || "Livestock",
      quantity: r.requestedQty || 1,
      total: estAmt || 250000,
      status: r.status || "pending_review",
      payment: r.paymentStatus || (["approved", "shipped", "completed"].includes(r.status) ? "paid" : "pending"),
      date: r.createdAt ? new Date(r.createdAt).toISOString().split("T")[0] : "2026-10-15",
      includeInspection: r.includeInspection,
      inspectionFee: r.inspectionFee,
      adminNotes: r.adminNotes,
      rawRequest: r,
    };
  }) : mockOrders;

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeModalRequest, setActiveModalRequest] = useState(null);
  const [modalNotes, setModalNotes] = useState("");

  const filtered = mappedRequests.filter((o) => {
    const q = query.toLowerCase();
    const matchesQuery =
      o.id.toLowerCase().includes(q) ||
      o.buyer.toLowerCase().includes(q) ||
      (o.farmer && o.farmer.toLowerCase().includes(q)) ||
      o.product.toLowerCase().includes(q) ||
      (o.buyerEmail && o.buyerEmail.toLowerCase().includes(q));

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "approved" && ["approved", "under_facilitation", "inspection_passed"].includes(o.status)) ||
      (statusFilter === "shipped" && ["shipped", "logistics_dispatched"].includes(o.status)) ||
      o.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  const totalValue = filtered.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  const handleQuickApprove = (o) => {
    if (onUpdateStatus && o.rawId) {
      onUpdateStatus(o.rawId, "approved", "Request verified and approved by Kwara L-PRES State Project Office.");
    } else {
      o.status = "approved";
      if (onRefresh) onRefresh();
    }
  };

  const handleQuickShip = (o) => {
    const notes = prompt("Enter haulage/relay details or tracking notes:", o.adminNotes || "Dispatched via Kwara L-PRES logistics relay.");
    if (notes === null) return;
    if (onUpdateStatus && o.rawId) {
      onUpdateStatus(o.rawId, "shipped", notes);
    } else {
      o.status = "shipped";
      o.adminNotes = notes;
      if (onRefresh) onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Total Requests</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{mappedRequests.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Filtered Trade Volume</p>
          <p className="mt-1 text-2xl font-bold text-green-700">{formatNaira(totalValue)}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Pending Facilitation</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">
            {mappedRequests.filter((o) => o.status === "pending_review" || !o.status).length}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Completed / Shipped</p>
          <p className="mt-1 text-2xl font-bold text-indigo-600">
            {mappedRequests.filter((o) => ["shipped", "completed", "delivered"].includes(o.status)).length}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by code, buyer, product, or LGA..."
              className="h-10 w-full rounded-xl border border-input bg-card pl-9 pr-3 text-sm outline-none transition-all focus:border-green-600 focus:ring-2 focus:ring-green-600/15"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-xl border border-input bg-card px-3.5 text-sm font-medium outline-none transition-all focus:border-green-600"
          >
            <option value="all">All Request Statuses</option>
            <option value="pending_review">Pending Review</option>
            <option value="approved">Approved / Under Facilitation</option>
            <option value="shipped">Shipped / Dispatched</option>
            <option value="completed">Completed & Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <button
          onClick={() => {
            const csvRows = [
              ["Order ID", "Buyer", "Product", "Quantity", "Total Amount", "Status", "Date"],
              ...filtered.map((o) => [o.id, o.buyer, o.product, o.quantity, o.total, o.status, o.date]),
            ];
            const csvContent = "data:text/csv;charset=utf-8," + csvRows.map((e) => e.join(",")).join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `lpres_trade_orders_${new Date().toISOString().split("T")[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Request Code</th>
                <th className="px-4 py-3 font-semibold">Buyer Details</th>
                <th className="px-4 py-3 font-semibold">Product & Category</th>
                <th className="px-4 py-3 font-semibold">Requested Qty</th>
                <th className="px-4 py-3 font-semibold">Estimated Total</th>
                <th className="px-4 py-3 font-semibold">1% Inspection</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-bold text-green-700 font-mono text-xs">{o.id}</span>
                    <span className="block text-[11px] text-muted-foreground">{o.date}</span>
                  </td>

                  <td className="px-4 py-3">
                    <p className="font-semibold text-foreground text-xs">{o.buyer}</p>
                    {o.buyerEmail && (
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Mail className="h-3 w-3" /> {o.buyerEmail}
                      </p>
                    )}
                    {o.buyerLga && (
                      <span className="inline-block mt-0.5 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-medium">
                        {o.buyerLga} LGA
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground text-xs">{o.product}</p>
                    <span className="text-[11px] text-muted-foreground">{o.category}</span>
                  </td>

                  <td className="px-4 py-3 font-medium text-foreground text-xs">
                    {o.quantity}
                  </td>

                  <td className="px-4 py-3 font-bold text-foreground text-xs">
                    {formatNaira(o.total)}
                  </td>

                  <td className="px-4 py-3">
                    {o.includeInspection ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                        <ShieldCheck className="h-3 w-3" /> Yes (1%)
                      </span>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">Standard</span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={o.status} />
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      {/* Action 1: Approve */}
                      {(o.status === "pending_review" || !o.status) && (
                        <button
                          onClick={() => handleQuickApprove(o)}
                          className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-green-700 shadow-xs"
                          title="Approve & Send Auto Email"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                        </button>
                      )}

                      {/* Action 2: Mark Shipped */}
                      {["approved", "under_facilitation", "pending_review"].includes(o.status) && (
                        <button
                          onClick={() => handleQuickShip(o)}
                          className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
                          title="Mark Consignment Shipped"
                        >
                          <Truck className="h-3.5 w-3.5" /> Ship
                        </button>
                      )}

                      {/* Details Modal */}
                      <button
                        onClick={() => {
                          setActiveModalRequest(o);
                          setModalNotes(o.adminNotes || "");
                        }}
                        className="rounded-lg border border-border p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                        title="View Full Request Details"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground bg-card">
          <p className="font-semibold text-foreground">No orders or facilitation requests found</p>
          <p className="text-xs text-muted-foreground mt-1">Try resetting the status filter or clearing search.</p>
        </div>
      )}

      {/* Request Details Modal */}
      {activeModalRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                  Trade Facilitation Audit
                </span>
                <h3 className="text-lg font-bold text-foreground mt-0.5">{activeModalRequest.id}</h3>
                <p className="text-xs text-muted-foreground">{activeModalRequest.product} • {activeModalRequest.date}</p>
              </div>
              <button
                onClick={() => setActiveModalRequest(null)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border p-3 bg-muted/20">
                  <span className="text-muted-foreground block">Buyer Identity</span>
                  <span className="font-semibold text-foreground block mt-0.5">{activeModalRequest.buyer}</span>
                  <span className="text-[11px] text-muted-foreground">{activeModalRequest.buyerEmail || "No email"}</span>
                </div>
                <div className="rounded-xl border border-border p-3 bg-muted/20">
                  <span className="text-muted-foreground block">Total Trade Amount</span>
                  <span className="font-extrabold text-green-700 text-sm block mt-0.5">{formatNaira(activeModalRequest.total)}</span>
                  <span className="text-[11px] text-muted-foreground">Qty: {activeModalRequest.quantity}</span>
                </div>
              </div>

              <div className="rounded-xl border border-border p-3 bg-slate-50 space-y-1.5">
                <span className="font-semibold text-foreground block">Inspection & State Facilitation</span>
                <p className="text-muted-foreground">
                  1% Veterinary Inspection:{" "}
                  <strong className="text-foreground">
                    {activeModalRequest.includeInspection ? "Included & Mandatory" : "Not Selected"}
                  </strong>
                </p>
                <p className="text-muted-foreground">
                  Current Trade Desk Status: <strong className="text-foreground capitalize">{activeModalRequest.status.replace(/_/g, " ")}</strong>
                </p>
              </div>

              <div>
                <label className="font-semibold text-foreground block mb-1">
                  Logistics & Dispatch Notes (Sent to Buyer via Email)
                </label>
                <textarea
                  rows={3}
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  placeholder="Enter consignment dispatch tracking, abattoir relay, or inspection notes..."
                  className="w-full rounded-xl border border-input bg-background p-2.5 text-xs outline-none focus:border-green-600"
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => {
                    if (onUpdateStatus && activeModalRequest.rawId) {
                      onUpdateStatus(activeModalRequest.rawId, "approved", modalNotes);
                    } else {
                      activeModalRequest.status = "approved";
                    }
                    setActiveModalRequest(null);
                  }}
                  className="flex-1 rounded-xl bg-green-600 py-2.5 font-semibold text-white hover:bg-green-700 shadow-xs text-xs"
                >
                  Approve Request
                </button>
                <button
                  onClick={() => {
                    if (onUpdateStatus && activeModalRequest.rawId) {
                      onUpdateStatus(activeModalRequest.rawId, "shipped", modalNotes);
                    } else {
                      activeModalRequest.status = "shipped";
                    }
                    setActiveModalRequest(null);
                  }}
                  className="flex-1 rounded-xl bg-indigo-600 py-2.5 font-semibold text-white hover:bg-indigo-700 shadow-xs text-xs"
                >
                  Mark Shipped
                </button>
                <button
                  onClick={() => {
                    if (onUpdateStatus && activeModalRequest.rawId) {
                      onUpdateStatus(activeModalRequest.rawId, "completed", modalNotes);
                    } else {
                      activeModalRequest.status = "completed";
                    }
                    setActiveModalRequest(null);
                  }}
                  className="flex-1 rounded-xl border border-border bg-card py-2.5 font-semibold text-foreground hover:bg-muted text-xs"
                >
                  Mark Completed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
