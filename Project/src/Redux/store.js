import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cart.slice';
import wishlistSlice from './slices/wishlist.slice';
import loginWebsiteReducer from './slices/loginWebsite.slice';
import { productsQuery } from './queries/products.query';

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    wishlist: wishlistSlice,
    loginWebsite: loginWebsiteReducer,
    [productsQuery.reducerPath]: productsQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsQuery.middleware),
});

export default store;