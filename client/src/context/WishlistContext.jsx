import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('arydi_wishlist');
    if (savedWishlist) {
      try {
        const parsed = JSON.parse(savedWishlist);
        setWishlistItems(parsed);
      } catch (e) {
        console.error('Error loading wishlist:', e);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('arydi_wishlist', JSON.stringify(wishlistItems));
    setWishlistCount(wishlistItems.length);
  }, [wishlistItems]);

  // Add item to wishlist
  const addToWishlist = (product, showNotification) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product._id);
      if (!existingItem) {
        const newItems = [...prevItems, {
          id: product._id,
          name: product.name,
          nameAr: product.nameAr,
          price: product.price,
          image: product.images && product.images[0] ? product.images[0] : null
        }];
        if (showNotification) showNotification(`${product.name} added to wishlist`);
        return newItems;
      }
      return prevItems;
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (id, showNotification) => {
    const removedItem = wishlistItems.find(item => item.id === id);
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== id));
    if (showNotification && removedItem) {
      showNotification(`${removedItem.name} removed from wishlist`);
    }
  };

  // Check if item is in wishlist
  const isInWishlist = (id) => {
    return wishlistItems.some(item => item.id === id);
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      wishlistCount,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};