// src/store/authStore.js
import { create } from "zustand";

const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = JSON.parse(localStorage.getItem("user"));

const useAuthStore = create((set) => ({
  user: userFromStorage || null,
  token: tokenFromStorage || null,
  login: (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    set({ user: userData, token });
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
  setShowLogin: (value) => set({ showLogin: value }),
}));

export default useAuthStore;
