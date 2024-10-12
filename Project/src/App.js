import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from './Pages/Website/Contexts/userContext.js';
import Auth from './Pages/Auth/Auth';
import Login from './Pages/Auth/Login/Login';
import Register from './Pages/Auth/Register/Register';
import Website from './Pages/Website/Website';
import Cart from './Pages/Website/Shared-for-this/Header/Cart/Cart.jsx';
import CartProvider from './Pages/Website/Contexts/cartContext.js';
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

            {/* Website Component */}
            <Route path="website" element={<CartProvider><Website /></CartProvider>}>
              <Route path="cart" element={<Cart />} />
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
