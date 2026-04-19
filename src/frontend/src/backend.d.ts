import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface CartSummary {
    items: Array<CartItem>;
    totalItems: bigint;
    totalPrice: bigint;
}
export interface ShippingAddress {
    street: string;
    country: string;
    city: string;
    fullName: string;
    zipCode: string;
    state: string;
}
export interface OrderItem {
    name: string;
    productId: ProductId;
    quantity: bigint;
    price: bigint;
}
export type SessionId = string;
export type ProductId = bigint;
export interface CartItem {
    name: string;
    productId: ProductId;
    imageUrl: string;
    quantity: bigint;
    price: bigint;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    createdAt: Timestamp;
    shippingAddress: ShippingAddress;
    items: Array<OrderItem>;
    totalPrice: bigint;
    orderNumber: string;
}
export interface Product {
    id: ProductId;
    name: string;
    description: string;
    stock: bigint;
    imageUrl: string;
    category: string;
    price: bigint;
}
export type OrderId = bigint;
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered",
    confirmed = "confirmed"
}
export interface backendInterface {
    addProduct(name: string, price: bigint, description: string, imageUrl: string, category: string, stock: bigint): Promise<Product>;
    addToCart(sessionId: SessionId, productId: ProductId, quantity: bigint): Promise<boolean>;
    clearCart(sessionId: SessionId): Promise<void>;
    createOrder(sessionId: SessionId, shippingAddress: ShippingAddress): Promise<Order | null>;
    getCart(sessionId: SessionId): Promise<CartSummary>;
    getOrder(id: OrderId): Promise<Order | null>;
    getProduct(id: ProductId): Promise<Product | null>;
    listProducts(searchTerm: string | null, category: string | null): Promise<Array<Product>>;
    removeFromCart(sessionId: SessionId, productId: ProductId): Promise<boolean>;
    updateCartItem(sessionId: SessionId, productId: ProductId, quantity: bigint): Promise<boolean>;
}
