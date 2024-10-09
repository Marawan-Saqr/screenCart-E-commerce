import React, { createContext, useState } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

// Functional Component
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
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
