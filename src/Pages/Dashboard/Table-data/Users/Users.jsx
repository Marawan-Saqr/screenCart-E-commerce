import "./Users.css";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import Loader from '../../../../Shared/Loader/Loader';

const Users = () => {

  // Component States
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  // Get All Users
  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/dashboardUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error fetching the user data.',
      });
    } finally {
      setLoading(false);
    }
  };


  // Delete User Function
  const deleteUser = async (id, name) => {
    const userData = localStorage.getItem('user');
    const parsedUser = userData ? JSON.parse(userData) : null;
    const loggedInUsername = parsedUser ? parsedUser.name : null;
    if (name === loggedInUsername) {
      await Swal.fire({
        icon: 'error',
        title: 'Cannot Delete User',
        text: 'You cannot delete the currently logged-in user.',
      });
    } else {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete "${name}". This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      });
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/dashboardUsers/${id}`);
          setUsers(users.filter((user) => user.id !== id));
          await Swal.fire({
            icon: 'success',
            title: 'User Deleted!',
            text: `User ${name} deleted successfully!`,
          });
        } catch (error) {
          console.error("Error deleting user:", error);
          await Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'There was an error deleting the user.',
          });
        }
      }
    }
  };


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
      <div className="container d-flex align-items-center justify-content-between mb-2">
        <h2>USERS <span>LIST</span></h2>
        <button className="btn btn-info">
          <Link style={{ color: 'black', textDecoration: 'none' }} to={"/dashboard/table-data/add-user"}>Add User</Link>
        </button>
      </div>
      <div className="table-container">
        {loading ? (
          <div className="text-center">
            <Loader />
          </div>
        ) : (
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
                    <Link style={{ color: '#fff', textDecoration: 'none' }} to={`/dashboard/table-data/user-details/${user.id}`}>
                      <button className="btn btn-warning">Details</button>
                    </Link>
                    <button className="btn btn-success" onClick={() => navigate(`/dashboard/table-data/update-user/${user.id}`, { state: user })}>Update</button>
                    <button className="btn btn-danger" onClick={() => deleteUser(user.id, user.name)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;