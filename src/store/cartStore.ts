// store/useCart.ts
import { Product } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product: Product) =>
        set((state) => ({
          cart: state.cart.includes(product)
            ? state.cart
            : [...state.cart, product],
        })),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((product) => product.id !== productId),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "tbd-cart" },
  ),
);
