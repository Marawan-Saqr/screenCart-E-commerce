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
      // Fetch the users from the API
      const response = await axios.get(`http://localhost:3001/users`);
      
      // Find the user with matching name and password
      const selectUser = response.data.find(
        (user) => user.name === name && user.password === password
      );

      // If user not found, show error SweetAlert
      if (!selectUser) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Username or Password!",
        });
      } else {
        // If user found, show success SweetAlert
        Swal.fire({
          title: "Login Successfully!",
          text: "Now You Are Moved To Website!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            // Navigate to the website's home page
            navigate("/website/home");
            // Store user data in localStorage
            localStorage.setItem("user-data", JSON.stringify(selectUser));
            // Update user state
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