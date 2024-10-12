import React, { createContext, useState, useEffect } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

// Functional Component
export const WishlistContext = createContext();
const WishlistProvider = ({ children }) => {

  // Component States
  const initialWishlist = JSON.parse(localStorage.getItem("wishlist-items")) || [];
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Add To Wishlist Function
  const addToWishlist = (product) => {
    const isExist = wishlist.find(res => res.id === product.id);
    if (!isExist) {
      setMessage(`${product.name} added to your wishlist!`);
      setWishlist((wishlistItems) => ([...wishlistItems, product]));
    } else {
      setMessage(`${product.name} is already in your wishlist!`);
    }
    setOpen(true);
  };

  // Remove Item From Wishlist Function
  const removeFromWishlist = (id) => {
    setWishlist((wishlistItems) => wishlistItems.filter(res => res.id !== id));
  };

  // Close Snackbar Function
  const handleClose = () => {
    setOpen(false);
  };

  // UseEffect Function
  useEffect(() => {
    localStorage.setItem("wishlist-items", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
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
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;