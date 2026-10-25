// Kwara State L-PRES Marketplace Data & Mock Store

export const stats = {
  totalRevenue: 18450000,
  revenueChange: 14.8,
  activeFarmers: 428,
  farmersChange: 9.4,
  pendingProducts: 24,
  productsChange: -3.2,
  activeOrders: 86,
  ordersChange: 18.2,
  totalProducts: 1420,
  verifiedProducts: 1280,
  rejectedProducts: 116,
  totalCustomers: 3120,
  completedDeliveries: 940,
  inTransitShipments: 48,
};

export const revenueData = [
  { month: "Jan", revenue: 980000, orders: 48 },
  { month: "Feb", revenue: 1240000, orders: 62 },
  { month: "Mar", revenue: 1450000, orders: 74 },
  { month: "Apr", revenue: 1390000, orders: 69 },
  { month: "May", revenue: 1680000, orders: 84 },
  { month: "Jun", revenue: 1920000, orders: 96 },
  { month: "Jul", revenue: 2150000, orders: 108 },
  { month: "Aug", revenue: 2040000, orders: 102 },
  { month: "Sep", revenue: 2480000, orders: 124 },
  { month: "Oct", revenue: 2850000, orders: 142 },
];

export const categoryData = [
  { name: "Cattle & Beef", value: 520, color: "#16a34a" },
  { name: "Sheep & Goats", value: 380, color: "#65a30d" },
  { name: "Poultry & Eggs", value: 310, color: "#ca8a04" },
  { name: "Animal Feeds & Fodder", value: 240, color: "#2563eb" },
  { name: "Dairy & Milk", value: 190, color: "#0891b2" },
  { name: "Vet Supplies & Care", value: 120, color: "#9333ea" },
];

export const shipmentStatusData = [
  { status: "Delivered", count: 940, fill: "#16a34a" },
  { status: "In Transit", count: 48, fill: "#2563eb" },
  { status: "Pending Pickup", count: 22, fill: "#ca8a04" },
  { status: "Delayed", count: 8, fill: "#dc2626" },
];

export const topFarmers = [
  { id: "LPR-FRM-001", name: "Al-Barakah Livestock Ranch", owner: "Alhaji Ibrahim Gambari", location: "Ilorin East (Kwara)", rating: 4.9, products: 38, revenue: 4820000, status: "verified" },
  { id: "LPR-FRM-002", name: "Kwara Dairy Cooperative Hub", owner: "Hajiya Aminat Bello", location: "Moro (Kwara)", rating: 4.8, products: 26, revenue: 3740000, status: "verified" },
  { id: "LPR-FRM-003", name: "Edu River Pastures", owner: "Idris Mohammed", location: "Edu (Kwara)", rating: 4.7, products: 22, revenue: 2950000, status: "verified" },
  { id: "LPR-FRM-004", name: "Asa Valley Poultry & Broilers", owner: "Samuel Adeleke", location: "Asa (Kwara)", rating: 4.6, products: 19, revenue: 2410000, status: "verified" },
  { id: "LPR-FRM-005", name: "Patigi Feeds & Forage Enterprise", owner: "Usman Ndagi", location: "Patigi (Kwara)", rating: 4.5, products: 15, revenue: 1890000, status: "pending" },
];

export const pendingProducts = [
  { id: "PRD-4011", name: "Prime White Fulani Bull (Mature 420kg)", farmer: "Al-Barakah Livestock Ranch", farmerId: "LPR-FRM-001", category: "Livestock", price: 650000, quantity: 15, unit: "heads", postedDate: "2026-10-15", status: "pending", image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=500" },
  { id: "PRD-4012", name: "Red Sokoto Breeding Goats (He-Goat)", farmer: "Kwara Dairy Cooperative Hub", farmerId: "LPR-FRM-002", category: "Livestock", price: 75000, quantity: 40, unit: "heads", postedDate: "2026-10-14", status: "pending", image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?w=500" },
  { id: "PRD-4013", name: "Fresh Raw Cow Milk (25L Chilled Can)", farmer: "Kwara Dairy Cooperative Hub", farmerId: "LPR-FRM-002", category: "Dairy", price: 32000, quantity: 60, unit: "cans", postedDate: "2026-10-14", status: "pending", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500" },
  { id: "PRD-4014", name: "Layer Mash High-Protein Poultry Feed (50kg)", farmer: "Patigi Feeds Enterprise", farmerId: "LPR-FRM-005", category: "Feeds", price: 21500, quantity: 120, unit: "bags", postedDate: "2026-10-13", status: "pending", image: "https://images.unsplash.com/photo-1586201375761-8c65084a6c9c?w=500" },
  { id: "PRD-4015", name: "Balami Ram (Large Breeding Specimen)", farmer: "Edu River Pastures", farmerId: "LPR-FRM-003", category: "Livestock", price: 180000, quantity: 25, unit: "heads", postedDate: "2026-10-13", status: "pending", image: "https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=500" },
  { id: "PRD-4016", name: "Jumbo Farm Fresh Eggs (Crate of 30)", farmer: "Asa Valley Poultry", farmerId: "LPR-FRM-004", category: "Dairy", price: 4200, quantity: 300, unit: "crates", postedDate: "2026-10-12", status: "pending", image: "https://images.unsplash.com/photo-1582727651306-41c1e9d65d90?w=500" },
  { id: "PRD-4017", name: "Silage & Hay Baler Bundles (Nutrient Enriched)", farmer: "Patigi Feeds Enterprise", farmerId: "LPR-FRM-005", category: "Feeds", price: 8500, quantity: 200, unit: "bales", postedDate: "2026-10-12", status: "pending", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500" },
  { id: "PRD-4018", name: "Oxytetracycline 20% LA Injectable (100ml)", farmer: "VetPro Ilorin Depot", farmerId: "LPR-FRM-006", category: "Veterinary", price: 6800, quantity: 85, unit: "vials", postedDate: "2026-10-11", status: "pending", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500" },
];

export const mockOrders = [
  { id: "LPR-ORD-8921", buyer: "Ilorin Central Abattoir", farmer: "Al-Barakah Livestock Ranch", product: "White Fulani Bull (Mature 420kg)", quantity: 6, total: 3900000, status: "processing", date: "2026-10-15", payment: "paid" },
  { id: "LPR-ORD-8920", buyer: "Crown Mega Foods Lagos", farmer: "Kwara Dairy Cooperative Hub", product: "Fresh Raw Cow Milk (25L Can)", quantity: 20, total: 640000, status: "shipped", date: "2026-10-15", payment: "paid" },
  { id: "LPR-ORD-8919", buyer: "Offa Agro-Allied Processing", farmer: "Patigi Feeds Enterprise", product: "Layer Mash Feed (50kg)", quantity: 50, total: 1075000, status: "delivered", date: "2026-10-14", payment: "paid" },
  { id: "LPR-ORD-8918", buyer: "Kwara State Cooperative Bank", farmer: "Edu River Pastures", product: "Balami Ram (Large)", quantity: 8, total: 1440000, status: "pending", date: "2026-10-14", payment: "pending" },
  { id: "LPR-ORD-8917", buyer: "Harmony Bakers & Confectionery", farmer: "Asa Valley Poultry", product: "Farm Fresh Eggs (Crate)", quantity: 80, total: 336000, status: "shipped", date: "2026-10-13", payment: "paid" },
  { id: "LPR-ORD-8916", buyer: "Mandate Livestock Market Ilorin", farmer: "Al-Barakah Livestock Ranch", product: "Red Sokoto Breeding Goats", quantity: 15, total: 1125000, status: "delivered", date: "2026-10-13", payment: "paid" },
  { id: "LPR-ORD-8915", buyer: "Kwara Pastoralists Association", farmer: "Patigi Feeds Enterprise", product: "Silage & Hay Baler Bundles", quantity: 60, total: 510000, status: "cancelled", date: "2026-10-12", payment: "refunded" },
];

export const shipments = [
  { id: "LPR-SHP-6201", order: "LPR-ORD-8920", product: "Fresh Raw Cow Milk (25L Can)", origin: "Moro LGA", destination: "Ikeja, Lagos", carrier: "Kwara L-PRES Cold-Relay", status: "in_transit", eta: "2026-10-17", tracking: "KWR-COLD-8920", driver: "Yakubu Aliyu" },
  { id: "LPR-SHP-6200", order: "LPR-ORD-8917", product: "Farm Fresh Eggs (Crate)", origin: "Asa LGA", destination: "Ilorin South", carrier: "L-PRES State Dispatch Hub", status: "in_transit", eta: "2026-10-16", tracking: "KWR-EXP-8917", driver: "Kayode Oladipo" },
  { id: "LPR-SHP-6199", order: "LPR-ORD-8919", product: "Layer Mash Feed (50kg)", origin: "Patigi LGA", destination: "Offa LGA", carrier: "AgriLogistics Kwara", status: "delivered", eta: "2026-10-14", tracking: "KWR-AGL-8919", driver: "Babatunde Jimoh" },
  { id: "LPR-SHP-6198", order: "LPR-ORD-8916", product: "Red Sokoto Breeding Goats", origin: "Ilorin East", destination: "Mandate Market", carrier: "Kwara Livestock Haulers", status: "delivered", eta: "2026-10-13", tracking: "KWR-HAUL-8916", driver: "Haruna Sani" },
  { id: "LPR-SHP-6197", order: "LPR-ORD-8921", product: "White Fulani Bull (Mature 420kg)", origin: "Ilorin East", destination: "Ilorin Central Abattoir", carrier: "Kwara L-PRES Haulage", status: "pending_pickup", eta: "2026-10-18", tracking: "KWR-HAUL-8921", driver: "Awaiting Logistics Assignment" },
  { id: "LPR-SHP-6196", order: "LPR-ORD-8918", product: "Balami Ram (Large)", origin: "Edu LGA", destination: "GRA Ilorin", carrier: "AgriLogistics Kwara", status: "pending_pickup", eta: "2026-10-19", tracking: "KWR-AGL-8918", driver: "Unassigned" },
  { id: "LPR-SHP-6195", order: "LPR-ORD-8914", product: "Veterinary Injectables & Vaccines", origin: "Ilorin West", destination: "Kaiama LGA", carrier: "Kwara L-PRES Cold-Relay", status: "delayed", eta: "2026-10-16", tracking: "KWR-COLD-8914", driver: "Musa Danladi" },
];

export const recentActivity = [
  { id: 1, type: "verification", message: "White Fulani Bull (PRD-4011) certified by L-PRES Veterinary Inspector", time: "8 min ago", icon: "CheckCircle" },
  { id: 2, type: "order", message: "New Trade Facilitation Request LPR-ORD-8921 received from Ilorin Central Abattoir", time: "15 min ago", icon: "ShoppingCart" },
  { id: 3, type: "shipment", message: "Cold-chain milk consignment SHP-6201 dispatched via Moro relay", time: "1 hour ago", icon: "Truck" },
  { id: 4, type: "farmer", message: "Patigi Feeds Enterprise completed producer verification KYC & NIN audit", time: "2 hours ago", icon: "Users" },
  { id: 5, type: "payment", message: "Trade deposit of ₦3,900,000 cleared for order LPR-ORD-8921", time: "3 hours ago", icon: "CreditCard" },
  { id: 6, type: "rejection", message: "Feed consignment (PRD-4008) rejected — failed moisture compliance standard", time: "6 hours ago", icon: "XCircle" },
];

export const farmers = [
  { id: "LPR-FRM-001", name: "Al-Barakah Livestock Ranch", owner: "Alhaji Ibrahim Gambari", email: "gambari@albarakah.ng", phone: "+234 803 451 9021", location: "Ilorin East, Kwara", rating: 4.9, products: 38, revenue: 4820000, status: "verified", joined: "2025-02-14" },
  { id: "LPR-FRM-002", name: "Kwara Dairy Cooperative Hub", owner: "Hajiya Aminat Bello", email: "aminat@kwaradairy.org", phone: "+234 805 772 1104", location: "Moro, Kwara", rating: 4.8, products: 26, revenue: 3740000, status: "verified", joined: "2025-03-20" },
  { id: "LPR-FRM-003", name: "Edu River Pastures", owner: "Idris Mohammed", email: "idris@edupastures.ng", phone: "+234 807 334 5519", location: "Edu, Kwara", rating: 4.7, products: 22, revenue: 2950000, status: "verified", joined: "2025-05-11" },
  { id: "LPR-FRM-004", name: "Asa Valley Poultry & Broilers", owner: "Samuel Adeleke", email: "samuel@asavalley.ng", phone: "+234 802 881 4402", location: "Asa, Kwara", rating: 4.6, products: 19, revenue: 2410000, status: "verified", joined: "2025-06-08" },
  { id: "LPR-FRM-005", name: "Patigi Feeds Enterprise", owner: "Usman Ndagi", email: "ndagi@patigifeeds.ng", phone: "+234 806 912 3381", location: "Patigi, Kwara", rating: 4.5, products: 15, revenue: 1890000, status: "pending", joined: "2026-08-19" },
  { id: "LPR-FRM-006", name: "VetPro Ilorin Depot", owner: "Dr. Fatima Sulaiman", email: "fatima@vetpro-ilorin.ng", phone: "+234 809 223 9910", location: "Ilorin West, Kwara", rating: 4.8, products: 42, revenue: 3120000, status: "verified", joined: "2025-01-10" },
  { id: "LPR-FRM-007", name: "Kaiama Pastoralists Hub", owner: "Garba Saliu", email: "garba@kaiamapasture.ng", phone: "+234 803 118 7744", location: "Kaiama, Kwara", rating: 4.3, products: 12, revenue: 1450000, status: "suspended", joined: "2026-09-02" },
];

export const conversionFunnel = [
  { stage: "Catalog Views", value: 34500, fill: "#16a34a" },
  { stage: "Request Drafts", value: 14200, fill: "#65a30d" },
  { stage: "Inspection Verified", value: 8900, fill: "#ca8a04" },
  { stage: "Facilitated Orders", value: 4100, fill: "#2563eb" },
  { stage: "Dispatched & Delivered", value: 3850, fill: "#0891b2" },
];

export const regionalData = [
  { region: "Ilorin East", orders: 280, revenue: 6420000 },
  { region: "Ilorin South", orders: 210, revenue: 4890000 },
  { region: "Ilorin West", orders: 195, revenue: 4210000 },
  { region: "Moro", orders: 165, revenue: 3750000 },
  { region: "Edu", orders: 130, revenue: 2980000 },
  { region: "Asa", orders: 115, revenue: 2450000 },
  { region: "Patigi", orders: 85, revenue: 1840000 },
  { region: "Kaiama", orders: 60, revenue: 1320000 },
];

export const formatNaira = (value) =>
  "₦" + new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(value || 0);
