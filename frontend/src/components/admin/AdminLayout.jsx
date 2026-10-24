import React, { useState } from "react";
import { Menu, Search, Bell, RefreshCw, ShieldCheck, CheckCircle2 } from "lucide-react";
import AdminSidebar, { NAV_ITEMS } from "./AdminSidebar";

export default function AdminLayout({
  activeTab = "dashboard",
  onSelectTab,
  adminUser,
  onLogout,
  onRefresh,
  loading = false,
  badgeCounts = {},
  searchQuery = "",
  onSearchChange,
  children
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeNavItem = NAV_ITEMS.find((item) => item.id === activeTab);
  const title = activeNavItem ? activeNavItem.label : "Admin Dashboard";

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-900 antialiased">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        adminUser={adminUser}
        onLogout={onLogout}
        badgeCounts={badgeCounts}
      />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur-md lg:px-8 shadow-xs">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 rounded-lg lg:hidden text-muted-foreground hover:bg-muted transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">{title}</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Kwara State Livestock Productivity & Resilience Support Project</p>
          </div>

          <div className="ml-auto flex items-center gap-2.5">
            {/* Global Search Bar */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                placeholder="Search requests, farmers, products..."
                className="h-9 w-64 lg:w-80 rounded-xl border border-input bg-muted/40 pl-9 pr-3 text-sm outline-none transition-all focus:border-green-600 focus:bg-background focus:ring-2 focus:ring-green-600/15"
              />
            </div>

            {/* Refresh Data Button */}
            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={loading}
                title="Refresh Live Data"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-green-600" : ""}`} />
              </button>
            )}

            {/* Notification Bell */}
            <button
              title="Recent Notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-green-600 ring-2 ring-background animate-pulse" />
            </button>

            {/* State Verification Tag */}
            <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 border border-emerald-200/60 text-xs font-semibold text-emerald-800">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>SPCO Desk</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
