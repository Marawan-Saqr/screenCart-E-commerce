import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import PrivateRoute from './Shared/Private-router/privateRouter.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import AuthDashboard from './Pages/Dashboard/Auth-dashboard/AuthDashboard.jsx';
import LoginDashboard from './Pages/Dashboard/Auth-dashboard/Login-dashboard/LoginDashboard.jsx';
import RegisterDashboard from './Pages/Dashboard/Auth-dashboard/Register-dashboard/RegisterDashboard.jsx';
import TableData from './Pages/Dashboard/Table-data/TableData.jsx';
import Users from './Pages/Dashboard/Table-data/Users/Users.jsx';
import UserDetailsDashboard from './Pages/Dashboard/Table-data/User-details/UserDetailsDashboard.jsx';
import AddUser from './Pages/Dashboard/Table-data/Add-user/AddUser.jsx';
import Products from './Pages/Dashboard/Table-data/Products/Products.jsx';
import NotFound from "./Shared/Not-found/NotFound.jsx";
import UpdateUser from "./Pages/Dashboard/Table-data/Update-user/UpdateUser.jsx";



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


        {/* Dashboard Route */}
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="auth-dashboard" />} />
          <Route path="auth-dashboard" element={<AuthDashboard />}>
            <Route index element={<LoginDashboard />} />
            <Route path="login-dashboard" element={<LoginDashboard />} />
            <Route path="register-dashboard" element={<RegisterDashboard />} />
          </Route>
          <Route path="table-data" element={<TableData />}>
            <Route path="users" element={<Users />} />
            <Route path="user-details/:USERID" element={<UserDetailsDashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="update-user/:USERID" element={<UpdateUser />} />
          </Route>
        </Route>


        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;