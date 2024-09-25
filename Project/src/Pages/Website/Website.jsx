import { Outlet } from 'react-router-dom';
import ContactBar from './Contact-bar/ContactBar';


const Website = () => {
  return (
    <div>
      <ContactBar />
      <Outlet />
    </div>
  )
}
export default Website;