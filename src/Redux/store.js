import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cart.slice';
import wishlistSlice from './slices/wishlist.slice';
import loginWebsiteReducer from './slices/loginWebsite.slice';
import registerReducer from './slices/register.slice';
import { websiteQuery } from './queries/website.query';

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    wishlist: wishlistSlice,
    loginWebsite: loginWebsiteReducer,
    register: registerReducer,
    [websiteQuery.reducerPath]: websiteQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websiteQuery.middleware),
});

export default store;