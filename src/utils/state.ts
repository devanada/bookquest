import { create } from "zustand";
import { Book } from "./apis/books";

interface CartState {
  cart: Book[];
  addBook: (book: Book) => void;
  deleteBook: (book: Book) => void;
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
