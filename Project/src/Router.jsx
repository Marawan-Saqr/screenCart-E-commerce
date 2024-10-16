import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import Website from "./Pages/Website/Website";
import Cart from "./Pages/Website/Shared-for-this/Header/Cart/Cart.jsx";
import Wishlist from "./Pages/Website/Shared-for-this/Header/Wishlist/Wishlist.jsx";
import Home from "./Pages/Website/Home/Home";
import ProductsPage from "./Pages/Website/Products-page/ProductsPage.jsx";
import ProductDetails from "./Pages/Website/Product-details/ProductDetails.jsx";
import GetByCategory from "./Pages/Website/Get-by-category/GetByCategory.jsx";
import NotFound from "./Shared/Not-found/NotFound.jsx";
import UserDetails from './Pages/Website/User-details/UserDetails.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import MyOrders from './Pages/Website/My-orders/MyOrders.jsx';


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
        <Route path="website" element={<Website />}>
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
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
