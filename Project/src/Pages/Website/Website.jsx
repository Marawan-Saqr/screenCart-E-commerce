// Website.js
import { Outlet } from 'react-router-dom';
import ContactBar from './Shared-for-this/Contact-bar/ContactBar';
import Header from './Shared-for-this/Header/Header';
import Topbar from './Shared-for-this/Navbar/Topbar';
import Footer from '../Website/Shared-for-this/Footer/Footer';


const Website = () => {
  return (
    <div>
      <ContactBar />
      <Header />
      <Topbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Website;