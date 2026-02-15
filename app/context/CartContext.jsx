"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 1. Load Cart from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("nexus-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // 2. Save Cart to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("nexus-cart", JSON.stringify(cart));
  }, [cart]);

  // --- ACTIONS ---

  // Add Item to Cart
 const addToCart = (product, quantity, color, size) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item._id === product._id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];

        newCart[existingItemIndex] = {
            ...newCart[existingItemIndex],
            quantity: newCart[existingItemIndex].quantity + quantity
        };
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            ...product,
            selectedColor: color,
            selectedSize: size,
            quantity: quantity,
          },
        ];
      }
    });
  };

  // Remove Item
  const removeFromCart = (productId, color, size) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item._id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
  };

  // Update Quantity (in Cart Page)
  const updateQuantity = (productId, color, size, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (
          item._id === productId &&
          item.selectedColor === color &&
          item.selectedSize === size
        ) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Get Total Price
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Get Total Items (for Navbar badge)
  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Clear data
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("nexus-cart");
  }
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);