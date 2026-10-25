import React from "react";
import {
  LayoutDashboard,
  PackageCheck,
  Users,
  ShoppingCart,
  Truck,
  BarChart3,
  Settings,
  Tag,
  Sprout,
  X,
  LogOut,
  ShieldCheck,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "verification", label: "Product Verification", icon: PackageCheck },
  { id: "farmers", label: "Producers & Farmers", icon: Users },
  { id: "orders", label: "Orders & Requests", icon: ShoppingCart },
  { id: "shipments", label: "Shipments & Logistics", icon: Truck },
  { id: "bids", label: "Price Bids", icon: Tag },
  { id: "analytics", label: "Analytics & Trends", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar({
  open,
  onClose,
  activeTab,
  onSelectTab,
  adminUser,
  onLogout,
  badgeCounts = {}
}) {
  return (
    <>
      {/* Mobile overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-sidebar transition-transform duration-200 ease-in-out lg:translate-x-0 shadow-lg lg:shadow-none",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5 bg-background/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 text-white shadow-sm shadow-green-600/30">
              <Sprout className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold tracking-tight text-foreground">Kwara L-PRES</p>
              <p className="text-[11px] font-medium text-emerald-600">Marketplace Admin</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
            aria-label="Close Sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            Trade & Operations
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            const badge = badgeCounts[item.id];

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onClose) onClose();
                }}
                className={cn(
                  "group flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all text-left",
                  isActive
                    ? "bg-green-600 text-white shadow-sm shadow-green-600/25 font-semibold"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("h-4.5 w-4.5 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground")} />
                  <span>{item.label}</span>
                </div>
                {badge > 0 && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-bold transition-colors",
                      isActive ? "bg-white/25 text-white" : "bg-emerald-100 text-emerald-800"
                    )}
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Public Storefront Link Shortcut */}
        <div className="px-3 py-2 border-t border-sidebar-border bg-muted/20">
          <a
            href="/marketplace"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Public Marketplace</span>
            </span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* User profile & Logout */}
        <div className="border-t border-sidebar-border p-3 bg-background/50">
          <div className="flex items-center gap-3 rounded-xl p-2 hover:bg-sidebar-accent transition-colors">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 ring-2 ring-emerald-200">
              {adminUser?.username ? adminUser.username.slice(0, 2).toUpperCase() : "AD"}
            </div>
            <div className="flex-1 min-w-0 leading-tight">
              <p className="text-sm font-semibold text-foreground truncate">
                {adminUser?.username || "Admin"}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                State Trade Officer
              </p>
            </div>
            <button
              onClick={onLogout}
              title="Logout from Marketplace Admin"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
