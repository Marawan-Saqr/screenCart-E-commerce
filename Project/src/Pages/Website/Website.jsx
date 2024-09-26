import { Outlet } from 'react-router-dom';
import ContactBar from './Contact-bar/ContactBar';
import Header from './Header/Header';
import Topbar from './Navbar/Topbar';


const Website = () => {
  return (
    <div>
      <ContactBar />
      <Header />
      <Topbar />
      <Outlet />
    </div>
  )
}
export default Website;