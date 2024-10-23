import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./UpdateProducts.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const UpdateProducts = () => {
  // Component States
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  // Zod Schema
  const productSchema = z.object({
    name: z.string()
      .min(6, "Product name must be at least 6 characters long")
      .max(50, "Product name must be at most 50 characters long"),
    details: z.string().min(10, "Details must be at least 10 characters long"),
    price: z.number().positive("Price must be a positive number"),
    category: z.string().min(3, "Category must be at least 3 characters long"),
    rate: z.number().min(1).max(5, "Rate must be between 1 and 5"),
    productImage: z.any(),
  });

  // React Hook Form Destruct
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: zodResolver(productSchema), mode: "onBlur" });

  // Handle Submit Function
  const onSubmit = async (data) => {
    await axios.put(`http://localhost:3001/products/${state.id}`, data);
    navigate("/dashboard/table-data/products"); // Updated the navigation path
  };

  // UseEffect
  useEffect(() => {
    if (state) {
      setValue("name", state.name);
      setValue("details", state.details);
      setValue("price", state.price);
      setValue("category", state.category);
      setValue("rate", state.rate);
      setValue("productImage", state.productImage);
    }
  }, [state, setValue]);

  return (
    <div className="update-product">
      <div className="container">
        <h2 className="mb-3" style={{ color: '#fff', textTransform: 'uppercase' }}>Update <span>Product</span></h2>
        <div className="update-product-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Product Name */}
            <div>
              <label htmlFor="name">Product Name</label>
              <input id="name" type="text" {...register("name")} />
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            {/* Details */}
            <div>
              <label htmlFor="details">Details</label>
              <textarea id="details" {...register("details")} />
              {errors.details && <p>{errors.details.message}</p>}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price">Price</label>
              <input id="price" type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
              {errors.price && <p>{errors.price.message}</p>}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category">Category</label>
              <input id="category" type="text" {...register("category")} />
              {errors.category && <p>{errors.category.message}</p>}
            </div>

            {/* Rate */}
            <div>
              <label htmlFor="rate">Rate</label>
              <input id="rate" type="number" min="1" max="5" {...register("rate")} />
              {errors.rate && <p>{errors.rate.message}</p>}
            </div>

            {/* Product Image URL */}
            <div>
              <label htmlFor="productImage">Product Image</label>
              <input id="productImage" type="text" {...register("productImage")} />
              {errors.productImage && <p>{errors.productImage.message}</p>}
            </div>

            <button type="submit">Update Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProducts;