import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    message: '',
    open: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const isExist = state.cartItems.find((item) => item.id === product.id);

      if (isExist) {
        state.cartItems = state.cartItems.map(item =>
          item.id === product.id 
            ? { ...item, qty: item.qty + 1 } 
            : item
        );
      } else {
        state.cartItems.push({ ...product, qty: 1 });
        state.message = `${product.name} added to your cart!`;
      }
      state.open = true;
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== productId);
    },
    closeMessage: (state) => {
      state.open = false;
      state.message = '';
    }
  }
});

export const { addToCart, removeFromCart, closeMessage } = cartSlice.actions;
export default cartSlice;