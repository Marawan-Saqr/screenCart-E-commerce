import React, { createContext, useState, useEffect } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

// Functional Component
export const CartContext = createContext();
const CartProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem("cart-items")) || [];
  const [cart, setCart] = useState(initialCart);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Add To Cart Function
  const addToCart = (product) => {
    const isExist = cart.find(res => res.id === product.id);
    if (isExist) {
      setCart((cartItems) =>
        cartItems.map(res =>
          res.id === product.id 
          ? { ...res, qty: res.qty + 1 } 
          : res
        )
      );
    } else {
      setMessage(`${product.name} added to your cart!`);
      setCart((cartItems) => ([...cartItems, { ...product, qty: 1 }]));
    }
    setOpen(true);
  };

  // Remove Item From Cart
  const removeFromCart = (id) => {
    setCart((cartItems) => cartItems.filter(res => res.id !== id));
  };

  // Close Snackbar
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(cart));
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
