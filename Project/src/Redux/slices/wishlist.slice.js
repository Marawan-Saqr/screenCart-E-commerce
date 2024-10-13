import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('wishlist-items')) || [],
  message: '',
  open: false,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const isExist = state.items.find(item => item.id === action.payload.id);
      if (!isExist) {
        state.items.push(action.payload);
        state.message = `${action.payload.name} added to your wishlist!`;
      } else {
        state.message = `${action.payload.name} is already in your wishlist!`;
      }
      state.open = true;
      localStorage.setItem('wishlist-items', JSON.stringify(state.items));
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('wishlist-items', JSON.stringify(state.items));
    },
    closeWishlistMessage: (state) => {
      state.open = false;
    },
  },
});

export const { addToWishlist, removeFromWishlist, closeWishlistMessage } = wishlistSlice.actions;
export default wishlistSlice.reducer;