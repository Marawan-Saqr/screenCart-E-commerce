import "./LoginDashboard.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

const LoginDashboard = () => {

  // Component States
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");


  // Zod schema
  const loginSchema = z.object({
    name: z.string().nonempty("Name is required"),
    password: z.string().nonempty("Password is required"),
  });


  // React Hook Form Destruct
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur"
  });


  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.get("https://veil-flicker-piano.glitch.me/dashboardUsers");
      const users = response.data;
      const userFound = users.find((user) => user.name === data.name && user.password === data.password);
      if (userFound) {
        setLoginError("");
        const userObject = {
          id: userFound.id,
          name: userFound.name,
          password: userFound.password,
          role: userFound.role,
          status: "Active"
        };
        localStorage.setItem("user", JSON.stringify(userObject));
        Swal.fire({
          title: "Login Successful",
          text: "Welcome back! You will be redirected to the dashboard.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/dashboard/table-data");
          window.location.reload();
        });
      } else {
        setLoginError("Invalid name or password");
        Swal.fire({
          title: "Login Failed",
          text: "Invalid name or password. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error during login: ", error);
      setLoginError("An error occurred. Please try again later.");
    }
  };


  return (
    <div className="login-dashboard">
      <div className="login-container">
        <div className="login-box">
          <h2 style={{ textAlign: 'center' }}>Dashboard Of Screen Cart</h2>
          {loginError && <Alert variant="danger">{loginError}</Alert>}
          <Form onSubmit={handleSubmit(onSubmit)}>


            {/* Name */}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                {...register("name")}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>


            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>


            <Button type="submit" className="login-btn">
              Login
            </Button>
            <Link style={{ paddingTop: '20px', display: 'block', textAlign: 'right', color: '#ff6b6b' }} to={"/dashboard/auth-dashboard/register-dashboard"}>Register</Link>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginDashboard;
