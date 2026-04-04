import { create } from "zustand";
import { transactions } from "../data/mockData";

export const useStore = create((set) => ({
  transactions: transactions,
  search: "",
  filter: "all",
  role: "viewer",

  setSearch: (value) => set({ search: value }),
  setFilter: (value) => set({ filter: value }),
  setRole: (value) => set({ role: value }),
}));