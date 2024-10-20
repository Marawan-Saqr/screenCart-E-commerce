import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Pages/Website/Auth/Auth.jsx";
import Login from "./Pages/Website/Auth/Login/Login.jsx";
import Register from "./Pages/Website/Auth/Register/Register.jsx";
import Website from "./Pages/Website/Website.jsx";
import UserDetails from './Pages/Website/User-details/UserDetails.jsx';
import Wishlist from "./Pages/Website/Shared-for-this/Header/Wishlist/Wishlist.jsx";
import Cart from "./Pages/Website/Shared-for-this/Header/Cart/Cart.jsx";
import Home from "./Pages/Website/Home/Home.jsx";
import ProductsPage from "./Pages/Website/Products-page/ProductsPage.jsx";
import ProductDetails from "./Pages/Website/Product-details/ProductDetails.jsx";
import GetByCategory from "./Pages/Website/Get-by-category/GetByCategory.jsx";
import MyOrders from './Pages/Website/My-orders/MyOrders.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import NotFound from "./Shared/Not-found/NotFound.jsx";
import PrivateRoute from './Shared/Private-router/privateRouter.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Website Routes */}
        <Route
          path="website"
          element={
            <PrivateRoute>
              <Website />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products-page" element={<ProductsPage />} />
          <Route path="product-details/:PRODUCTID" element={<ProductDetails />} />
          <Route path="get-by-category/:CATEGORY" element={<GetByCategory />} />
          <Route path="user-details/:USERID" element={<UserDetails />} />
          <Route path="my-orders" element={<MyOrders />} />
        </Route>

        {/* Admin Dashboard Route */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;