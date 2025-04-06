import { createWithEqualityFn } from "zustand/traditional";
import { StateCreator } from "zustand";
import { combine, persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { Product } from "../types/Product";
import { socket } from "../socket/socket";

interface CartState {
  cart: (Product & { quantity: number })[];
}

const initialState: CartState = {
  cart: [],
};

interface CartStateMutations {
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const mutations: StateCreator<CartState, [], [], CartStateMutations> = (
  set,
  get
) => ({
  addToCart: (product, quantity) =>
    set((state) => {
      // Check if the product already exists in the cart
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        return { cart: [...state.cart, { ...product, quantity }] };
      }
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })),

  clearCart: () => set({ cart: [] }), 

});

const useCartStore = createWithEqualityFn(
  persist(combine(initialState, mutations), {
    name: "cartStore",
  }),
  shallow
);

export default useCartStore;