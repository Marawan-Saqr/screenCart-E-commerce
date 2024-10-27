import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./UpdateUser.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

const UpdateUser = () => {

  // Component States
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);


  // Zod Schema
  const userSchema = z.object({
    name: z.string()
      .min(6, "Name must be at least 6 characters long")
      .max(20, "Name must be at most 20 characters long"),
    password: z.string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be at most 20 characters long"),
    role: z.enum(["admin", "user"], "Role is required"),
    status: z.string(),
  });


  // React Hook Form Destruct
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: zodResolver(userSchema), mode: "onBlur" });


  // Handle Submit Function
  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:3001/dashboardUsers/${state.id}`, data);
      await Swal.fire({
        icon: 'success',
        title: 'User Updated!',
        text: 'The user has been updated successfully.',
      });
      navigate("/dashboard/table-data/users");
    } catch (error) {
      console.error("There was an error updating the user:", error);
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error updating the user.',
      });
    }
  }


  // UseEffect
  useEffect(() => {
    if (state) {
      setValue("name", state.name);
      setValue("password", state.password);
      setValue("role", state.role);
      setValue("status", state.status);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.name === state.name) {
          setValue("status", parsedUser.status);
        }
      }
    }
  }, [state, setValue]);


  return (
    <div className="update-user">
      <div className="container">
        <h2 className="mb-3" style={{ color: '#fff', textTransform: 'uppercase' }}>Update <span>User</span></h2>
        <div className="update-user-form">
          <form onSubmit={handleSubmit(onSubmit)}>


            {/* Name */}
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" {...register("name")} />
              {errors.name && <p>{errors.name.message}</p>}
            </div>


            {/* Password */}
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" type="text" {...register("password")} />
              {errors.password && <p>{errors.password.message}</p>}
            </div>


            {/* Role */}
            <div>
              <label htmlFor="role">Role</label>
              <select id="role" {...register("role")}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              {errors.role && <p>{errors.role.message}</p>}
            </div>


            {/* Status */}
            <div>
              <label htmlFor="status">Status</label>
              <input
                id="status"
                type="text"
                disabled
                {...register("status")}
              />
            </div>


            <button type="submit">Update User</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;