import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('arydi_cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCartItems(parsed);
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('arydi_cart', JSON.stringify(cartItems));
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
  }, [cartItems]);

  const addToCart = (product, quantity = 1, showNotification) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product._id);
      if (existingItem) {
        const newItems = prevItems.map(item =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        if (showNotification) showNotification(`Added ${quantity} more to cart`);
        return newItems;
      } else {
        const newItems = [...prevItems, {
          id: product._id,
          name: product.name,
          nameAr: product.nameAr,
          price: product.price,
          image: product.images && product.images[0] ? product.images[0] : null,
          quantity: quantity
        }];
        if (showNotification) showNotification(`${product.name} added to cart`);
        return newItems;
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};