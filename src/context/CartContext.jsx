import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ilai_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('ilai_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage');
    }
  }, [cart]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
    showToast(`Added ${quantity} pack(s) of ${product.title} to your cart! 🌿`);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingFee = cart.length > 0 ? 40 : 0; // Tamil Nadu flat fee ₹40

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      shippingFee,
      toast,
      showToast
    }}>
      {children}
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-emerald-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-emerald-700 animate-bounce">
          <span className="text-xl">🌿</span>
          <p className="font-medium text-sm">{toast.message}</p>
        </div>
      )}
    </CartContext.Provider>
  );
};
