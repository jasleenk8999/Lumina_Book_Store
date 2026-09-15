import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('lumina_cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        // Sanitize stored items to ensure valid structure
        return parsed.filter(item => item && item.book && typeof item.book.id !== 'undefined');
      }
      return [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('lumina_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Cart storage error:', e);
    }
  }, [items]);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const addToCart = (book, quantity = 1) => {
    if (!book || typeof book.id === 'undefined') {
      console.error('Invalid book object passed to addToCart:', book);
      return;
    }

    setItems(prevItems => {
      const validItems = (prevItems || []).filter(item => item && item.book && typeof item.book.id !== 'undefined');
      const existingIndex = validItems.findIndex(item => Number(item.book.id) === Number(book.id));
      
      if (existingIndex >= 0) {
        const updated = [...validItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + quantity
        };
        return updated;
      } else {
        return [...validItems, { book, quantity }];
      }
    });

    showToast(`Added "${book.title || 'Book'}" to your bag!`, 'success');
  };

  const removeFromCart = (bookId) => {
    setItems(prevItems => (prevItems || []).filter(item => item && item.book && Number(item.book.id) !== Number(bookId)));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (bookId, delta) => {
    setItems(prevItems => {
      return (prevItems || [])
        .map(item => {
          if (item && item.book && Number(item.book.id) === Number(bookId)) {
            const newQty = (item.quantity || 1) + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = (items || []).reduce((acc, item) => acc + (item?.quantity || 0), 0);
  const subtotal = (items || []).reduce((acc, item) => {
    const price = Number(item?.book?.price) || 0;
    const qty = Number(item?.quantity) || 0;
    return acc + (price * qty);
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      totalItems,
      subtotal,
      toast,
      showToast
    }}>
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
