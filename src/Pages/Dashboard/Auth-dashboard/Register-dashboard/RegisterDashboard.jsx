import "./RegisterDashboard.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

const RegisterDashboard = () => {

  // Component States
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  // Zod schema
  const schema = z.object({
    name: z
      .string()
      .min(6, "Username must be at least 6 characters long")
      .max(30, "Username must be at most 30 characters long"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(30, "Password must be at most 30 characters long"),
  });


  // React Hook Form Destruct
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });


  // Function to handle form submission
  const onSubmit = async (data) => {
    const userData = { ...data, role: "user", status: "inactive" };
    try {
      const response = await axios.get("http://localhost:3001/dashboardUsers");
      const existingUser = response.data.find((user) => user.name === data.name);
      if (existingUser) {
        setErrorMessage("Username is already taken.");
      } else {
        await axios.post("http://localhost:3001/dashboardUsers", userData);
        Swal.fire({
          title: "Registration Successful",
          text: "You have successfully registered! Now you will be redirected to the login page.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/dashboard/auth-dashboard/login-dashboard");
        });
      }
    } catch (error) {
      console.error("Registration failed: ", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };


  return (
    <div className="register-dashboard">
      <div className="register-container">
        <div className="register-box">
          <h2 style={{ textAlign: "center" }}>Dashboard Of Screen Cart</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit(onSubmit)}>


            {/* Username */}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter New username"
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
                placeholder="Enter New password"
                {...register("password")}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>


            <Button type="submit" className="register-btn">
              Register
            </Button>
            <Link
              style={{
                paddingTop: "20px",
                display: "block",
                textAlign: "right",
                color: "#ff6b6b",
              }}
              to={"/dashboard/auth-dashboard/login-dashboard"}
            >
              Login
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterDashboard;