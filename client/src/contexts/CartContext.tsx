import { createContext, useCallback, useContext, useMemo, useState } from "react";

import type { Product } from "../types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  isOpen: boolean;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const addToCart = useCallback((product: Product) => {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
            : item
        );
      }
      return [...current, { product, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems((current) => current.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setItems((current) => {
      if (quantity <= 0) {
        return current.filter((item) => item.product.id !== productId);
      }

      return current.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.min(99, quantity) } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0);
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    return {
      isOpen,
      items,
      subtotal,
      totalItems,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((state) => !state),
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    };
  }, [addToCart, clearCart, isOpen, items, removeFromCart, updateQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
