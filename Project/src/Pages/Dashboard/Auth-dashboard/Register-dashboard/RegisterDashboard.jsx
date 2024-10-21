import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, Form, Button } from 'react-bootstrap';
import "./RegisterDashboard.css";

const RegisterDashboard = () => {

  // Component Sates
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
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema), mode: "onBlur" });


  // Function to handle form submission
  const onSubmit = async (data) => {
    const userData = { ...data, role: "user" };
    const response = await axios.get("http://localhost:3001/dashboardUsers");
    const existingUser = response.data.find(user => user.name === data.name);
    if (existingUser) {
      setErrorMessage("Username is already taken.");
    } else {
      await axios.post("http://localhost:3001/dashboardUsers", userData);
      navigate("/dashboard/login-dashboard");
    }
  }


  return (
    <div className="register-dashboard">
      <div className="register-container">
        <div className="register-box">
          <h2 style={{ textAlign: 'center' }}>Dashboard Of Screen Cart</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit(onSubmit)}>


            {/* Username */}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
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


            <Button type="submit" className="register-btn">
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterDashboard;