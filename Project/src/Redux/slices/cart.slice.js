import { createSlice } from '@reduxjs/toolkit';

// Set Items To LocalStorage
const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

// Get Items From LocalStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cartItems');
  return savedCart ? JSON.parse(savedCart) : [];
};

// Cart Slice Component
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: loadCartFromLocalStorage(),
    message: '',
    open: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const isExist = state.cartItems.find(item => item.id === product.id);

      if (isExist) {
        state.cartItems = state.cartItems.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
        state.message = `${product.name} quantity increased!`;  // Message updated for quantity increment
      } else {
        state.cartItems.push({ ...product, qty: 1 });
        state.message = `${product.name} added to your cart!`;  // Message for new item
      }
      
      saveCartToLocalStorage(state.cartItems);
      state.open = true;
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== productId);
      saveCartToLocalStorage(state.cartItems);
    },
    emptyCart: (state) => {
      state.cartItems = [];
    },
    closeMessage: (state) => {
      state.open = false;
      state.message = '';
    },
  },
});

export const { addToCart, removeFromCart, closeMessage, emptyCart } = cartSlice.actions;
export default cartSlice;