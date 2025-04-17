// src/store/cartStore.ts
import { createWithEqualityFn } from "zustand/traditional";
import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import type { Product } from "../types/Product";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

interface CartActions {
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

type StoreState = CartState & CartActions;

const useCartStore = createWithEqualityFn<
  StoreState,
  // Itt mondjuk meg, hogy van egy persisztencia-mutatórunk,
  // amely StoreState-t ment:
  [["zustand/persist", StoreState]]
>(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product, quantity) => {
        set((state) => {
          const idx = state.cart.findIndex((i) => i.id === product.id);
          if (idx > -1) {
            const cart = [...state.cart];
            cart[idx].quantity += quantity;
            return { cart };
          }
          const newItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
          };
          return { cart: [...state.cart, newItem] };
        });
      },
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.id === productId ? { ...i, quantity } : i
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cartStore",
      partialize: (state) => ({ cart: state.cart }),
      onError: (err) => console.error("Cart persist error:", err),
      // ha sessionStorage‑t akarsz: getStorage: () => sessionStorage
    }
  ),
  shallow
);

export default useCartStore;
