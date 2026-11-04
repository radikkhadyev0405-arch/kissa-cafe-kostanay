import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { CartItem } from '../utils/cart';
import { cartCount, cartTotal } from '../utils/cart';

interface CartContextValue {
  items: CartItem[];
  total: number;
  count: number;
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  removeItem: (key: string) => void;
  changeQty: (key: string, delta: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  isOpen: boolean;
  toast: string | null;
  bump: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'kissa-cart-v1';

function loadItems(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i) => i && typeof i.key === 'string' && typeof i.price === 'number' && typeof i.qty === 'number'
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadItems);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [bump, setBump] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setBump(true);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 1800);
    window.setTimeout(() => setBump(false), 600);
  }, []);

  const addItem = useCallback(
    (item: Omit<CartItem, 'qty'>, qty = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.key === item.key);
        if (existing) {
          return prev.map((i) =>
            i.key === item.key ? { ...i, qty: i.qty + qty } : i
          );
        }
        return [...prev, { ...item, qty }];
      });
      showToast('Добавлено в корзину');
    },
    [showToast]
  );

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const changeQty = useCallback((key: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      total: cartTotal(items),
      count: cartCount(items),
      addItem,
      removeItem,
      changeQty,
      clear,
      openCart,
      closeCart,
      isOpen,
      toast,
      bump,
    }),
    [items, addItem, removeItem, changeQty, clear, openCart, closeCart, isOpen, toast, bump]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
