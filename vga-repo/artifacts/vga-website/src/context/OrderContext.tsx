import { createContext, useContext, useState } from "react";

export interface OrderItem {
  id: string;
  category: string;
  brand: string;
  name: string;
  unit: string;
  quantity: number;
}

interface OrderContextType {
  items: OrderItem[];
  addItem: (item: Omit<OrderItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearOrder: () => void;
  totalCount: number;
}

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);

  function addItem(item: Omit<OrderItem, "quantity">) {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev;
      return [...prev, { ...item, quantity: 1 }];
    });
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateQty(id: string, qty: number) {
    if (qty < 1) return removeItem(id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  }

  function clearOrder() {
    setItems([]);
  }

  return (
    <OrderContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearOrder, totalCount: items.length }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used inside OrderProvider");
  return ctx;
}
