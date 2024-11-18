import './ProductDetailsDash.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetailsDash = () => {

  // Component States
  const { PRODUCTID } = useParams();
  const [product, setProduct] = useState(null);


  // Get Product Details Function
  const getProductDetails = async () => {
    try {
      const response = await axios.get(`https://veil-flicker-piano.glitch.me/products/${PRODUCTID}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };


  // UseEffect
  useEffect(() => {
    getProductDetails();
  }, [PRODUCTID]);


  return (
    <div className="product-details-dashboard">
      <div className="container">
        <h2 className="title">
          Product <span>Details</span>
        </h2>
        <div className="row justify-content-center">
          <div className="box col-md-6 col-lg-5">
            {product ? (
              <div className="product-info">
                <img
                  src={`${process.env.PUBLIC_URL}/images/${product.productImage}`}
                  alt="product"
                  className="img-fluid"
                />
                <ul className="product-details">
                  <li>
                    <span className="label">Name:</span>
                    <strong className="value">{product.name}</strong>
                  </li>
                  <li>
                    <span className="label">Details:</span>
                    <strong className="value">{product.details}</strong>
                  </li>
                  <li>
                    <span className="label">Price:</span>
                    <strong className="value">${product.price}</strong>
                  </li>
                  <li>
                    <span className="label">Category:</span>
                    <strong className="value">{product.category}</strong>
                  </li>
                  <li>
                    <span className="label">Rate:</span>
                    <strong className="value">{product.rate}</strong>
                  </li>
                </ul>
              </div>
            ) : (
              <p className="loading-message">Loading product details...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsDash;
