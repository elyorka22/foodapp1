import { create } from 'zustand';

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  subtotal: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((current) => current.id === item.id);
      if (existing) {
        return {
          items: state.items.map((current) =>
            current.id === item.id ? { ...current, quantity: current.quantity + 1 } : current,
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    })),
  subtotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
