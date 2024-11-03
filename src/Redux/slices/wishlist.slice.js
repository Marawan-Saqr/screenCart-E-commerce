// redux/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Set Items To Localstorage
const saveWishlistToLocalStorage = (wishlistItems) => {
  localStorage.setItem('wishlist-items', JSON.stringify(wishlistItems));
};

// Get Items From Localstorage
const loadWishlistFromLocalStorage = () => {
  const savedWishlist = localStorage.getItem('wishlist-items');
  return savedWishlist ? JSON.parse(savedWishlist) : [];
};

// Wishlist Slice Component
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: loadWishlistFromLocalStorage(),
    message: '',
    open: false,
  },
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const isExist = state.items.find(item => item.id === product.id);
      if (!isExist) {
        state.items.push(product);
        state.message = `${product.name} added to your wishlist!`;
      } else {
        state.message = `${product.name} is already in your wishlist!`;
      }
      state.open = true;
      saveWishlistToLocalStorage(state.items);
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      saveWishlistToLocalStorage(state.items);
    },
    closeWishlistMessage: (state) => {
      state.open = false;
      state.message = '';
    },
  },
});

export const { addToWishlist, removeFromWishlist, closeWishlistMessage } = wishlistSlice.actions;
export default wishlistSlice.reducer;