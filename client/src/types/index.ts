export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string | null;
  tags: string[];
  stock: number;
  sold: number;
  cost: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDraft {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string | null;
  tags: string[];
  stock: number;
  sold: number;
  cost: number;
}

export type ProductUpdatePayload = Partial<ProductDraft> & { tags?: string[] };

export interface InventorySummary {
  totalProducts: number;
  totalStock: number;
  totalSold: number;
  inventoryValue: number;
  salesRevenue: number;
  potentialRevenue: number;
}

export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  unitPrice: number;
}

export type DeliveryMethod = "correios" | "partner" | "pickup";

export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  deliveryMethod: DeliveryMethod;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: "pending" | "paid";
  pixCode: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderSummary {
  totalOrders: number;
  pendingOrders: number;
  paidOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}

export interface CategoryBreakdown {
  category: string;
  stock: number;
  sold: number;
  inventoryValue: number;
  salesRevenue: number;
}

export type ProductTileVariant = "spotlight" | "default";

export interface HeroSlide {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface Highlight {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
}
