import { create } from "zustand";

import { IBook } from "@/utils/types/books";

interface CartState {
  cart: IBook[];
  addBook: (book: IBook) => void;
  deleteBook: (book: IBook) => void;
  removeCart: () => void;
}

const useCartStore = create<CartState>()((set) => ({
  cart: [],
  addBook: (book) => set((state) => ({ cart: [...state.cart, book] })),
  deleteBook: (book) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== book.id);
      return { cart: newCart };
    }),
  removeCart: () => set(() => ({ cart: [] })),
}));

export default useCartStore;
