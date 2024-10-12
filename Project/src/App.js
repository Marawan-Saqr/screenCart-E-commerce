import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from './Hooks/userContext.js';
import Auth from './Pages/Auth/Auth';
import Login from './Pages/Auth/Login/Login';
import Register from './Pages/Auth/Register/Register';
import Website from './Pages/Website/Website';
import Cart from './Pages/Website/Shared-for-this/Header/Cart/Cart.jsx';
import Wishlist from './Pages/Website/Shared-for-this/Header/Wishlist/Wishlist.jsx';
import CartProvider from './Hooks/cartContext.js';
import WishlistProvider from './Hooks/wishlistContext.js';
import Home from './Pages/Website/Home/Home';
import ProductsPage from './Pages/Website/Products-page/ProductsPage.jsx';
import ProductDetails from './Pages/Website/Product-details/ProductDetails.jsx';
import GetByCategory from './Pages/Website/Get-by-category/GetByCategory.jsx';
import NotFound from './Shared/Not-found/NotFound.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            {/* Auth Component */}
            <Route path="/" element={<Auth />}>
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* Website Component with both Cart and Wishlist Providers */}
            <Route  path="website" element={<CartProvider><WishlistProvider><Website /></WishlistProvider></CartProvider>}>
              <Route path="cart" element={<Cart />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="products-page" element={<ProductsPage />} />
              <Route path="product-details/:PRODUCTID" element={<ProductDetails />} />
              <Route path="get-by-category/:CATEGORY" element={<GetByCategory />} />
            </Route>

            {/* Not Found Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;