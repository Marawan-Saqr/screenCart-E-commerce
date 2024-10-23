import "./AddProducts.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {

  // Component States
  const navigate = useNavigate();


  // Zod Schema
  const productSchema = z.object({
    name: z.string()
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must be at most 50 characters long"),
    details: z.string()
      .min(10, "Details must be at least 10 characters long")
      .max(300, "Details must be at most 300 characters long"),
    price: z.number()
      .min(1, "Price must be at least 1")
      .max(10000, "Price must be at most 10,000"),
    category: z.enum(["laptops", "headsets", "computers", "cameras", "smartphones", "accessories"], "Category is required"),
    rate: z.number()
      .min(1, "Rate must be between 1 and 5")
      .max(5, "Rate must be between 1 and 5"),
    productImage: z.any(),
  });


  // React Hook Form Destructuring
  const { register, handleSubmit, formState: { errors } } = useForm({ 
    resolver: zodResolver(productSchema), 
    mode: "onBlur" 
  });


  // Handle Submit Function
  const onSubmit = async (data) => {
    await axios.post("http://localhost:3001/products", data);
    navigate("/dashboard/table-data/products");
  };


  return (
    <div className="add-product">
      <div className="container">
        <h2 className="mb-3" style={{ color: '#fff', textTransform: 'uppercase' }}>Add <span>Product</span></h2>
        <div className="add-product-form">
          <form onSubmit={handleSubmit(onSubmit)}>


            {/* Name */}
            <div>
              <label htmlFor="name">Name</label>
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
              <select id="category" {...register("category")}>
                <option value="laptops">Laptops</option>
                <option value="headsets">Headsets</option>
                <option value="computers">Computers</option>
                <option value="cameras">Cameras</option>
                <option value="smartphones">Smartphones</option>
                <option value="accessories">Accessories</option>
              </select>
              {errors.category && <p>{errors.category.message}</p>}
            </div>


            {/* Rate */}
            <div>
              <label htmlFor="rate">Rate</label>
              <select id="rate" {...register("rate", { valueAsNumber: true })}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              {errors.rate && <p>{errors.rate.message}</p>}
            </div>


            {/* Product Image */}
            <div>
              <label htmlFor="productImage">Product Image</label>
              <input id="productImage" type="text" {...register("productImage")} />
              {errors.productImage && <p>{errors.productImage.message}</p>}
            </div>


            <button type="submit">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;