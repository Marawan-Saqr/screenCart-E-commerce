import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ContactBar.css';

const ContactBar = () => {

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
    <div className="contact-bar">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-6">
            <div className="left">
              <ul>
                <li><i className="fa-solid fa-phone"></i> +021-95-51-84</li>
                <li><i className="fa-solid fa-envelope"></i> email@email.com</li>
                <li><i className="fa-solid fa-location-dot"></i> 1734 Stonecoal Road</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="right">
              <ul>
                <Link to={"my-orders"} style={{ color: '#fff', textDecoration: 'none' }}>
                  <li><i className="fa-solid fa-cart-arrow-down"></i> My Orders</li>
                </Link>
                {/* Conditionally render username or 'My Account' */}
                <Link to={user && user.id ? `/website/user-details/${user.id}` : '#'} style={{ color: '#fff', textDecoration: 'none' }}>
                  <li><i className="fa-solid fa-user"></i> {user && user.name ? user.name : 'My Account'}</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBar;