export type DeliveryMethod = "correios" | "partner" | "pickup";

export type OrderStatus = "pending" | "paid";

export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  deliveryMethod: DeliveryMethod;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
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
