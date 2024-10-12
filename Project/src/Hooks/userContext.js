import { createContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom/dist';

// Functional Component
export const UserContext = createContext();
const UserProvider = ({ children }) => {

  // Component States
  const [user, setUser] = useState();
  const navigate = useNavigate();


  // Login Function
  const login = async (name, password) => {
    try {
      const response = await axios.get(`http://localhost:3001/users`);
      const selectUser = response.data.find(
        (user) => user.name === name && user.password === password
      );
      if (!selectUser) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Username or Password!",
        });
      } else {
        Swal.fire({
          title: "Login Successfully!",
          text: "Now You Are Moved To Website!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/website/home");
            localStorage.setItem("user-data", JSON.stringify(selectUser));
            setUser(selectUser);
          }
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong during login!",
      });
    }
  };


  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;