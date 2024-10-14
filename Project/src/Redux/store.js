import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cart.slice';
import wishlistSlice from './slices/wishlist.slice';
import loginWebsiteReducer from './slices/loginWebsite.slice';

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    wishlist: wishlistSlice,
    loginWebsite: loginWebsiteReducer,
  },
});

export default store;