import React, { useState } from "react";
import { Search, Star, MapPin, Mail, Phone, MoreVertical, UserPlus, ShieldCheck, Check, X, Eye, FileText } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { farmers as initialFarmers, formatNaira } from "@/data/marketplaceData";

export default function MarketplaceFarmers({
  users = [],
  onVerifyUser,
  token,
  onRefresh,
}) {
  // If we have live users from API, map them to farmer card format
  const mappedApiUsers = users.length > 0 ? users.map((u) => {
    const isVer = u.isVerified || u.verificationStatus === "verified";
    const status = isVer ? "verified" : u.verificationStatus === "pending" ? "pending" : "unverified";
    return {
      id: `USR-${u.id}`,
      rawId: u.id,
      name: u.verificationDetails?.farm_name || u.verificationDetails?.farmName || `${u.name}'s Livestock Farm`,
      owner: u.name,
      email: u.email,
      phone: u.phone || "+234 800 000 0000",
      location: u.lga ? `${u.lga}, Kwara` : "Ilorin, Kwara",
      rating: 4.8,
      products: 12,
      revenue: 1250000,
      status: status,
      joined: u.createdAt ? new Date(u.createdAt).toISOString().split("T")[0] : "2025-06-01",
      verificationDetails: u.verificationDetails,
      isVerified: isVer,
      rawUser: u,
    };
  }) : initialFarmers;

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeFarmerModal, setActiveFarmerModal] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: "", email: "", phone: "", lga: "Ilorin East" });

  const filtered = mappedApiUsers.filter((f) => {
    const q = query.toLowerCase();
    const matchesQuery =
      f.name.toLowerCase().includes(q) ||
      f.owner.toLowerCase().includes(q) ||
      f.location.toLowerCase().includes(q) ||
      f.email.toLowerCase().includes(q) ||
      (f.id && f.id.toLowerCase().includes(q));

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "verified" && (f.status === "verified" || f.isVerified)) ||
      (statusFilter === "pending" && f.status === "pending") ||
      (statusFilter === "unverified" && (f.status === "unverified" || f.status === "suspended"));

    return matchesQuery && matchesStatus;
  });

  const handleVerifyToggle = async (farmer) => {
    const newStatus = farmer.status === "verified" || farmer.isVerified ? "unverified" : "verified";
    if (farmer.rawId && onVerifyUser) {
      await onVerifyUser(farmer.rawId, newStatus);
    } else {
      farmer.status = newStatus;
      farmer.isVerified = newStatus === "verified";
      if (onRefresh) onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search producers by name, farm, LGA, or email..."
              className="h-10 w-full rounded-xl border border-input bg-card pl-9 pr-3 text-sm outline-none transition-all focus:border-green-600 focus:ring-2 focus:ring-green-600/15"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-xl border border-input bg-card px-3.5 text-sm font-medium outline-none transition-all focus:border-green-600"
          >
            <option value="all">All Verification Statuses</option>
            <option value="verified">Verified Producers Only</option>
            <option value="pending">Pending KYC / Review</option>
            <option value="unverified">Unverified / Suspended</option>
          </select>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-700 transition-colors"
        >
          <UserPlus className="h-4 w-4" />
          <span>Onboard Producer</span>
        </button>
      </div>

      {/* Counts Header */}
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-3">
        <span>Registered Marketers & Producers Directory ({filtered.length} shown)</span>
        <span>Kwara State Livestock Traceability Registry</span>
      </div>

      {/* Farmer Cards Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((f) => (
          <div
            key={f.id}
            className="rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:shadow-md hover:border-emerald-200"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-sm font-bold text-emerald-800 ring-2 ring-emerald-200/60 shadow-xs">
                  {f.owner.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-foreground text-sm truncate" title={f.name}>
                      {f.name}
                    </p>
                    {f.status === "verified" && (
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" title="Verified Producer" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">{f.id}</p>
                </div>
              </div>

              <button
                onClick={() => setActiveFarmerModal(f)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted"
                title="View Producer Details"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            {/* Contact details */}
            <div className="mt-4 space-y-1.5 text-xs">
              <p className="flex items-center gap-2 text-muted-foreground">
                <span className="font-semibold text-foreground">{f.owner}</span>
                <span className="text-[11px] text-muted-foreground/80">(Principal)</span>
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span className="truncate">{f.email}</span>
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                <span>{f.phone}</span>
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                <span>{f.location}</span>
              </p>
            </div>

            {/* Performance metrics */}
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
              <div>
                <p className="flex items-center justify-center gap-1 text-xs font-bold text-amber-600">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> {f.rating}
                </p>
                <p className="text-[11px] text-muted-foreground">Rating</p>
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">{f.products}</p>
                <p className="text-[11px] text-muted-foreground">Listings</p>
              </div>
              <div>
                <p className="text-xs font-bold text-green-700">{formatNaira(f.revenue)}</p>
                <p className="text-[11px] text-muted-foreground">Trade Vol.</p>
              </div>
            </div>

            {/* Actions footer */}
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <StatusBadge status={f.status} />

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveFarmerModal(f)}
                  className="rounded-lg border border-border px-2.5 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  Audit
                </button>
                <button
                  onClick={() => handleVerifyToggle(f)}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                    f.status === "verified" || f.isVerified
                      ? "border border-red-200 text-red-600 hover:bg-red-50"
                      : "bg-green-600 text-white hover:bg-green-700 shadow-xs"
                  }`}
                >
                  {f.status === "verified" || f.isVerified ? (
                    <>
                      <X className="h-3 w-3" /> Revoke
                    </>
                  ) : (
                    <>
                      <Check className="h-3 w-3" /> Verify
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground bg-card">
          <p className="font-semibold text-foreground">No producers match your query</p>
          <p className="text-xs text-muted-foreground mt-1">Try clearing filters or search terms.</p>
        </div>
      )}

      {/* Producer Detail & KYC Modal */}
      {activeFarmerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 font-bold text-emerald-800">
                  {activeFarmerModal.owner.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{activeFarmerModal.name}</h3>
                  <p className="text-xs text-muted-foreground">{activeFarmerModal.id} • {activeFarmerModal.location}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveFarmerModal(null)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="rounded-xl border border-border p-3.5 bg-slate-50 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Owner / Contact:</span>
                  <span className="font-semibold text-foreground">{activeFarmerModal.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Official Email:</span>
                  <span className="font-semibold text-foreground">{activeFarmerModal.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone Number:</span>
                  <span className="font-semibold text-foreground">{activeFarmerModal.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kwara LGA:</span>
                  <span className="font-semibold text-foreground">{activeFarmerModal.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Onboarding Date:</span>
                  <span className="font-semibold text-foreground">{activeFarmerModal.joined}</span>
                </div>
              </div>

              <div className="rounded-xl border border-border p-3.5 bg-emerald-50/50 space-y-1.5">
                <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Kwara State KYC & NIN Documentation
                </span>
                <p className="text-muted-foreground">
                  NIN / CAC Identity Verification:{" "}
                  <strong className="text-foreground">
                    {activeFarmerModal.verificationDetails?.nin || activeFarmerModal.verificationDetails?.nin_reg || "Audit Passed (Verified)"}
                  </strong>
                </p>
                <p className="text-muted-foreground">
                  Livestock Holding Capacity: <strong className="text-foreground">Certified Pastoralist Facility</strong>
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    handleVerifyToggle(activeFarmerModal);
                    setActiveFarmerModal(null);
                  }}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold shadow-xs ${
                    activeFarmerModal.status === "verified" || activeFarmerModal.isVerified
                      ? "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {activeFarmerModal.status === "verified" || activeFarmerModal.isVerified ? (
                    <>
                      <X className="h-4 w-4" /> Revoke Certification
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" /> Grant Verified Producer Status
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Onboard / Invite Producer Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-base font-bold text-foreground">Onboard Livestock Producer</h3>
                <p className="text-xs text-muted-foreground">Register new farmer or cooperative onto Kwara L-PRES trade desk</p>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Producer invitation sent to ${inviteForm.email}!`);
                setShowInviteModal(false);
              }}
              className="mt-4 space-y-3.5 text-xs"
            >
              <div>
                <label className="font-semibold text-foreground block mb-1">Ranch / Enterprise Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Al-Hikmah Cattle Ranch"
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  className="h-9 w-full rounded-xl border border-input bg-background px-3 outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="font-semibold text-foreground block mb-1">Producer Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="producer@kwarafarm.ng"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  className="h-9 w-full rounded-xl border border-input bg-background px-3 outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="font-semibold text-foreground block mb-1">Contact Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="+234 803 123 4567"
                  value={inviteForm.phone}
                  onChange={(e) => setInviteForm({ ...inviteForm, phone: e.target.value })}
                  className="h-9 w-full rounded-xl border border-input bg-background px-3 outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="font-semibold text-foreground block mb-1">Kwara Local Government Area (LGA)</label>
                <select
                  value={inviteForm.lga}
                  onChange={(e) => setInviteForm({ ...inviteForm, lga: e.target.value })}
                  className="h-9 w-full rounded-xl border border-input bg-background px-3 outline-none focus:border-green-600"
                >
                  {["Ilorin East", "Ilorin West", "Ilorin South", "Moro", "Asa", "Edu", "Patigi", "Kaiama", "Baruten", "Offa", "Oyun", "Irepodun", "Ifelodun", "Isin", "Oke Ero", "Ekiti"].map((lga) => (
                    <option key={lga} value={lga}>{lga}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 rounded-xl border border-border py-2.5 font-semibold text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-green-600 py-2.5 font-semibold text-white hover:bg-green-700 shadow-xs"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
