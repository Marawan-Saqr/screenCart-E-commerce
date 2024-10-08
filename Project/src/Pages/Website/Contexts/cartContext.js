import React, { createContext, useState } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';


export const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Add To Cart Function
  const addToCart = (product) => {
    const isExist = cart.find(res => res.id === product.id);
    if (!isExist) {
      const newCart = [...cart, product];
      setCart(newCart);
      setMessage(`${product.name} added to your cart!`);
      setOpen(true);
    }
  };

  // Close Snackbar
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </CartContext.Provider>
  );
};

export default CartProvider;