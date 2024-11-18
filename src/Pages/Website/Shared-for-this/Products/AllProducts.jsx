import './AllProducts.css';
import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faEmptyStar } from '@fortawesome/free-solid-svg-icons';
import { useTitle } from '../../../../Hooks/titleContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, closeMessage } from '../../../../Redux/slices/cart.slice';
import { addToWishlist, closeWishlistMessage } from '../../../../Redux/slices/wishlist.slice';
import components from '../../../../Shared/Styled-components/StyledComponents';
import { Link } from 'react-router-dom';
import Loader from '../../../../Shared/Loader/Loader';
import { useGetAllProductsQuery } from '../../../../Redux/queries/website.query';

const AllProducts = ({ limit, ratingFilter }) => {

  // Component States
  const { data: products, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch(); 
  const title = useTitle();
  const { message: cartMessage, open: cartOpen } = useSelector(state => state.cart);
  const { message: wishlistMessage, open: wishlistOpen } = useSelector(state => state.wishlist);


  // UseEffect for cart message
  useEffect(() => {
    if (cartOpen) {
      const timer = setTimeout(() => {
        dispatch(closeMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [cartOpen, dispatch]);


  // UseEffect for wishlist message
  useEffect(() => {
    if (wishlistOpen) {
      const timer = setTimeout(() => {
        dispatch(closeWishlistMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [wishlistOpen, dispatch]);


  // Render Stars Function
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


  // Filter Products based on rating
  const filteredProducts = products
    ? (ratingFilter ? products.filter(product => product.rate === ratingFilter) : products)
    : [];


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
        {isLoading ? (  
          <Loader />
        ) : (
          <div className="row">
            {filteredProducts.slice(0, limit).map((product) => (
              <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
                <div className="box">
                  <img src={"https://veil-flicker-piano.glitch.me/images/" + product.productImage} className="img-fluid" alt="Product" />
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
