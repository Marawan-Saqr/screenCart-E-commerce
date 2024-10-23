import "./Products.css";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Products = () => {

  // Component States
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();


  // Get All Products
  const getAllProducts = async () => {
    const response = await axios.get("http://localhost:3001/products");
    setProducts(response.data);
  };


  // Delete Product function
  const deleteProduct = async (productId, productName) => {
    try {
      await axios.delete(`http://localhost:3001/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
      alert(`Product ${productName} deleted successfully!`);
    } catch (error) {
      console.error("Error deleting product:", error);
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
                  <img src={"http://localhost:3001/images/" + product.productImage} alt={product.name} style={{ width: "50px", height: "50px" }} />
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
      </div>
    </div>
  );
};

export default Products;