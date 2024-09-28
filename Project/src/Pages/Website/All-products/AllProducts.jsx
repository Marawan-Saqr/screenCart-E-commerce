import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faEmptyStar } from '@fortawesome/free-solid-svg-icons';
import mainImage from './laptop.png';
import './AllProducts.css';
import { useTitle } from '../Contexts/titleContext';

const AllProducts = () => {

  // Component State
  const [products, setProducts] = useState([]);

  // Get All Products Function
  const getAllProducts = async () => {
    const response = await axios.get("http://localhost:3001/products");
    setProducts(response.data);
  }

  // Use Effect
  useEffect(() => {
    getAllProducts();
  }, []);

  // Function to render star ratings
  const renderStars = (rate) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {Array(fullStars).fill().map((_, i) => (
          <FontAwesomeIcon key={`full-${i}`} icon={faStar} style={{color: '#D10024'}} />
        ))}
        {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} style={{color: '#D10024'}} />}
        {Array(emptyStars).fill().map((_, i) => (
          <FontAwesomeIcon key={`empty-${i}`} icon={faEmptyStar} style={{color: '#DDD'}} />
        ))}
      </>
    );
  }

   // Get title from contexts Folder
  const title = useTitle();

  return (
    <div className="all-products">
      <div className="container">
        <h2 style={{marginBottom: '30px', textTransform: 'uppercase', color: '#D10024'}}>{title}</h2>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-3">
            <div className="box">
              <img src={mainImage} className="img-fluid" alt="Product" />
              <div className="content text-center">
                <p style={{color: '#8D99AE', textTransform: 'uppercase', fontSize: '12px', margin: '0px'}}>Category: {product.category}</p>
                <h3 style={{fontSize: '17px', textTransform: 'uppercase', fontWeight: 'bold', margin: '10px 0px'}}>{product.name}</h3>
                <p style={{color: '#D10024', fontWeight: 'bold', fontSize: '20px', margin: '0px'}}>${product.price}.00</p>
                {/* Render Stars */}
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
                <button>Add To Cart</button>
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