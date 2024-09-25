import "./Register.css";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


// Functional Component
const Register = () => {

  // Component States
  const navigate = useNavigate();


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
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onTouched", resolver: zodResolver(schema) });


  // Register Function
  const registerFunction = handleSubmit(async (data) => {
    const response = await axios.get("http://localhost:3001/users");
    const existingUser = response.data.find(
      (user) => user.name === data.name
    );
    if (existingUser) {
      Swal.fire({
        title: "Register Failed!",
        text: "User already exist!",
        icon: "error"
      });
    } else {
      Swal.fire({
        title: "Register Successfully!",
        text: "Now You Are Moved To Login!",
        icon: "success"
      }).then(async(result) => {
        if (result.isConfirmed) {
          await axios.post("http://localhost:3001/users", data).then(() => navigate("/login"));
        }
      })
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
                <p style={{color: 'gray', fontSize: '12px'}}>You Will Login After Register So Remember Username & Password</p>
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
                  REGISTER
                </button>
              </form>
              <div className="text-end mt-3">
                <Link to={"/login"}>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;