import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "../types";
import { products } from "../data/catalog";
import { sanitizeCart, subtotal } from "../utils/order";
const key = "cuscuzeria-cart-v1";
function useCartState() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return sanitizeCart(
        JSON.parse(localStorage.getItem(key) || "[]"),
        products,
      );
    } catch {
      return [];
    }
  });
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(items));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [items]);
  function quantity(id: string, n: number) {
    setItems((prev) =>
      sanitizeCart(
        n <= 0
          ? prev.filter((i) => i.productId !== id)
          : prev.some((i) => i.productId === id)
            ? prev.map((i) =>
                i.productId === id ? { ...i, quantity: Math.min(99, n) } : i,
              )
            : [...prev, { productId: id, quantity: Math.min(99, n), note: "" }],
        products,
      ),
    );
  }
  return {
    items,
    storageError,
    quantity,
    note: (id: string, note: string) =>
      setItems((prev) =>
        prev.map((i) =>
          i.productId === id ? { ...i, note: note.slice(0, 300) } : i,
        ),
      ),
    count: items.reduce((s, i) => s + i.quantity, 0),
    total: subtotal(items, products),
  };
}
const Context = createContext<ReturnType<typeof useCartState> | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const value = useCartState();
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useCart() {
  const value = useContext(Context);
  if (!value) throw new Error("Carrinho indisponível");
  return value;
}
