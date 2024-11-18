import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./AddUser.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = () => {

  // Component States
  const navigate = useNavigate();


  // Zod Schema
  const userSchema = z.object({
    name: z.string()
      .min(6, "Name must be at least 6 characters long")
      .max(20, "Name must be at most 20 characters long"),
    password: z.string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be at most 20 characters long"),
    role: z.enum(["admin", "user"], "Role is required"),
    status: z.string().default("inactive"),
  });


  // React Hook Form Destruct
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(userSchema), mode: "onBlur" });


  // Handle Submit Function
  const onSubmit = async (data) => {
    try {
      await axios.post("https://veil-flicker-piano.glitch.me/dashboardUsers", data);
      // Show success alert
      await Swal.fire({
        icon: 'success',
        title: 'User Added!',
        text: 'The user has been added successfully.',
      });
      navigate("/dashboard/table-data/users");
    } catch (error) {
      console.error("There was an error adding the user:", error);
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error adding the user.',
      });
    }
  }


  return (
    <div className="add-user">
      <div className="container">
        <h2 className="mb-3" style={{ color: '#fff', textTransform: 'uppercase' }}>Add <span>User</span></h2>
        <div className="add-user-form">
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
              <input id="password" type="password" {...register("password")} />
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
                value="inactive"
                disabled
                {...register("status")}
              />
            </div>


            <button type="submit">Add User</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
