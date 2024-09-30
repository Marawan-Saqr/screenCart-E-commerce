// AllProducts.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faEmptyStar } from '@fortawesome/free-solid-svg-icons';
import mainImage from './laptop.png';
import './AllProducts.css';
import { useTitle } from '../../Contexts/titleContext';
import { CartContext } from '../../Contexts/cartContext';
import MainButton from '../../../../Shared/Styled-components/StyledComponents';

const AllProducts = ({ limit }) => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const title = useTitle();

  const getAllProducts = async () => {
    const response = await axios.get("http://localhost:3001/products");
    setProducts(response.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const renderStars = (rate) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {Array(fullStars).fill().map((_, i) => (
          <FontAwesomeIcon key={`full-${i}`} icon={faStar} style={{ color: '#D10024' }} />
        ))}
        {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: '#D10024' }} />}
        {Array(emptyStars).fill().map((_, i) => (
          <FontAwesomeIcon key={`empty-${i}`} icon={faEmptyStar} style={{ color: '#DDD' }} />
        ))}
      </>
    );
  };

  return (
    <div className="all-products">
      <div className="container">
        <h2 style={{ marginBottom: '30px', textTransform: 'uppercase', color: '#D10024' }}>{title}</h2>
        <div className="row">
          {/* Slice the products array to only display the specified limit */}
          {products.slice(0, limit).map((product) => (
            <div key={product.id} className="col-md-3">
              <div className="box">
                <img src={mainImage} className="img-fluid" alt="Product" />
                <div className="content text-center">
                  <p style={{ color: '#8D99AE', textTransform: 'uppercase', fontSize: '12px', margin: '0px' }}>Category: {product.category}</p>
                  <h3 style={{ fontSize: '17px', textTransform: 'uppercase', fontWeight: 'bold', margin: '10px 0px' }}>{product.name}</h3>
                  <p style={{ color: '#D10024', fontWeight: 'bold', fontSize: '20px', margin: '0px' }}>${product.price}.00</p>
                  <div>{renderStars(product.rate)}</div>
                  <div><hr /></div>
                  <div className="actions container">
                    <ul>
                      <li><i className="fa-regular fa-heart"></i></li>
                      <li><i className="fa-solid fa-code-compare"></i></li>
                      <li><i className="fa-solid fa-eye"></i></li>
                    </ul>
                  </div>
                </div>
                <div className="add">
                  <MainButton onClick={() => addToCart(product)}>Add To Cart</MainButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;