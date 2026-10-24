import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { DEFAULT_API_URL } from '../../utils/env';
import AdminLayout from '@/components/admin/AdminLayout';
import MarketplaceDashboardOverview from './MarketplaceDashboardOverview';
import MarketplaceProductVerification from './MarketplaceProductVerification';
import MarketplaceFarmers from './MarketplaceFarmers';
import MarketplaceOrders from './MarketplaceOrders';
import MarketplaceShipments from './MarketplaceShipments';
import MarketplaceBids from './MarketplaceBids';
import MarketplaceAnalytics from './MarketplaceAnalytics';
import MarketplaceSettings from './MarketplaceSettings';

const API_BASE = DEFAULT_API_URL;

export default function MarketplaceAdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active navigation tab from pathname or URL query param, default to "dashboard"
  const subRouteMatch = location.pathname.match(/\/marketplace(?:-admin|\/admin)\/([a-zA-Z0-9_-]+)/);
  const pathTab = subRouteMatch && subRouteMatch[1] !== 'login' ? subRouteMatch[1] : null;
  const tabFromUrl = searchParams.get('tab') || pathTab || 'dashboard';
  const [activeTab, setActiveTab] = useState(tabFromUrl);


  const [token, setToken] = useState(() => localStorage.getItem('lpres_m_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lpres_m_admin_user');
      return saved ? JSON.parse(saved) : { username: 'marketplace_admin' };
    } catch {
      return { username: 'marketplace_admin' };
    }
  });

  // Data states
  const [analytics, setAnalytics] = useState({
    total_requests: 0,
    total_amount: 0.0,
    total_users: 0,
    total_products: 0,
    active_products: 0,
    status_counts: { pending_review: 0, approved: 0, shipped: 0, completed: 0, cancelled: 0 },
  });
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Sync activeTab with URL param
  useEffect(() => {
    const currentParam = searchParams.get('tab');
    if (currentParam && currentParam !== activeTab) {
      setActiveTab(currentParam);
    }
  }, [searchParams]);

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  // Auth guard
  useEffect(() => {
    if (!token) {
      navigate('/marketplace-admin/login', { replace: true });
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('lpres_m_admin_token');
    localStorage.removeItem('lpres_m_admin_user');
    navigate('/marketplace-admin/login', { replace: true });
  };

  // Fetch live marketplace data from API
  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const authHeader = { Authorization: `Bearer ${token}` };

      // 1. Analytics
      try {
        const resAnalytics = await fetch(`${API_BASE}/api/marketplace/admin/analytics`, { headers: authHeader });
        if (resAnalytics.status === 401) {
          handleLogout();
          return;
        }
        const dataAnalytics = await resAnalytics.json();
        if (dataAnalytics.success && dataAnalytics.data) {
          setAnalytics(dataAnalytics.data);
        }
      } catch (e) {
        console.warn('Analytics endpoint unavailable, using cached/mock values');
      }

      // 2. Requests
      try {
        const resRequests = await fetch(`${API_BASE}/api/marketplace/admin/requests`, { headers: authHeader });
        const dataRequests = await resRequests.json();
        if (dataRequests.success && Array.isArray(dataRequests.data)) {
          setRequests(dataRequests.data);
        }
      } catch (e) {
        console.warn('Requests endpoint unavailable');
      }

      // 3. Registered Users
      try {
        const resUsers = await fetch(`${API_BASE}/api/marketplace/admin/users`, { headers: authHeader });
        const dataUsers = await resUsers.json();
        if (dataUsers.success && Array.isArray(dataUsers.data)) {
          setUsers(dataUsers.data);
        }
      } catch (e) {
        console.warn('Users endpoint unavailable');
      }

      // 4. Catalog Products
      try {
        const resProducts = await fetch(`${API_BASE}/api/marketplace/products`);
        const dataProducts = await resProducts.json();
        if (dataProducts.success && dataProducts.data?.products) {
          setProducts(dataProducts.data.products);
        }
      } catch (e) {
        console.warn('Products endpoint unavailable');
      }

      // 5. Customer Bids
      try {
        const resBids = await fetch(`${API_BASE}/api/marketplace/admin/bids`, { headers: authHeader });
        const dataBids = await resBids.json();
        if (dataBids.success && Array.isArray(dataBids.data)) {
          setBids(dataBids.data);
        }
      } catch (e) {
        console.warn('Bids endpoint unavailable');
      }
    } catch (err) {
      console.error('Failed to load Marketplace Admin data:', err);
      setError('Unable to load live data from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  // Request Status Update (Approve, Ship, Complete, Cancel)
  const handleUpdateStatus = async (requestId, newStatus, customNotes = '') => {
    setUpdatingStatus(true);
    try {
      const res = await fetch(`${API_BASE}/api/marketplace/admin/requests/${requestId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
          admin_notes: customNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to update request status');

      // Update local state
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: newStatus, adminNotes: customNotes } : r))
      );

      // Refresh Analytics
      fetchDashboardData();
    } catch (err) {
      alert(err.message || 'Error updating request status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Bid Status Update (Accept / Reject)
  const handleUpdateBidStatus = async (bidId, newStatus) => {
    const notes = prompt(
      `Enter admin notes for bidder (optional):`,
      newStatus === 'accepted'
        ? 'Bid offer accepted by Kwara L-PRES Trade Desk.'
        : 'Bid offer was below reserve price.'
    );
    if (notes === null) return;

    try {
      const res = await fetch(`${API_BASE}/api/marketplace/admin/bids/${bidId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
          admin_notes: notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to update bid status');

      alert(`Bid marked as "${newStatus}". Notification email dispatched to bidder.`);
      setBids((prev) => prev.map((b) => (b.id === bidId ? { ...b, status: newStatus, adminNotes: notes } : b)));
      fetchDashboardData();
    } catch (err) {
      alert(err.message || 'Error updating bid status');
    }
  };

  // User Verification Update
  const handleVerifyUser = async (userId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/api/marketplace/admin/users/${userId}/verify?status=${newStatus}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to update verification status');

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? {
                ...u,
                verificationStatus: newStatus,
                isVerified: newStatus === 'verified',
              }
            : u
        )
      );
    } catch (err) {
      alert(err.message || 'Error verifying user');
    }
  };

  // Notification / Badge counts
  const badgeCounts = useMemo(() => {
    const pendingRequests = requests.filter((r) => r.status === 'pending_review' || !r.status).length;
    const pendingBids = bids.filter((b) => b.status === 'pending' || !b.status).length;
    const pendingUsers = users.filter((u) => u.verificationStatus === 'pending').length;

    return {
      orders: pendingRequests || 0,
      bids: pendingBids || 0,
      farmers: pendingUsers || 0,
      verification: 24, // pending products queue
    };
  }, [requests, bids, users]);

  return (
    <AdminLayout
      activeTab={activeTab}
      onSelectTab={handleSelectTab}
      adminUser={adminUser}
      onLogout={handleLogout}
      onRefresh={fetchDashboardData}
      loading={loading}
      badgeCounts={badgeCounts}
      searchQuery={globalSearch}
      onSearchChange={setGlobalSearch}
    >
      {/* Tab 1: Overview Dashboard */}
      {activeTab === 'dashboard' && (
        <MarketplaceDashboardOverview
          analytics={analytics}
          requests={requests}
          users={users}
          products={products}
          onNavigateTab={handleSelectTab}
          onRefresh={fetchDashboardData}
        />
      )}

      {/* Tab 2: Product Verification */}
      {activeTab === 'verification' && (
        <MarketplaceProductVerification
          catalogProducts={products}
          onRefresh={fetchDashboardData}
        />
      )}

      {/* Tab 3: Producers & Farmers */}
      {activeTab === 'farmers' && (
        <MarketplaceFarmers
          users={users}
          onVerifyUser={handleVerifyUser}
          token={token}
          onRefresh={fetchDashboardData}
        />
      )}

      {/* Tab 4: Orders & Requests */}
      {activeTab === 'orders' && (
        <MarketplaceOrders
          requests={requests}
          onUpdateStatus={handleUpdateStatus}
          updatingStatus={updatingStatus}
          onRefresh={fetchDashboardData}
        />
      )}

      {/* Tab 5: Shipments & Deliveries */}
      {activeTab === 'shipments' && (
        <MarketplaceShipments />
      )}

      {/* Tab 6: Price Bids */}
      {activeTab === 'bids' && (
        <MarketplaceBids
          bids={bids}
          onUpdateBidStatus={handleUpdateBidStatus}
          onRefresh={fetchDashboardData}
        />
      )}

      {/* Tab 7: Analytics */}
      {activeTab === 'analytics' && (
        <MarketplaceAnalytics
          analytics={analytics}
        />
      )}

      {/* Tab 8: Settings */}
      {activeTab === 'settings' && (
        <MarketplaceSettings />
      )}
    </AdminLayout>
  );
}
