import './AllProducts.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faEmptyStar } from '@fortawesome/free-solid-svg-icons';
import { useTitle } from '../../Hooks/titleContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, closeMessage } from '../../Redux/slices/cart.slice';
import { addToWishlist, closeWishlistMessage } from '../../Redux/slices/wishlist.slice';
import components from '../../Shared/Styled-components/StyledComponents';
import { Link } from 'react-router-dom';
import Loader from '../../Shared/Loader/Loader';




const AllProducts = ({ limit, ratingFilter }) => {
  const dispatch = useDispatch(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const title = useTitle();

  const { message: cartMessage, open: cartOpen } = useSelector(state => state.cart);
  const { message: wishlistMessage, open: wishlistOpen } = useSelector(state => state.wishlist);

  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(true);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (cartOpen) {
      const timer = setTimeout(() => {
        dispatch(closeMessage());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [cartOpen, dispatch]);

  useEffect(() => {
    if (wishlistOpen) {
      const timer = setTimeout(() => {
        dispatch(closeWishlistMessage());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [wishlistOpen, dispatch]);

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

  const filteredProducts = ratingFilter
    ? products.filter(product => product.rate === ratingFilter)
    : products;

  return (
    <div className="all-products">
      <div className="container">
        {cartOpen && (
          <div className="cart-message">
            {cartMessage}
          </div>
        )}
        {wishlistOpen && (
          <div className="wishlist-message">
            {wishlistMessage}
          </div>
        )}
        <h2 style={{ marginBottom: '30px', textTransform: 'uppercase', color: '#D10024' }}>{title}</h2>
        {loading ? (  
          <Loader />
        ) : (
          <div className="row">
            {filteredProducts.slice(0, limit).map((product) => (
              <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
                <div className="box">
                  <img src={"http://localhost:3001/images/" + product.productImage} className="img-fluid" alt="Product" />
                  <div className="content text-center">
                    <p style={{ color: '#8D99AE', textTransform: 'uppercase', fontSize: '12px', margin: '0px' }}>Category: {product.category}</p>
                    <h3 style={{ fontSize: '17px', textTransform: 'uppercase', fontWeight: 'bold', margin: '10px 0px' }}>{product.name}</h3>
                    <p style={{ color: '#D10024', fontWeight: 'bold', fontSize: '20px', margin: '0px' }}>${product.price}.00</p>
                    <div>{renderStars(product.rate)}</div>
                    <div><hr /></div>
                    <div className="actions container">
                      <ul>
                        <li>
                          <components.MainButton onClick={() => dispatch(addToWishlist(product))}>
                            <i className="fa-regular fa-heart"></i>
                          </components.MainButton>
                        </li>
                        <li>
                          <Link to={`/website/product-details/${product.id}`}>
                            <components.MainButton>
                              <i className="fa-solid fa-eye"></i> View Details
                            </components.MainButton>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="add">
                    <components.MainButton onClick={() => dispatch(addToCart(product))}>Add To Cart</components.MainButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;