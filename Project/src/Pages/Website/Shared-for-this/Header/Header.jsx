import './Header.css';
import { Link } from 'react-router-dom';
import component from '../../../../Shared/Styled-components/StyledComponents';

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-md-12 col-lg-3">
            <div className="left">
              <h1>Screen Cart</h1>
            </div>
          </div>
          <div className="col-md-12 col-lg-6">
            <div className="mid d-flex align-items-center">
              <select name="category" id="category" className="me-2">
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
              </select>
              <input type="text" className="form-control me-2" placeholder="Search products..." />
              <component.MainButton>Search</component.MainButton>
            </div>
          </div>
          <div className='col-md-12 col-lg-3'>
            <div className='end text-center'>
              <div className='buy-icons'>
                <Link to={"wishlist"}>
                  <i className="fa-regular fa-heart"></i>
                </Link>
                <h6>Your Wishlist</h6>
              </div>
              <div className='buy-icons'>
                <Link style={{color: '#fff'}} to={"cart"}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
                <h6>Your Cart</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;