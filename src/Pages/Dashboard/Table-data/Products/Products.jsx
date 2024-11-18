import "./Products.css";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import Loader from '../../../../Shared/Loader/Loader';

const Products = () => {

  // Component States
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  // Get All Products
  const getAllProducts = async () => {
    try {
      const response = await axios.get("https://veil-flicker-piano.glitch.me//products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error fetching the product data.',
      });
    } finally {
      setLoading(false);
    }
  };


  // Delete Product function
  const deleteProduct = async (productId, productName) => {
    // Confirm deletion
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${productName}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`https://veil-flicker-piano.glitch.me/${productId}`);
        setProducts(products.filter(product => product.id !== productId));
        await Swal.fire({
          icon: 'success',
          title: 'Product Deleted!',
          text: `Product ${productName} deleted successfully!`,
        });
      } catch (error) {
        console.error("Error deleting product:", error);
        await Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There was an error deleting the product.',
        });
      }
    }
  };


  // UseEffect
  useEffect(() => {
    getAllProducts();
  }, []);


  return (
    <div className="products-table">
      <div className="container d-flex align-items-center justify-content-between mb-2">
        <h2>PRODUCTS <span>LIST</span></h2>
        <button className="btn btn-info">
          <Link style={{ color: 'black', textDecoration: 'none' }} to={"/dashboard/table-data/add-products"}>Add Product</Link>
        </button>
      </div>
      <div className="table-container">
        {loading ? (
          <div className="text-center">
            <Loader />
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Details</th>
                <th>Price</th>
                <th>Category</th>
                <th>Rate</th>
                <th>Product Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.details}</td>
                  <td>{product.price} $</td>
                  <td>{product.category}</td>
                  <td>{product.rate}</td>
                  <td>
                    <img src={"https://veil-flicker-piano.glitch.me/images/" + product.productImage} alt={product.name} style={{ width: "50px", height: "50px" }} />
                  </td>
                  <td>
                    <Link style={{ color: '#fff', textDecoration: 'none' }} to={`/dashboard/table-data/product-details/${product.id}`}>
                      <button className="btn btn-warning">Details</button>
                    </Link>
                    <button className="btn btn-success" onClick={() => navigate(`/dashboard/table-data/update-product/${product.id}`, { state: product })}>Update</button>
                    <button className="btn btn-danger" onClick={() => deleteProduct(product.id, product.name)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Products;
