import { create } from "zustand";
import { contacts, transactions as seedTransactions } from "../data/mockData";

const createMockTransaction = (count) => ({
  id: Date.now(),
  date: "2026-05-01",
  amount: 900 + count * 35,
  category: count % 2 === 0 ? "Freelancing" : "Family",
  type: count % 2 === 0 ? "income" : "expense",
});

export const useStore = create((set, get) => ({
  contacts,
  transactions: seedTransactions,
  search: "",
  category: "all",
  sortBy: "latest",
  role: "viewer",
  mobileMenuOpen: false,

  setSearch: (value) => set({ search: value }),
  setCategory: (value) => set({ category: value }),
  setSortBy: (value) => set({ sortBy: value }),
  setRole: (value) => set({ role: value }),
  setMobileMenuOpen: (value) => set({ mobileMenuOpen: value }),
  toggleMobileMenu: () =>
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  addTransaction: () =>
    set((state) => ({
      transactions: [
        createMockTransaction(state.transactions.length + 1),
        ...state.transactions,
      ],
    })),
  editTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.map((item) =>
        item.id === id
          ? {
              ...item,
              amount: item.amount + 180,
              category: item.category.includes("Updated")
                ? item.category
                : `${item.category} Updated`,
            }
          : item
      ),
    })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((item) => item.id !== id),
    })),
  getFilteredTransactions: () => {
    const { transactions, search, category, sortBy } = get();
    const query = search.trim().toLowerCase();

    let filtered = transactions.filter((item) => {
      const matchesSearch =
        !query ||
        item.category.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.date.includes(query);
      const matchesCategory = category === "all" || item.category === category;

      return matchesSearch && matchesCategory;
    });

    filtered = [...filtered].sort((left, right) => {
      if (sortBy === "amount-high") {
        return right.amount - left.amount;
      }

      if (sortBy === "amount-low") {
        return left.amount - right.amount;
      }

      return new Date(right.date) - new Date(left.date);
    });

    return filtered;
  },
}));
