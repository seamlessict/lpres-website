import React, { useState } from "react";
import { CheckCircle, XCircle, Eye, Filter, PackageCheck, AlertCircle, ShieldCheck, MapPin, Tag } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { pendingProducts, formatNaira } from "@/data/marketplaceData";

export default function MarketplaceProductVerification({
  catalogProducts = [],
  onRefresh,
}) {
  // Combine mock products with live products if available
  const initialList = pendingProducts.map((p) => {
    return p;
  });

  const [products, setProducts] = useState(initialList);
  const [filter, setFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [actionNotice, setActionNotice] = useState("");

  const filtered = filter === "all" ? products : products.filter((p) => p.status === filter);

  const handleAction = (id, action) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: action } : p))
    );
    setSelectedProduct(null);
    setActionNotice(`Product marked as ${action.toUpperCase()} successfully.`);
    setTimeout(() => setActionNotice(""), 3000);
  };

  const counts = {
    all: products.length,
    pending: products.filter((p) => p.status === "pending").length,
    verified: products.filter((p) => p.status === "verified").length,
    rejected: products.filter((p) => p.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Alert Notice */}
      {actionNotice && (
        <div className="flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 p-3 text-sm font-semibold text-green-800 animate-in fade-in">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Inspection Queue", value: counts.all, color: "text-foreground" },
          { label: "Pending Veterinary Review", value: counts.pending, color: "text-amber-600" },
          { label: "Verified & Certified", value: counts.verified, color: "text-green-600" },
          { label: "Rejected / Defective", value: counts.rejected, color: "text-red-600" },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl border border-border bg-card p-4 shadow-xs">
            <p className="text-xs font-medium text-muted-foreground">{c.label}</p>
            <p className={`mt-1.5 text-2xl font-bold ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground mr-1" />
          {["all", "pending", "verified", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold capitalize transition-all ${
                filter === f
                  ? "bg-green-600 text-white shadow-xs"
                  : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {f} {f !== "all" && `(${counts[f]})`}
            </button>
          ))}
        </div>

        <div className="text-xs text-muted-foreground">
          Showing <strong>{filtered.length}</strong> items in compliance review
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all hover:shadow-md"
          >
            {/* Image Preview */}
            <div className="relative h-48 bg-muted overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=500";
                }}
              />
              <div className="absolute right-3 top-3">
                <StatusBadge status={p.status} />
              </div>
              <div className="absolute left-3 top-3">
                <span className="rounded-md bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[11px] font-semibold text-white">
                  {p.category}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h4 className="font-bold text-foreground text-base truncate" title={p.name}>
                    {p.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                    <span className="font-semibold text-emerald-700">{p.farmer}</span>
                    <span>•</span>
                    <span>{p.farmerId}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 border border-border/60 p-3 text-sm">
                <div>
                  <span className="text-[11px] text-muted-foreground block">Listing Price</span>
                  <span className="font-extrabold text-green-700 text-base">{formatNaira(p.price)}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-muted-foreground block">Available Stock</span>
                  <span className="font-bold text-foreground">{p.quantity} {p.unit}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>Submitted: {p.postedDate}</span>
                <span className="font-mono text-[11px]">{p.id}</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2 border-t border-border pt-3">
                {p.status === "pending" ? (
                  <>
                    <button
                      onClick={() => handleAction(p.id, "verified")}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700 transition-colors shadow-xs"
                    >
                      <CheckCircle className="h-3.5 w-3.5" /> Verify
                    </button>
                    <button
                      onClick={() => handleAction(p.id, "rejected")}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
                    >
                      <XCircle className="h-3.5 w-3.5" /> Reject
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleAction(p.id, p.status === "verified" ? "pending" : "verified")}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-muted/40 px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    <span>Change Status</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedProduct(p)}
                  className="flex items-center justify-center rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  title="View Inspection Audit"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground bg-card">
          <PackageCheck className="mx-auto h-10 w-10 text-muted-foreground/40 mb-2" />
          <p className="font-semibold text-foreground">No products in this filter</p>
          <p className="text-xs text-muted-foreground mt-1">Try switching to "all" to see all catalog items.</p>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                  L-PRES Verification Audit
                </span>
                <h3 className="text-lg font-bold text-foreground mt-0.5">{selectedProduct.name}</h3>
                <p className="text-xs text-muted-foreground">{selectedProduct.id} • {selectedProduct.category}</p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="relative h-44 rounded-xl overflow-hidden bg-muted">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-border p-3 bg-muted/20">
                  <span className="text-muted-foreground block">Producer / Farm:</span>
                  <span className="font-semibold text-foreground mt-0.5 block">{selectedProduct.farmer}</span>
                  <span className="text-[11px] text-muted-foreground">ID: {selectedProduct.farmerId}</span>
                </div>
                <div className="rounded-xl border border-border p-3 bg-muted/20">
                  <span className="text-muted-foreground block">Offered Unit Price:</span>
                  <span className="font-bold text-green-700 text-sm mt-0.5 block">{formatNaira(selectedProduct.price)}</span>
                  <span className="text-[11px] text-muted-foreground">{selectedProduct.quantity} {selectedProduct.unit} available</span>
                </div>
              </div>

              <div className="rounded-xl border border-border p-3.5 bg-slate-50 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span>Livestock Veterinary & Quality Checklist</span>
                </div>
                <ul className="space-y-1 text-muted-foreground pl-6 list-disc">
                  <li>Physical inspection photo uploaded & verified</li>
                  <li>Veterinary health clearance and vaccination certificate in order</li>
                  <li>Origin LGA tagged in Kwara State pastoralist cluster</li>
                  <li>Seller profile authenticated with NIN / CAC registration</li>
                </ul>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  onClick={() => handleAction(selectedProduct.id, "verified")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 py-2.5 text-xs font-semibold text-white hover:bg-green-700 transition-colors shadow-xs"
                >
                  <CheckCircle className="h-4 w-4" /> Approve & Certify
                </button>
                <button
                  onClick={() => handleAction(selectedProduct.id, "rejected")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2.5 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
                >
                  <XCircle className="h-4 w-4" /> Reject Consignment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
