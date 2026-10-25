import React, { useState } from "react";
import { Bell, Shield, CreditCard, Globe, Users, Save, CheckCircle2 } from "lucide-react";

function Toggle({ defaultOn = false, onChange }) {
  const [checked, setChecked] = useState(defaultOn);
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          if (onChange) onChange(e.target.checked);
        }}
        className="peer sr-only"
      />
      <div className="h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-green-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
    </label>
  );
}

export default function MarketplaceSettings() {
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {savedNotice && (
        <div className="flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 p-3.5 text-sm font-semibold text-green-800 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <span>Marketplace settings updated and applied to trade desk!</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Verification Policy */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs lg:col-span-2">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Veterinary & Quality Policy</h3>
              <p className="text-xs text-muted-foreground">Standards for livestock trade facilitation and buyer protection</p>
            </div>
          </div>

          <div className="space-y-4 text-sm divide-y divide-border/60">
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="font-semibold text-foreground text-xs sm:text-sm">Mandatory 1% State Inspection Fee</p>
                <p className="text-xs text-muted-foreground">Auto-calculate veterinary health and traceability check for buyer requests.</p>
              </div>
              <Toggle defaultOn={true} />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <p className="font-semibold text-foreground text-xs sm:text-sm">Require Inspection Photos Before Listing</p>
                <p className="text-xs text-muted-foreground">Producers must upload physical photo proof before submission reaches catalog.</p>
              </div>
              <Toggle defaultOn={true} />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <p className="font-semibold text-foreground text-xs sm:text-sm">Auto-flag Unverified Marketers</p>
                <p className="text-xs text-muted-foreground">Listings from unverified producers require veterinary clearance before active.</p>
              </div>
              <Toggle defaultOn={true} />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <p className="font-semibold text-foreground text-xs sm:text-sm">Minimum Farmer Rating Threshold</p>
                <p className="text-xs text-muted-foreground">Producers falling below this score trigger trade desk monitoring.</p>
              </div>
              <input
                type="number"
                defaultValue={4.0}
                step={0.1}
                min={1}
                max={5}
                className="h-9 w-20 rounded-xl border border-input bg-background px-3 text-sm font-semibold outline-none focus:border-green-600"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Auto Notifications</h3>
              <p className="text-xs text-muted-foreground">Real-time email and SMS alerts</p>
            </div>
          </div>

          <div className="space-y-4 text-xs divide-y divide-border/60">
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="font-semibold text-foreground">New Trade Requests</p>
                <p className="text-muted-foreground">Instant dispatch email to state trade desk.</p>
              </div>
              <Toggle defaultOn={true} />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <p className="font-semibold text-foreground">Status Update to Buyers</p>
                <p className="text-muted-foreground">Auto-send approval & shipping waybills.</p>
              </div>
              <Toggle defaultOn={true} />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <p className="font-semibold text-foreground">Cold-Chain Delay Alerts</p>
                <p className="text-muted-foreground">Flag shipments delayed over 4 hours.</p>
              </div>
              <Toggle defaultOn={true} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Marketplace Parameters */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs lg:col-span-2">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Marketplace Information & Branding</h3>
              <p className="text-xs text-muted-foreground">Public storefront parameters and contact endpoints</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
            <div>
              <label className="font-semibold text-foreground block mb-1">Marketplace Portal Name</label>
              <input
                defaultValue="Kwara L-PRES Livestock Marketplace"
                className="h-10 w-full rounded-xl border border-input bg-background px-3 font-medium outline-none focus:border-green-600"
              />
            </div>
            <div>
              <label className="font-semibold text-foreground block mb-1">Trade Desk Support Email</label>
              <input
                defaultValue="marketplace@lpres.kw.gov.ng"
                className="h-10 w-full rounded-xl border border-input bg-background px-3 font-medium outline-none focus:border-green-600"
              />
            </div>
            <div>
              <label className="font-semibold text-foreground block mb-1">Base Currency</label>
              <select className="h-10 w-full rounded-xl border border-input bg-background px-3 font-medium outline-none focus:border-green-600">
                <option>Nigerian Naira (₦)</option>
                <option>US Dollar ($)</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-foreground block mb-1">Trade Facilitation Commission (%)</label>
              <input
                type="number"
                defaultValue={1.5}
                step={0.5}
                className="h-10 w-full rounded-xl border border-input bg-background px-3 font-medium outline-none focus:border-green-600"
              />
            </div>
          </div>
        </div>

        {/* Payment & State Admin */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">Settlement Gateways</h3>
                <p className="text-xs text-muted-foreground">Escrow & payment processing</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between rounded-xl border border-border p-3 bg-muted/20">
                <span className="font-semibold text-foreground">Remita (State Treasury)</span>
                <span className="rounded-full bg-green-50 border border-green-200 px-2 py-0.5 font-bold text-green-700 text-[10px]">Active</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border p-3 bg-muted/20">
                <span className="font-semibold text-foreground">Direct Bank Transfer / Escrow</span>
                <span className="rounded-full bg-green-50 border border-green-200 px-2 py-0.5 font-bold text-green-700 text-[10px]">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-xs hover:bg-green-700 transition-colors"
        >
          <Save className="h-4 w-4" /> Save Configuration
        </button>
      </div>
    </form>
  );
}
