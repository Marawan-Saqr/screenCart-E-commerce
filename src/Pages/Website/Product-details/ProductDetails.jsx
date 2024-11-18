import './ProductDetails.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import components from '../../../Shared/Styled-components/StyledComponents';

const ProductDetails = () => {

  // Component States
  const params = useParams();
  const [product, setProduct] = useState(null);


  // Get Product Details Function
  const getProductDetails = async () => {
    await axios.get(`http://localhost:3001/products/${params.PRODUCTID}`).then((response) => setProduct(response.data));
  }


  // UseEffect
  useEffect(() => {
    getProductDetails();
  }, [params.PRODUCTID]);


  return (
    <div className="product-details">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-md-12 col-lg-5">
            <div className="left">
              <img src={`${process.env.PUBLIC_URL}/images/${product.productImage}`} className="img-fluid" alt="Product" />
            </div>
          </div>
          <div className="col-md-12 col-lg-6">
            <div className="right">
              <h2 style={{textTransform: 'uppercase', fontWeight: 'bold'}}>Product <components.mainSpan>Details</components.mainSpan></h2>
              <div className="content">
                <h3 style={{textTransform: 'uppercase'}}>Product Name: {product?.name}</h3>
                <p style={{margin: '0px', textTransform: 'uppercase'}}><strong>Product Description:</strong> {product?.details}</p>
                <p style={{margin: '0px', textTransform: 'uppercase'}}><strong>Product Category:</strong> {product?.category}</p>
                <p style={{margin: '0px', textTransform: 'uppercase'}}><strong>Price:</strong> ${product?.price}</p>
                <p><strong>Rating:</strong> {product?.rate} / 5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
