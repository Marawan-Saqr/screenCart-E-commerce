// Website.js
import { Outlet } from 'react-router-dom';
import ContactBar from './Shared-for-this/Contact-bar/ContactBar';
import Header from './Shared-for-this/Header/Header';
import Topbar from './Shared-for-this/Navbar/Topbar';


const Website = () => {
  return (
    <div>
      <ContactBar />
      <Header />
      <Topbar />
      <Outlet />
    </div>
  );
};

export default Website;