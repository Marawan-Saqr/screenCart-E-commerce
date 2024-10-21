import './TableData.css';
import { Outlet, Link } from 'react-router-dom';

const TableData = () => {
  return (
    <div className="dashboard">
      <nav className="sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <ul className="menu">
          <Link style={{color: '#fff', textDecoration: 'none'}} to={"/dashboard/table-data/users"}><li className="menu-item">Users</li></Link>
          <Link style={{color: '#fff', textDecoration: 'none'}} to={"/dashboard/table-data/products"}><li className="menu-item">Products</li></Link>
          <li className="menu-item">Logout</li>
        </ul>
      </nav>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default TableData;