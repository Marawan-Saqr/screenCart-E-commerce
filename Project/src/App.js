import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './Pages/Auth/Auth';
import Login from './Pages/Auth/Login/Login';
import Register from './Pages/Auth/Register/Register';
import Website from './Pages/Website/Website';
import Home from './Pages/Website/Home/Home';
import AllProducts from './Pages/Website/All-products/AllProducts';
import Cart from './Pages/Website/Shared-for-this/Header/Cart/Cart.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Auth Component */}
          <Route path="/" element={<Auth />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Website Component */}
          <Route path="website" element={<Website />}>
            <Route path="cart" element={<Cart />} />
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="all-products" element={<AllProducts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
