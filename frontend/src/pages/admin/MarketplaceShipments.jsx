import React, { useState } from "react";
import { Search, Truck, MapPin, Package, Clock, User, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { shipments as initialShipments } from "@/data/marketplaceData";

export default function MarketplaceShipments() {
  const [shipmentList, setShipmentList] = useState(initialShipments);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTracking, setActiveTracking] = useState(null);

  const filtered = shipmentList.filter((s) => {
    const q = query.toLowerCase();
    const matchesQuery =
      s.id.toLowerCase().includes(q) ||
      s.order.toLowerCase().includes(q) ||
      s.tracking.toLowerCase().includes(q) ||
      s.destination.toLowerCase().includes(q) ||
      s.origin.toLowerCase().includes(q) ||
      s.carrier.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handleUpdateStatus = (shipmentId, newStatus) => {
    setShipmentList((prev) =>
      prev.map((s) => (s.id === shipmentId ? { ...s, status: newStatus } : s))
    );
    if (activeTracking && activeTracking.id === shipmentId) {
      setActiveTracking((prev) => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">In Transit</p>
          <p className="mt-1 text-2xl font-bold text-indigo-600">
            {shipmentList.filter((s) => s.status === "in_transit").length}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Pending Pickup</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">
            {shipmentList.filter((s) => s.status === "pending_pickup").length}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Delivered Today</p>
          <p className="mt-1 text-2xl font-bold text-green-600">
            {shipmentList.filter((s) => s.status === "delivered").length}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Delayed Alerts</p>
          <p className="mt-1 text-2xl font-bold text-red-600">
            {shipmentList.filter((s) => s.status === "delayed").length}
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
            placeholder="Search by ID, order, tracking code, origin or destination..."
            className="h-10 w-full rounded-xl border border-input bg-card pl-9 pr-3 text-sm outline-none transition-all focus:border-green-600 focus:ring-2 focus:ring-green-600/15"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 rounded-xl border border-input bg-card px-3.5 text-sm font-medium outline-none transition-all focus:border-green-600"
        >
          <option value="all">All Dispatch Statuses</option>
          <option value="pending_pickup">Pending Pickup</option>
          <option value="in_transit">In Transit (Relay)</option>
          <option value="delivered">Delivered & Inspected</option>
          <option value="delayed">Delayed / Weather Alert</option>
        </select>
      </div>

      {/* Shipment Cards Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:shadow-md hover:border-emerald-200"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">{s.id}</p>
                  <p className="text-xs text-muted-foreground">Order: {s.order}</p>
                </div>
              </div>
              <StatusBadge status={s.status} />
            </div>

            {/* Route visual */}
            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-slate-50 border border-border/60 p-3 text-xs">
              <div className="flex-1">
                <p className="text-[11px] text-muted-foreground">Dispatch Origin</p>
                <p className="flex items-center gap-1 font-bold text-foreground mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> {s.origin}
                </p>
              </div>

              <div className="flex flex-col items-center px-2">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase">Relay</span>
                <span className="text-emerald-600 font-bold">──────▶</span>
              </div>

              <div className="flex-1 text-right">
                <p className="text-[11px] text-muted-foreground">Destination Delivery</p>
                <p className="flex items-center justify-end gap-1 font-bold text-foreground mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" /> {s.destination}
                </p>
              </div>
            </div>

            {/* Consignment Specs */}
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs">
              <div>
                <p className="flex items-center gap-1.5 text-muted-foreground">
                  <Package className="h-3.5 w-3.5 text-slate-400" /> Consignment
                </p>
                <p className="mt-0.5 font-semibold text-foreground truncate">{s.product}</p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-muted-foreground">
                  <User className="h-3.5 w-3.5 text-slate-400" /> Assigned Driver
                </p>
                <p className="mt-0.5 font-semibold text-foreground">{s.driver}</p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-muted-foreground">
                  <Truck className="h-3.5 w-3.5 text-slate-400" /> Logistics Carrier
                </p>
                <p className="mt-0.5 font-semibold text-foreground">{s.carrier}</p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-slate-400" /> Estimated Arrival
                </p>
                <p className="mt-0.5 font-semibold text-foreground">{s.eta}</p>
              </div>
            </div>

            {/* Tracking Code and Quick Action */}
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="rounded-lg bg-muted px-2.5 py-1 font-mono text-[11px] font-semibold text-muted-foreground">
                {s.tracking}
              </span>
              <button
                onClick={() => setActiveTracking(s)}
                className="text-xs font-semibold text-green-700 hover:text-green-800 transition-colors"
              >
                Track & Manage Relay →
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground bg-card">
          <Truck className="mx-auto h-10 w-10 text-muted-foreground/40 mb-2" />
          <p className="font-semibold text-foreground">No shipments match filter</p>
          <p className="text-xs text-muted-foreground mt-1">Try resetting the status filter.</p>
        </div>
      )}

      {/* Tracking Modal */}
      {activeTracking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                  Logistics Tracking & Waybill
                </span>
                <h3 className="text-lg font-bold text-foreground mt-0.5">{activeTracking.tracking}</h3>
                <p className="text-xs text-muted-foreground">{activeTracking.id} • {activeTracking.product}</p>
              </div>
              <button
                onClick={() => setActiveTracking(null)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="rounded-xl border border-border p-3.5 bg-slate-50 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Logistics Provider:</span>
                  <span className="font-semibold text-foreground">{activeTracking.carrier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Haulage Driver:</span>
                  <span className="font-semibold text-foreground">{activeTracking.driver}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Origin Pastoral Hub:</span>
                  <span className="font-semibold text-foreground">{activeTracking.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Destination:</span>
                  <span className="font-semibold text-foreground">{activeTracking.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <StatusBadge status={activeTracking.status} />
                </div>
              </div>

              {/* Waybill checkpoints */}
              <div className="space-y-2 border-t border-border pt-3">
                <span className="font-semibold text-foreground block">Dispatch Checkpoints:</span>
                <div className="space-y-2 text-muted-foreground pl-3 border-l-2 border-emerald-500">
                  <p>✓ Inspected and loaded at {activeTracking.origin} agro-hub</p>
                  <p>✓ Waybill signed & veterinary cold-chain check passed</p>
                  <p>• In transit to {activeTracking.destination}</p>
                </div>
              </div>

              {/* Status Update Options */}
              <div className="border-t border-border pt-3">
                <label className="font-semibold text-foreground block mb-2">Update Consignment Status</label>
                <div className="grid grid-cols-3 gap-2">
                  {["in_transit", "delivered", "delayed"].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(activeTracking.id, st)}
                      className={`rounded-xl py-2 text-xs font-semibold capitalize transition-all ${
                        activeTracking.status === st
                          ? "bg-green-600 text-white shadow-xs"
                          : "border border-border bg-card hover:bg-muted"
                      }`}
                    >
                      {st.replace(/_/g, " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
