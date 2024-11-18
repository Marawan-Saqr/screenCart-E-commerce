import './UserDetailsDashboard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetailsDashboard = () => {

  // Component States
  const { USERID } = useParams();
  const [user, setUser] = useState(null);


  // Get User Details Function
  const getUserDetails = async () => {
    const response = await axios.get(`https://veil-flicker-piano.glitch.me/dashboardUsers/${USERID}`);
    setUser(response.data);
  };


  // UseEffect
  useEffect(() => {
    getUserDetails();
  }, [USERID]);


  return (
    <div className="user-details-dashboard">
      <div className="container">
        <h2 style={{color: '#fff', textTransform: 'uppercase'}}>User <span>Details</span></h2>
        <div className="row">
          <div className="box">
            {user && (
                <div>
                  <ul>
                    <li>Name: <strong>{user.name}</strong></li>
                    <li>Password: <strong>{user.password}</strong></li>
                    <li>Role: <strong>{user.role}</strong></li>
                  </ul>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsDashboard;
