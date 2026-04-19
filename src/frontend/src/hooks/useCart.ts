import type { CartItem } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  items: CartItem[];
  sessionId: string;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: bigint }) => void;
  removeItem: (productId: bigint) => void;
  updateQuantity: (productId: bigint, quantity: bigint) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      sessionId: generateSessionId(),

      addItem: (item) => {
        const { items } = get();
        const existing = items.find((i) => i.productId === item.productId);
        if (existing) {
          set({
            items: items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + BigInt(1) }
                : i,
            ),
          });
        } else {
          set({
            items: [
              ...items,
              { ...item, quantity: item.quantity ?? BigInt(1) },
            ],
          });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= BigInt(0)) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + Number(i.quantity), 0),

      totalPrice: () =>
        get().items.reduce(
          (sum, i) => sum + Number(i.price) * Number(i.quantity),
          0,
        ),
    }),
    {
      name: "shopeasy-cart",
      storage: {
        getItem: (key) => {
          const str = localStorage.getItem(key);
          if (!str) return null;
          return JSON.parse(str, (_, v) => {
            if (typeof v === "string" && /^\d+n$/.test(v)) {
              return BigInt(v.slice(0, -1));
            }
            return v;
          });
        },
        setItem: (key, value) => {
          localStorage.setItem(
            key,
            JSON.stringify(value, (_, v) =>
              typeof v === "bigint" ? `${v}n` : v,
            ),
          );
        },
        removeItem: (key) => localStorage.removeItem(key),
      },
    },
  ),
);
