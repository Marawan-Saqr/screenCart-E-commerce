import './GetByCategory.css';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import components from '../../../Shared/Styled-components/StyledComponents';
import { CartContext } from '../../../Hooks/cartContext';
import { faStar, faStarHalfAlt, faStar as faEmptyStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GetByCategory = () => {


  // Component States
  const { CATEGORY } = useParams();
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);


  // Get Products By Category Function
  const fetchCourses = async () => {
    await axios.get(`http://localhost:3001/products?category=${CATEGORY}`).then((response) => setProducts(response.data));
  };


  // UseEffect
  useEffect(() => {
    fetchCourses();
  }, [CATEGORY]);


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


  return (
    <div className="get-products-by-category">
      <div className="container">
        <h2 style={{ marginBottom: '30px', textTransform: 'uppercase', color: '#D10024' }}>{CATEGORY} Products</h2>
        <div className="row">
          {products.map((product) => (
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
                      <li><i className="fa-regular fa-heart"></i></li>
                      <li><i className="fa-solid fa-code-compare"></i></li>
                      <Link style={{color: 'black'}} to={`/website/product-details/${product.id}`}><li><i className="fa-solid fa-eye"></i></li></Link>
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

export default GetByCategory;