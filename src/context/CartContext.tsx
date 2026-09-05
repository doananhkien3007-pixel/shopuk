"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  title: string;
  price: string;
  priceNum: number;
  originalPriceNum?: number; // Added to track original price for discounts
  image: string;
  color: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string, color: string, size: string) => void;
  updateQuantity: (id: string, color: string, size: string, delta: number) => void;
  totalCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 'sculpt-black-den-bra',
      title: 'Sculpt - Black (Đen) - Bra',
      price: '$500',
      priceNum: 500000,
      image: '/products/sculpt-black-bra-1.jpg',
      color: 'Black',
      size: 'S',
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('eql_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('eql_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (i) => i.id === newItem.id && i.color === newItem.color && i.size === newItem.size
      );
      const qtyToAdd = newItem.quantity || 1;

      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += qtyToAdd;
        return updated;
      } else {
        return [...prevItems, { ...newItem, quantity: qtyToAdd }];
      }
    });
    setIsCartOpen(true); // Tự động mở giỏ hàng trượt ra
  };

  const removeFromCart = (id: string, color: string, size: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.id === id && i.color === color && i.size === size))
    );
  };

  const updateQuantity = (id: string, color: string, size: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.color === color && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.priceNum * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
