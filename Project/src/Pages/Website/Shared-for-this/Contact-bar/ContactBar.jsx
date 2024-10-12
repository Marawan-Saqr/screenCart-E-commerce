import React, { useState, useEffect } from 'react';
import './ContactBar.css';

const ContactBar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUserData = localStorage.getItem('user-data');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUsername(userData.name);
    }
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
          <div className="col-lg-2">
            <div className="right">
              <ul>
                <li><i className="fa-solid fa-dollar-sign"></i> USD</li>
                {/* Conditionally render username or 'My Account' */}
                <li><i className="fa-solid fa-user"></i> {username ? username : 'My Account'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBar;