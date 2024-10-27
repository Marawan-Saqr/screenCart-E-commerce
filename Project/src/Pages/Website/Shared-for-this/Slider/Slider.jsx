import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Slider.css';
import SliderOne from './images/Slider1.jpg';
import SliderTwo from './images/Slider2.jpg';
import SliderThree from './images/Slider3.jpg';
import Components from '../../../../Shared/Styled-components/StyledComponents';
import { Link } from 'react-router-dom';

const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item interval={3000}>
        <img className="d-block w-100" src={ SliderOne } alt="First slide" />
        <Carousel.Caption>
          <h3>Welcome To Screen Cart</h3>
          <p>All You Want In One Place.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <img className="d-block w-100" src={ SliderTwo } alt="Second slide" />
        <Carousel.Caption>
          <h3>Get Disscount 30% For First Time</h3>
          <Components.MainButton style={{marginRight: '10px'}}>
            <Link style={{color: '#fff', textDecoration: 'none'}} to={"/website/products-page"}>Shop Now</Link>
          </Components.MainButton>
          <Components.BlackButton>
            <Link style={{color: '#fff', textDecoration: 'none'}} to={"/website/get-by-category/laptops"}>Laptops</Link>
          </Components.BlackButton>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <img className="d-block w-100" src={ SliderThree } alt="Third slide" />
        <Carousel.Caption>
          <h3>Get Disscount 30% For First Time</h3>
          <Components.MainButton style={{marginRight: '10px'}}>
            <Link style={{color: '#fff', textDecoration: 'none'}} to={"/website/products-page"}>Shop Now</Link>
          </Components.MainButton>
          <Components.BlackButton>
            <Link style={{color: '#fff', textDecoration: 'none'}} to={"/website/get-by-category/computers"}>Computers</Link>
          </Components.BlackButton>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;