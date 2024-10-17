import './Footer.css';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="box">
              <h2>About Us</h2>
              <p>Best Online Shop Get All You Want Now From One Place And Get 30% Disscount On All Products.</p>
              <ul>
                <li><i className="fa-solid fa-phone"></i> +021-95-51-84</li>
                <li><i className="fa-solid fa-envelope"></i> email@email.com</li>
                <li><i className="fa-solid fa-location-dot"></i> 1734 Stonecoal Road</li>
              </ul>
            </div>
          </div>
          <div className="col-md-3">
            <div className="box">
              <h2>Profile Links</h2>
              <ul>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={"/website/user-details"}><li>User Details</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={"/website/my-orders"}><li>My Orders</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={"/website/wishlist"}><li>Wishlist</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={"/website/cart"}><li>Cart</li></Link>
              </ul>
            </div>
          </div>
          <div className="col-md-3">
            <div className="box">
              <h2>All Links</h2>
              <ul>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={"/website/home"}><li>Home</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={"/website/products-page"}><li>All Products</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={"/website"}><li>Laptops</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={"/website"}><li>Computers</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={"/website"}><li>Smartphones</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={"/website"}><li>Cameras</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={"/website"}><li>Accessories</li></Link>
              </ul>
            </div>
          </div>
          <div className="col-md-3">
            <div className="box">
              <h2>Service</h2>
              <ul>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={"/website/home"}><li>Home</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={"/website/products-page"}><li>All Products</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={"/website"}><li>Laptops</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={"/website"}><li>Computers</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={"/website"}><li>Smartphones</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={"/website"}><li>Cameras</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={"/website"}><li>Accessories</li></Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Footer;