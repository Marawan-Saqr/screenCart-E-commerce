import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { registerStart, registerSuccess, registerFailure } from '../../../Redux/slices/register.slice';  // Import actions
import { useNavigate, Link } from "react-router-dom";
import { useRegisterUserMutation } from '../../../Redux/queries/website.query'; // Import the mutation hook

import "./Register.css";

// Functional Component
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();  // Redux dispatch function

  // Zod Schema
  const schema = z.object({
    name: z.string()
      .nonempty('Username is required')
      .min(5, 'Username must be 5 characters at least')
      .max(30, 'Username cant be more than 30 characters'),
    password: z.string()
      .nonempty('Password is required')
      .min(5, 'Password must be 5 characters at least')
      .max(30, 'Password cant be more than 20 characters'),
  });

  // React Hook Form Destruct
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onTouched", 
    resolver: zodResolver(schema),
  });

  // Register Function
  const [registerUser] = useRegisterUserMutation(); // Get the mutation function

  const registerFunction = handleSubmit(async (data) => {
    dispatch(registerStart());  // Dispatch register start

    try {
      // Call the register API from website query (Mutation)
      const response = await registerUser(data);

      if (response.error) {
        Swal.fire({
          title: "Register Failed!",
          text: response.error.data?.message || "Something went wrong.",
          icon: "error"
        });
        dispatch(registerFailure(response.error.message));  // Dispatch failure
      } else {
        Swal.fire({
          title: "Register Successfully!",
          text: "Now You Are Moved To Login!",
          icon: "success"
        }).then(() => {
          dispatch(registerSuccess());  // Dispatch success
          navigate("/login");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error"
      });
      dispatch(registerFailure(error.message));  // Dispatch failure
    }
  });

  return (
    <section className="register-box">
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
              <form onSubmit={handleSubmit(registerFunction)}>
                {/* Username */}
                <h1 style={{ fontWeight: 'bold', fontStyle: 'italic' }}>REGISTER FORM</h1>
                <p style={{ color: 'gray', fontSize: '12px' }}>
                  You Will Login After Register So Remember Username & Password
                </p>

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

                {/* Submit Button */}
                <button type="submit" className="btn button">
                  REGISTER
                </button>
              </form>

              {/* Link to Login */}
              <div className="text-end mt-3">
                <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;