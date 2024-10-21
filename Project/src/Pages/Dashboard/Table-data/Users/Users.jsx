import "./Users.css";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {

  // Component States
  const [users, setUsers] = useState([]);


  // Get All Users
  const getAllUsers = async () => {
    const response = await axios.get("http://localhost:3001/dashboardUsers");
    setUsers(response.data);
  }


  // UseEffect
  useEffect(() => {
    getAllUsers();
  }, []);


  // Check local storage for the user data
  const userData = localStorage.getItem('user');
  const parsedUser = userData ? JSON.parse(userData) : null;
  const username = parsedUser ? parsedUser.name : null;
  const userStatus = parsedUser ? parsedUser.status : null;


  return (
    <div className="users-table">
      <h1 className="dashboard-title">USERS</h1>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td style={{ color: user.role === "admin" ? 'red' : 'white' }}>{user.role}</td>
                <td>
                  {user.status.toLowerCase() === "active" ? (
                    <span style={{ color: 'green' }}>Active</span>
                  ) : (
                    user.name === username && userStatus && userStatus.toLowerCase() === "active" ? (
                      <span style={{ color: 'green' }}>Active</span>
                    ) : (
                      user.status
                    )
                  )}
                </td>
                <td>
                  <button className="btn btn-warning">Details</button>
                  <button className="btn btn-success">Update</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;