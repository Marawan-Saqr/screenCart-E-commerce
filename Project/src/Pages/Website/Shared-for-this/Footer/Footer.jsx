import './Footer.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {

  // Component States
  const [user, setUser] = useState(null);


  // UseEffect to load user from localStorage when the component mounts
  useEffect(() => {
    const storedUserData = localStorage.getItem('user-data');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUser(userData);
    }


    // Listen to localStorage changes (optional for cross-tab updates)
    const handleStorageChange = () => {
      const updatedUserData = localStorage.getItem('user-data');
      if (updatedUserData) {
        setUser(JSON.parse(updatedUserData));
      } else {
        setUser(null);
      }
    };


    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);



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
                <Link to={user && user.id ? `/website/user-details/${user.id}` : '#'} style={{ color: 'gray', textDecoration: 'none' }}>
                  <li>{user && user.name ? "user Details" : 'My Account'}</li>
                </Link>
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
                <Link style={{color: 'gray', textDecoration: 'none'}} to={`/website/get-by-category/laptops`}><li>Laptops</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={`/website/get-by-category/headsets`}><li>Headsets</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={`/website/get-by-category/computers`}><li>Computers</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={`/website/get-by-category/cameras`}><li>Cameras</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={`/website/get-by-category/smartphones`}><li>SmartPhones</li></Link>
                <Link style={{color: 'gray', textDecoration: 'none'}} to={`/website/get-by-category/accessories`}><li>accessories</li></Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Footer;