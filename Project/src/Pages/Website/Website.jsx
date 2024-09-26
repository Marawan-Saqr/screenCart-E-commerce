import { Outlet } from 'react-router-dom';
import ContactBar from './Contact-bar/ContactBar';
import Header from './Header/Header';


const Website = () => {
  return (
    <div>
      <ContactBar />
      <Header />
      <Outlet />
    </div>
  )
}
export default Website;