import React, { useState, useEffect } from 'react';
import './UserDetails.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Redux/slices/loginWebsite.slice';
import components from '../../../Shared/Styled-components/StyledComponents';

const UserDetails = () => {

  // Component States
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // UseEffect to get user data from localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem('user-data');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUsername(userData.name);
    }
  }, []);


  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('user-data');
    dispatch(logout());
    navigate('/login');
  };


  return (
    <div className="user-details">
      <div className="container">
        <h1 className="user-name">Welcome {username}</h1>
        <components.BlackButton onClick={handleLogout}>
          Logout
        </components.BlackButton>
      </div>
    </div>
  );
};

export default UserDetails;