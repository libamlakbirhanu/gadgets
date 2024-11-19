import { create } from "zustand";

export type CartItemType = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: any;
};

type CartState = {
  items: CartItemType[];
  addItem: (item: CartItemType) => void;
  removeItem: (item: CartItemType) => void;
  incrementItem: (id: number) => void;
  decrementItem: (id: number) => void;
  getTotalPrice: () => string;
  getItemCount: () => number;
};

export const useStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item: CartItemType) => {
    const state = get();
    const existingItem = state.items.find((i) => i.id === item.id);

    if (existingItem) {
      set((state) => ({
        items: state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      }));
      return;
    } else set((state) => ({ items: [...state.items, item] }));
  },
  removeItem: (item: CartItemType) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== item.id) })),
  incrementItem: (id: number) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    })),
  decrementItem: (id: number) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      ),
    })),
  getTotalPrice: () => {
    const state = get();

    return state.items
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  },
  getItemCount: () => {
    const state = get();

    return state.items.length;
  },
}));
