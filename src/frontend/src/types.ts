export interface Product {
  id: bigint;
  name: string;
  price: bigint;
  description: string;
  imageUrl: string;
  category: string;
  stock: bigint;
  gender?: "men" | "women" | "unisex";
}

export interface CartItem {
  productId: bigint;
  quantity: bigint;
  name: string;
  price: bigint;
  imageUrl: string;
}

export interface CartSummary {
  items: CartItem[];
  totalItems: bigint;
  totalPrice: bigint;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export type OrderStatus =
  | { Pending: null }
  | { Processing: null }
  | { Shipped: null }
  | { Delivered: null }
  | { Cancelled: null };

export interface OrderItem {
  productId: bigint;
  quantity: bigint;
  name: string;
  price: bigint;
}

export interface Order {
  id: bigint;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  totalPrice: bigint;
  status: OrderStatus;
  createdAt: bigint;
}
