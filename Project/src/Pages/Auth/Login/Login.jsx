import "./Login.css";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


// Functional Component
const Login = () => {

  // Component States
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();


  // Zod Schema
  const schema = z.object({
    name: z.string()
      .nonempty('Username is required'),
    password: z.string()
      .nonempty('Password is required'),
  });


  // React Hook Form Destruct
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onTouched", resolver: zodResolver(schema) });


  // Get All Users Function Before Login
  const getAllUsers = async () => {
    await axios.get("http://localhost:3001/users").then((response) => setUsers(response.data));
  }


  // Login Function
  const loginFunction = handleSubmit((data) => {
    const selectUser = users.find(
      (user) => user.name === data.name && user.password === data.password
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
        icon: "success"
        
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/website/home");
          localStorage.setItem("user-data", JSON.stringify(selectUser));
        }
      })
    }
  });


  // UseEffect
  useEffect(() => {
    getAllUsers();
  }, [])


  return (
    <section className="login-box">
      <div className="container-fluid mainscreen">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-12 col-lg-12 card">
            <div className="col-md-5 leftside d-flex justify-content-center align-items-center">
              <img
                src="https://i.pinimg.com/originals/18/9d/dc/189ddc1221d9c1c779dda4ad37a35fa1.png"
                className="product"
                alt="Shoes"
              />
            </div>
            <div className="col-md-7 rightside">
              <form onSubmit={handleSubmit(loginFunction)}>


                {/* Username */}
                <h1 style={{ fontWeight: 'bold', fontStyle: 'italic' }}>LOGIN FORM</h1>
                <div className="form-group">
                  <label style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Username</label>
                  <input
                    type="text"
                    className="form-control inputbox"
                    placeholder="Enter Username"
                    {...register('name')}
                  />
                  {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </div>


                {/* Password */}
                <div className="form-group">
                  <label style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Password</label>
                  <input
                    type="password"
                    className="form-control inputbox"
                    placeholder="Enter Password"
                    {...register('password')}
                  />
                  {errors.password && <p className="text-danger">{errors.password.message}</p>}
                </div>


                {/* Submit */}
                <button type="submit" className="btn button">
                  LOGIN
                </button>
              </form>
              <div className="text-end mt-3">
                <Link to={"/register"}>
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;