// components/Header/Header.js
import './Header.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import component from '../../../../Shared/Styled-components/StyledComponents';

const Header = () => {

  // Component States
  const wishlistItems = useSelector(state => state.wishlist.items || []);
  const wishlistItemCount = wishlistItems.length;
  const cartItems = useSelector(state => state.cart.cartItems || []);
  const cartItemCount = cartItems.reduce((count, item) => count + item.qty, 0);


  return (
    <div className="header">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          {/* Left section (Logo) */}
          <div className="col-md-12 col-lg-3">
            <div className="left">
              <h1 style={{ textTransform: 'uppercase' }}>Screen Cart</h1>
            </div>
          </div>

          {/* Middle section (Search bar) */}
          <div className="col-md-12 col-lg-6">
            <div className="mid d-flex align-items-center">
              <input type="text" className="form-control me-2" placeholder="Search products..." />
              <component.MainButton>Search</component.MainButton>
            </div>
          </div>

          {/* Right section (Wishlist & Cart) */}
          <div className="col-md-12 col-lg-3">
            <div className="end text-center">
              {/* Wishlist Icon */}
              <div className="buy-icons wishlist-container">
                <Link style={{ color: '#fff' }} to={"wishlist"}>
                  <i className="fa-regular fa-heart"></i>
                  {wishlistItemCount > 0 && (
                    <span className="wishlist-badge">{wishlistItemCount}</span>
                  )}
                </Link>
                <h6>Your Wishlist</h6>
              </div>

              {/* Cart Icon */}
              <div className="buy-icons cart-container">
                <Link style={{ color: '#fff' }} to={"cart"}>
                  <i className="fa-solid fa-cart-shopping"></i>
                  {cartItemCount > 0 && (
                    <span className="cart-badge">{cartItemCount}</span>
                  )}
                </Link>
                <h6>Your Cart</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;