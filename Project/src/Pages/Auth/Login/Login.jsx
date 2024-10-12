import "./Login.css";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../../../Hooks/userContext';


// Functional Component
const Login = () => {

  // Component States
  const { login } = useContext(UserContext);


  // Zod Schema
  const schema = z.object({
    name: z.string()
      .nonempty('Username is required'),
    password: z.string()
      .nonempty('Password is required'),
  });


  // React Hook Form Destruct
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onTouched", resolver: zodResolver(schema) });


  // Login Function Using Context
  const loginFunction = handleSubmit((data) => {
    login(data.name, data.password);
  });


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