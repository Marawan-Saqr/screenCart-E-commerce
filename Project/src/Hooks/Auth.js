import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {

  // Component States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector(state => state.loginWebsite.userData);
  const navigate = useNavigate();

  const redirect = () => {
    if(!isLoggedIn) {
      navigate("/login");
    }
  }

  // UseEffect
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user])


  return {isLoggedIn, redirect};
}
export default useAuth;