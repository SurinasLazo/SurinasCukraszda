import { createWithEqualityFn } from "zustand/traditional";
import { StateCreator } from "zustand";
import { combine } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { Product } from "../types/Product";
import { socket } from "../socket/socket";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

interface ProductStateMutations {
  setProducts: (products: Product[]) => void;
  updateProduct: (id: string, quantity: number) => void;
}

const mutations: StateCreator<ProductState, [], [], ProductStateMutations> = (
  set,
  get
) => ({
  setProducts: (products) => {
    //call service api
    //set products
    return set({ products });
  },
  updateProduct: (id, quantity) => {
    //update product
  },
});

const useProductStore = createWithEqualityFn(
  combine(initialState, mutations),
  shallow
);

socket.on("quantityUpdate", (id: string, quantity: number) => {
  const updateProduct = useProductStore.getState().updateProduct;
  updateProduct(id, quantity);
});

export default useProductStore;
