import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import PrivateRoute from './Shared/Private-router/PrivateRouter.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import AuthDashboard from './Pages/Dashboard/Auth-dashboard/AuthDashboard.jsx';
import LoginDashboard from './Pages/Dashboard/Auth-dashboard/Login-dashboard/LoginDashboard.jsx';
import RegisterDashboard from './Pages/Dashboard/Auth-dashboard/Register-dashboard/RegisterDashboard.jsx';
import TableData from './Pages/Dashboard/Table-data/TableData.jsx';
import Users from './Pages/Dashboard/Table-data/Users/Users.jsx';
import UserDetailsDashboard from './Pages/Dashboard/Table-data/User-details/UserDetailsDashboard.jsx';
import AddUser from './Pages/Dashboard/Table-data/Add-user/AddUser.jsx';
import Products from './Pages/Dashboard/Table-data/Products/Products.jsx';
import ProductDetailsDash from './Pages/Dashboard/Table-data/Product-details-dash/ProductDetailsDash.jsx';
import AddProducts from './Pages/Dashboard/Table-data/Add-products/AddProducts.jsx';
import UpdateProducts from './Pages/Dashboard/Table-data/Update-products/UpdateProducts.jsx';
import NotFound from "./Shared/Not-found/NotFound.jsx";
import UpdateUser from "./Pages/Dashboard/Table-data/Update-user/UpdateUser.jsx";

const Router = () => {

  // Component States
  const [userRole, setUserRole] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.role : null;
  });
  const [userStatus, setUserStatus] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.status : null;
  });


  // UseEffect
  useEffect(() => {
    const handleStorageChange = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      setUserRole(user ? user.role : null);
      setUserStatus(user ? user.status : null);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);


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
        <Route path="website" element={<PrivateRoute><Website /></PrivateRoute>}>
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
        <Route path="dashboard" element={userStatus === 'Active' ? <Dashboard /> : <LoginDashboard />}>
          <Route path="auth-dashboard" element={<AuthDashboard />}>
            <Route index element={<LoginDashboard />} />
            <Route path="login-dashboard" element={<LoginDashboard />} />
            <Route path="register-dashboard" element={<RegisterDashboard />} />
          </Route>
          <Route index element={<TableData />} />
          <Route path="table-data" element={<TableData />}>
            {userRole === 'admin' && (
              <>
                <Route path="users" element={<Users />} />
                <Route path="user-details/:USERID" element={<UserDetailsDashboard />} />
                <Route path="add-user" element={<AddUser />} />
                <Route path="update-user/:USERID" element={<UpdateUser />} />
              </>
            )}
            {userRole === 'user' && (
              <Route path="*" element={<Navigate to="/dashboard/table-data" />} />
            )}
            <Route path="products" element={<Products />} />
            <Route path="product-details/:PRODUCTID" element={<ProductDetailsDash />} />
            <Route path="add-products" element={<AddProducts />} />
            <Route path="update-product/:PRODUCTID" element={<UpdateProducts />} />
          </Route>
        </Route>


        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;