import './TableData.css';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";

const TableData = () => {
  // Component States
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('user');
  const navigate = useNavigate();
  const location = useLocation();

  // Toggle Slider Function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch username from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: ' No, stay logged in',
      confirmButtonText: 'Yes, logout!',
    });
    if (result.isConfirmed) {
      localStorage.removeItem('user');
      toggleSidebar();
      navigate('/dashboard/auth-dashboard/login-dashboard');
    }
  };

  return (
    <div className={`dashboard ${sidebarOpen ? "sidebar-open" : ""}`}>
      <button style={{ textAlign: 'right' }} className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <nav className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">Dashboard</h2>
        <ul className="menu">
          <NavLink 
            to="/dashboard/table-data/users" 
            style={({ isActive }) => ({
              color: '#fff', 
              textDecoration: 'none',
              fontWeight: isActive ? 'bold' : 'normal' // Add bold for active link
            })}
          >
            <li className={`menu-item ${location.pathname === '/dashboard/table-data/users' ? 'active' : ''}`}>Users</li>
          </NavLink>
          <NavLink 
            to="/dashboard/table-data/products" 
            style={({ isActive }) => ({
              color: '#fff', 
              textDecoration: 'none',
              fontWeight: isActive ? 'bold' : 'normal' // Add bold for active link
            })}
          >
            <li className={`menu-item ${location.pathname === '/dashboard/table-data/products' ? 'active' : ''}`}>Products</li>
          </NavLink>
          <li className="menu-item" onClick={handleLogout}>Logout</li>
        </ul>
        <h6 className='text-center' style={{ color: '#D10024' }}>Hello {userName}</h6>
      </nav>
      <div className="main-content">
        {location.pathname === '/dashboard/table-data' ? (
          <h2 style={{ color: '#fff', textAlign: 'center' }}>Welcome to the Dashboard</h2>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default TableData;