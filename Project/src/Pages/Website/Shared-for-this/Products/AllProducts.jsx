import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faEmptyStar } from '@fortawesome/free-solid-svg-icons';
import mainImage from './laptop.png';
import './AllProducts.css';
import { useTitle } from '../../Contexts/titleContext';
import { CartContext } from '../../Contexts/cartContext';
import components from '../../../../Shared/Styled-components/StyledComponents';


const AllProducts = ({ limit, ratingFilter }) => {

  // Component States
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const title = useTitle();


  // Get All Products Function
  const getAllProducts = async () => {
    await axios.get("http://localhost:3001/products").then((response) => setProducts(response.data));
  };


  // Use effect
  useEffect(() => {
    getAllProducts();
  }, []);


  // Rates Stars Function
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



  // Filter products to five reate only in top selling component
  const filteredProducts = ratingFilter
    ? products.filter(product => product.rate === ratingFilter)
    : products;



  return (
    <div className="all-products">
      <div className="container">
        <h2 style={{ marginBottom: '30px', textTransform: 'uppercase', color: '#D10024' }}>{title}</h2>
        <div className="row">
          {filteredProducts.slice(0, limit).map((product) => (
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
                  <components.MainButton onClick={() => addToCart(product)}>Add To Cart</components.MainButton>
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