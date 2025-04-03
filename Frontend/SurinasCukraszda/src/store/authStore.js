import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null, // Felhasználói adatok: pl. { id, email, role }
  token: null,
  login: (userData, token) => set({ user: userData, token }),
  logout: () => set({ user: null, token: null }),
}));

export default useAuthStore;
